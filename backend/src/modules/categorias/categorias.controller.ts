
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch
} from '@nestjs/common';

import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(
    private readonly categoriasService: CategoriasService,
  ) {}

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasService.findById(id);
  }

  @Post()
  create(@Body() data: CreateCategoriaDto) {
    return this.categoriasService.create(data);
  }

  @Patch(':id')
update(
  @Param('id', ParseIntPipe) id: number,
  @Body() data: UpdateCategoriaDto,
) {
  return this.categoriasService.update(id, data);
}
}
