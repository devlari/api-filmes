import { ErrorRequestHandler } from 'express'
import multer from 'multer'

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            res.status(413).json({ message: 'Arquivo excede o tamanho permitido (máx 5MB)' })
        }
        res.status(400).json({ message: 'Erro no upload do arquivo', error: err.message })
    }

    res.status(500).json({ message: 'Erro interno do servidor', error: err.message })
}
