import axios from 'axios';
import SteamUrlLocations from '../enums/urlLocations.enum';
import Team from '../interfaces/team.interface';
import { getSteamUrl } from '../utils/helpers';

export async function getTeamById(teamId: number): Promise<Team | undefined> {
	try {
		const url = getSteamUrl(SteamUrlLocations.TEAMS, teamId);
		const response = await axios.get(url);
		const teamInfo: Team = response.data.result.teams[0];
		teamInfo.id = teamId;
		return teamInfo;
	} catch (error) {
		console.log('Error occurred', error);
		return undefined;
	}
}
