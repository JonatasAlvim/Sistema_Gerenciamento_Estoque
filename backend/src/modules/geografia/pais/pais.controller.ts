import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { PaisService } from './pais.service';

@Controller('paises')
export class PaisController {
  constructor(
    private readonly paisService: PaisService,
  ) {}

  @Get()
  findAll() {
    return this.paisService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.paisService.findById(id);
  }
}
