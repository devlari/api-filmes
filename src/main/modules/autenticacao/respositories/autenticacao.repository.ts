import { prismaDB } from '@/main/infra/db'
import { Usuario, UsuarioApiResponse, UsuarioPostPayload } from '../types'

export class AutenticacaoRepository {
    constructor() { }

    async findByEmail(email: string): Promise<Usuario | null> {
        const usuario = await prismaDB.usuario.findUnique({ where: { email } })

        if (!usuario) {
            return null
        }

        return usuario;
    }

    async create(data: UsuarioPostPayload): Promise<UsuarioApiResponse> {
        const usuario = await prismaDB.usuario.create({
            data,
        })
        return this.normalizeUsuario(usuario)
    }

    private normalizeUsuario(data: Usuario): UsuarioApiResponse {
        if (!data) return data
        return {
            id: data.id,
            nome: data.nome,
            email: data.email,
        }
    }
}
