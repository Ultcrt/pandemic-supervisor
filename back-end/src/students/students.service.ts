import {Injectable} from '@nestjs/common';
import {createConnection, Connection} from "mysql2/promise";
import {checkAdminAccount, dataBaseLoginInfo} from "../privateInfo";
import {AccountInfo, AccountType} from "../interfaces/account";
import {ClockData, StudentData} from "../interfaces/database";
import {IResponse, ResponseStatus} from "../interfaces/response";

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

    public async queryForHistory(info: AccountInfo): Promise<IResponse> {
        const connection = await createConnection(dataBaseLoginInfo);

        if (checkAdminAccount(info) || !await StudentsService.checkStudentAccount(connection, info)) {
            return {
                status: ResponseStatus.FAIL
            }
        }

        const [rows] = await connection.query(
            "SELECT `clock_time`, `college`, `location`, `detect_result`, `remarks` FROM `clocks` INNER JOIN `students` ON `clocks`.`stu_id` = `students`.`stu_id` INNER JOIN `detects` ON `clocks`.`stu_id` = `detects`.`stu_id` WHERE `students`.`stu_id` = ?",
            [info.id]
        );

        return {
            status: ResponseStatus.SUCCESS,
            data: rows
        }
    }

    public async submit(info: AccountInfo, detectResult: string, location: string, remarks: string, college: string) {
        const connection = await createConnection(dataBaseLoginInfo);

        if (!await StudentsService.checkStudentAccount(connection, info, college)) {
            return {
                status: ResponseStatus.FAIL
            }
        }

        const [clocksRows] = await connection.query<ClockData[]>(
            "INSERT INTO `clocks`(`stu_id`, `clock_time`, `location`, `remarks`) VALUES(?, ?, ?, ?)",
            [info.id, Date.now(), location, remarks]
        );

        const [detectsRows] = await connection.query<ClockData[]>(
            "INSERT INTO `detects`(`stu_id`, `detect_time`, `detect_result`) VALUES(?, ?, ?)",
            [info.id, Date.now(), detectResult]
        );

        return {
            status: ResponseStatus.SUCCESS,
            data: [clocksRows, detectsRows]
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
