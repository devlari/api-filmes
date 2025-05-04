import { Router, Request, Response } from 'express'
import { FilmeController } from '../controllers/filme.controller'
import { FilmeService } from '../services/filme.service'
import { FilmeRepository } from '../repositories/filme.repository'

export function filmeRoutes(router: Router): void {
  const filmeRepository = new FilmeRepository()
  const filmeService = new FilmeService(filmeRepository)
  const filmeController = new FilmeController(filmeService)

  router.post('/filmes', async (req: Request, res: Response) => {
    const response = await filmeController.create(req.body)
    res.status(response.statusCode).json(response.body)
  })

  router.get('/filmes/:id', async (req: Request, res: Response) => {
    const response = await filmeController.getById(Number(req.params.id))
    res.status(response.statusCode).json(response.body)
  })

  router.put('/filmes/:id', async (req: Request, res: Response) => {
    const response = await filmeController.update(
      Number(req.params.id),
      req.body,
    )
    res.status(response.statusCode).json(response.body)
  })

  router.delete('/filmes/:id', async (req: Request, res: Response) => {
    const response = await filmeController.delete(Number(req.params.id))
    res.status(response.statusCode).json(response.body)
  })
}
