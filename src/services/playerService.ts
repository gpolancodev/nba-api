import * as playerInMemoryRepository from '../repository/InMemoryRepository'

interface PlayerServiceGetPlayerParams {
	id: string
	year: number
}

export const getPlayers = async (year: number) => {
	try {
		const players = await playerInMemoryRepository.getPlayers(year)
		return players
	} catch (error: any) {
		throw new Error(error?.message)
	}
}

export const getPlayer = ({ id, year }: PlayerServiceGetPlayerParams) => {
	const player = playerInMemoryRepository.getPlayer(id, year)

	return player
}
