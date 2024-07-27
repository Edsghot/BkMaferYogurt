import { IsNotEmpty, IsString } from "class-validator";

export class CreateShipmentRequest{
    @IsNotEmpty()
    @IsString()
    IdUser: number;

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
    DateAdd:Date;
}