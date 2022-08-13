/* eslint-disable @typescript-eslint/no-unused-vars */

import HttpException from '../common/http-exception'
import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
	error: HttpException,
	_request: Request,
	response: Response,
	_next: NextFunction
) => {
	if (error instanceof HttpException) {
		const status = error.statusCode || error.status || 500
		response.status(status).send(error)
	} else {
		console.log(error)
		response.status(500).send(error)
	}
}
