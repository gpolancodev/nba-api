import express from 'express'
import * as teamService from '../services/teamService'

const baseRoute = '/:year/teams'

class TeamRouter {
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
		this.router.get(baseRoute, async (_req, res) => {
			try {
				const { year } = _req.params
				if (!year) {
					return res.status(400).json({
						message: 'Bad request, year is required',
					})
				}
				const teams = await teamService.getTeams(Number(year))

				return res.json(teams)
			} catch (error: any) {
				return res.status(500).json({ message: error.message })
			}
		})

		this.router.get(`${baseRoute}/:id`, async (_req, res) => {
			try {
				const { id, year } = _req.params

				if (!year) {
					return res.status(400).json({
						message: 'Bad format route - api/v1/teams/:year/:id',
					})
				}

				if (id) {
					const team = await teamService.getTeam({
						id,
						year: new Date().getFullYear(),
					})
					return res.json(team)
				}

				return res.status(400).json({ message: 'Team id is required' })
			} catch (error: any) {
				return res.status(500).json({ message: error.message })
			}
		})
	}
}

export default new TeamRouter()
