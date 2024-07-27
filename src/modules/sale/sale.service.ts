import { Injectable } from '@nestjs/common';
import { CreateSaleRequest } from './request/CreateSaleRequest.request';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entity/SaleEntity.entity';
import { Cart } from '../cart/entity/CartEntity.entity';
import { User } from '../user/entity/UserEntity.entity';
import * as moment from 'moment-timezone';

@Injectable()
export class SaleService {
    constructor(
        @InjectRepository(Sale)
        private readonly saleRepository: Repository<Sale>,
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
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

        sale.ShippingMethod=request.ShippingMethod;
        sale.PaymentMethod=request.PaymentMethod;
        sale.PaymentNumber=request.PaymentNumber;
        sale.CardNumber=request.CardNumber;
        sale.Process=request.Process;
        sale.Total=request.Total;
        sale.SaleDate=moment.tz('America/Lima').toDate();
        sale.idShipment=request.idShipment;

        
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

}
