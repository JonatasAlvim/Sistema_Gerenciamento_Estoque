import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, Check, ManyToOne } from "typeorm";
import { Categorias } from "./categorias.entity";
import { Usuarios } from "./usuarios.entity";

@Entity('produtos')
@Check('"estoque_minimo" >= 0')
@Check(`"unidade_medida" IN ('UN', 'KG', 'L', 'CX', 'PCT', 'DZ', 'G', 'ML')`)
 export class Produtos {

    @PrimaryGeneratedColumn('increment', {type: "bigint"})
    idproduto: string;

    @Column({type: 'varchar', length: 50, unique: true})
    codigo_produto: string;

    @Column({type: 'varchar', length: 120,})
    nome: string;

    @Column({type: 'text', nullable: true})
    descricao: string | null;

    @Column({type: 'varchar', length: 10,})
    unidade_medida: string;

    @Column({type: 'numeric', precision: 10, scale: 3, default: 0})
    estoque_minimo: string;

    @ManyToOne(() => Categorias, { nullable: false})
       @JoinColumn({ name: 'idcategoria'})
         categoria: Categorias;
         
    @ManyToOne(() => Usuarios, { nullable: false})
       @JoinColumn({ name: 'idusuario'})
         usuario: Usuarios;

    @Column({type: 'bool', default: true})
    perecivel: boolean;

    @Column({type: 'bool', default: true})
    ativo: boolean;

    @Column({type: 'timestamptz', default: () => 'now()'})
    criado_em: Date;
 }