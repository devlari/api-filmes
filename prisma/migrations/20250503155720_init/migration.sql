-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Filme" (
    "id" SERIAL NOT NULL,
    "tituloOriginal" TEXT NOT NULL,
    "tituloTraduzido" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "orcamento" INTEGER,
    "dtLancamento" TIMESTAMP(3) NOT NULL,
    "urlImagem" TEXT,
    "duracao" INTEGER,
    "receita" INTEGER,
    "lucro" INTEGER,
    "linkTrailer" TEXT,

    CONSTRAINT "Filme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genero" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneroFilme" (
    "filmeId" INTEGER NOT NULL,
    "generoId" INTEGER NOT NULL,

    CONSTRAINT "GeneroFilme_pkey" PRIMARY KEY ("filmeId","generoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "GeneroFilme" ADD CONSTRAINT "GeneroFilme_filmeId_fkey" FOREIGN KEY ("filmeId") REFERENCES "Filme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneroFilme" ADD CONSTRAINT "GeneroFilme_generoId_fkey" FOREIGN KEY ("generoId") REFERENCES "Genero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
