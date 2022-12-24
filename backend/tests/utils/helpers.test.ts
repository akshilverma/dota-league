import SteamUrlLocations from '../../src/enums/urlLocations.enum';
import { getMongoDbUri, getSteamUrl } from '../../src/utils/helpers';

jest.mock(
	'../../src/configs/db.json',
	() => {
		return {
			'baseUri': 'someuri',
			'port': '1234',
			'dbName': 'somedb'
		};
	},
	{ virtual: true }
);

jest.mock(
	'../../src/configs/steam.json',
	() => {
		return {
			'urls': {
				'baseUrl': 'someurl',
				'getTeamInfo': 'somepath'
			},
			'dota2Id': 'someid'
		};
	},
	{ virtual: true }
);

describe('#getMongoDbUri', () => {
	it('should create and return a mongodb uri from db config', () => {
		const expectedString = 'someuri:1234/somedb';
		const uri  = getMongoDbUri();
		expect(typeof uri).toBe('string');
		expect(uri).toBe(expectedString);
	});
});

describe('#getSteamUrl', () => {
	const originalEnv = process.env;
	beforeEach(() => {
		jest.resetModules();
		process.env = {
			...originalEnv,
			STEAM_API_KEY: 'somekey',
		};
	});

	afterEach(() => {
		process.env = originalEnv;
	});

	it('should create and return a steam team url from steam config', () => {
		const expectedString = 'someurl_someid/somepath?key=somekey&start_at_team_id=1234&teams_requested=1';
		const url  = getSteamUrl(SteamUrlLocations.TEAMS, 1234);
		expect(typeof url).toBe('string');
		expect(url).toBe(expectedString);
	});

	it('should throw an error for not finding team id', () => {
		const expectedString = 'Team ID not specified';
		expect(() => getSteamUrl(SteamUrlLocations.TEAMS)).toThrow(Error(expectedString));
	});
});
