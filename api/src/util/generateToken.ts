import jwt from 'jsonwebtoken';
import config from '../config/config';
import User from '../models/User'

const generate = (user: User): string => {
	let payload = {
		id: user.id,
	};
	let token = jwt.sign({ user: payload }, config.jwt.secret, {
		expiresIn: `${config.jwt.expiry}d`,
	});

	return token;
};

export default generate;
