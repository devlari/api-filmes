import { UsuarioRepository } from "../repositories";
import { UsuarioApiResponse } from "../types";

export class UsuarioService {
    constructor(private readonly usuarioRepository: UsuarioRepository) { }

    async getById(id: number): Promise<UsuarioApiResponse | null> {
        return this.usuarioRepository.getById(id)
    }
}