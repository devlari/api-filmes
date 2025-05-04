import jwt from 'jsonwebtoken'

const accessTokenSecret = process.env.JWT_SECRET || 'access-secret'
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET || 'refresh-secret'

export const generateAccessToken = (userId: number): string => {
    return jwt.sign({ userId }, accessTokenSecret, { expiresIn: '1h' })
}

export const generateRefreshToken = (userId: number): string => {
    return jwt.sign({ userId }, refreshTokenSecret, { expiresIn: '7d' })
}

export const verifyAccessToken = (token: string) => {
    try {
        return jwt.verify(token, accessTokenSecret)
    } catch (error) {
        return null
    }
}

export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, refreshTokenSecret)
    } catch (error) {
        return null
    }
}
