import Pool from 'pg-pool';
import config from './config';

const pool = new Pool({
	database: config.db.db,
	user: config.db.user,
	password: config.db.pass,
	port: config.db.port,
	host: config.db.host,
});
export default pool;
