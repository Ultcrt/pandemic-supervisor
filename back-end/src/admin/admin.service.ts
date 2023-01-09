import { Injectable } from '@nestjs/common';
import {AccountInfo} from "../interfaces/account";
import {IResponse, ResponseStatus} from "../interfaces/response";
import {createConnection, ResultSetHeader} from "mysql2/promise";
import {checkAdminAccount, dataBaseLoginInfo} from "../privateInfo";

@Injectable()
export class AdminService {
    private static getDayBegin(offset: number): Date {
        let todayBegin = new Date()

        todayBegin.setTime(todayBegin.getTime() - offset * 24 * 60 * 60 * 1000)
        todayBegin.setHours(0)
        todayBegin.setMinutes(0)
        todayBegin.setSeconds(0)
        todayBegin.setMilliseconds(0)

        return todayBegin
    }

    public async getNotDoneClockList(info: AccountInfo, college: string, location: string): Promise<IResponse> {
        const connection = await createConnection(dataBaseLoginInfo);

        if (!checkAdminAccount(info)) {
            return {
                status: ResponseStatus.FAIL
            }
        }

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

    public async getNotDoneClockListInTwoDays(info: AccountInfo, college: string, location: string): Promise<IResponse> {
        const connection = await createConnection(dataBaseLoginInfo);

        if (!checkAdminAccount(info)) {
            return {
                status: ResponseStatus.FAIL
            }
        }

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

    public async getNotDoneDetectList(info: AccountInfo, college: string, location: string): Promise<IResponse> {
        const connection = await createConnection(dataBaseLoginInfo);

        if (!checkAdminAccount(info)) {
            return {
                status: ResponseStatus.FAIL
            }
        }

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

    public async changeCollege(info: AccountInfo, targetId: string, targetLocation: string): Promise<IResponse> {
        const connection = await createConnection(dataBaseLoginInfo);

        if (!checkAdminAccount(info)) {
            return {
                status: ResponseStatus.FAIL
            }
        }

        const [rows] = await connection.query<ResultSetHeader>("UPDATE `students` SET `location` = ? WHERE `stu_id` = ?",
            [targetLocation, targetId]);

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

    public async login(info: AccountInfo) {
        if (!checkAdminAccount(info)) {
            return {
                status: ResponseStatus.FAIL
            }
        }

        return {
            status: ResponseStatus.SUCCESS
        }
    }
}
