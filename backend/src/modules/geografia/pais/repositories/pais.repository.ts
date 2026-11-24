import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pais } from '../../../../entities/pais.entity';

@Injectable()
export class PaisRepository {
  constructor(
    @InjectRepository(Pais)
    private readonly repository: Repository<Pais>,
  ) {}

  findAll(): Promise<Pais[]> {
    return this.repository.find({
      order: { nome_pt: 'ASC' },
    });
  }

  findById(id: number): Promise<Pais | null> {
    return this.repository.findOne({
      where: { idpais: id },
    });
  }

  findByName(nome: string): Promise<Pais | null> {
    return this.repository.findOne({
      where: { nome_pt: nome },
    });
  }

  create(data: Partial<Pais>): Pais {
    return this.repository.create(data);
  }

  save(pais: Pais): Promise<Pais> {
    return this.repository.save(pais);
  }
}
