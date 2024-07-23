import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/UserEntity.entity';
import { ValidateService } from 'src/Common/Validate/validate.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [UserService,ValidateService],
  controllers: [UserController]
})
export class UserModule {}
