import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';

import { Request } from 'express';

import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { JwtAuthGuard } from '../AuthModule/guards/jwt-auth.guard';

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
}