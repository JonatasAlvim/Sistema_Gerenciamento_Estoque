import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Produtos } from '../../entities/produtos.entity';

import { CategoriasModule } from '../categorias/categorias.module';
import { UsuariosModule } from '../UsuariosModule/usuarios.module';

import { ProdutosRepository } from './repositories/produtos.repository';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Produtos]),
    CategoriasModule,
    UsuariosModule,
  ],
  providers: [ProdutosRepository, ProdutosService],
  exports: [ProdutosRepository, ProdutosService],
  controllers: [ProdutosController],
})
export class ProdutosModule {}