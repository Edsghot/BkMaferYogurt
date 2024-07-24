import { SaleDetail } from "src/modules/sale/entity/SaleDetail.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CartItem } from "./CarItemEntity.entity";

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

  @Column()
  UrlImage: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.Product)
  CartItems: CartItem[];

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.Product)
  SaleDetails: SaleDetail[];
}