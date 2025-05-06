import { prismaDB } from "@/main/infra/db"
import { Usuario, UsuarioApiResponse } from "../types"

export class UsuarioRepository {
    constructor() { }

    async getById(id: number): Promise<UsuarioApiResponse | null> {
        const usuario = await prismaDB.usuario.findUnique({ where: { id } })

        if (!usuario) {
            return null
        }

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
