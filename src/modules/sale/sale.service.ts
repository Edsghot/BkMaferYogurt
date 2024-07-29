import { Injectable } from '@nestjs/common';
import { CreateSaleRequest } from './request/CreateSaleRequest.request';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entity/SaleEntity.entity';
import { Cart } from '../cart/entity/CartEntity.entity';
import { User } from '../user/entity/UserEntity.entity';
import * as moment from 'moment-timezone';
import { AuthValidateService } from '../auth-validate/auth-validate.service';
import { resPaymentDto } from './request/reqPaymentDto.dto';
import { ReqSuccessDto } from './request/reqSuccesDto.dto';
import { ReqErrorDto } from './request/reqErrorDto.dto';

@Injectable()
export class SaleService {
    constructor(
        @InjectRepository(Sale)
        private readonly saleRepository: Repository<Sale>,
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private mailValidateService: AuthValidateService
      ) {}

    async insertSale(request: CreateSaleRequest){
      try {
        let sale = new Sale();
        var res = await this.userRepository.findOne({ where: { IdUser: request.IdUser } })
        if (!res) {
          return { msg: 'No se encontro el usuario', success: false };
        }
        sale.Client = res;
        var cart = await this.cartRepository.findOne({ where: { IdCart: request.IdCart } })
        if (!cart) {
          return { msg: 'No se encontro el carrito', success: false };
        }
        sale.Cart = cart;
        if(request.PaymentMethod==true){
          await this.mailValidateService.sendMailUser(request);
          sale.Process=false;
        }else{
          sale.Process=true;
        }
        sale.ShippingMethod=request.ShippingMethod;
        sale.PaymentMethod=request.PaymentMethod;
        sale.PaymentNumber=Math.floor(1000 + Math.random() * 9000).toString();
        sale.CardNumber=request.CardNumber;
        sale.Total=request.Total;
        sale.SaleDate=moment.tz('America/Lima').toDate();
        sale.idShipment=request.idShipment;
        sale.ImagePayment=request.ImagePayment;

        
        await this.saleRepository.save(sale);
        return { msg: 'Venta insertada correctamente', success: true };
      } catch (error) {
        console.error('Error al insertar venta:', error);
        return { msg: 'Error al insertar venta', detailMsg: error.message, success: false };
      }
   }

   async getAllSales() {
    try {
      const sales = await this.saleRepository.find();
      return { data: sales, msg: 'Éxito', success: true };
    } catch (error) {
      console.error('Error al obtener ventas:', error);
      return { msg: 'Error al obtener ventas', detailMsg: error.message, success: false };
    }
  }

  async getSaleById(saleId: number) {
    try {
      const sale = await this.saleRepository.findOne({
        where: { IdSales: saleId }, relations:['Client','Cart']
      });
      return { data: sale, msg: 'Éxito', success: true };
    } catch (error) {
      console.error('Error al obtener venta por ID:', error);
      return { msg: 'Error al obtener venta por ID', detailMsg: error.message, success: false };
    }
  }

  async deleteSale(saleId: number) {
    try {
      await this.saleRepository.delete(saleId);
      return { msg: 'Venta eliminado exitosamente', success: true };
    } catch (error) {
      console.error('Error al eliminar venta:', error);
      return { msg: 'Error al eliminar venta', detailMsg: error.message, success: false };
    }
  }

  async AcceptPayment(request: resPaymentDto) {
    try {
        var user =await this.userRepository.findOne({where:{IdUser:request.IdUser}})
        if(!user){
          return{msg: "error con el usuario"}
        }
        var cart=await this.cartRepository.findOne({where:{IdCart:request.IdCart}})
        if(!cart){
          return{msg: "error con el carrito"}
        }
        var sale = await this.saleRepository.findOne({where:{Client: user,Cart: cart}});

        if(!sale){
            return{msg: "error con la venta"}
        }
        sale.Process=true;
        await this.saleRepository.save(sale);
        var res = new ReqSuccessDto();
            res.Mail = user.Mail;
            res.user=user.FirstName;

      await this.mailValidateService.sendPaymentSuccess(res);

      return { msg: 'se envio el correo satisfactoriamente'};
    } catch (error) {
      console.error('Error al insertar pago:', error);
      return { msg: 'Error al insertar pago', detailMsg: error.message, success: false };
    }
  }

  async FailPayment(request: resPaymentDto) {
    try {

      var user =await this.userRepository.findOne({where:{IdUser:request.IdUser}})
      if(!user){
        return{msg: "error con el usuario"}
      }
      var cart=await this.cartRepository.findOne({where:{IdCart:request.IdCart}})
      if(!cart){
        return{msg: "error con el carrito"}
      }
      var sale = await this.saleRepository.findOne({where:{Client: user,Cart: cart}});

      if(!sale){
          return{msg: "error con la venta"}
      }
        
        var res = new ReqErrorDto();
            res.Mail = user.Mail;
            res.user = user.FirstName;
            res.Img = sale.ImagePayment;

      await this.mailValidateService.sendPaymentError(res);

      return { msg: 'se envio el correo satisfactoriamente' };
    } catch (error) {
      console.error('Error al insertar pago:', error);
      return { msg: 'Error al insertar pago', detailMsg: error.message, success: false };
    }
  }
}
