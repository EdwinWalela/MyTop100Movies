import User from '../models/User';
import repository from '../repositories/user';
import generateToken from '../util/generateToken';

const createUser = async (user: User): Promise<number> => {
	await user.hashPassword();
	return await repository.createUser(user);
};

const login = async (email: string, password: string): Promise<string> => {
	const user = await repository.getUserByEmail(email);
	const isValid = await user.verifyPassword(password);
	if (!isValid) throw new Error('Invalid credentials');
	return generateToken(user);
};

export default {
	createUser,
	login,
};
