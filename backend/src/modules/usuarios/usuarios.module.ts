import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Usuarios } from '../../entities/usuarios.entity';
import { UsuariosRepository } from './repositories/usuarios.repository';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { GeografiaModule } from '../geografia/geografia.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuarios]),
    GeografiaModule,
  ],
  providers: [
    UsuariosRepository,
    UsuariosService,
  ],
  exports: [
    UsuariosRepository,
    UsuariosService,
  ],
  controllers: [
    UsuariosController,
  ],
})
export class UsuariosModule {}