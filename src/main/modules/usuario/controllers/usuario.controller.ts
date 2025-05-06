import { HttpResponse, ok, unauthorized } from "@/main/infra/http"
import { UsuarioService } from "../services"

export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    async getById(id: number): Promise<HttpResponse> {
        try {
            const usuario = await this.usuarioService.getById(id)
            return ok(usuario)
        }
        catch (error) {
            return unauthorized(new Error('Usuário não encontrado'))
        }
    }
}