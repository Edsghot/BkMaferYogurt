import { IsNotEmpty, IsString } from "class-validator";

export class UpdateShipmentRequest{
    @IsNotEmpty()
    @IsString()
    ShipmentId:number;
    @IsNotEmpty()
    @IsString()
    UserId: number;
    @IsNotEmpty()
    @IsString()
    Company: string;
    @IsNotEmpty()
    @IsString()
    Region: string;
    @IsNotEmpty()
    @IsString()
    Province: string;
    @IsNotEmpty()
    @IsString()
    District: string;
    @IsNotEmpty()
    @IsString()
    Address: string;
}