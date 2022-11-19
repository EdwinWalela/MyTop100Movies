import User from '../models/User';
import repository from '../../src/repositories/user';

const createUser = async (user:User):Promise<number>=>{
  await user.hashPassword();
  return await repository.createUser(user);
}

export default {
  createUser
}