import {Controller, Post, Body} from '@nestjs/common';
import {StudentsService} from "./students.service";
import {AccountInfo} from "../interfaces/account";
import {IResponse} from "../interfaces/response";
import {ClockData} from "../interfaces/database";

@Controller('api/students')
export class StudentsController {
    constructor(private studentService: StudentsService) {}

    @Post("history")
    async findHistory(@Body()accountInfo: AccountInfo): Promise<IResponse> {
        return this.studentService.queryForHistory(accountInfo);
    }

    @Post("submit")
    async submitClock(@Body()accountInfo: AccountInfo,
                      @Body("detect_result")detectResult,
                      @Body("location")location,
                      @Body("remarks")remarks,
                      @Body("college")college): Promise<IResponse> {
        return this.studentService.submit(accountInfo, detectResult, location, remarks, college);
    }

    @Post("login")
    async login(@Body()accountInfo: AccountInfo): Promise<IResponse> {
        return this.studentService.login(accountInfo);
    }
}
