import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class AddPaymentMethodDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  paymentMethodId!: string;
}