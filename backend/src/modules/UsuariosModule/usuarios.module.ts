import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from '../../entities/usuarios.entity';
import { UsuariosRepository } from './repositories/usuarios.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios])],
  providers: [UsuariosRepository],
  exports: [UsuariosRepository],
})
export class UsuariosModule {}