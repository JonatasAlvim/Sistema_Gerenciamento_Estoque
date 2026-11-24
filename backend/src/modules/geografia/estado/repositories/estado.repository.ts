import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Estado } from '../../../../entities/estado.entity';

@Injectable()
export class EstadoRepository {
  constructor(
    @InjectRepository(Estado)
    private readonly repository: Repository<Estado>,
  ) {}

  findAll(): Promise<Estado[]> {
    return this.repository.find({
      order: { nome: 'ASC' },
    });
  }

  findById(id: number): Promise<Estado | null> {
    return this.repository.findOne({
      where: { idestado: id },
    });
  }

  findByUf(uf: string): Promise<Estado | null> {
    return this.repository.findOne({
      where: { uf: uf },
    });
  }

findByCountryId(idpais: number): Promise<Estado[]> {
  return this.repository.find({
    where: {
      pais: {
        idpais: idpais,
      },
    },
    order: {
      nome: 'ASC',
    },
  });
 }
}
