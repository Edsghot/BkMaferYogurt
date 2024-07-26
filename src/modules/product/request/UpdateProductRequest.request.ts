import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductRequest {
    @IsNotEmpty()
    @IsNumber()
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
    Price?: number;

    UrlImage: string;

    Visible: boolean;

    Category:string;

    Stock: number;
}