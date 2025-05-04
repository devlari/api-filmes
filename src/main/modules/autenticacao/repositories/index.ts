import { UsuarioPostPayload, Usuario } from '../types'
import { prismaDB } from '@/main/infra/db'

export class AutenticacaoRepository {

    async findByEmail(email: string): Promise<Usuario | null> {
        return prismaDB.usuario.findUnique({ where: { email } })
    }

    async create(data: UsuarioPostPayload): Promise<Usuario> {
        return prismaDB.usuario.create({
            data,
        })
    }
}
