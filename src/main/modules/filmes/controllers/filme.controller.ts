import { FilmeService } from '../services'
import {
  ok,
  created,
  notFound,
  serverError,
  HttpResponse,
} from '@main/infra/http'
import { FilmePatchPayload, FilmePostPayload } from '../types'

export class FilmeController {
  private filmeService: FilmeService

  constructor(filmeService: FilmeService) {
    this.filmeService = filmeService
  }

  async create(data: FilmePostPayload): Promise<HttpResponse> {
    try {
      const filme = await this.filmeService.createFilme(data)
      return created(filme)
    } catch (error) {
      return serverError(error as Error)
    }
  }

  async getById(id: number): Promise<HttpResponse> {
    try {
      const filme = await this.filmeService.getFilmeById(id)
      if (!filme) {
        return notFound()
      }
      return ok(filme)
    } catch (error) {
      return serverError(error as Error)
    }
  }

  async update(id: number, data: FilmePatchPayload): Promise<HttpResponse> {
    try {
      const exists = await this.filmeService.getFilmeById(id)

      if (!exists) {
        return notFound()
      }

      const filme = await this.filmeService.updateFilme(id, data)
      return ok(filme)
    } catch (error) {
      return serverError(error as Error)
    }
  }

  async delete(id: number): Promise<HttpResponse> {
    try {
      const filme = await this.filmeService.getFilmeById(id)

      if (!filme) {
        return notFound()
      }

      await this.filmeService.deleteFilme(id)
      return ok({ message: 'Filme deletado com sucesso' })
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
