import express from 'express'
import * as playerService from '../services/playerService'

class PlayerRouter {
	router: express.Router

	path = '/'

	constructor() {
		this.router = express.Router()
		this.init()
	}

	private init() {
		this.configRouter()
	}

	private configRouter() {
		/**
		 * GET /api/v1/players
		 * @param {number} year
		 * @returns {Promise<Player[]>}
		 */
		this.router.get('/:year/players', async (_req, res) => {
			try {
				const { year } = _req.params

				if (!year) {
					return res.status(400).json({
						message: 'Bad request, year is required',
					})
				}

				const players = await playerService.getPlayers(Number(year))
				return res.json(players)
			} catch (error: any) {
				return res.status(500).json({ message: error.message })
			}
		})

		this.router.get('/:year/players/:id', async (_req, res) => {
			const { id, year } = _req.params

			if (!year) {
				return res.status(400).json({
					message: 'Bad format route - api/v1/players/:year/:id',
				})
			}

			if (id) {
				const player = await playerService.getPlayer({
					id,
					year: Number(year),
				})
				return res.json(player)
			}

			return res.status(400).json({ message: 'Player id is required' })
		})
	}
}

export default new PlayerRouter()
