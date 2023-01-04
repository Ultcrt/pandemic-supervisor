import {Controller, Get, Query} from '@nestjs/common';

@Controller('api/students')
export class StudentsController {
    @Get("history")
    findHistory(@Query("id")id) {
        return id;
    }
}
