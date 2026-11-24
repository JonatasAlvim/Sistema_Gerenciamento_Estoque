import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(80)
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}
