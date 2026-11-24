
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { CategoriasRepository } from './repositories/categorias.repository';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    private readonly categoriasRepository: CategoriasRepository,
  ) {}

  async findAll() {
    return this.categoriasRepository.findAll();
  }

  async findById(id: number) {
    const categoria = await this.categoriasRepository.findById(id);

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada.');
    }

    return categoria;
  }

  async create(data: CreateCategoriaDto) {
    const categoriaExistente =
      await this.categoriasRepository.findByName(data.nome);

    if (categoriaExistente) {
      throw new ConflictException(
        'Já existe uma categoria com esse nome.',
      );
    }

    const novaCategoria = this.categoriasRepository.create(data);

    return this.categoriasRepository.save(novaCategoria);
  }

  async update(id: number, data: UpdateCategoriaDto) {
  const categoria = await this.findById(id);

  if (data.nome) {
    const categoriaExistente =
      await this.categoriasRepository.findByName(data.nome);

    if (
      categoriaExistente &&
      categoriaExistente.idcategoria !== id
    ) {
      throw new ConflictException(
        'Já existe outra categoria com esse nome.',
      );
    }
  }

  Object.assign(categoria, data);

  return this.categoriasRepository.save(categoria);
}
  
}
