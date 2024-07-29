import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { Sale } from './entity/SaleEntity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../cart/entity/CartEntity.entity';
import { User } from '../user/entity/UserEntity.entity';
import { AuthValidateService } from '../auth-validate/auth-validate.service';
import { CloudinaryService } from 'src/ServicesCloud/cloudinary/cloudinary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale],),TypeOrmModule.forFeature([Cart]),TypeOrmModule.forFeature([User])
  ],
  providers: [SaleService,AuthValidateService,CloudinaryService],
  controllers: [SaleController]
})
export class SaleModule {}
