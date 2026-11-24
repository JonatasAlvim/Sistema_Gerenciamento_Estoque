import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pais } from '../../entities/pais.entity';
import { Estado } from '../../entities/estado.entity';
import { Cidade } from '../../entities/cidade.entity';
import { Endereco } from '../../entities/endereco.entity';

import { PaisRepository } from './pais/repositories/pais.repository';
import { PaisService } from './pais/pais.service';
import { PaisController } from './pais/pais.controller';

import { EstadoRepository } from './estado/repositories/estado.repository';
import { EstadoService } from './estado/estado.service';
import { EstadoController } from './estado/estado.controller';

import { CidadeRepository } from './cidade/repositories/cidade.repository';
import { CidadeService } from './cidade/cidade.service';
import { CidadeController } from './cidade/cidade.controller';

import { EnderecoRepository } from './endereco/repositories/endereco.repository';
import { EnderecoService } from './endereco/endereco.service';
import { EnderecoController } from './endereco/endereco.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pais,
      Estado,
      Cidade,
      Endereco,
    ]),
  ],
  providers: [
    PaisRepository,
    PaisService,
    EstadoRepository,
    EstadoService,
    CidadeRepository,
    CidadeService,
    EnderecoRepository,
    EnderecoService,
  ],
  exports: [
    PaisRepository,
    PaisService,
    EstadoRepository,
    EstadoService,
    CidadeRepository,
    CidadeService,
    EnderecoRepository,
    EnderecoService,
  ],
  controllers: [
    PaisController,
    EstadoController,
    CidadeController,
    EnderecoController,
  ],
})
export class GeografiaModule {}