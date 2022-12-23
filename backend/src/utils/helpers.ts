import dbConfig from '../configs/db.json';

export function getMongoDbUri(): string {
	// uri example: mongodb://localhost:27017/dota-league
	return `${dbConfig.baseUri}:${dbConfig.port}/${dbConfig.dbName}`;
}