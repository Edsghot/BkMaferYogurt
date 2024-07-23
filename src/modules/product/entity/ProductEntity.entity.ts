import { SaleDetail } from "src/modules/sale/entity/SaleDetail.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CartItem } from "./CarItemEntity.entity";
import { ImageEntity } from "./ImageEntity.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  IdProduct: number;

  @Column()
  Name: string;

  @Column()
  Description: string;

  @Column()
  NutritionalInformation: string;

  @Column('double')
  Price: number;

  @OneToMany(() => ImageEntity, (image) => image.Product)
  Images: ImageEntity[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.Product)
  CartItems: CartItem[];

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.Product)
  SaleDetails: SaleDetail[];
}