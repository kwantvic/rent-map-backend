import { IsNotEmpty } from 'class-validator';

export class CoordRentDto {
  @IsNotEmpty()
  minLat: number;

  @IsNotEmpty()
  maxLat: number;

  @IsNotEmpty()
  minLng: number;

  @IsNotEmpty()
  maxLng: number;
}
