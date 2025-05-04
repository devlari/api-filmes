import { Express, Router } from 'express'
import { pingRoutes } from '@main/routes'
import { filmeRoutes } from '@main/modules/filmes/routes'
import { autenticacaoRoutes } from '../modules/autenticacao/routes'
import { verificaAutenticacao } from '../infra/middlewares'
import { uploadRoutes } from '../modules/filmes/routes/upload.routes'

export default function setupRoutes(app: Express) {
  const router = Router()
  app.use('/api', router)

  pingRoutes(router)
  autenticacaoRoutes(router)

  router.use(verificaAutenticacao);

  filmeRoutes(router)
  uploadRoutes(router)
}
