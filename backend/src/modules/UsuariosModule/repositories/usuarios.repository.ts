import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from '../../../entities/usuarios.entity';

@Injectable()
export class UsuariosRepository {
  constructor(
    @InjectRepository(Usuarios)
    private readonly repository: Repository<Usuarios>,
  ) {}

  findById(id: string): Promise<Usuarios | null> {
    return this.repository.findOne({
      where: { idusuario: id },
    });
  }
}