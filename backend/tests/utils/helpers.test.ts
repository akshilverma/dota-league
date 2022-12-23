import { getMongoDbUri } from '../../src/utils/helpers';

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

describe('#getMongoDbUri', () => {
	it('should create and return a mongodb uri from db config', () => {
		const expectedString = 'someuri:1234/somedb';
		const uri  = getMongoDbUri();
		expect(typeof uri).toBe('string');
		expect(uri).toBe(expectedString);
	});
});
