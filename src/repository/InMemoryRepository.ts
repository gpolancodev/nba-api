import fs from 'fs'

import { Player } from 'types/Player'
import { Team } from 'types/Team'
import playerJsonData from '../data/players-data.json'
import teamJsonData from '../data/teams-data.json'

const baseEndPoint = 'https://data.nba.net/'

export const NBA_API_ENDPOINTS = {
	teams: (year: number) =>
		`${baseEndPoint}data/10s/prod/v1/${year}/teams.json`,

	players: (year: number) =>
		`${baseEndPoint}data/10s/prod/v1/${year}/players.json`,

	player: (year: number, id: string) =>
		`${baseEndPoint}/data/10s/prod/v1/${year}/players/${id}_profile.json`,
}

const rootDir = __dirname.split('/').slice(0, -1).join('/')
const playersPath = `${rootDir}/data/players-data.json`
const teamsPath = `${rootDir}/data/teams-data.json`

/**
 * Update the players data file
 * @param year season year
 * @returns standar players
 */
const updateMemoryPlayers = async (year: number): Promise<boolean> => {
	try {
		const response = await fetch(NBA_API_ENDPOINTS.players(year))
		if (response.ok) {
			const data = await response.json()

			if (!fs.existsSync(playersPath)) {
				fs.writeFileSync(playersPath, '{}')
			}
			const mapedData = data.league.standard.filter((player: any) => {
				if (
					player.isActive &&
					!!player.jersey &&
					!!player.draft.teamId
				) {
					delete player.teamSitesOnly
					return player
				}
			})

			fs.writeFileSync(
				playersPath,
				JSON.stringify(
					{ ...playerJsonData, [year]: mapedData },
					null,
					2
				)
			)

			return true
		}
		return false
	} catch (error: any) {
		console.log('updateMemoryPlayers Error', error.message)
		return false
	}
}

/**
 * Update the teams data file
 * @param year season year
 * @returns standar teams
 */
const updateMemoryTeams = async (year: number): Promise<boolean> => {
	try {
		const response = await fetch(NBA_API_ENDPOINTS.teams(year))
		if (response.ok) {
			const data = await response.json()

			if (!fs.existsSync(playersPath)) {
				fs.writeFileSync(teamsPath, '{}')
			}

			const mapedData = data.league.standard.filter((team: Team) => {
				if (team.isNBAFranchise) {
					return team
				}

				return false
			})

			fs.writeFileSync(
				teamsPath,
				JSON.stringify({ ...teamJsonData, [year]: mapedData }, null, 2)
			)

			return true
		}
		return false
	} catch {
		return false
	}
}

// PLAYERS
// =============================================================================
const playerData = playerJsonData as unknown as { [key: string]: Player[] }

export const getPlayers = async (year: number) => {
	let existPlayerByYear = playerData[`${year}`] !== undefined

	if (!existPlayerByYear) {
		console.log({ existPlayerByYear, year })
		existPlayerByYear = await updateMemoryPlayers(year)
	}

	if (existPlayerByYear) {
		return playerData[`${year}`] as Player[]
	}

	return []
}

export const getPlayer = async (id: string, year: number) => {
	let existPlayerByYear = playerData[`${year}`] !== undefined

	if (!existPlayerByYear) {
		existPlayerByYear = await updateMemoryPlayers(year)
	}

	if (existPlayerByYear) {
		const players = await getPlayers(year)
		const player = players.find((player: Player) => player.personId === id)

		if (player) {
			return player
		}
	}

	throw new Error('Player not found')
}

// TEAMS
// =============================================================================
const teamData = teamJsonData as unknown as { [key: string]: Team[] }

export const getTeams = async (year: number) => {
	let existTeamsByYear = teamData[`${year}`] !== undefined

	if (!existTeamsByYear) {
		existTeamsByYear = await updateMemoryTeams(year)
	}

	if (existTeamsByYear) {
		return teamData[`${year}`]
	}

	return []
}

export const getTeam = async (id: string, year: number) => {
	if (!id) {
		throw new Error('Team id is required')
	}

	const teams = await getTeams(year)
	const team = teams.find((team: Team) => team.teamId === id)

	if (team) {
		return team
	} else {
		throw new Error('Team not found')
	}
}
