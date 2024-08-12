export class CreateSaleRequest{
    IdUser: number;
    IdCart: number;
    ShippingMethod:boolean; //0:delivery   1:recojo
    PaymentMethod:boolean; //0:yape   1:izzipay
    CardNumber:string;
    Total: number;
    idShipment:number;
    ImagePayment: string;
}