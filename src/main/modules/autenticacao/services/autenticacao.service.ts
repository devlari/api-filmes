import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AutenticacaoRepository } from '../repositories'
import { LoginPayload, Tokens, Usuario, UsuarioPostPayload } from '../types'

const accessTokenSecret = process.env.JWT_SECRET || 'access-secret'
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET || 'refresh-secret'

export class AutenticacaoService {
    constructor(private readonly autenticacaoRepository: AutenticacaoRepository) { }

    async login(loginPayload: LoginPayload): Promise<Tokens> {
        const usuario = await this.autenticacaoRepository.findByEmail(loginPayload.email)

        if (!usuario) {
            throw new Error('Email inválido ou não encontrado')
        }

        const senhaValida = await bcrypt.compare(loginPayload.senha, usuario.senha)

        if (!senhaValida) {
            throw new Error('Senha inválida')
        }

        const token = jwt.sign({ userId: usuario.id }, accessTokenSecret, { expiresIn: '1h' })
        const refreshToken = jwt.sign({ userId: usuario.id }, refreshTokenSecret, { expiresIn: '7d' })

        return {
            token, refreshToken
        }
    }

    async registro(payload: UsuarioPostPayload): Promise<Usuario> {
        const usuarioExistente = await this.autenticacaoRepository.findByEmail(payload.email)

        if (usuarioExistente) {
            throw new Error('Já existe um usuário com esse e-mail')
        }

        const hashedPassword = await bcrypt.hash(payload.senha, 10)

        const usuario = await this.autenticacaoRepository.create({
            ...payload,
            senha: hashedPassword
        })
        return usuario
    }

    async refreshToken(refreshToken: string) {
        try {
            const decoded = jwt.verify(refreshToken, refreshTokenSecret) as any
            const newAccessToken = jwt.sign({ userId: decoded.userId }, accessTokenSecret, { expiresIn: '1h' })
            return newAccessToken
        } catch (error) {
            throw new Error('Refresh token inválido ou expirado')
        }
    }
}
