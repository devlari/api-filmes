import { FilmeService } from '../services'
import {
  ok,
  created,
  notFound,
  serverError,
  HttpResponse,
  badRequest,
} from '@main/infra/http'
import { FilmePatchPayload, FilmePostPayload } from '../types'

export class FilmeController {
  private filmeService: FilmeService

  constructor(filmeService: FilmeService) {
    this.filmeService = filmeService
  }

  async create(data: FilmePostPayload, usuarioId: number): Promise<HttpResponse> {
    try {
      const filme = await this.filmeService.createFilme(data, usuarioId)
      return created(filme)
    } catch (error) {
      console.log(error)
      return serverError(error as Error)
    }
  }

  async getById(id: number, usuarioId: number): Promise<HttpResponse> {
    try {
      const filme = await this.filmeService.getFilmeById(id, usuarioId)
      if (!filme) {
        return notFound()
      }
      return ok(filme)
    } catch (error) {
      return serverError(error as Error)
    }
  }

  async list(page: number, perPage: number, userId: number): Promise<HttpResponse> {
    try {
      if (page < 1 || perPage < 1) {
        return badRequest(new Error('Page e perPage devem ser maiores que 0'))
      }

      if (page > 100 || perPage > 100) {
        return badRequest(new Error('Page deve ser menor ou igual a 100'))
      }

      const filmes = await this.filmeService.listFilmes(page, perPage, userId)
      return ok(filmes)
    } catch (error) {
      return serverError(error as Error)
    }
  }

  async update(id: number, data: FilmePatchPayload, usuarioId: number): Promise<HttpResponse> {
    try {
      const exists = await this.filmeService.getFilmeById(id, usuarioId)

      if (!exists) {
        return notFound()
      }

      const filme = await this.filmeService.updateFilme(id, data)
      return ok(filme)
    } catch (error) {
      return serverError(error as Error)
    }
  }

  async delete(id: number, usuarioId: number): Promise<HttpResponse> {
    try {
      const filme = await this.filmeService.getFilmeById(id, usuarioId)

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
