import { Injectable } from '@nestjs/common';
import {AccountInfo} from "../interfaces/account";
import {IResponse, ResponseStatus} from "../interfaces/response";
import {createConnection} from "mysql2/promise";
import {checkAdminAccount, dataBaseLoginInfo} from "../privateInfo";

@Injectable()
export class AdminService {
    public async getNotDoneTestList(info: AccountInfo): Promise<IResponse> {
        const connection = await createConnection(dataBaseLoginInfo);

        if (!checkAdminAccount(info)) {
            return {
                status: ResponseStatus.FAIL
            }
        }

        let todayBegin = new Date()

        todayBegin.setHours(0)
        todayBegin.setMinutes(0)
        todayBegin.setSeconds(0)
        todayBegin.setMilliseconds(0)

        const [rows] = await connection.query(
            "SELECT `stu_id`, `name`, `class`, `phone_num`, `college` FROM `students` WHERE `stu_id` IN (SELECT `students`.`stu_id` FROM `students` LEFT JOIN `clocks` ON `students`.`stu_id` = `clocks`.`stu_id` GROUP BY `students`.`stu_id` HAVING MAX(`clock_time`) < ? OR MAX(`clock_time`) is NULL)",
            [todayBegin.getTime()]
        );

        return {
            status: ResponseStatus.SUCCESS,
            data: rows
        }
    }
}
