import { Express, Router } from 'express'
import { pingRoutes } from '@main/routes'
import { filmeRoutes } from '@main/modules/filmes/routes'

export default function setupRoutes(app: Express) {
  const router = Router()
  app.use('/api', router)

  pingRoutes(router)
  filmeRoutes(router)
}
