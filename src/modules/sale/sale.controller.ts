import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleRequest } from './request/CreateSaleRequest.request';

@Controller('api/sale')
export class SaleController {
    constructor(private readonly saleService: SaleService){}

    @Post("/insert")
    async insertSale(@Body() request: CreateSaleRequest) {
            return this.saleService.insertSale(request);
    }

    @Get()
    async getAllSales() {
        return await this.saleService.getAllSales();
    }

    @Get('/getById/:id')
    async getSaleById(@Param('id') id: number) {
        return await this.saleService.getSaleById(id);
    }

    @Delete('/delete/:id')
    async deleteSale(@Param('id') id: number) {
        return await this.saleService.deleteSale(id);
    }
}
