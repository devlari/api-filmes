CREATE DATABASE filmesdb;

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
);

CREATE TABLE filme (
    id SERIAL PRIMARY KEY,
    titulo_original TEXT NOT NULL,
    titulo_traduzido TEXT NOT NULL,
    descricao TEXT NOT NULL,
    orcamento NUMERIC NULL,
    dt_lancamento DATE NOT NULL,
    url_imagem TEXT NULL,
    duracao INTEGER NULL,
    receita NUMERIC NULL,
    lucro NUMERIC NULL,
    link_trailer TEXT NULL
);

CREATE TABLE genero (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL
);


CREATE TABLE filme_genero (
    id SERIAL PRIMARY KEY,
    filme_id INTEGER NOT NULL REFERENCES filme(id) ON DELETE CASCADE,
    genero_id INTEGER NOT NULL REFERENCES genero(id) ON DELETE CASCADE,
    UNIQUE (filme_id, genero_id)
);
