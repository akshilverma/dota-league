import dbConfig from '../configs/db.json';
import steamConfig from '../configs/steam.json';
import SteamUrlLocations from '../enums/urlLocations.enum';

export function getMongoDbUri(): string {
	// uri example: mongodb://localhost:27017/dota-league
	return `${dbConfig.baseUri}:${dbConfig.port}/${dbConfig.dbName}`;
}

export function getSteamUrl(urlLocation: SteamUrlLocations, teamId?: number): string {
	const baseDotaUrl = `${steamConfig.urls.baseUrl}_${steamConfig.dota2Id}`;
	let finalUrl = '';
	switch (urlLocation) {
		case SteamUrlLocations.TEAMS:
			if (!teamId) {
				throw new Error('Team ID not specified');
			}
			finalUrl = `${baseDotaUrl}/${steamConfig.urls.getTeamInfo}?key=${process.env.STEAM_API_KEY}` +
						`&start_at_team_id=${teamId}&teams_requested=1`;
			break;
			
	}
	return finalUrl;
}
