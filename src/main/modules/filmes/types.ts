export type Filme = {
    id: number;
    tituloOriginal: string;
    tituloTraduzido: string;
    descricao: string;
    orcamento?: number;  
    dtLancamento: string | Date;
    urlImagem?: string;  
    duracao?: number;
    receita?: number;  
    lucro?: number;  
    linkTrailer?: string;     
}

export type FilmePostPayload = {
    tituloOriginal: string;
    tituloTraduzido: string;
    descricao: string;
    orcamento?: number;  
    dtLancamento: string | Date;
    urlImagem?: string;  
    duracao?: number;
    receita?: number;  
    lucro?: number;  
    linkTrailer?: string; 
}

export type FilmePatchPayload = Partial<FilmePostPayload>;

export type FilmeDTO = {
    id?: number;  
    titulo_original: string;
    titulo_traduzido: string;
    descricao: string;
    orcamento: number | null; 
    dt_lancamento: Date; 
    url_imagem: string | null;
    duracao: number | null; 
    receita: number | null; 
    lucro: number | null; 
    link_trailer: string | null; 
};