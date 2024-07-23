import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Product } from "./ProductEntity.entity";

// Image Entity
@Entity('Image')
export class ImageEntity {
  @PrimaryGeneratedColumn()
  IdImage: number;

  @ManyToOne(() => Product, (product) => product.Images)
  @JoinColumn({ name: 'productId' })
  Product: Product;

  @Column()
  UrlImage: string;
}