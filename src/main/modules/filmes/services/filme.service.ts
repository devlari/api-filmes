import { parseReaisParaCentavos } from '@main/base/utils'
import { FilmeRepository } from '../repositories'
import { Filme, FilmePatchPayload, FilmePostPayload } from '../types'

export class FilmeService {
  private filmeRepository: FilmeRepository

  constructor(filmeRepository: FilmeRepository) {
    this.filmeRepository = filmeRepository
  }

  async createFilme(data: FilmePostPayload, usuarioId: number): Promise<Filme> {
    const parsedData = this.parseFilmePayload(data)
    return this.filmeRepository.create(parsedData, usuarioId)
  }

  async getFilmeById(id: number, usuarioId: number): Promise<Filme | null> {
    return this.filmeRepository.findById(id, usuarioId)
  }

  async listFilmes(page: number, perPage: number, userId: number) {
    return this.filmeRepository.list(page, perPage, userId)
  }

  async updateFilme(id: number, data: FilmePatchPayload) {
    return this.filmeRepository.update(id, data)
  }

  async deleteFilme(id: number) {
    return this.filmeRepository.delete(id)
  }

  private parseFilmePayload(data: FilmePostPayload): FilmePostPayload {
    return {
      ...data,
      dtLancamento: new Date(data.dtLancamento),
      orcamento: this.convertCurrencyField(data.orcamento),
      receita: this.convertCurrencyField(data.receita),
      lucro: this.convertCurrencyField(data.lucro),
    }
  }

  private convertCurrencyField(value?: number | string): number | undefined {
    if (value === undefined) return undefined
    if (typeof value === 'string') return parseReaisParaCentavos(value)
    return value
  }
}
