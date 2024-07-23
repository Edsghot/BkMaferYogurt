import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Product } from "./ProductEntity.entity";
import { ShoppingCart } from "./ShoppingCart.entity";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  IdCartItem: number;

  @ManyToOne(() => ShoppingCart, (shoppingCart) => shoppingCart.CartItems)
  @JoinColumn({ name: 'shoppingCartId' })
  ShoppingCart: ShoppingCart;

  @ManyToOne(() => Product, (product) => product.CartItems)
  @JoinColumn({ name: 'productId' })
  Product: Product;

  @Column('int')
  Quantity: number;

  @Column('date')
  DateAdded: string;
}