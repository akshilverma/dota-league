import { Request, Response } from 'express';
import Team from '../interfaces/team.interface';
import TeamModel from '../models/teams.model';

/*
Returns list all teams present in database
*/
export async function getAllTeamsHandler(_: Request, res: Response) {
	try {
		const teams: Team[] = await TeamModel.find().exec();
		return res.status(200).send(teams);
	} catch (error) {
		console.error('Error fetching all teams', error);
	}
}
