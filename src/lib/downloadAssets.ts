/* eslint-disable no-console */
import fs from 'fs'
import path from 'path'
import https from 'https'

import * as InMemoryRepository from '../repository/InMemoryRepository'
import download from 'download'

const rootPath = `${process.cwd()}/src`
const assetsPath = path.join(rootPath, 'assets')
const logosPath = path.join(assetsPath, 'logos-nba')
const playersPhotoPath = path.join(assetsPath, 'players')

const downloadTeamAssets = (
	downloadFilePath: string,
	destinationPath: string
): void => {
	const file = fs.createWriteStream(destinationPath)
	const request = https.get(downloadFilePath)

	request.on('response', (response) => {
		if (response.statusCode !== 200) {
			console.log('Error save file')
		}

		response.pipe(file)
	})

	request.on('error', (err) => {
		file.close()
		fs.unlink(downloadFilePath, () => {
			console.log('delete file')
		})

		console.log(err.message)
	})

	file.on('finish', () => {
		file.close()
		console.log()
	})

	file.on('error', (err) => {
		file.close()

		if (err.name === 'EEXIST') {
			console.log('File already exists')
		} else {
			fs.unlink(downloadFilePath, () => {
				console.log('delete file')
			})

			console.log(err.message)
		}
	})
}

// Teams assets
// ============================================================
const teamLogoDownloadPath = (teamId: string) =>
	`https://cdn.nba.com/logos/nba/${teamId}/global/L/logo.svg`

const updateTeamsAssets = async () => {
	let count = 0

	try {
		if (!fs.existsSync(logosPath)) {
			fs.mkdirSync(logosPath, { recursive: true })
		}

		const teams = await InMemoryRepository.getTeams(
			new Date().getFullYear()
		)

		const promises: any[] = []

		if (teams.length > 0) {
			teams.forEach((team) => {
				count++
				promises.push(
					downloadTeamAssets(
						teamLogoDownloadPath(team.teamId),
						path.join(logosPath, `${team.teamId}.svg`)
					)
				)
			})

			await Promise.all(promises)

			console.log(`Downloaded ${count} files`)
		}
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

// Players assets
// ============================================================
const updatePlayersAssets = async () => {
	let count = 0
	try {
		if (!fs.existsSync(playersPhotoPath)) {
			fs.mkdirSync(playersPhotoPath, { recursive: true })
		}

		const players = await InMemoryRepository.getPlayers(
			new Date().getFullYear()
		)

		if (players.length > 0) {
			const playersPhotoUrls = players.map(
				(player) =>
					`https://cdn.nba.com/headshots/nba/latest/1040x760/${player.personId}.png`
			)
			const errors = []

			Promise.all(
				playersPhotoUrls.map((url) => {
					count++
					return download(url, playersPhotoPath, {
						throwHttpErrors: false,
					})
				})
			).then(() => {
				console.log(`Downloaded ${count} files`)
				process.exit(0)
			})
		}
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

;(async () => {
	await updatePlayersAssets()
})()
