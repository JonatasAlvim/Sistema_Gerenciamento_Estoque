import { Column, Entity, PrimaryGeneratedColumn,} from "typeorm";

@Entity('categorias') 
 export class Categorias {

    @PrimaryGeneratedColumn('increment', {type: "int"})
    idcategoria: number;

    @Column({type: 'varchar', length: 60, unique: true})
    nome: string;

    @Column({type: 'text', nullable: true})
    descricao: string | null;

    @Column({type: 'timestamptz', default: () => 'now()'})
    criado_em: Date;
 }