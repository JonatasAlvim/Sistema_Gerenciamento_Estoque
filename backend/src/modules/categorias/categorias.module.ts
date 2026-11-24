import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorias } from '../../entities/categorias.entity';
import { CategoriasRepository } from './repositories/categorias.repository';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Categorias])],
  providers: [CategoriasRepository, CategoriasService ],
  exports: [CategoriasRepository],
  controllers: [CategoriasController],
})
export class CategoriasModule {}
