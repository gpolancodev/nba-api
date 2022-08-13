import { Request, Response } from 'express'

export const notFoundHandler = (_request: Request, response: Response) => {
	const message = 'Resource not found'
	response.status(404).send(message)
}
