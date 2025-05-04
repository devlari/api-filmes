import {
    created,
    HttpResponse,
    badRequest,
} from '@main/infra/http'
import { UploadService } from '../services/upload.service'

export class UploadController {
    private uploadService: UploadService

    constructor(uploadService: UploadService) {
        this.uploadService = uploadService
    }

    async upload(file: Express.Multer.File | undefined): Promise<HttpResponse> {

        console.log(file)

        if (!file) {
            return badRequest(new Error('Arquivo não encontrado'))
        }

        const url = await this.uploadService.enviarParaR2(file)

        return created(url);
    }
}
