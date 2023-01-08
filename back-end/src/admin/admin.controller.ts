import {Body, Controller, Post} from '@nestjs/common';
import {AccountInfo} from "../interfaces/account";
import {IResponse} from "../interfaces/response";
import {AdminService} from "./admin.service";

@Controller('api/admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Post("not-done-test")
    async getNotDoneTestList(@Body()accountInfo: AccountInfo): Promise<IResponse> {
        return this.adminService.getNotDoneTestList(accountInfo);
    }

    @Post("submit")
    async submitClock(@Body()accountInfo: AccountInfo,
                      @Body("detect_result")detectResult,
                      @Body("location")location,
                      @Body("remarks")remarks): Promise<IResponse> {
        return this.adminService.submit(accountInfo, detectResult, location, remarks);
    }

    @Post("login")
    async login(@Body()accountInfo: AccountInfo): Promise<IResponse> {
        return this.adminService.login(accountInfo);
    }
}
