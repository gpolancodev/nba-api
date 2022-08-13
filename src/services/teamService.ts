import { Team } from 'types/Team'
import * as inMemoryRepository from '../repository/InMemoryRepository'

interface TeamServiceGetPlayerParams {
	id: string
	year: number
}

export const getTeams = async (year: number) => {
	try {
		const teams = await inMemoryRepository.getTeams(year)
		return teams
	} catch (error: any) {
		throw new Error(error?.message)
	}
}

export const getTeam = async ({ id, year }: TeamServiceGetPlayerParams) => {
	const team = await inMemoryRepository.getTeam(id, year)

	return team
}
