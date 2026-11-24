import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EstadoRepository } from './repositories/estado.repository';

@Injectable()
export class EstadoService {
  constructor(
    private readonly estadoRepository: EstadoRepository,
  ) {}
  async findAll() {
    return this.estadoRepository.findAll();
  }
  async findById(id: number) {
    const estado = await this.estadoRepository.findById(id);
    if (!estado) {
      throw new NotFoundException('Estado não encontrado.');
    }
    return estado;
  }
  async findByUf(uf: string) {
      const estado = await this.estadoRepository.findByUf(uf);
      if (!estado) {
          throw new NotFoundException('Estado não encontrado.');
        }
        return estado;
    }
  async findByCountryId(idpais: number) {
    return this.estadoRepository.findByCountryId(idpais);
  }
 }