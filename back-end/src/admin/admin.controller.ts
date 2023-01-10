import {Body, Controller, Post} from '@nestjs/common';
import {AccountInfo} from "../interfaces/account";
import {IResponse} from "../interfaces/response";
import {AdminService} from "./admin.service";

// 管理员API接口侦听
@Controller('api/admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Post("not-done-clock")
    async getNotDoneClockList(@Body()accountInfo: AccountInfo, @Body("college")college, @Body("location")location): Promise<IResponse> {
        return this.adminService.getNotDoneClockList(accountInfo, college, location);
    }

    @Post("not-done-clock-in-two-days")
    async getNotDoneClockListInTwoDays(@Body()accountInfo: AccountInfo,
                                       @Body("college")college,
                                       @Body("location")location): Promise<IResponse> {
        return this.adminService.getNotDoneClockListInTwoDays(accountInfo, college, location);
    }

    @Post("not-done-detect")
    async getNotDoneDetectList(@Body()accountInfo: AccountInfo, @Body("college")college, @Body("location")location): Promise<IResponse> {
        return this.adminService.getNotDoneDetectList(accountInfo, college, location);
    }

    @Post("change-location")
    async changeLocation(@Body()accountInfo: AccountInfo, @Body("targetId")targetId, @Body("targetLocation")targetLocation): Promise<IResponse> {
        return this.adminService.changeLocation(accountInfo, targetId, targetLocation);
    }

    @Post("login")
    async login(@Body()accountInfo: AccountInfo): Promise<IResponse> {
        return this.adminService.login(accountInfo);
    }
}
