import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsController } from './students/students.controller';
import { AdminsController } from './admins/admins.controller';

@Module({
  imports: [],
  controllers: [AppController, StudentsController, AdminsController],
  providers: [AppService],
})
export class AppModule {}
