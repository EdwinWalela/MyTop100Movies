import { Express } from 'express';
import express from 'express';
import config from './config/config';
import { exit } from 'process';
import db from './config/db';

import authRoutes from './routes/auth';
import movieRoutes from './routes/movies';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movies', movieRoutes);

(async () => {
	try {
		await db.connect();
		console.log('Connected to database');
	} catch (error) {
		console.log('failed to connect to database', error);
		exit(1);
	}
})();

app.listen(config.httpPort, () => {
	console.log(`Listening for requests on port ${config.httpPort}`);
});
