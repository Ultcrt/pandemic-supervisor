import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsController } from './students/students.controller';
import { StudentsService } from './students/students.service';
import {dataBaseLoginInfo} from "./privateInfo";
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';
import _default from "ts-jest";

@Module({
  imports: [ ServeStaticModule.forRoot({
    rootPath: join(__dirname, "..", "public")
  }) ],
  controllers: [AppController, StudentsController],
  providers: [AppService, StudentsService],
})
export class AppModule {}
