import { ArrayMinSize, IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class OrderItemDto {
  @IsNotEmpty()
  @Expose()
  productId!: number;

  @IsNotEmpty()
  @Expose()
  quantity!: number;
}

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @Expose()
  items!: OrderItemDto[];

  @IsString()
  @IsNotEmpty()
  @Expose()
  paymentMethodId!: string;
}