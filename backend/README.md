# Backend for Dota League

This web server is written in `Typescript` and uses `Express` and `Mongoose`.

## Routes
- `/api` - This route serves content related to Steam Web API (used by admins).
	- POST `/api/teams/<teamID>` - Queries Steam Web API and adds/updates a team with ID `<teamID>` to dota league db.
- `/v1` - This routes serves content related to dota league (used by frontend).
	- GET `/v1/teams` - Returns all teams stored in dota league db.
