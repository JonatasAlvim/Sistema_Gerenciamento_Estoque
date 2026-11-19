import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import { Estado } from "./estado.entity";

@Entity("cidade")
export class Cidade {
  @PrimaryColumn("int")
  idcidade: number;

  @Column({ type: "varchar", length: 120 })
  nome: string;

  @ManyToOne(() => Estado, { nullable: false })
  @JoinColumn({ name: "idestado" })
  estado: Estado;

  @Column({ type: "int", unique: true })
  ibge: number;

  @Column({ type: "point", nullable: true })
  lat_lon: string | null;

  @Column({ type: "smallint", default: 0 })
  cod_tom: number;
}
