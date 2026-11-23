import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { Fornecedores } from "./fornecedores.entity";
import { Usuarios } from "./usuarios.entity";

@Entity('recebimentos') 
 export class Recebimentos {

    @PrimaryGeneratedColumn('increment', {type: "bigint"})
     idrecebimento: string;

    @ManyToOne(() => Fornecedores, { nullable: false})
      @JoinColumn({ name: 'idfornecedor'})
        fornecedor: Fornecedores;

    @ManyToOne(() => Usuarios, { nullable: false})
      @JoinColumn({ name: 'idusuario'})
        usuario: Usuarios;


    @Column({type: 'timestamptz', default: () => 'now()' })
    data_recebimento: Date;

    
    @Column({type: 'timestamptz', default: () => 'now()' })
    criado_em: Date;

 }