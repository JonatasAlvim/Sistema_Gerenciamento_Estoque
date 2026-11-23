import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, } from "typeorm";
import { Contatos } from "./contatos.entity";
import { Fornecedores } from "./fornecedores.entity";


@Entity('fornecedores_contatos') 

 export class FornecedoresContatos {

    @PrimaryColumn( {type: 'int'})
    idfornecedor: number;

    @PrimaryColumn( {type: 'bigint'})
    idcontato: string;

    @ManyToOne(() => Contatos, { nullable: false, onDelete: 'CASCADE'} )
       @JoinColumn({ name: 'idcontato'})
           contatos: Contatos;

    @ManyToOne(() => Fornecedores, { nullable: false, onDelete: 'CASCADE'} )
       @JoinColumn({ name: 'idfornecedor'})
           fornecedor: Fornecedores;

    @Column({type: 'varchar', length: 50, nullable: true})
    departamento: string | null;

    @Column({type: 'timestamptz', default: () => 'now()'})
    criado_em: Date;
 }