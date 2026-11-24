import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { CreateProdutoDto } from './dto/create-produto.dto';

import { ProdutosRepository } from './repositories/produtos.repository';
import { CategoriasRepository } from '../categorias/repositories/categorias.repository';
import { UsuariosRepository } from '../usuarios/repositories/usuarios.repository';

@Injectable()
export class ProdutosService {
  constructor(
    private readonly produtosRepository: ProdutosRepository,
    private readonly categoriasRepository: CategoriasRepository,
    private readonly usuariosRepository: UsuariosRepository,
  ) {}

  async findAll() {
    return this.produtosRepository.findAll();
  }

  async findById(id: string) {
    const produto = await this.produtosRepository.findById(id);

    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return produto;
  }

  async findByCode(codigo: string) {
    const produto = await this.produtosRepository.findByCode(codigo);

    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return produto;
  }

  async create(
    createProdutoDto: CreateProdutoDto,
    idusuario: string,
  ) {
    const {
      codigo_produto,
      idcategoria,
      ...dadosProduto
    } = createProdutoDto;

    const produtoExistente =
      await this.produtosRepository.findByCode(codigo_produto);

    if (produtoExistente) {
      throw new ConflictException('Código de produto já cadastrado.');
    }

    const categoria =
      await this.categoriasRepository.findById(idcategoria);

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada.');
    }

    const usuario =
      await this.usuariosRepository.findById(idusuario);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const produto = this.produtosRepository.create({
      ...dadosProduto,
      codigo_produto,
      estoque_minimo: String(dadosProduto.estoque_minimo ?? 0),
      categoria,
      usuario,
    });

    return this.produtosRepository.save(produto);
  }
}