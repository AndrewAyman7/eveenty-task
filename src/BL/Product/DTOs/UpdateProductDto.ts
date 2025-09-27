import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @Expose()
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Expose()
  price?: number;

  @IsOptional()
  @IsString()
  @Expose()
  description?: string;
}