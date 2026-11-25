import {
  IsIn,
  IsOptional,
  IsString,
  IsNumber,
  Min,
} from 'class-validator';

import { Type } from 'class-transformer';

export class FindProdutosQueryDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsIn(['ativo', 'inativo'])
  status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precoMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precoMax?: number;
}