import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Cidade } from "./cidade.entity";


@Entity('endereco')
export class Endereco {
   @PrimaryGeneratedColumn("increment", {type: 'bigint'})
   idendereco: string;

   @Column({type: 'varchar', length: 150})
   logradouro: string;

   @Column({type: 'varchar', length: 20 })
   numero: string;

   @Column({type: 'varchar', length: 100, nullable: true})
   complemento: string | null;

   @Column({type: 'varchar', length: 40 })
   bairro: string;
    
   @Column({type: 'varchar', length: 9 })
   cep: string;

   @ManyToOne(() => Cidade, { nullable: false})
   @JoinColumn({ name: 'idcidade' })
   cidade: Cidade

}