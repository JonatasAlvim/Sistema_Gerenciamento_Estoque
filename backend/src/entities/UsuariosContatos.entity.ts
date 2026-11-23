import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import { Usuarios } from "./usuarios.entity";
import { Contatos } from "./contatos.entity";


@Entity('usuarios_contatos') 
 export class UsuariosContatos {

    @PrimaryColumn({type: "bigint"})
    idusuario: string;

    @PrimaryColumn({type: "bigint"})
    idcontato: string;

    @ManyToOne(() => Usuarios, { nullable: false, onDelete: 'CASCADE'} )
        @JoinColumn({ name: 'idusuario'})
            usuario: Usuarios;

    @ManyToOne(() => Contatos, { nullable: false, onDelete: 'CASCADE'} )
        @JoinColumn({ name: 'idcontato'})
            constato: Contatos;

    @Column({type: 'timestamptz', default: () => 'now()'})
    criado_em: Date;
 }