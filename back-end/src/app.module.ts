import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsController } from './students/students.controller';
import { StudentsService } from './students/students.service';
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';

@Module({
  imports: [ ServeStaticModule.forRoot({
    rootPath: join(__dirname, "..", "public")
  }) ],
  controllers: [AppController, StudentsController, AdminController],
  providers: [AppService, StudentsService, AdminService],
})
export class AppModule {}
