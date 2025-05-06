export type Usuario = {
    id: number
    nome: string
    email: string
    senha: string
}

export type UsuarioPostPayload = {
    nome: string
    email: string
    senha: string
}

export type UsuarioApiResponse = Omit<Usuario, 'senha'>

export type LoginPayload = {
    email: string
    senha: string
}

export type UsuarioPatchPayload = Partial<UsuarioPostPayload>

export type Tokens = {
    token: string
    refreshToken: string
}