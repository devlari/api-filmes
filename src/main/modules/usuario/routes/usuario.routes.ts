import { Router, Response, Request } from "express"
import { UsuarioController } from "../controllers"
import { UsuarioRepository } from "../repositories"
import { UsuarioService } from "../services"

export function usuarioRoutes(router: Router): void {
    const usuarioRepository = new UsuarioRepository()
    const usuarioService = new UsuarioService(usuarioRepository)
    const usuarioController = new UsuarioController(usuarioService)

    router.get('/usuario', async (req: Request, res: Response) => {
        const usuarioId = req.user?.userId
        const response = await usuarioController.getById(usuarioId)
        res.status(response.statusCode).json(response.body)
    })
}