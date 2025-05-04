import { Router } from 'express'
import { uploadMulter } from '@main/infra/middlewares'
import { UploadController } from '../controllers'
import { UploadService } from '../services/upload.service'

export function uploadRoutes(router: Router): void {
    const service = new UploadService();
    const controller = new UploadController(service)

    router.post(
        '/filmes/upload',
        uploadMulter.single('imagem'),
        async (req, res) => {
            const response = await controller.upload(req.file)
            res.status(response.statusCode).json(response.body)
        },
    )
}
