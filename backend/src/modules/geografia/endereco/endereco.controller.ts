import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';

@Controller('enderecos')
export class EnderecoController {
  constructor(
    private readonly enderecoService: EnderecoService,
  ) {}

  @Get()
  findAll() {
    return this.enderecoService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.enderecoService.findById(id);
  }

  @Post()
  create(@Body() createEnderecoDto: CreateEnderecoDto) {
    return this.enderecoService.create(createEnderecoDto);
  }
}