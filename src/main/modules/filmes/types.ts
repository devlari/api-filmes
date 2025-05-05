export type Filme = {
  id: number
  usuarioId: number
  tituloOriginal: string
  tituloTraduzido: string
  descricao: string
  orcamento?: number
  dtLancamento: string | Date
  urlImagem?: string
  duracao?: number
  receita?: number
  lucro?: number
  linkTrailer?: string
}

export type FilmePostPayload = {
  tituloOriginal: string
  tituloTraduzido: string
  descricao: string
  orcamento?: number
  dtLancamento: string | Date
  urlImagem?: string
  duracao?: number
  receita?: number
  lucro?: number
  linkTrailer?: string
}

export type FilmePatchPayload = Partial<FilmePostPayload>

export type FilmeDTO = {
  id?: number
  tituloOriginal: string
  tituloTraduzido: string
  descricao: string
  orcamento: number | null
  dtLancamento: Date
  urlImagem: string | null
  duracao: number | null
  receita: number | null
  lucro: number | null
  linkTrailer: string | null
  usuarioId: number
}

export type PaginationRequest = {
  page: number
  perPage: number
  totalPages: number
  data: Filme[]
}
