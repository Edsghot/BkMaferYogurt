import { Module } from '@nestjs/common';
import { AuthValidateService } from './auth-validate.service';
import { AuthValidateController } from './auth-validate.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/UserEntity.entity';
import { Sale } from '../sale/entity/SaleEntity.entity';

@Module({
  imports: [
    MailerModule.forRoot(
      {
        transport: {
          service: 'gmail',
          auth:{
            user: 'edsghotsolutions@gmail.com',
            pass: 'utbrdntnpnttvumd'
          }
        }
      }
    ),TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([Sale])
  ],
  providers: [AuthValidateService],
  controllers: [AuthValidateController]
})
export class AuthValidateModule {}
