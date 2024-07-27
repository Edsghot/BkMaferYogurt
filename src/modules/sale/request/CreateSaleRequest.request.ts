export class CreateSaleRequest{
    IdUser: number;
    IdCart: number;
    ShippingMethod:boolean;
    PaymentMethod:boolean;
    PaymentNumber:string;
    CardNumber:string;
    Process:boolean;
    Total: number;
    idShipment:number;
}