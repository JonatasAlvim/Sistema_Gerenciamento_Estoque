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
  return this.repository
    .createQueryBuilder('produto')
    .leftJoinAndSelect('produto.categoria', 'categoria')
    .leftJoin('produto.usuario', 'usuario')
    .addSelect([
      'usuario.idusuario',
      'usuario.nome',
    ])
    .where('produto.ativo = :ativo', { ativo: true })
    .orderBy('produto.nome', 'ASC')
    .getMany();
}

findById(id: string): Promise<Produtos | null> {
  return this.repository
    .createQueryBuilder('produto')
    .leftJoinAndSelect('produto.categoria', 'categoria')
    .leftJoin('produto.usuario', 'usuario')
    .addSelect([
      'usuario.idusuario',
      'usuario.nome',
    ])
    .where('produto.idproduto = :id', { id })
    .andWhere('produto.ativo = :ativo', { ativo: true })
    .getOne();
}

  findByCode(codigo: string): Promise<Produtos | null> {
  return this.repository.findOne({
    where: {
      codigo_produto: codigo,
      ativo: true,
    },
  });
}

  findByCodeIncludingInactive(codigo: string): Promise<Produtos | null> {
  return this.repository.findOne({
    where: {
      codigo_produto: codigo,
    },
  });
}

  create(data: Partial<Produtos>): Produtos {
    return this.repository.create(data);
  }

  save(produto: Produtos): Promise<Produtos> {
    return this.repository.save(produto);
  }
}