import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/ProductEntity.entity';
import { CreateProductRequest } from './request/CreateProductRequest.request';
import { UpdateProductRequest } from './request/UpdateProductRequest.request';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
      ) {}
    
      async insertProduct(request: CreateProductRequest) {
        try {
          const newProduct = this.productRepository.create(request);
          await this.productRepository.save(newProduct);
          return { msg: 'Producto insertado correctamente', success: true };
        } catch (error) {
          console.error('Error al insertar producto:', error);
          return { msg: 'Error al insertar producto', detailMsg: error.message, success: false };
        }
      }
    
      async updateProduct(updateProductDto: UpdateProductRequest) {
        try {
          const product = await this.productRepository.findOne({
            where: { IdProduct: updateProductDto.IdProduct },
          });
    
          if (!product) {
            return { msg: 'Producto no encontrado', success: false };
          }
    
          product.Description=updateProductDto.Description;
          product.Name=updateProductDto.Name;
          product.NutritionalInformation=updateProductDto.NutritionalInformation;
          product.Price=updateProductDto.Price;
          product.Stock=updateProductDto.Stock;
          product.Visible=updateProductDto.Visible;
          product.UrlImage=updateProductDto.UrlImage;
          
          await this.productRepository.save(product);
    
          return { msg: 'Producto actualizado exitosamente', success: true };
        } catch (error) {
          console.error('Error al actualizar producto:', error);
          return { msg: 'Error al actualizar producto', detailMsg: error.message, success: false };
        }
      }
    
      async getAllProducts() {
        try {
          const products = await this.productRepository.find();
          return { data: products, msg: 'Éxito', success: true };
        } catch (error) {
          console.error('Error al obtener productos:', error);
          return { msg: 'Error al obtener productos', detailMsg: error.message, success: false };
        }
      }
    
      async getProductById(productId: number) {
        try {
          const product = await this.productRepository.findOne({
            where: { IdProduct: productId },
          });
    
          return product
            ? { data: product, msg: 'Éxito', success: true }
            : { msg: 'Producto no encontrado', success: false };
        } catch (error) {
          console.error('Error al obtener producto por ID:', error);
          return { msg: 'Error al obtener producto', detailMsg: error.message, success: false };
        }
      }
    
      async deleteProduct(productId: number) {
        try {
          await this.productRepository.delete(productId);
          return { msg: 'Producto eliminado exitosamente', success: true };
        } catch (error) {
          console.error('Error al eliminar producto:', error);
          return { msg: 'Error al eliminar producto', detailMsg: error.message, success: false };
        }
      }
      //Hola mundo
}
