import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Check } from "typeorm";
import { EstoqueSaldos } from "./estoque_saldos.entity";
import { Usuarios } from "./usuarios.entity";


@Entity('movimentacoes_estoque') 
@Check('"quantidade" > 0')
@Check(`"tipo_movimentacao" IN ('ENTRADA', 'SAIDA', 'PERDA', 'RECALL', 'LIBERACAO')`)
 export class MovimentacoesEstoque {

    @PrimaryGeneratedColumn('increment', {type: "bigint"})
    idmovimentacao: string;

    @ManyToOne(() => EstoqueSaldos, { nullable: false})
      @JoinColumn({ name: 'idestoque_saldo'})
        estoquesaldo: EstoqueSaldos;

    @ManyToOne(() => Usuarios, { nullable: false})
      @JoinColumn({ name: 'idusuario'})
        usuario: Usuarios;

    @Column({type: 'varchar', length: 20})
    tipo_movimentacao: string;

    @Column({type: 'numeric', precision: 10, scale: 3,})
    quantidade: string;

    
    @Column({type: 'timestamptz', default: () => 'now()' })
    data_movimentacao: Date;

    
    @Column({type: 'text', nullable: true})
    observacao: string | null;

 }