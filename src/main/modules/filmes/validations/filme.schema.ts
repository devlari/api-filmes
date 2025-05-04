import { z } from 'zod'

export const filmePostSchema = z.object({
  tituloOriginal: z.string().min(1),
  tituloTraduzido: z.string().min(1),
  descricao: z.string().min(1),
  orcamento: z.number().int().nonnegative().optional(),
  dtLancamento: z.union([z.string(), z.date()]),
  urlImagem: z.string().url().optional(),
  duracao: z.number().int().positive().optional(),
  receita: z.number().int().nonnegative().optional(),
  lucro: z.number().int().optional(),
  linkTrailer: z.string().url().optional(),
})

export const filmePatchSchema = filmePostSchema.partial()
