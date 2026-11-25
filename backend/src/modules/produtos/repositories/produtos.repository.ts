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

findAll(filtros?: {
  nome?: string;
  status?: string;
  precoMin?: number;
  precoMax?: number;
}): Promise<Produtos[]> {
  const query = this.repository
    .createQueryBuilder('produto')
    .leftJoinAndSelect('produto.categoria', 'categoria')
    .leftJoin('produto.usuario', 'usuario')
    .addSelect([
      'usuario.idusuario',
      'usuario.nome',
    ]);

  query.leftJoin(
    (subQuery) => {
      return subQuery
        .select('l.idproduto', 'idproduto')
        .addSelect('ri.preco_venda', 'preco_venda')
        .from('recebimentos_itens', 'ri')
        .innerJoin(
          'recebimentos',
          'r',
          'r.idrecebimento = ri.idrecebimento',
        )
        .innerJoin(
          'lotes',
          'l',
          'l.idlote = ri.idlote',
        )
        .distinctOn(['l.idproduto'])
        .orderBy('l.idproduto', 'ASC')
        .addOrderBy('r.data_recebimento', 'DESC')
        .addOrderBy('r.idrecebimento', 'DESC')
        .addOrderBy('ri.idrecebimento_item', 'DESC');
    },
    'ultimoPreco',
    '"ultimoPreco"."idproduto" = "produto"."idproduto"',
  );

  if (filtros?.nome) {
    query.andWhere('produto.nome ILIKE :nome', {
      nome: `%${filtros.nome}%`,
    });
  }

  if (filtros?.status) {
    query.andWhere('produto.ativo = :ativo', {
      ativo: filtros.status === 'ativo',
    });
  } else {
    query.andWhere('produto.ativo = :ativo', {
      ativo: true,
    });
  }

  if (filtros?.precoMin !== undefined) {
    query.andWhere(
      '"ultimoPreco"."preco_venda"::numeric >= :precoMin',
      { precoMin: filtros.precoMin },
    );
  }

  if (filtros?.precoMax !== undefined) {
    query.andWhere(
      '"ultimoPreco"."preco_venda"::numeric <= :precoMax',
      { precoMax: filtros.precoMax },
    );
  }

query.orderBy('produto.nome', 'ASC');

return query.getMany();
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