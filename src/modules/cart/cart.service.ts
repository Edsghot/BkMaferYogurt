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
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
    
      async insertProduct(request: CreateCartRequest) {
        try {
            var user = await this.userRepository.findOne({where: {IdUser: request.IdUser}});
            if(!user){
                return {msg: "No se encontro el usuario", success: false}
            }

            var product = await this.productRepository.findOne({where: {IdProduct: request.IdProduct}});

            if(!product || product.Stock <= 0 || product.Stock <= request.Quantity){
                return {msg: "No se encontro el producto o no tiene stock suficiente", success: false}
            }

            var cart = await this.cartRepository.findOne({where: {User: user, Deleted: false}});
            
            if(!cart){

                let newCart = new Cart();

                newCart.DateAdded = new Date()
                newCart.Deleted = false;
                newCart.User = user;
                await this.cartRepository.save(newCart);

                let newCartItem = new CartItem();
                newCartItem.Cart = newCart;
                newCartItem.Product = product;
                newCartItem.DateAdded = new Date();
                newCartItem.Quantity = request.Quantity;
                await this.cartItemRepository.save(newCartItem);

                return {msg:"se creo el carrito", success: true}
            }

            var cartItem = await this.cartItemRepository.findOne({where: {Product: product,Cart: cart}});

            if(!cartItem){
                var newCartItem = new CartItem();
                newCartItem.Cart = cart;
                newCartItem.Product = product;
                newCartItem.DateAdded = new Date();
                newCartItem.Quantity = request.Quantity;
                await this.cartItemRepository.save(newCartItem);

                return {msg:"se agrego al carrito", success: true}
            }

            cartItem.Quantity = request.Quantity;

            await this.cartItemRepository.save(cartItem);

            return {msg: "se actualizo el carrito", success: true}
         

        } catch (error) {
          return { msg: 'Error al insertar carrito', detailMsg: error.message, success: false };
        }
      }

      async getCartByUserId(userId: number){
        var user=await this.userRepository.findOne({
          where:{IdUser:userId}
        });
        if (!user) {
          return { msg: 'No se encontro usuario', success: false, data: null };
        }
        var cart=await this.cartRepository.findOne({
          where:{User:user,Deleted:false},
          relations:['Items']
        });

        if (!cart) {
          return { msg: 'No se encontro carrito', success: false, data: null };
        }
        return { msg: 'Lista de carrito', success: true, data: cart };
      }

}
