import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const HTTP_PORT = Number(process.env.PORT) || 3000;
const PG_USER = process.env.PG_USER;
const PG_DB = process.env.PG_DB;
const PG_HOST = process.env.PG_HOST;
const PG_PORT = Number(process.env.PG_PORT);
const PG_PASS = process.env.PG_PASSWORD;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_EXPIRY = Number(process.env.JWT_EXPIRY) || 30;

const config = {
	httpPort: HTTP_PORT,
	db: {
		user: PG_USER,
		pass: PG_PASS,
		port: PG_PORT,
		db: PG_DB,
		host: PG_HOST,
	},
	jwt: {
		secret: JWT_SECRET,
		expiry: JWT_EXPIRY,
	},
	saltRounds: SALT_ROUNDS,
};

export default config;
