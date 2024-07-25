import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product/entity/ProductEntity.entity';
import { CreateProductRequest } from '../product/request/CreateProductRequest.request';
import { Cart } from './entity/CartEntity.entity';
import { CartItem } from './entity/CartItem.entity';
import { CreateCartRequest } from './request/CreateCartRequest';
import { User } from '../user/entity/UserEntity.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly productRepository: Repository<Cart>,
        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
    
      async insertProduct(request: CreateCartRequest) {
        try {
            
            


        } catch (error) {
          return { msg: 'Error al insertar producto', detailMsg: error.message, success: false };
        }
      }
}
