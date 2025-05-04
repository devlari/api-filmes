export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  body?: any
}

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: { errorMessage: error.message },
})

export const notFound = (error?: Error): HttpResponse => ({
  statusCode: 404,
  body: { errorMessage: error?.message || 'not found' },
})

export const conflict = (error?: Error): HttpResponse => ({
  statusCode: 409,
  body: { errorMessage: error?.message || 'conflict' },
})

export const ok = (data: any = {}): HttpResponse => ({
  statusCode: 200,
  body: data,
})

export const created = (data: any = {}): HttpResponse => ({
  statusCode: 201,
  body: data,
})

export const serverError = (error: Error | unknown): HttpResponse => {
  if (error instanceof Error) {
    return {
      statusCode: 500,
      body: { errorMessage: error.message },
    }
  }

  return {
    statusCode: 500,
    body: { errorMessage: 'Problemas em processar a requisição pelo servidor' },
  }
}
export const forbidden = (error?: Error): HttpResponse => ({
  statusCode: 403,
  body: { errorMessage: error?.message || 'Forbidden' },
})

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  body: { errorMessage: error.message },
})
