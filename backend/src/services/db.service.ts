import Team from '../interfaces/team.interface';
import TeamModel from '../models/teams.model';

/*
Function will search for team based on id. If teamId is found in database, the team details is updated.
If teamId is not found, team is created in db.
*/
export async function addTeamInfo(teamInfo: Team) {
	try {
		const teamDetails = await TeamModel.findOneAndUpdate({id: teamInfo.id}, teamInfo, { new: true });
		if (teamDetails) {
			console.log(`${teamInfo.name} updated in db`);
			return;
		}
		await TeamModel.create(teamInfo);
		console.log('Team Model created.');
		console.log(`${teamInfo.name} added to db`);
	} catch (error) {
		console.error('Error occurred while creating team data', error);
	}
}
