import { Request, Response } from 'express';
import Team from '../interfaces/team.interface';
import { addTeamInfo } from '../services/db.service';
import { getTeamById } from '../services/steam.service';

/*
Fetches a team from steam and adds it to database
*/
export async function addTeamToDbHandler(req: Request, res: Response) {
	const teamId: number = +req.params.teamid; // Convert string to number
	if (Number.isNaN(teamId)) {
		return res.status(400).send('Invalid team ID: Team Id should be a number');
	}
	try {
		const teamInfo: Team = await getTeamById(teamId) as Team;
		if (!teamInfo) {
			return res.status(500).send('Failed to fetch team details');
		}
		await addTeamInfo(teamInfo);
		return res.status(201).send(teamInfo);
	} catch (error) {
		console.error('Error occurred', error);
		return res.status(500).send(error);
	}
}