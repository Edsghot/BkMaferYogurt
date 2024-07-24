import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { SaleModule } from './modules/sale/sale.module';
import { ProductModule } from './modules/product/product.module';
import { CloudinaryService } from './ServicesCloud/cloudinary/cloudinary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from './ServicesCloud/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'jhedgost.com',
    port: 3306,
    username: 'dbjhfjuv_edsghot',
    password: 'Repro321.',
    database: 'dbjhfjuv_MaferYogurt',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
}),UserModule, ProductModule,SaleModule,CloudinaryModule],
  controllers: [],
  providers: [CloudinaryService],
})
export class AppModule {}
