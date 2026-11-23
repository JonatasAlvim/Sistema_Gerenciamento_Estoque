import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { Endereco } from "./endereco.entity";

@Entity('usuarios') 
 export class Usuarios {

    @PrimaryGeneratedColumn('increment', {type: "bigint"})
     idusuario: string;

    @Column({type: 'varchar', length: 60})
    nome: string;

    @Column({type: 'varchar', length: 11, unique: true})
    cpf: string;

    @Column({type: 'varchar', length: 80, unique: true})
    email: string;

    @Column({type: 'varchar', length: 255})
    senha_hash: string;

    @ManyToOne(() => Endereco, { nullable: false})
    @JoinColumn({ name: 'idendereco'})
    endereco: Endereco;

    @Column({type: 'bool', default: true})
    ativo: boolean

    @Column({type: 'timestamptz', default: () => 'now()' })
    criado_em: Date;

 }