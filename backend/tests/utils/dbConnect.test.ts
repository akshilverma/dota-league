import mongoose, { Mongoose, ConnectOptions } from 'mongoose';
import { MongoError } from 'mongodb';
import connect from '../../src/utils/dbConnect';
import * as helpers from '../../src/utils/helpers';

jest.mock('mongoose');

describe('#connect', () => {
	const mockDbUri = 'someuri:1234/somedb';
	let getMongoDbUriSpyOn: jest.SpyInstance<string, []>;
	/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
	let consoleLogSpyOn: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;
	let mongooseConnectSpyOn: jest.SpyInstance<Promise<typeof mongoose>,
												[uri: string, options?: mongoose.ConnectOptions | undefined]>;

	beforeEach(() => {
		getMongoDbUriSpyOn = jest.spyOn(helpers, 'getMongoDbUri').mockReturnValue(mockDbUri);
		consoleLogSpyOn = jest.spyOn(console, 'log');
		mongooseConnectSpyOn = jest.spyOn<Mongoose, 'connect'>(mongoose, 'connect');
	});

	afterEach(() => {
		jest.restoreAllMocks();
		jest.resetAllMocks();
	});

	it('should connect to a mongodb instance', async () => {
		const expectedMessage = 'Successfully connected to DB';
		
		mongooseConnectSpyOn.mockImplementation(
			(_: string, __?: ConnectOptions, callback?: (err?: MongoError) => void) => {
				if (callback) {
					callback();
				}
				return Promise.resolve(mongoose);
			});
		await connect();
		expect(consoleLogSpyOn).toBeCalledWith(expectedMessage);
		expect(getMongoDbUriSpyOn).toHaveBeenCalledTimes(1);
		expect(mongooseConnectSpyOn).toHaveBeenCalledTimes(1);
		expect(mongooseConnectSpyOn).toBeCalledWith(mockDbUri);
	});

	it('should not connect to a mongodb instance and exit', async () => {
		const expectedMessage = 'Failed to connect to DB. Please check DB conection';
		const processExitSpyOn = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);
		mongooseConnectSpyOn.mockImplementation(
			(_: string, __?: ConnectOptions, callback?: (err?: MongoError) => void) => {
				if (callback) {
					callback(new MongoError(new Error()));
				}
				return Promise.reject(mongoose);
			});
		await connect();
		expect(consoleLogSpyOn).toBeCalledWith(expectedMessage);
		expect(getMongoDbUriSpyOn).toHaveBeenCalledTimes(1);
		expect(mongooseConnectSpyOn).toHaveBeenCalledTimes(1);
		expect(processExitSpyOn).toHaveBeenCalledTimes(1);
		expect(mongooseConnectSpyOn).toBeCalledWith(mockDbUri);
	});
});
