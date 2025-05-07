import { v4 as uuidv4 } from 'uuid'
import r2 from '@main/lib/r2client'

export class UploadService {
    async enviarParaR2(file: Express.Multer.File) {
        const key = `filmes/${uuidv4()}-${file.originalname}`

        try {
            await r2
                .putObject({
                    Bucket: process.env.R2_BUCKET_NAME!,
                    Key: key,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                    ACL: 'public-read',
                })
                .promise()

            const url = `${process.env.R2_BUCKET_URL}/${key}`

            return url
        } catch (error) {
            throw new Error('Erro ao enviar imagem para o R2')
        }
    }
}
