import { Sale } from "src/modules/sale/entity/SaleEntity.entity";
import { User } from "src/modules/user/entity/UserEntity.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany } from "typeorm";

@Entity()
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  IdCart: number;

  @ManyToOne(() => User, (user) => user.ShoppingCarts)
  @JoinColumn({ name: 'userId' })
  User: User;

  @Column('date')
  Date: string;

}
