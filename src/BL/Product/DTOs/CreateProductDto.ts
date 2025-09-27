import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name!: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Expose()
  price!: number;

  @IsOptional()
  @IsString()
  @Expose()
  description?: string;
}