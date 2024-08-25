import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsNumber, IsPositive, Min } from "class-validator";

export class CreateProductRequest {
    @IsNotEmpty()
    @IsString()
    Name: string;
  
    @IsNotEmpty()
    @IsString()
    Description: string;
  
    @IsNotEmpty()
    @IsString()
    NutritionalInformation: string;

    UrlImage: string;
  
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    @IsPositive({ message: 'El precio debe ser un número positivo.' })
    Price: number;

    Category:string;
    @IsNumber()
    @Transform(({ value }) => Number(value))
    @IsPositive({ message: 'El stock debe ser un número positivo.' })
    Stock: number;
  }