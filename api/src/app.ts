import { Express } from 'express';
import express from 'express';
import config from './config/config';

const app: Express = express();

app.listen(config.httpPort, () => {
	console.log(`Listening for requests on port ${config.httpPort}`);
});
