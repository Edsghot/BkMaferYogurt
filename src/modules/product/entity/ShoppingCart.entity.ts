import { Sale } from "src/modules/sale/entity/SaleEntity.entity";
import { User } from "src/modules/user/entity/UserEntity.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany } from "typeorm";
import { CartItem } from "./CarItemEntity.entity";

@Entity()
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  IdCart: number;

  @ManyToOne(() => User, (user) => user.ShoppingCarts)
  @JoinColumn({ name: 'userId' })
  User: User;

  @Column('date')
  Date: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.ShoppingCart)
  CartItems: CartItem[];

  @OneToMany(() => Sale, (sale) => sale.ShoppingCart)
  Sales: Sale[];
}
