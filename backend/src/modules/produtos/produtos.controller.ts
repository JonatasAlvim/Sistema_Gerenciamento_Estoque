import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { Request } from 'express';

import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { JwtAuthGuard } from '../AuthModule/guards/jwt-auth.guard';

import { UpdateProdutoDto } from './dto/update-produto.dto';

interface AuthenticatedRequest extends Request {
  user: {
    idusuario: string;
    email: string;
  };
}
@Controller('produtos')
export class ProdutosController {
  constructor(
    private readonly produtosService: ProdutosService,
  ) {}

  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @Get('codigo/:codigo')
  findByCode(@Param('codigo') codigo: string) {
    return this.produtosService.findByCode(codigo);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.produtosService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createProdutoDto: CreateProdutoDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.produtosService.create(
      createProdutoDto,
      request.user.idusuario,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ) {
    return this.produtosService.update(id, updateProdutoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtosService.remove(id);
  }
 }
