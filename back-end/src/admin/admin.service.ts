import { Injectable } from '@nestjs/common';
import {AccountInfo, AccountType} from "../interfaces/account";
import {IResponse, ResponseStatus} from "../interfaces/response";
import {createConnection, ResultSetHeader} from "mysql2/promise";
import {adminLoginInfo, dataBaseLoginInfo} from "../privateInfo";

// 管理员API接口处理
@Injectable()
export class AdminService {
    // 用于获取前N天的开始时间戳
    private static getDayBegin(offset: number): Date {
        let todayBegin = new Date()

        todayBegin.setTime(todayBegin.getTime() - offset * 24 * 60 * 60 * 1000)
        todayBegin.setHours(0)
        todayBegin.setMinutes(0)
        todayBegin.setSeconds(0)
        todayBegin.setMilliseconds(0)

        return todayBegin
    }

    // 检查管理员权限
    public static checkAdminAccount(info: AccountInfo): boolean {
        return info.type == AccountType.Admin &&
            info.id === adminLoginInfo.id &&
            info.password === adminLoginInfo.password;
    }

    // 获取本日没打卡的列表
    public async getNotDoneClockList(info: AccountInfo, college: string, location: string): Promise<IResponse> {
        const connection = await createConnection(dataBaseLoginInfo);

        // 检查管理员权限
        if (!AdminService.checkAdminAccount(info)) {
            return {
                status: ResponseStatus.FAIL
            }
        }

        // 获取当前开始时间戳
        let todayBegin = AdminService.getDayBegin(0)

        const [rows] = await connection.query(
            "SELECT `stu_id`, `name`, `class`, `phone_num`, `college`, `location` " +
            "FROM `students` WHERE `stu_id` IN " +
            "(SELECT `students`.`stu_id` " +
            "FROM `students` " +
            "LEFT JOIN `clocks` ON `students`.`stu_id` = `clocks`.`stu_id` " +
            "GROUP BY `students`.`stu_id` HAVING MAX(`clock_time`) < ? OR MAX(`clock_time`) is NULL)" +
            (college == "全部" ? "" : (" AND `college` = '" + college + "'")) +
            (location == "全部" ? "" : (" AND `location` = '" + location + "'")),
            [todayBegin.getTime()]
        );

        return {
            status: ResponseStatus.SUCCESS,
            data: rows
        }
    }

    // 获取两天内没打卡的学生列表
    public async getNotDoneClockListInTwoDays(info: AccountInfo, college: string, location: string): Promise<IResponse> {
        const connection = await createConnection(dataBaseLoginInfo);

        // 检查管理员权限
        if (!AdminService.checkAdminAccount(info)) {
            return {
                status: ResponseStatus.FAIL
            }
        }

        // 获取昨天前开始时间戳
        let twoDaysAgoBegin = AdminService.getDayBegin(1)

        const [rows] = await connection.query(
            "SELECT `stu_id`, `name`, `class`, `phone_num`, `college`, `location` FROM `students` WHERE `stu_id` IN " +
            "(SELECT `students`.`stu_id` " +
            "FROM `students` " +
            "LEFT JOIN `clocks` ON `students`.`stu_id` = `clocks`.`stu_id` " +
            "GROUP BY `students`.`stu_id` HAVING MAX(`clock_time`) < ? OR MAX(`clock_time`) is NULL)" +
            (college == "全部" ? "" : (" AND `college` = '" + college + "'")) +
            (location == "全部" ? "" : (" AND `location` = '" + location + "'")),
            [twoDaysAgoBegin.getTime()]
        );

        return {
            status: ResponseStatus.SUCCESS,
            data: rows
        }
    }

    // 获取本日没有做核酸的学生列表
    public async getNotDoneDetectList(info: AccountInfo, college: string, location: string): Promise<IResponse> {
        const connection = await createConnection(dataBaseLoginInfo);

        // 检查管理员权限
        if (!AdminService.checkAdminAccount(info)) {
            return {
                status: ResponseStatus.FAIL
            }
        }

        // 获取当前开始时间戳
        let todayBegin = AdminService.getDayBegin(0)

        const [rows] = await connection.query(
            "SELECT `stu_id`, `name`, `class`, `phone_num`, `college`, `location` " +
            "FROM `students` WHERE `stu_id` IN " +
            "(SELECT `students`.`stu_id` " +
            "FROM `students` " +
            "LEFT JOIN `detects` ON `students`.`stu_id` = `detects`.`stu_id` " +
            "GROUP BY `students`.`stu_id` HAVING MAX(`detect_time`) < ? OR MAX(`detect_time`) is NULL)" +
            (college == "全部" ? "" : (" AND `college` = '" + college + "'")) +
            (location == "全部" ? "" : (" AND `location` = '" + location + "'")),
            [todayBegin.getTime()]
        );

        return {
            status: ResponseStatus.SUCCESS,
            data: rows
        }
    }

    public async changeLocation(info: AccountInfo, targetId: string, targetLocation: string): Promise<IResponse> {
        const connection = await createConnection(dataBaseLoginInfo);

        // 检查管理员权限
        if (!AdminService.checkAdminAccount(info)) {
            return {
                status: ResponseStatus.FAIL
            }
        }

        const [rows] = await connection.query<ResultSetHeader>("UPDATE `students` SET `location` = ? WHERE `stu_id` = ?",
            [targetLocation, targetId]);

        // 修改行数为0，说明更新失败
        if (rows.changedRows === 0) {
            return {
                status: ResponseStatus.FAIL
            }
        }

        return {
            status: ResponseStatus.SUCCESS,
            data: rows
        }
    }

    // 管理员登录
    public async login(info: AccountInfo) {
        if (!AdminService.checkAdminAccount(info)) {
            return {
                status: ResponseStatus.FAIL
            }
        }

        return {
            status: ResponseStatus.SUCCESS
        }
    }
}
