import { Router, Request, Response } from 'express'
import { FilmeController } from '../controllers/filme.controller'
import { FilmeService } from '../services/filme.service'
import { FilmeRepository } from '../repositories/filme.repository'
import { validateBody } from '@/main/infra/middlewares'
import { filmePatchSchema, filmePostSchema } from '../validations'

export function filmeRoutes(router: Router): void {
  const filmeRepository = new FilmeRepository()
  const filmeService = new FilmeService(filmeRepository)
  const filmeController = new FilmeController(filmeService)

  router.post('/filmes', validateBody(filmePostSchema), async (req, res) => {
    const usuarioId = req.user.userId
    const response = await filmeController.create(req.body, usuarioId)
    res.status(response.statusCode).json(response.body)
  })

  router.get('/filme/:id', async (req: Request, res: Response) => {
    const usuarioId = req.user.userId
    const response = await filmeController.getById(Number(req.params.id), usuarioId)
    res.status(response.statusCode).json(response.body)
  })

  router.get('/filmes', async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1
    const perPage = Number(req.query.perPage) || 10

    const usuarioId = req.user.userId
    const response = await filmeController.list(page, perPage, usuarioId)
    res.status(response.statusCode).json(response.body)
  })

  router.put(
    '/filme/:id',
    validateBody(filmePatchSchema),
    async (req: Request, res: Response) => {
      const usuarioId = req.user.userId

      const response = await filmeController.update(
        Number(req.params.id),
        req.body,
        usuarioId
      )
      res.status(response.statusCode).json(response.body)
    },
  )

  router.delete('/filme/:id', async (req: Request, res: Response) => {
    const usuarioId = req.user.userId

    const response = await filmeController.delete(Number(req.params.id), usuarioId)
    res.status(response.statusCode).json(response.body)
  })
}
