import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000000 implements MigrationInterface {
  name = 'InitialSchema1700000000000';

  
public async up(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.query(`
    CREATE TABLE pais (
      idpais INT NOT NULL,
      nome VARCHAR(60) NOT NULL,
      nome_pt VARCHAR(60) NOT NULL,
      sigla VARCHAR(2),
      bacen INTEGER,
      ddi INTEGER,

      CONSTRAINT pk_pais_id PRIMARY KEY (idpais)
    );
  `);

  await queryRunner.query(`
    CREATE TABLE estado (
      idestado INT NOT NULL,
      nome VARCHAR(60) NOT NULL,
      uf VARCHAR(2) NOT NULL UNIQUE,
      ibge INTEGER NOT NULL UNIQUE,
      idpais INT,
      ddd INTEGER[],

      CONSTRAINT pk_estd_idestado PRIMARY KEY (idestado),
      CONSTRAINT fk_estd_idpais
        FOREIGN KEY (idpais) REFERENCES pais (idpais)
    );
  `);

  await queryRunner.query(`
    CREATE TABLE cidade (
      idcidade INT NOT NULL,
      nome VARCHAR(120) NOT NULL,
      idestado INT NOT NULL,
      ibge INTEGER NOT NULL UNIQUE,
      lat_lon POINT,
      cod_tom SMALLINT DEFAULT 0,

      CONSTRAINT pk_cdd_idcidade PRIMARY KEY (idcidade),
      CONSTRAINT fk_cdd_idestado
        FOREIGN KEY (idestado) REFERENCES estado (idestado)
    );
  `);

  await queryRunner.query(`
    CREATE TABLE endereco (
      idendereco BIGSERIAL,
      logradouro VARCHAR(150) NOT NULL,
      numero VARCHAR(20) NOT NULL,
      complemento VARCHAR(100),
      bairro VARCHAR(40) NOT NULL,
      cep VARCHAR(9) NOT NULL,
      idcidade INT NOT NULL,

      CONSTRAINT pk_end_idendereco PRIMARY KEY (idendereco),
      CONSTRAINT fk_end_idcidade
        FOREIGN KEY (idcidade) REFERENCES cidade (idcidade)
    );
  `);


  await queryRunner.query(`
    CREATE TABLE usuarios (
      idusuario BIGSERIAL,
      nome VARCHAR(60) NOT NULL,
      cpf VARCHAR(11) NOT NULL UNIQUE,
      email VARCHAR(80) NOT NULL UNIQUE,
      senha_hash VARCHAR(255) NOT NULL,
      idendereco BIGINT NOT NULL,
      ativo BOOLEAN DEFAULT TRUE NOT NULL,
      criado_em TIMESTAMPTZ DEFAULT NOW() NOT NULL,

      CONSTRAINT pk_usr_idusuario PRIMARY KEY (idusuario),
      CONSTRAINT fk_usr_idendereco
        FOREIGN KEY (idendereco) REFERENCES endereco (idendereco)
    );
  `);

  await queryRunner.query(`
    CREATE TABLE fornecedores (
      idfornecedor SERIAL,
      razao_social VARCHAR(120) NOT NULL,
      nome_fantasia VARCHAR(120),
      tipo_pessoa CHAR(2) NOT NULL
        CHECK (tipo_pessoa IN ('PF', 'PJ')),
      cpf VARCHAR(11) UNIQUE,
      cnpj VARCHAR(14) UNIQUE,
      inscricao_estadual VARCHAR(20),
      email VARCHAR(80),
      idendereco BIGINT NOT NULL,
      ativo BOOLEAN DEFAULT TRUE NOT NULL,
      criado_em TIMESTAMPTZ DEFAULT NOW() NOT NULL,

      CONSTRAINT pk_forn_idfornecedor PRIMARY KEY (idfornecedor),
      CONSTRAINT fk_forn_idendereco
        FOREIGN KEY (idendereco) REFERENCES endereco (idendereco),
      CONSTRAINT chk_documento_obrigatorio CHECK (
        (tipo_pessoa = 'PF' AND cpf IS NOT NULL AND cnpj IS NULL) OR
        (tipo_pessoa = 'PJ' AND cnpj IS NOT NULL AND cpf IS NULL)
      )
    );
  `);

  await queryRunner.query(`
    CREATE INDEX idx_forn_idendereco
    ON fornecedores (idendereco);
  `);

  await queryRunner.query(`
    CREATE TABLE contatos (
      idcontato BIGSERIAL,
      codigo_pais VARCHAR(5) NOT NULL DEFAULT '+55',
      ddd VARCHAR(5) NOT NULL,
      numero VARCHAR(20) NOT NULL,
      tipo VARCHAR(20) NOT NULL DEFAULT 'Celular',
      criado_em TIMESTAMPTZ DEFAULT NOW() NOT NULL,

      CONSTRAINT pk_ctt_idcontato PRIMARY KEY (idcontato),
      CONSTRAINT chk_ctt_tipo
        CHECK (tipo IN ('Celular', 'Comercial', 'Fixo', 'WhatsApp'))
    );
  `);

  await queryRunner.query(`
    CREATE TABLE fornecedores_contatos (
      idfornecedor INT NOT NULL,
      idcontato BIGINT NOT NULL,
      departamento VARCHAR(50),
      criado_em TIMESTAMPTZ DEFAULT NOW() NOT NULL,

      CONSTRAINT pk_forn_ctt PRIMARY KEY (idfornecedor, idcontato),
      CONSTRAINT fk_forn_ctt_fornecedor
        FOREIGN KEY (idfornecedor)
        REFERENCES fornecedores (idfornecedor) ON DELETE CASCADE,
      CONSTRAINT fk_forn_ctt_contato
        FOREIGN KEY (idcontato)
        REFERENCES contatos (idcontato) ON DELETE CASCADE
    );
  `);

  await queryRunner.query(`
    CREATE INDEX idx_forn_ctt_idcontato
    ON fornecedores_contatos (idcontato);
  `);

  await queryRunner.query(`
    CREATE TABLE usuarios_contatos (
      idusuario BIGINT NOT NULL,
      idcontato BIGINT NOT NULL,
      criado_em TIMESTAMPTZ DEFAULT NOW() NOT NULL,

      CONSTRAINT pk_usr_ctt PRIMARY KEY (idusuario, idcontato),
      CONSTRAINT fk_usr_ctt_usuario
        FOREIGN KEY (idusuario)
        REFERENCES usuarios (idusuario) ON DELETE CASCADE,
      CONSTRAINT fk_usr_ctt_contato
        FOREIGN KEY (idcontato)
        REFERENCES contatos (idcontato) ON DELETE CASCADE
    );
  `);

  await queryRunner.query(`
    CREATE INDEX idx_usr_ctt_idcontato
    ON usuarios_contatos (idcontato);
  `);



    await queryRunner.query(`
      CREATE TABLE categorias (
        idcategoria SERIAL,
        nome VARCHAR(60) UNIQUE NOT NULL,
        descricao TEXT,
        criado_em TIMESTAMPTZ DEFAULT NOW() NOT NULL,

        CONSTRAINT pk_ctg_idcategoria PRIMARY KEY (idcategoria)
      );
    `);

    await queryRunner.query(`
      CREATE TABLE localizacoes (
        idlocalizacao SERIAL,
        corredor VARCHAR(20) NOT NULL,
        prateleira VARCHAR(20) NOT NULL,
        secao VARCHAR(20) NOT NULL,
        descricao VARCHAR(100),
        criado_em TIMESTAMPTZ DEFAULT NOW() NOT NULL,

        CONSTRAINT pk_loc_idlocalizacao PRIMARY KEY (idlocalizacao),
        CONSTRAINT uk_loc_posicao UNIQUE (corredor, prateleira, secao)
      );
    `);


    await queryRunner.query(`
      CREATE TABLE produtos (
        idproduto BIGSERIAL,
        codigo_produto VARCHAR(50) UNIQUE NOT NULL,
        nome VARCHAR(120) NOT NULL,
        descricao TEXT,
        unidade_medida VARCHAR(10) NOT NULL,
        estoque_minimo NUMERIC(10,3) NOT NULL DEFAULT 0
          CHECK (estoque_minimo >= 0),
        idcategoria INT NOT NULL,
        idusuario BIGINT NOT NULL,
        perecivel BOOLEAN NOT NULL DEFAULT TRUE,
        ativo BOOLEAN NOT NULL DEFAULT TRUE,
        criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),

        CONSTRAINT pk_pdt_idproduto PRIMARY KEY (idproduto),

        CONSTRAINT fk_pdt_idcategoria FOREIGN KEY (idcategoria)
          REFERENCES categorias (idcategoria),

        CONSTRAINT fk_pdt_idusuario FOREIGN KEY (idusuario)
          REFERENCES usuarios (idusuario),

        CONSTRAINT chk_pdt_unidade_medida
          CHECK (unidade_medida IN ('UN', 'KG', 'L', 'CX', 'PCT', 'DZ', 'G', 'ML'))
      );
    `);

 
    await queryRunner.query(`
      CREATE INDEX idx_pdt_idcategoria ON produtos (idcategoria);
    `);

    await queryRunner.query(`
      CREATE INDEX idx_pdt_idusuario ON produtos (idusuario);
    `);


  
    await queryRunner.query(`
      CREATE TABLE informacoes_nutricionais (
        idinformacao_nutricional BIGSERIAL,
        idproduto BIGINT UNIQUE NOT NULL,
        porcao VARCHAR(50) NOT NULL,
        valor_energetico_kcal NUMERIC(6,2),
        carboidratos NUMERIC(6,2),
        proteinas NUMERIC(6,2),
        gorduras_totais NUMERIC(6,2),
        sodio NUMERIC(8,2),
        ingredientes TEXT NOT NULL,
        alergenicos TEXT,
        criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),

        CONSTRAINT pk_inf_idinformacao
          PRIMARY KEY (idinformacao_nutricional),

        CONSTRAINT fk_inf_idproduto
          FOREIGN KEY (idproduto)
          REFERENCES produtos (idproduto)
          ON DELETE CASCADE,

        CONSTRAINT chk_inf_valores_positivos CHECK (
          (valor_energetico_kcal IS NULL OR valor_energetico_kcal >= 0)
          AND (carboidratos IS NULL OR carboidratos >= 0)
          AND (proteinas IS NULL OR proteinas >= 0)
          AND (gorduras_totais IS NULL OR gorduras_totais >= 0)
          AND (sodio IS NULL OR sodio >= 0)
        )
      );
    `);

   
    await queryRunner.query(`
      CREATE TABLE lotes (
        idlote BIGSERIAL,
        numero_lote VARCHAR(50) NOT NULL,
        idproduto BIGINT NOT NULL,
        data_validade DATE,
        criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),

        CONSTRAINT pk_lot_idlote PRIMARY KEY (idlote),

        CONSTRAINT uk_lot_produto_numero
          UNIQUE (idproduto, numero_lote),

        CONSTRAINT fk_lot_idproduto
          FOREIGN KEY (idproduto)
          REFERENCES produtos (idproduto)
          ON DELETE RESTRICT
      );
    `);

  
    await queryRunner.query(`
      CREATE INDEX idx_lot_data_validade ON lotes (data_validade);
    `);

    await queryRunner.query(`
      CREATE INDEX idx_lot_idproduto ON lotes (idproduto);
    `);


    await queryRunner.query(`
      CREATE TABLE recebimentos (
        idrecebimento BIGSERIAL,
        idfornecedor INT NOT NULL,
        idusuario BIGINT NOT NULL,
        data_recebimento TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),

        CONSTRAINT pk_recebimentos
          PRIMARY KEY (idrecebimento),

        CONSTRAINT fk_recebimentos_fornecedor
          FOREIGN KEY (idfornecedor)
          REFERENCES fornecedores (idfornecedor),

        CONSTRAINT fk_recebimentos_usuario
          FOREIGN KEY (idusuario)
          REFERENCES usuarios (idusuario)
      );
    `);

    await queryRunner.query(`
      CREATE INDEX idx_recebimentos_fornecedor
      ON recebimentos (idfornecedor);
    `);

    await queryRunner.query(`
      CREATE INDEX idx_recebimentos_data
      ON recebimentos (data_recebimento);
    `);

    await queryRunner.query(`
      CREATE TABLE recebimentos_itens (
        idrecebimento_item BIGSERIAL,
        idrecebimento BIGINT NOT NULL,
        idlote BIGINT NOT NULL,
        quantidade_esperada NUMERIC(10,3) NOT NULL,
        quantidade_recebida NUMERIC(10,3) NOT NULL DEFAULT 0,
        preco_custo NUMERIC(10,2) NOT NULL,
        preco_venda NUMERIC(10,2) NOT NULL,
        criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),

        CONSTRAINT pk_recebimentos_itens
          PRIMARY KEY (idrecebimento_item),

        CONSTRAINT fk_ri_recebimento
          FOREIGN KEY (idrecebimento)
          REFERENCES recebimentos (idrecebimento),

        CONSTRAINT fk_ri_lote
          FOREIGN KEY (idlote)
          REFERENCES lotes (idlote),

        CONSTRAINT chk_ri_quantidade_esperada
          CHECK (quantidade_esperada > 0),

        CONSTRAINT chk_ri_quantidade_recebida
          CHECK (
            quantidade_recebida >= 0
            AND quantidade_recebida <= quantidade_esperada
          ),

        CONSTRAINT chk_ri_preco_custo
          CHECK (preco_custo >= 0),

        CONSTRAINT chk_ri_preco_venda
          CHECK (preco_venda >= 0)
      );
    `);

    await queryRunner.query(`
      CREATE INDEX idx_ri_recebimento
      ON recebimentos_itens (idrecebimento);
    `);

    await queryRunner.query(`
      CREATE INDEX idx_ri_lote
      ON recebimentos_itens (idlote);
    `);


    await queryRunner.query(`
      CREATE TABLE estoque_saldos (
        idestoque_saldo BIGSERIAL,
        idrecebimento_item BIGINT NOT NULL,
        idlocalizacao INT NOT NULL,
        quantidade NUMERIC(10,3) NOT NULL DEFAULT 0,
        criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),

        CONSTRAINT pk_estoque_saldos
          PRIMARY KEY (idestoque_saldo),

        CONSTRAINT fk_es_recebimento_item
          FOREIGN KEY (idrecebimento_item)
          REFERENCES recebimentos_itens (idrecebimento_item),

        CONSTRAINT fk_es_localizacao
          FOREIGN KEY (idlocalizacao)
          REFERENCES localizacoes (idlocalizacao),

        CONSTRAINT uk_es_recebimento_localizacao
          UNIQUE (idrecebimento_item, idlocalizacao),

        CONSTRAINT chk_es_quantidade
          CHECK (quantidade >= 0)
      );
    `);

    await queryRunner.query(`
      CREATE INDEX idx_es_localizacao
      ON estoque_saldos (idlocalizacao);
    `);


    await queryRunner.query(`
      CREATE TABLE movimentacoes_estoque (
        idmovimentacao BIGSERIAL,
        idestoque_saldo BIGINT NOT NULL,
        idusuario BIGINT NOT NULL,
        tipo_movimentacao VARCHAR(20) NOT NULL,
        quantidade NUMERIC(10,3) NOT NULL,
        data_movimentacao TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        observacao TEXT,

        CONSTRAINT pk_mov_idmovimentacao
          PRIMARY KEY (idmovimentacao),

        CONSTRAINT fk_mov_estoque_saldo
          FOREIGN KEY (idestoque_saldo)
          REFERENCES estoque_saldos (idestoque_saldo)
          ON DELETE RESTRICT,

        CONSTRAINT fk_mov_usuario
          FOREIGN KEY (idusuario)
          REFERENCES usuarios (idusuario)
          ON DELETE RESTRICT,

        CONSTRAINT chk_mov_tipo CHECK (
          tipo_movimentacao IN (
            'ENTRADA',
            'SAIDA',
            'PERDA',
            'RECALL',
            'LIBERACAO'
          )
        ),

        CONSTRAINT chk_mov_quantidade
          CHECK (quantidade > 0)
      );
    `);

    await queryRunner.query(`
      CREATE INDEX idx_mov_estoque_saldo
      ON movimentacoes_estoque (idestoque_saldo);
    `);

    await queryRunner.query(`
      CREATE INDEX idx_mov_usuario
      ON movimentacoes_estoque (idusuario);
    `);

    await queryRunner.query(`
      CREATE INDEX idx_mov_tipo
      ON movimentacoes_estoque (tipo_movimentacao);
    `);

    await queryRunner.query(`
      CREATE INDEX idx_mov_data
      ON movimentacoes_estoque (data_movimentacao);
    `);


}

  

public async down(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.query(`DROP TABLE movimentacoes_estoque`);
  await queryRunner.query(`DROP TABLE estoque_saldos`);
  await queryRunner.query(`DROP TABLE recebimentos_itens`);
  await queryRunner.query(`DROP TABLE recebimentos`);
  await queryRunner.query(`DROP TABLE lotes`);
  await queryRunner.query(`DROP TABLE informacoes_nutricionais`);
  await queryRunner.query(`DROP TABLE produtos`);
  await queryRunner.query(`DROP TABLE localizacoes`);
  await queryRunner.query(`DROP TABLE categorias`);
  await queryRunner.query(`DROP TABLE usuarios_contatos`);
  await queryRunner.query(`DROP TABLE fornecedores_contatos`);
  await queryRunner.query(`DROP TABLE contatos`);
  await queryRunner.query(`DROP TABLE fornecedores`);
  await queryRunner.query(`DROP TABLE usuarios`);
  await queryRunner.query(`DROP TABLE endereco`);
  await queryRunner.query(`DROP TABLE cidade`);
  await queryRunner.query(`DROP TABLE estado`);
  await queryRunner.query(`DROP TABLE pais`);
}


}