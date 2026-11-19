import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Pais } from "./pais.entity";

@Entity('estado')
export class Estado {
  @PrimaryColumn('int')
  idestado: number;

  @Column({ type: 'varchar', length: 60 })
  nome: string;

  @Column({ type: 'varchar', length: 2, unique: true })
  uf: string;

  @Column({ type: 'int', unique: true })
  ibge: number;

  @ManyToOne(() => Pais, { nullable: true })
  @JoinColumn({ name: 'idpais' })
  pais: Pais | null;

  @Column({ type: 'int', array: true, nullable: true })
  ddd: number[] | null;
}