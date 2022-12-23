import mongoose from 'mongoose';
import Team from '../interfaces/team.interface';

const teamSchema = 	new mongoose.Schema<Team>({
	'name': {type: String, required: true},
	'id': {type: Number, required: true},
	'tag': {type: String},
	'abbreviation': {type: String},
	'time_created': {type: Number},
	'logo': {type: Number},
	'logo_sponsor': {type: Number},
	'country_code': {type: String},
	'url': {type: String},
	'games_played': {type: Number},
	'player_0_account_id': {type: Number},
	'player_1_account_id': {type: Number},
	'player_2_account_id': {type: Number},
	'player_3_account_id': {type: Number},
	'player_4_account_id': {type: Number},
	'player_5_account_id': {type: Number},
	'player_6_account_id': {type: Number},
	'admin_account_id': {type: Number}
}, {
	timestamps: true
});

const TeamModel = mongoose.model<Team>('Team', teamSchema);

export default TeamModel;