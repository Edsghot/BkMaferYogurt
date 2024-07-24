import { IsNotEmpty, IsString, IsNumber } from "class-validator";

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
    Price: number;
  }