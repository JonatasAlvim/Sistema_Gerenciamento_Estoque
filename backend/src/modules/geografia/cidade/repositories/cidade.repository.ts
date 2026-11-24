import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cidade } from '../../../../entities/cidade.entity';

@Injectable()
export class CidadeRepository {
  constructor(
    @InjectRepository(Cidade)
    private readonly repository: Repository<Cidade>,
  ) {}

  findAll(): Promise<Cidade[]> {
    return this.repository.find({
      relations: {
        estado: true,
      },
      order: {
        nome: 'ASC',
      },
    });
  }

  findById(id: number): Promise<Cidade | null> {
    return this.repository.findOne({
      where: {
        idcidade: id,
      },
      relations: {
        estado: true,
      },
    });
  }

  findByName(nome: string): Promise<Cidade[]> {
    return this.repository.find({
      where: {
        nome: nome,
      },
      relations: {
        estado: true,
      },
      order: {
        nome: 'ASC',
      },
    });
  }

  findByStateId(idestado: number): Promise<Cidade[]> {
    return this.repository.find({
      where: {
        estado: {
          idestado: idestado,
        },
      },
      relations: {
        estado: true,
      },
      order: {
        nome: 'ASC',
      },
    });
  }
}