import { IsNotEmpty } from 'class-validator';

export class ActualRentDto {
  @IsNotEmpty()
  minLat: number;

  @IsNotEmpty()
  maxLat: number;

  @IsNotEmpty()
  minLng: number;

  @IsNotEmpty()
  maxLng: number;

  pageNumber: number;

  pageSize: number;
}
