export type Usuario = {
    id: number
    nome: string
    email: string
    senha: string
}

export type UsuarioApiResponse = Omit<Usuario, 'senha'>