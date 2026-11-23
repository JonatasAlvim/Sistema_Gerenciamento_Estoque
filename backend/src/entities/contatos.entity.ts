import { Column, Entity, PrimaryGeneratedColumn, Check} from "typeorm";

@Entity('contatos') 
@Check(`"tipo" IN ('Celular', 'Comercial', 'Fixo', 'WhatsApp')`)
 export class Contatos {

    @PrimaryGeneratedColumn('increment', {type: "bigint"})
    idcontato: string;

    @Column({type: 'varchar', length: 5, default: '+55'})
    codigo_pais: string;

    @Column({type: 'varchar', length: 5,})
    ddd: string

    @Column({type: 'varchar', length: 20})
    numero: string;

    @Column({type: 'varchar', length: 20, default: 'Celular'})
    tipo: string;

    @Column({type: 'timestamptz', default: () => 'now()'})
    criado_em: Date;
 }