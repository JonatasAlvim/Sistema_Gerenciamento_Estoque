import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Min,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  nome: string;

  @IsString()
  @Length(11, 11)
  @Matches(/^\d{11}$/, {
    message: 'CPF deve conter exatamente 11 números.',
  })
  cpf: string;

  @IsEmail()
  @MaxLength(80)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  senha: string;

  @IsInt()
  @Min(1)
  idendereco: number;
}