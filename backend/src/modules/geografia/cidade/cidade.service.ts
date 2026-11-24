import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CidadeRepository } from './repositories/cidade.repository';

@Injectable()
export class CidadeService {
  constructor(
    private readonly cidadeRepository: CidadeRepository,
  ) {}

  async findAll() {
    return this.cidadeRepository.findAll();
  }

  async findById(id: number) {
    const cidade = await this.cidadeRepository.findById(id);

    if (!cidade) {
      throw new NotFoundException('Cidade não encontrada.');
    }

    return cidade;
  }

  async findByName(nome: string) {
    return this.cidadeRepository.findByName(nome);
  }

  async findByStateId(idestado: number) {
    return this.cidadeRepository.findByStateId(idestado);
  }
}