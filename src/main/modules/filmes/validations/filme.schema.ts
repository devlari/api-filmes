import { z } from 'zod'

export const filmePostSchema = z.object({
  tituloOriginal: z
    .string({ required_error: 'O título original é obrigatório' })
    .min(1, { message: 'O título original não pode ser vazio' })
    .max(255, {
      message: 'O título original não pode ter mais de 255 caracteres',
    }),
  tituloTraduzido: z
    .string({ required_error: 'O título traduzido é obrigatório' })
    .min(1, { message: 'O título traduzido não pode ser vazio' })
    .max(255, {
      message: 'O título traduzido não pode ter mais de 255 caracteres',
    }),
  descricao: z
    .string({ required_error: 'A descrição é obrigatória' })
    .min(1, { message: 'A descrição não pode ser vazia' })
    .max(1000, { message: 'A descrição não pode ter mais de 1000 caracteres' }),
  sinopse: z
    .string()
    .min(1, { message: 'A sinopse não pode ser vazia' })
    .max(1000, { message: 'A sinopse não pode ter mais de 1000 caracteres' })
    .optional(),
  orcamento: z
    .number()
    .int()
    .nonnegative({ message: 'O orçamento deve ser um número positivo' })
    .optional(),
  dtLancamento: z.union([z.string(), z.date()]).refine((val) => val !== '', {
    message: 'A data de lançamento é obrigatória',
  }),
  urlImagem: z
    .string()
    .url({ message: 'A URL da imagem deve ser válida' })
    .max(255, {
      message: 'A URL da imagem não pode ter mais de 255 caracteres',
    })
    .optional(),
  duracao: z
    .number()
    .int()
    .positive({ message: 'A duração deve ser um número positivo' })
    .optional(),
  receita: z
    .number()
    .int()
    .nonnegative({ message: 'A receita deve ser um número positivo ou zero' })
    .optional(),
  lucro: z.number().int().optional(),
  linkTrailer: z
    .string()
    .url({ message: 'O link do trailer deve ser uma URL válida' })
    .optional(),
})

export const filmePatchSchema = filmePostSchema.partial()
