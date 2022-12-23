import mongoose from 'mongoose';
import { getMongoDbUri } from './helpers';

async function connect() {
	try {
		const uri = getMongoDbUri();
		// Run mongodb on docker using command: docker run --name mongodb -d -p 27017:27017 mongo
		await mongoose.connect(uri);
		console.log('Successfully connected to DB');
	} catch (error) {
		console.log('Failed to connect to DB. Please check DB conection');
		process.exit(1);
	}
}

export default connect;