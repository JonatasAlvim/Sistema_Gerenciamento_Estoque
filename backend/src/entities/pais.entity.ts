import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity ('pais') 
    export class Pais {
    @PrimaryColumn('int')
    idpais: number;

    @Column({type: 'varchar', length: 60})
    nome: string;

    @Column({type: 'varchar', length: 60})
    nome_pt: string;

    @Column({type: 'varchar', length: 2, nullable: true})
    sigla: string | null;
    
    @Column({type: 'int', nullable: true})
    bacen: number | null;

    @Column({type: 'int', nullable: true})
    ddi: number | null;
    }

    