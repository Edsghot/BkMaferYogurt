import { SaleDetail } from "src/modules/sale/entity/SaleDetail.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
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

  @Column({ default: true })
  Visible: boolean;

  @Column()
  Stock: number;

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.Product)
  SaleDetails: SaleDetail[];
}