import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email é obrigatório',
    }).min(1, {
        message: 'Email não pode ser vazio'
    }).email({ message: 'Email inválido' }),
    senha: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
});

export const registerSchema = z.object({
    nome: z.string({
        required_error: 'Nome é obrigatório',
    }).min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
    email: z.string({
        required_error: 'Email é obrigatório'
    }).email({ message: 'Email inválido' }),
    senha: z.string({
        required_error: 'Senha é obrigatória'
    }).min(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
});

export const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1, { message: 'Refresh token inválido' })
});
