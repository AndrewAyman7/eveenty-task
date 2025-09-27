import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';
import { Expose } from 'class-transformer';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\[\]\\\/'`~\-+=])[A-Za-z\d!@#$%^&*(),.?":{}|<>_\[\]\\\/'`~\-+=]{8,}$/,
    {
      message:
        'Password too weak. It must contain at least 7 characters, one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  @Expose()
  password!: string;

  @IsOptional()
  @IsString()
  @Expose()
  name?: string;
}