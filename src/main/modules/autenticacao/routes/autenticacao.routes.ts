import { Router, Response, Request } from "express"
import { AutenticacaoController } from "../controllers"
import { AutenticacaoRepository } from "../repositories"
import { AutenticacaoService } from "../services"
import { loginSchema, registerSchema } from "../validations"
import { validateBody } from "@/main/infra/middlewares/zod.middleware"


export function autenticacaoRoutes(router: Router): void {
    const autenticacaoRepository = new AutenticacaoRepository()
    const autenticacaoService = new AutenticacaoService(autenticacaoRepository)
    const autenticacaoController = new AutenticacaoController(autenticacaoService)

    router.post('/auth/login', validateBody(loginSchema), async (req: Request, res: Response) => {
        const response = await autenticacaoController.login(req.body)
        res.status(response.statusCode).json(response.body)
    })

    router.post('/auth/registro', validateBody(registerSchema), async (req: Request, res: Response) => {
        const response = await autenticacaoController.registro(req.body)
        res.status(response.statusCode).json(response.body)
    })

    router.post('/auth/refresh', async (req: Request, res: Response) => {
        const response = await autenticacaoController.refreshToken(req.body)
        res.status(response.statusCode).json(response.body)
    })
}
