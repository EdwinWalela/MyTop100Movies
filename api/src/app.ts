import { Express } from 'express';
import express from 'express';
import config from './config/config';
import { exit } from 'process';
import db from './config/db';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import authRoutes from './routes/auth';
import movieRoutes from './routes/movies';

declare global {
	namespace Express {
		interface Request {
			userId: number;
		}
	}
}

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movies', movieRoutes);

// Swagger documentation
const swaggerDocument = YAML.load(path.join(__dirname, '..', 'docs/', 'api.yaml'));
app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
