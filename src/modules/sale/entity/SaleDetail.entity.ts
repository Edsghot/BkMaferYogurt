import { Product } from "src/modules/product/entity/ProductEntity.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Sale } from "./SaleEntity.entity";

// SaleDetail Entity
@Entity()
export class SaleDetail {
  @PrimaryGeneratedColumn()
  IdDetail: number;

  @ManyToOne(() => Sale, (sale) => sale.SaleDetails)
  @JoinColumn({ name: 'saleId' })
  Sale: Sale;

  @ManyToOne(() => Product, (product) => product.SaleDetails)
  @JoinColumn({ name: 'productId' })
  Product: Product;

  @Column('int')
  Quantity: number;

  @Column('int')
  UnitPrice: number;
}