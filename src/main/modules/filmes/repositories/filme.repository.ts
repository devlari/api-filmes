import { FilmePatchPayload, FilmePostPayload } from '../types';
import { prismaDB } from '@/main/infra/db';

export class FilmeRepository {
  constructor() {}

  async create(data: FilmePostPayload) {
    return prismaDB.filme.create({ data });
  }

  async findById(id: number) {
    return prismaDB.filme.findUnique({ where: { id } });
  }

  async update(id: number, data: FilmePatchPayload) {
    return prismaDB.filme.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prismaDB.filme.delete({ where: { id } });
  }
}
