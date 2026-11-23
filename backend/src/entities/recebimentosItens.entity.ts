import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Check } from "typeorm";
import { Recebimentos } from "./recebimentos.entity";
import { Lotes } from "./lotes.entity";

@Entity('recebimentos_itens') 
@Check('"quantidade_esperada" > 0')
@Check('"quantidade_recebida" >= 0 AND "quantidade_recebida" <= "quantidade_esperada"')
@Check('"preco_custo" >= 0')
@Check('"preco_venda" >= 0')
  export class RecebimentosItens {

    @PrimaryGeneratedColumn('increment', {type: "bigint"})
     idrecebimento_item: string;

    @ManyToOne(() => Recebimentos, { nullable: false})
      @JoinColumn({ name: 'idrecebimento'})
        recebimento: Recebimentos;

    @ManyToOne(() => Lotes, { nullable: false})
      @JoinColumn({ name: 'idlote'})
        lote: Lotes;

    @Column({type: 'numeric', precision: 10, scale: 3,})
    quantidade_esperada: string;
    
    @Column({type: 'numeric', precision: 10, scale: 3, default: 0})
    quantidade_recebida: string;

    @Column({type: 'numeric', precision: 10, scale: 2,})
    preco_custo: string;

    @Column({type: 'numeric', precision: 10, scale: 2,})
    preco_venda: string;

    @Column({type: 'timestamptz', default: () => 'now()' })
    criado_em: Date;

 }