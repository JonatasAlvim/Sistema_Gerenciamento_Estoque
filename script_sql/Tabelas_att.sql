------------------ PAIS

create table pais (
    idpais int not null,
    nome varchar(60) not null,
    nome_pt varchar(60) not null,
    sigla varchar(2),
    bacen integer,
    ddi integer,

    constraint pk_pais_id primary key (idpais)
);

------------------ ESTADO

create table estado (
    idestado int not null,
    nome varchar(60) not null,
    uf varchar(2) not NULL unique,
    ibge integer not null unique,
    idpais int,
    ddd integer[],

    constraint pk_estd_idestado primary key (idestado),
    constraint fk_estd_idpais foreign key (idpais) references pais (idpais)
);

------------------ CIDADE

create table cidade (
    idcidade int not null,
    nome varchar(120) not null,
    idestado int not null,
    ibge integer not NULL,
    lat_lon point,
    cod_tom smallint default 0,

    constraint pk_cdd_idcidade primary key (idcidade),
    constraint fk_cdd_idestado foreign key (idestado) references estado (idestado)
);


------------------ ENDEREÇO

create table endereco (
    idendereco bigserial,
    logradouro varchar(150) not null,
    numero varchar(20) not null,
    complemento varchar(100),
    bairro varchar(40) not null,
    cep varchar(9) not null,
    idcidade int not null,

    constraint pk_end_idendereco primary key (idendereco),
    constraint fk_end_idcidade foreign key (idcidade) references cidade (idcidade)
);

------------------ USUARIOS

create table usuarios (
    idusuario bigserial,
    nome varchar(60) not null,
    cpf varchar(11) not null unique,
    email varchar(80) not null unique,
    senha_hash varchar(255) not null,
    idendereco bigint not null,
    ativo boolean default true not null,
    criado_em timestamptz default now() not null,

    constraint pk_usr_idusuario primary key (idusuario),
    constraint fk_usr_idendereco foreign key (idendereco) references endereco (idendereco)
);

------------------ FORNECEDORES

create table fornecedores (
    idfornecedor serial,
    razao_social varchar(120) not null,
    nome_fantasia varchar(120),
    tipo_pessoa char(2) not null check (tipo_pessoa in ('PF', 'PJ')),
    cpf varchar(11) unique,
    cnpj varchar(14) unique,
    inscricao_estadual varchar(20),
    email varchar(80),
    idendereco bigint not null,
    ativo boolean default true not null,
    criado_em timestamptz default now() not null,

    constraint pk_forn_idfornecedor primary key (idfornecedor),
    constraint fk_forn_idendereco foreign key (idendereco) references endereco (idendereco),
    constraint chk_documento_obrigatorio check (
        (tipo_pessoa = 'PF' and cpf is not null and cnpj is null) or
        (tipo_pessoa = 'PJ' and cnpj is not null and cpf is null)
    )
);

create index idx_forn_idendereco on fornecedores (idendereco);

------------------ CONTATOS

create table contatos (
    idcontato bigserial,
    codigo_pais varchar(5) not null default '+55',
    ddd varchar(5) not null,
    numero varchar(20) not null,
    tipo varchar(20) not null default 'Celular',
    criado_em timestamptz default now() not null,

    constraint pk_ctt_idcontato primary key (idcontato),
    constraint chk_ctt_tipo check (tipo in ('Celular', 'Comercial', 'Fixo', 'WhatsApp'))
);

------------------ CONTATO FORNECEDORES

create table fornecedores_contatos (
    idfornecedor int not null,
    idcontato bigint not null,
    departamento varchar(50),
    criado_em timestamptz default now() not null,

    constraint pk_forn_ctt primary key (idfornecedor, idcontato),
    constraint fk_forn_ctt_fornecedor foreign key (idfornecedor)
        references fornecedores (idfornecedor) on delete cascade,
    constraint fk_forn_ctt_contato foreign key (idcontato)
        references contatos (idcontato) on delete cascade
);

create index idx_forn_ctt_idcontato on fornecedores_contatos (idcontato);

------------------ CONTATO USUARIOS

create table usuarios_contatos (
    idusuario bigint not null,
    idcontato bigint not null,
    criado_em timestamptz default now() not null,

    constraint pk_usr_ctt primary key (idusuario, idcontato),
    constraint fk_usr_ctt_usuario foreign key (idusuario)
        references usuarios (idusuario) on delete cascade,
    constraint fk_usr_ctt_contato foreign key (idcontato)
        references contatos (idcontato) on delete cascade
);

create index idx_usr_ctt_idcontato on usuarios_contatos (idcontato);

------------------ CATEGORIAS

create table categorias (
    idcategoria serial,
    nome varchar(60) unique not null,
    descricao text,
    criado_em timestamptz default now() not null,

    constraint pk_ctg_idcategoria primary key (idcategoria)
);


------------------ RECEBIMENTO DE PRODUTOS


create table recebimentos (
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

CREATE INDEX idx_recebimentos_fornecedor
    ON recebimentos (idfornecedor);

CREATE INDEX idx_recebimentos_data
    ON recebimentos (data_recebimento);




------------------ LOCALIZAÇÕES DOS PRODUTOS

create table localizacoes (
    idlocalizacao serial,
    corredor varchar(20) not null,
    prateleira varchar(20) not null,
    secao varchar(20) not null,
    descricao varchar(100),
    criado_em timestamptz default now() not null,

    constraint pk_loc_idlocalizacao primary key (idlocalizacao),
    constraint uk_loc_posicao unique (corredor, prateleira, secao)
);

------------------ PRODUTOS

create table produtos (
    idproduto bigserial,
    codigo_produto varchar(50) unique not null,
    nome varchar(120) not null,
    descricao text,
    unidade_medida varchar(10) not null,
    estoque_minimo numeric(10,3) not null default 0 CHECK (estoque_minimo >= 0),
    idcategoria int not null,
    idusuario bigint not null,
    perecivel boolean not null default true,
    ativo boolean not null default true,
    criado_em timestamptz not null default now(),

    constraint pk_pdt_idproduto primary key (idproduto),

    constraint fk_pdt_idcategoria foreign key (idcategoria)
        references categorias (idcategoria),

    constraint fk_pdt_idusuario foreign key (idusuario)
        references usuarios (idusuario),

    constraint chk_pdt_unidade_medida
        check (unidade_medida in ('UN', 'KG', 'L', 'CX', 'PCT', 'DZ', 'G', 'ML'))
);

create index idx_pdt_idcategoria on produtos (idcategoria);
create index idx_pdt_idusuario on produtos (idusuario);

------------------- INFORMAÇÕES NUTRICIONAIS

create table informacoes_nutricionais (
    idinformacao_nutricional bigserial,
    idproduto bigint unique not null,
    porcao varchar(50) not null,
    valor_energetico_kcal numeric(6,2),
    carboidratos numeric(6,2),
    proteinas numeric(6,2),
    gorduras_totais numeric(6,2),
    sodio numeric(8,2),
    ingredientes text not null,
    alergenicos text,
    criado_em timestamptz not null default now(),

    constraint pk_inf_idinformacao primary key (idinformacao_nutricional),
    constraint fk_inf_idproduto foreign key (idproduto)
        references produtos (idproduto) on delete cascade,

    constraint chk_inf_valores_positivos check (
        (valor_energetico_kcal is null or valor_energetico_kcal >= 0)
        and (carboidratos is null or carboidratos >= 0)
        and (proteinas is null or proteinas >= 0)
        and (gorduras_totais is null or gorduras_totais >= 0)
        and (sodio is null or sodio >= 0)
    )
);

------------------ LOTES


CREATE TABLE lotes (
    idlote BIGSERIAL,
    numero_lote VARCHAR(50) NOT NULL,
    idproduto BIGINT NOT NULL,
    data_validade DATE,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT pk_lot_idlote
        PRIMARY KEY (idlote),

    CONSTRAINT uk_lot_produto_numero
        UNIQUE (idproduto, numero_lote),

    CONSTRAINT fk_lot_idproduto
        FOREIGN KEY (idproduto)
        REFERENCES produtos (idproduto)
        ON DELETE RESTRICT
);

CREATE INDEX idx_lot_data_validade
    ON lotes (data_validade);

CREATE INDEX idx_lot_idproduto
    ON lotes (idproduto);


------------------ RECEBIMENTO PRODUTOS INDIVIDUAIS. 

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

CREATE INDEX idx_ri_recebimento
    ON recebimentos_itens (idrecebimento);

CREATE INDEX idx_ri_lote
    ON recebimentos_itens (idlote);


------------------ SALDO EM ESTOQUE 


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

CREATE INDEX idx_es_localizacao
    ON estoque_saldos (idlocalizacao);


------------------ MOVIMENTAÇÕES ESTOQUE


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

    CONSTRAINT chk_mov_tipo
        CHECK (
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

CREATE INDEX idx_mov_estoque_saldo
    ON movimentacoes_estoque (idestoque_saldo);

CREATE INDEX idx_mov_usuario
    ON movimentacoes_estoque (idusuario);

CREATE INDEX idx_mov_tipo
    ON movimentacoes_estoque (tipo_movimentacao);

CREATE INDEX idx_mov_data
    ON movimentacoes_estoque (data_movimentacao);

