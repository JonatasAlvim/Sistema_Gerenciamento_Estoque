import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { EstadoService } from './estado.service';
@Controller('estados')
export class EstadoController {
  constructor(
    private readonly estadoService: EstadoService,
  ) {}
  @Get()
  findAll() {
    return this.estadoService.findAll();
  }
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.estadoService.findById(id);
  }
    @Get('uf/:uf')
  findByUf(@Param('uf') uf: string) {
    return this.estadoService.findByUf(uf.toUpperCase());
  }
  @Get('pais/:idpais')
  findByCountryId(
    @Param('idpais', ParseIntPipe) idpais: number,
  ) {
    return this.estadoService.findByCountryId(idpais);
  }
}