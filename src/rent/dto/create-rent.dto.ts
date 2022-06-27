import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRentDto {
  @IsNotEmpty()
  lat: number;

  @IsNotEmpty()
  lng: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  urlImage?: string;
}
