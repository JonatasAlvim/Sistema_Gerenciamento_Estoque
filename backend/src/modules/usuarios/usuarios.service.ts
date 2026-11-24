import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UsuariosRepository } from './repositories/usuarios.repository';
import { EnderecoRepository } from '../geografia/endereco/repositories/endereco.repository';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly usuariosRepository: UsuariosRepository,
    private readonly enderecoRepository: EnderecoRepository,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const {
      senha,
      idendereco,
      ...dadosUsuario
    } = createUsuarioDto;

    const emailExistente =
      await this.usuariosRepository.findByEmail(dadosUsuario.email);

    if (emailExistente) {
      throw new ConflictException('E-mail já cadastrado.');
    }

    const cpfExistente =
      await this.usuariosRepository.findByCpf(dadosUsuario.cpf);

    if (cpfExistente) {
      throw new ConflictException('CPF já cadastrado.');
    }

    const endereco =
      await this.enderecoRepository.findById(String(idendereco));

    if (!endereco) {
      throw new NotFoundException('Endereço não encontrado.');
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = this.usuariosRepository.create({
      ...dadosUsuario,
      senha_hash: senhaHash,
      endereco,
    });

    const usuarioSalvo = await this.usuariosRepository.save(usuario);

    const { senha_hash, ...usuarioSemSenha } = usuarioSalvo;

    return usuarioSemSenha;
  }
}