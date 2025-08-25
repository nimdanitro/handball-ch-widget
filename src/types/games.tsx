export interface GamePlayed {
	gameId: number;
	gameNr: number;
	gameDateTime: Date;
	gameTypeLong: string;
	gameTypeShort: string;
	teamAName: string;
	teamBName: string;
	leagueLong: string;
	leagueShort: string;
	gameStatus: string;
	teamAScoreHT: number;
	teamBScoreHT: number;
	teamAScoreFT: number;
	teamBScoreFT: number;
	spectators: number;
	venue: string;
	venueAddress: string;
	venueZip: number;
	venueCity: string;
}

export interface Game {
	gameDateTime: Date;
	gameId: number;
	gameNr: number;
	gameStatus: string;
	gameStatusId: number;
	gameTypeLong: string;
	gameTypeShort: string;
	groupCupText: string;
	groupID: number;
	leagueLong: string;
	leagueShort: string;
	roundNr: number;
	spectators: number;
	teamAId: number;
	teamAName: string;
	teamAScoreFT: number;
	teamAScoreHT: number;
	teamBId: number;
	teamBName: string;
	teamBScoreFT: number;
	teamBScoreHT: number;
	venue: string;
	venueAddress: string;
	venueCity: string;
	venueZip: number;
}

export interface GamesPlanned {
	gameId: number;
	gameNr: number;
	gameDateTime: Date;
	gameTypeLong: string;
	gameTypeShort: string;
	teamAName: string;
	teamBName: string;
	leagueLong: string;
	leagueShort: string;
	gameStatus: string;
	venue: string;
	venueAddress: string;
	venueZip: number;
	venueCity: string;
}
