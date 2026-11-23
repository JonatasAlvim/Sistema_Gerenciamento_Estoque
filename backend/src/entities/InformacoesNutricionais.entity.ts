import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Check } from "typeorm";
import { Produtos } from "./produtos.entity";

@Entity('informacoes_nutricionais') 
@Check(`
    ("valor_energetico_kcal" is null or "valor_energetico_kcal" >= 0)
    and ("carboidratos" is null or "carboidratos" >= 0)
    and ("proteinas" is null or "proteinas" >= 0)
    and ("gorduras_totais" is null or "gorduras_totais" >= 0)
    and ("sodio" is null or "sodio" >= 0)
`)
 export class InformacoesNutricionais {

    @PrimaryGeneratedColumn('increment', {type: "bigint"})
     idinformacao_nutricional: string;

    @OneToOne(() => Produtos, { nullable: false})
    @JoinColumn({ name: 'idproduto'})
    produto: Produtos;

    @Column({type: 'varchar', length: 50})
    porcao: string;

    @Column({type: 'numeric', precision: 6, scale: 2, nullable: true})
    valor_energetico_kcal: string | null;

    @Column({type: 'numeric', precision: 6, scale: 2, nullable: true})
    carboidratos: string | null;

    @Column({type: 'numeric', precision: 6, scale: 2, nullable: true})
    proteinas: string | null;

    @Column({type: 'numeric', precision: 6, scale: 2, nullable: true})
    gorduras_totais: string | null;

    @Column({type: 'numeric', precision: 8, scale: 2, nullable: true})
    sodio: string | null;
 
    @Column({type: 'text'})
    ingredientes: string;

    @Column({type: 'text', nullable: true})
    alergenicos: string | null;

    @Column({type: 'timestamptz', default: () => 'now()' })
    criado_em: Date;

 }