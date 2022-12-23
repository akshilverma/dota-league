interface Team {
	name: string,
	id: number,
	tag?: string,
	abbreviation?: string,
	time_created?: number,
	logo?: number,
	logo_sponsor?: number,
	country_code?: string,
	url?: string,
	games_played?: number,
	player_0_account_id?: number,
	player_1_account_id?: number,
	player_2_account_id?: number,
	player_3_account_id?: number,
	player_4_account_id?: number,
	player_5_account_id?: number,
	player_6_account_id?: number,
	admin_account_id?: number
}

export default Team;
