import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const accessTokenSecret = process.env.JWT_SECRET || 'access-secret'

export const verificaAutenticacao: RequestHandler = (req, res, next) => {
    const token = req.headers['x-access-token'] as string

    if (!token) {
        res.status(401).json({ message: 'Token não fornecido' })
    }

    try {
        const decoded = jwt.verify(token || '', accessTokenSecret)
        req.user = decoded
        next()
    } catch (error) {
        return
    }
}
