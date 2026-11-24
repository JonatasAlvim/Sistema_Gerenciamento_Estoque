
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produtos } from '../../../entities/produtos.entity';

@Injectable()
export class ProdutosRepository {
  constructor(
    @InjectRepository(Produtos)
    private readonly repository: Repository<Produtos>,
  ) {}

  findAll(): Promise<Produtos[]> {
    return this.repository.find({
      relations: {
        categoria: true,
        usuario: true,
      },
      order: {
        nome: 'ASC',
      },
    });
  }

  findById(id: string): Promise<Produtos | null> {
    return this.repository.findOne({
      where: { idproduto: id },
      relations: {
        categoria: true,
        usuario: true,
      },
    });
  }

  findByCode(codigo: string): Promise<Produtos | null> {
    return this.repository.findOne({
      where: { codigo_produto: codigo },
    });
  }

  create(data: Partial<Produtos>): Produtos {
    return this.repository.create(data);
  }

  save(produto: Produtos): Promise<Produtos> {
    return this.repository.save(produto);
  }
}
