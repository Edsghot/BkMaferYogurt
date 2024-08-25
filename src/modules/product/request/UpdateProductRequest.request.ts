import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

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
    @IsPositive({ message: 'El precio debe ser un número positivo.' })
    Price?: number;

    UrlImage: string;

    Visible: boolean;

    Category:string;
    @IsNumber()
    @Transform(({ value }) => Number(value))
    @IsPositive({ message: 'El stock debe ser un número positivo.' })
    Stock: number;
}