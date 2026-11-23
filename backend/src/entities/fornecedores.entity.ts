import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Check } from "typeorm";
import { Endereco } from "./endereco.entity";


@Entity('fornecedores') 
@Check(`"tipo_pessoa" IN ('PF', 'PJ')`)
@Check(`
  ("tipo_pessoa" = 'PF' and "cpf" is not null and "cnpj" is null)
  OR
  ("tipo_pessoa" = 'PJ' and "cnpj" is not null and "cpf" is null)
`)
 export class Fornecedores {

    @PrimaryGeneratedColumn('increment', {type: "int"})
    idfornecedor: number;

    @Column({type: 'varchar', length: 120})
    razao_social: string;

    @Column({type: 'varchar', length: 120, nullable: true})
    nome_fantasia: string | null;

    @Column({type: 'char', length: 2})
    tipo_pessoa: string;

    @Column({type: 'varchar', length: 11, nullable: true, unique: true})
    cpf: string | null;

    @Column({type: 'varchar', length: 14, nullable: true, unique: true})
    cnpj: string | null;

    @Column({type: 'varchar', length: 20, nullable: true})
    inscricao_estadual: string | null;

    @Column({type: 'varchar', length: 80, nullable: true})
    email: string | null;

    @ManyToOne(() => Endereco, { nullable: false})
    @JoinColumn({ name: 'idendereco'})
        endereco: Endereco;
    
    @Column({type: 'bool', default: true})
    ativo: boolean

    @Column({type: 'timestamptz', default: () => 'now()' })
    criado_em: Date;
    
 }