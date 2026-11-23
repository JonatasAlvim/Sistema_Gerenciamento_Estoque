import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Check, Unique } from "typeorm";
import { RecebimentosItens } from "./recebimentosItens.entity";
import { Localizacoes } from "./localizacoes.entity";

@Entity('estoque_saldos') 
@Unique('uk_es_recebimento_localizacao', ['recebimentoitem', 'localizacao'])
@Check('"quantidade" >= 0')
 export class EstoqueSaldos {

    @PrimaryGeneratedColumn('increment', {type: "bigint"})
     idestoque_saldo: string;

    @ManyToOne(() => RecebimentosItens, { nullable: false})
      @JoinColumn({ name: 'idrecebimento_item'})
        recebimentoitem: RecebimentosItens;

    @ManyToOne(() => Localizacoes, { nullable: false})
      @JoinColumn({ name: 'idlocalizacao'})
        localizacao: Localizacoes;

    @Column({type: 'numeric', precision: 10, scale: 3, default: 0 })
    quantidade: string;

    @Column({type: 'timestamptz', default: () => 'now()' })
    criado_em: Date;
    
    @Column({type: 'timestamptz', default: () => 'now()' })
    atualizado_em: Date;

 }