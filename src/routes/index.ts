import express from 'express'
import playerRouter from './playerRouter'
import teamRouter from './teamRouter'

export class RouterV1 {
	router: express.Router

	path = '/api/v1'

	constructor() {
		this.router = express.Router()
		this.init()
	}

	private init() {
		this.configRouter()
	}

	private configRouter() {
		// GET /api/v1/
		this.router.get('/', (_req, res) => {
			return res.json({ message: 'Api working!' })
		})

		// /api/v1/players
		this.router.use(playerRouter.path, playerRouter.router)
		this.router.use(teamRouter.path, teamRouter.router)
	}
}

export default new RouterV1()
