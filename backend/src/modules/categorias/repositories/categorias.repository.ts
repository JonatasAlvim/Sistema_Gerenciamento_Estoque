
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categorias } from '../../../entities/categorias.entity';

@Injectable()
export class CategoriasRepository {
  constructor(
    @InjectRepository(Categorias)
    private readonly repository: Repository<Categorias>,
  ) {}

  findAll(): Promise<Categorias[]> {
    return this.repository.find({
      order: { nome: 'ASC' },
    });
  }

  findById(id: number): Promise<Categorias | null> {
    return this.repository.findOne({
      where: { idcategoria: id },
    });
  }

  findByName(nome: string): Promise<Categorias | null> {
    return this.repository.findOne({
      where: { nome },
    });
  }

  create(data: Partial<Pick<Categorias, 'nome' | 'descricao'>>): Categorias {
    return this.repository.create(data);
  }

  save(categoria: Categorias): Promise<Categorias> {
    return this.repository.save(categoria);
  }
}
