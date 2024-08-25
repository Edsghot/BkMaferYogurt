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
    
    @Min(1, { message: 'El stock debe ser al menos 1.' })
    Stock: number;
  }