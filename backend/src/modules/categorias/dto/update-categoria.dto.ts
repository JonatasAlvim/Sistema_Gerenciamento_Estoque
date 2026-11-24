import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateCategoriaDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @MaxLength(60, {
    message: 'O nome deve ter no máximo 60 caracteres.',
  })
  nome?: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser um texto.' })
  descricao?: string;
}
