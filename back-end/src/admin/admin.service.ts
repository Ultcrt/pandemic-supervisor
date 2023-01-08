import { Injectable } from '@nestjs/common';
import {AccountInfo} from "../interfaces/account";
import {IResponse, ResponseStatus} from "../interfaces/response";
import {createConnection} from "mysql2/promise";
import {checkAdminAccount, dataBaseLoginInfo} from "../privateInfo";

@Injectable()
export class AdminService {
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
}
