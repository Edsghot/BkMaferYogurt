import { CartItem } from "src/modules/cart/entity/CartItem.entity";

export class ReqSuccessDto {
    Mail: string;
    user: string;
    items: CartItem[];
    total: number;
}
