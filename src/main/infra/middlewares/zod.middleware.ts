import { Request, Response, NextFunction } from 'express'

export function validateBody(schema: any) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      const errorMessages = result.error.errors
        .map((error: any) => error.message)
        .join('; ')

      res.status(400).json({ errors: errorMessages })
    } else {
      req.body = result.data
      next()
    }
  }
}
