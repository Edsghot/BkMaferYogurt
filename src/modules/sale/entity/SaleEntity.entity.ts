
import { User } from "src/modules/user/entity/UserEntity.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany } from "typeorm";
import { Cart } from "src/modules/cart/entity/CartEntity.entity";

// Sale Entity
@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  IdSales: number;

  @ManyToOne(() => User, (user) => user.Sales)
  @JoinColumn({ name: 'userId' })
  Client: User;

  @Column()
  ShippingMethod:boolean;

  @Column()
  PaymentMethod:boolean;

  @Column()
  PaymentNumber:string;

  @Column()
  CardNumber:string;

  @Column()
  Process:boolean;

  @Column('date')
  SaleDate: Date;

  @Column('double')
  Total: number;

  @ManyToOne(() => Cart, (cart) => cart.Sales)
  @JoinColumn({ name: 'cartId' })
  Cart: Cart;

  @Column()
  idShipment:number;

  @Column()
  ImagePayment: string;
}
