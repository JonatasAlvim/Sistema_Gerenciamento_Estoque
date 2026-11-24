import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsInt,
  Min,
  MaxLength,
  IsIn,
} from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  codigo_produto: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['UN', 'KG', 'L', 'CX', 'PCT', 'DZ', 'G', 'ML'], {
    message: 'Unidade de medida inválida.',
  })
  @MaxLength(10)
  unidade_medida: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0)
  estoque_minimo?: number;

  @IsInt()
  @Min(1)
  idcategoria: number;

  @IsOptional()
  @IsBoolean()
  perecivel?: boolean;
}