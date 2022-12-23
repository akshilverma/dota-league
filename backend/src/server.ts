'use strict';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import apiRouter from './routes/api.routes';
import v1Router from './routes/v1.routes';
import defaultConfig from './configs/default.json';
import connect from './utils/dbConnect';

const app = express();

// Middlewares
// app.use(express.urlencoded({
// 	extended: true,
// }));
// app.use(express.json());
mongoose.set('strictQuery', true);
app.use(cors());

// Routes
app.use('/api', apiRouter);  // Used for updating steam data by admins
app.use('/v1', v1Router);  // Used by frontend applications to retrieve dota-league data
// app.use('/healthcheck', routes.healthcheck);

// Start express server
app.listen(process.env.PORT || defaultConfig.port, async () => {
	console.log(`Dota League server started at port: ${process.env.PORT || defaultConfig.port}`);
	await connect();
});

export default app;
