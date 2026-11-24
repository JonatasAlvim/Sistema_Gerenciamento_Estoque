import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  Matches,
} from 'class-validator';

export class CreateEnderecoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  logradouro: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  numero: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  complemento?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  bairro: string;

  @IsString()
  @Matches(/^\d{5}-?\d{3}$/, {
    message: 'CEP deve estar no formato 00000-000 ou 00000000.',
  })
  cep: string;

  @IsInt()
  @Min(1)
  idcidade: number;
}