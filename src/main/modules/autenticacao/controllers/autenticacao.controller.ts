import { LoginPayload, UsuarioPostPayload } from '../types'
import { badRequest, created, HttpResponse, ok, unauthorized } from '@/main/infra/http'
import { AutenticacaoService } from '../services'

export class AutenticacaoController {
    constructor(private readonly authService: AutenticacaoService) { }

    async login(payload: LoginPayload): Promise<HttpResponse> {
        try {
            const tokens = await this.authService.login(payload)
            return ok(tokens)
        } catch (error) {
            return badRequest(new Error('Email ou senha inválidos'))
        }
    }

    async registro(payload: UsuarioPostPayload): Promise<HttpResponse> {
        try {
            const usuario = await this.authService.registro(payload)
            return created({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            })
        } catch (error) {
            return badRequest(new Error('Erro ao registrar usuário'))
        }
    }

    async refreshToken(refreshToken: string): Promise<HttpResponse> {
        try {
            const tokens = await this.authService.refreshToken(refreshToken)
            return ok(tokens)
        } catch (error) {
            return unauthorized(new Error('Refresh token inválido'))
        }
    }
}
