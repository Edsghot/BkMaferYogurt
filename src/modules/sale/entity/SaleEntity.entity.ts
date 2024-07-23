import { Shipment } from "src/modules/product/entity/ShipmentEnity.entity";
import { ShoppingCart } from "src/modules/product/entity/ShoppingCart.entity";
import { User } from "src/modules/user/entity/UserEntity.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany } from "typeorm";
import { SaleDetail } from "./SaleDetail.entity";

// Sale Entity
@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  IdSales: number;

  @ManyToOne(() => User, (user) => user.Sales)
  @JoinColumn({ name: 'clientId' })
  Client: User;

  @Column('date')
  SaleDate: string;

  @Column('double')
  Total: number;

  @ManyToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.Sales)
  @JoinColumn({ name: 'shoppingCartId' })
  ShoppingCart: ShoppingCart;

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.Sale)
  SaleDetails: SaleDetail[];

  @OneToMany(() => Shipment, (shipment) => shipment.Sale)
  Shipments: Shipment[];
}
