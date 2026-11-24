import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { CidadeService } from './cidade.service';

@Controller('cidades')
export class CidadeController {
  constructor(
    private readonly cidadeService: CidadeService,
  ) {}

  @Get()
  findAll() {
    return this.cidadeService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.cidadeService.findById(id);
  }

  @Get('nome/:nome')
  findByName(@Param('nome') nome: string) {
    return this.cidadeService.findByName(nome);
  }

  @Get('estado/:idestado')
  findByStateId(
    @Param('idestado', ParseIntPipe) idestado: number,
  ) {
    return this.cidadeService.findByStateId(idestado);
  }
}