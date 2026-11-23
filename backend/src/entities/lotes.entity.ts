import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, } from "typeorm";
import { Produtos } from "./produtos.entity";

@Entity('lotes')
@Unique('uk_lot_produto_numero', ['idproduto', 'numero_lote'])
 export class Lotes {

    @PrimaryGeneratedColumn('increment', {type: "bigint"})
    idlote: string;

    @Column({type: 'varchar', length: 50})
    numero_lote: string;

    @ManyToOne(() => Produtos, { nullable: false})
      @JoinColumn({ name: 'idproduto'})
       produto: Produtos;

    @Column({type: 'date', nullable: true})
    data_validade: Date | null;

    @Column({type: 'timestamptz', default: () => 'now()' })
    criado_em: Date;

 }