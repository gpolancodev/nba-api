import { Draft } from './Draft'
import { Team } from './Team'

export interface Player {
	firstName: string
	lastName: string
	temporaryDisplayName: string
	personId: string
	teamId: string
	jersey: string
	isActive: boolean
	pos: string
	heightFeet: string
	heightInches: string
	heightMeters: string
	weightPounds: string
	weightKilograms: string
	dateOfBirthUTC: string
	teams: Team[]
	draft: Draft
	nbaDebutYear: string
	yearsPro: string
	collegeName: string
	lastAffiliation: string
	country: string
	isallStar?: boolean
	photoUrl: string
}
