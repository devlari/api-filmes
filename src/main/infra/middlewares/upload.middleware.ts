import multer from 'multer'
import path from 'path'

const storage = multer.memoryStorage()

export const uploadMulter = multer({
    storage,
    fileFilter: (_, file, cb) => {
        const allowed = ['.png', '.jpg', '.jpeg', '.webp']
        const ext = path.extname(file.originalname).toLowerCase()
        cb(null, allowed.includes(ext))
    },
    limits: { fileSize: 5 * 1024 * 1024 }
})
