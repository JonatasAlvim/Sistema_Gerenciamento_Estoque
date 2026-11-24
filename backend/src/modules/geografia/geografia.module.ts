
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pais } from '../../entities/pais.entity';
import { Estado } from '../../entities/estado.entity';
import { Cidade } from '../../entities/cidade.entity';
import { Endereco } from '../../entities/endereco.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pais,
      Estado,
      Cidade,
      Endereco,
    ]),
  ],
})
export class GeografiaModule {}
