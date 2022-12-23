import axios from 'axios';
import steamConfig from '../configs/steam.json';
import Team from '../interfaces/team.interface';

export async function getTeamById(teamId: number): Promise<Team | undefined> {
	const url = `${steamConfig.urls.baseUrl}_${steamConfig.dota2Id}/${steamConfig.urls.getTeamInfo}`+
				`?key=${process.env.STEAM_API_KEY}&start_at_team_id=${teamId}&teams_requested=1`;
	try {
		const response = await axios.get(url);
		const teamInfo: Team = response.data.result.teams[0];
		teamInfo.id = teamId;
		return teamInfo;
	} catch (error) {
		console.log('Error occurred', error);
		return undefined;
	}
}
