import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { EnderecoRepository } from './repositories/endereco.repository';
import { CidadeRepository } from '../cidade/repositories/cidade.repository';
import { CreateEnderecoDto } from './dto/create-endereco.dto';

@Injectable()
export class EnderecoService {
  constructor(
    private readonly enderecoRepository: EnderecoRepository,
    private readonly cidadeRepository: CidadeRepository,
  ) {}

  async findAll() {
    return this.enderecoRepository.findAll();
  }

  async findById(id: string) {
    const endereco = await this.enderecoRepository.findById(id);

    if (!endereco) {
      throw new NotFoundException('Endereço não encontrado.');
    }

    return endereco;
  }

  async create(createEnderecoDto: CreateEnderecoDto) {
    const { idcidade, ...dadosEndereco } = createEnderecoDto;

    const cidade = await this.cidadeRepository.findById(idcidade);

    if (!cidade) {
      throw new NotFoundException('Cidade não encontrada.');
    }

    const endereco = this.enderecoRepository.create({
      ...dadosEndereco,
      cidade,
    });

    return this.enderecoRepository.save(endereco);
  }
}