import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PaisRepository } from './repositories/pais.repository';

@Injectable()
export class PaisService {
  constructor(
    private readonly paisRepository: PaisRepository,
  ) {}

  async findAll() {
    return this.paisRepository.findAll();
  }

  async findById(id: number) {
    const pais = await this.paisRepository.findById(id);

    if (!pais) {
      throw new NotFoundException('País não encontrado.');
    }

    return pais;
  }
}
