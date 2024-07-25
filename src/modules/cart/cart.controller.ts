import { Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartRequest } from './request/CreateCartRequest';

@Controller('api/cart')
export class CartController {

    constructor(private readonly serviceCart: CartService){}


    @Post("/insert")
    async insertProduct(request: CreateCartRequest) {
            return this.serviceCart.insertProduct(request);
    }
}
