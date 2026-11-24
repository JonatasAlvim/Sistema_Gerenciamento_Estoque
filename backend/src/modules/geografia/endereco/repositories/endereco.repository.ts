import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Endereco } from '../../../../entities/endereco.entity';

@Injectable()
export class EnderecoRepository {
  constructor(
    @InjectRepository(Endereco)
    private readonly repository: Repository<Endereco>,
  ) {}

  findAll(): Promise<Endereco[]> {
    return this.repository.find({
      relations: {
        cidade: {
          estado: true,
        },
      },
      order: {
        idendereco: 'DESC',
      },
    });
  }

  findById(id: string): Promise<Endereco | null> {
    return this.repository.findOne({
      where: {
        idendereco: id,
      },
      relations: {
        cidade: {
          estado: true,
        },
      },
    });
  }

  create(data: Partial<Endereco>): Endereco {
    return this.repository.create(data);
  }

  save(endereco: Endereco): Promise<Endereco> {
    return this.repository.save(endereco);
  }
}