import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsuariosRepository } from '../usuarios/repositories/usuarios.repository';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosRepository: UsuariosRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const usuario = await this.usuariosRepository.findByEmail(
      loginDto.email,
    );

    if (
      !usuario ||
      !usuario.ativo ||
      !(await bcrypt.compare(loginDto.senha, usuario.senha_hash))
    ) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const payload = {
      sub: usuario.idusuario,
      email: usuario.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
    };
  }
}
