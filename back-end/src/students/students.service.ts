import {Injectable} from '@nestjs/common';
import {Connection, createConnection, RowDataPacket} from "mysql2/promise";
import {dataBaseLoginInfo} from "../privateInfo";
import {AccountInfo, AccountType} from "../interfaces/account";
import {ClockData, StudentData} from "../interfaces/database";
import {IResponse, ResponseStatus} from "../interfaces/response";
import {AdminService} from "../admin/admin.service";

@Injectable()
export class StudentsService {
    private static async checkStudentAccount(connection: Connection, info: AccountInfo, college?: string): Promise<boolean> {
        // 检查学生权限
        if (info.type == AccountType.Student) {
            let rows: StudentData[]

            if (!college) {
                [rows] = await connection.query<StudentData[]>(
                    "SELECT * FROM `students` WHERE `stu_id` = ? AND `password` = ?",
                    [info.id, info.password]
                );
            }
            else {
                [rows] = await connection.query<StudentData[]>(
                    "SELECT * FROM `students` WHERE `stu_id` = ? AND `password` = ? AND `college` = ?",
                    [info.id, info.password, college]
                );
            }

            if (rows.length > 0) {
                return true
            }
        }

        return false;
    }

    public async queryForHistory(info: AccountInfo, targetId: string): Promise<IResponse> {
        const connection = await createConnection(dataBaseLoginInfo);

        if (!AdminService.checkAdminAccount(info) && !await StudentsService.checkStudentAccount(connection, info)) {
            return {
                status: ResponseStatus.FAIL
            }
        }

        const [rows] = await connection.query<RowDataPacket[]>(
            "SELECT `clock_time`, `college`, `clocks`.`location`, `detect_result`, `remarks` " +
            "FROM `clocks` " +
            "INNER JOIN `students` ON `clocks`.`stu_id` = `students`.`stu_id` " +
            "LEFT JOIN `detects` ON `clocks`.`detect_id` = `detects`.`detect_id` " +
            "WHERE `students`.`stu_id` = ? " +
            "ORDER BY `clock_time` DESC",
            [info.type == AccountType.Student ? info.id : targetId]
        );

        if (rows.length >0) {
            return {
                status: ResponseStatus.SUCCESS,
                data: rows
            }
        }

        return {
            status: ResponseStatus.FAIL
        }
    }

    public async submit(info: AccountInfo, detectResult: string, location: string, remarks: string, college: string, targetId: string) {
        const connection = await createConnection(dataBaseLoginInfo);

        if (!AdminService.checkAdminAccount(info) && !await StudentsService.checkStudentAccount(connection, info, college)) {
            return {
                status: ResponseStatus.FAIL
            }
        }

        const currentTimestamp = Date.now()

        let detectId = null

        try {
            let detectsRows: ClockData[] = []
            if (detectResult !== "未检测") {
                detectId = currentTimestamp;

                [detectsRows] = await connection.query<ClockData[]>(
                    "INSERT INTO `detects`(`detect_id`, `stu_id`, `detect_time`, `detect_result`) VALUES(?, ?, ?, ?)",
                    [detectId, info.type == AccountType.Student ? info.id : targetId, currentTimestamp, detectResult]
                );
            }

            const [clocksRows] = await connection.query<ClockData[]>(
                "INSERT INTO `clocks`(`stu_id`, `clock_time`, `location`, `remarks`, `detect_id`) VALUES(?, ?, ?, ?, ?)",
                [info.type == AccountType.Student ? info.id : targetId, currentTimestamp, location, remarks, detectId]
            );

            return {
                status: ResponseStatus.SUCCESS,
                data: [clocksRows, detectsRows]
            }
        }
        catch (e) {
            return {
                status: ResponseStatus.FAIL
            }
        }
    }

    public async login(info: AccountInfo) {
        const connection = await createConnection(dataBaseLoginInfo);

        if (!await StudentsService.checkStudentAccount(connection, info)) {
            return {
                status: ResponseStatus.FAIL
            }
        }

        return {
            status: ResponseStatus.SUCCESS
        }
    }
}
