import { Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";

@Entity('localizacoes')
@Unique('uk_loc_posicao', ['corredor','prateleira','secao'] )
 export class Localizacoes {

    @PrimaryGeneratedColumn('increment', {type: "int"})
    idlocalizacao: number;

    @Column({type: 'varchar', length: 20,})
    corredor: string;

    @Column({type: 'varchar', length: 20,})
    prateleira: string;

    @Column({type: 'varchar', length: 20,})
    secao: string;

    @Column({type: 'varchar', length: 100, nullable: true})
    descricao: string | null;

    @Column({type: 'timestamptz', default: () => 'now()'})
    criado_em: Date;
 }