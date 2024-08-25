import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductRequest {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    IdProduct: number;
  
    @IsOptional()
    @IsString()
    Name?: string;
  
    @IsOptional()
    @IsString()
    Description?: string;
  
    @IsOptional()
    @IsString()
    NutritionalInformation?: string;
  
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    Price?: number;

    UrlImage: string;

    Visible: boolean;

    Category:string;

    Stock: number;
}