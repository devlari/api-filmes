import {
  Filme,
  FilmePatchPayload,
  FilmePostPayload,
  PaginationRequest,
} from '../types'
import { prismaDB } from '@/main/infra/db'

export class FilmeRepository {
  constructor() {}

  async create(data: FilmePostPayload): Promise<Filme> {
    const filme = await prismaDB.filme.create({ data })
    return this.normalizeFilme(filme)
  }

  async findById(id: number): Promise<Filme | null> {
    const filme = await prismaDB.filme.findUnique({ where: { id } })
    return this.normalizeFilme(filme)
  }

  async update(id: number, data: FilmePatchPayload): Promise<Filme> {
    const filme = await prismaDB.filme.update({
      where: { id },
      data,
    })
    return this.normalizeFilme(filme)
  }

  async delete(id: number): Promise<void> {
    await prismaDB.filme.delete({ where: { id } })
  }

  async list(page: number, perPage: number): Promise<PaginationRequest> {
    const skip = (page - 1) * perPage
    const [data, total] = await prismaDB.$transaction([
      prismaDB.filme.findMany({
        skip,
        take: perPage,
      }),
      prismaDB.filme.count(),
    ])

    const totalPages = Math.ceil(total / perPage)
    const transformedData = data.map((item) => this.normalizeFilme(item))

    return {
      page,
      perPage,
      totalPages,
      data: transformedData,
    }
  }

  private normalizeFilme(data: any): Filme {
    if (!data) return data
    return {
      ...data,
      orcamento: data.orcamento ?? undefined,
      receita: data.receita ?? undefined,
      lucro: data.lucro ?? undefined,
      duracao: data.duracao ?? undefined,
      urlImagem: data.urlImagem ?? undefined,
      linkTrailer: data.linkTrailer ?? undefined,
    }
  }
}
