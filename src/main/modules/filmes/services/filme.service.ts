import { FilmeRepository } from '../repositories'
import { Filme, FilmePatchPayload, FilmePostPayload } from '../types'

export class FilmeService {
  private filmeRepository: FilmeRepository

  constructor(filmeRepository: FilmeRepository) {
    this.filmeRepository = filmeRepository
  }

  async createFilme(data: FilmePostPayload): Promise<Filme> {
    return this.filmeRepository.create(data)
  }

  async getFilmeById(id: number): Promise<Filme> {
    return this.filmeRepository.findById(id)
  }

  async updateFilme(id: number, data: FilmePatchPayload) {
    return this.filmeRepository.update(id, data)
  }

  async deleteFilme(id: number) {
    return this.filmeRepository.delete(id)
  }
}
