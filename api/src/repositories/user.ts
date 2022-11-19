import db from '../config/db'
import User from '../models/User'

const createUserQuery = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id;`

const createUser = async (user:User):Promise<number>=>{
  let res;
  try {
    res = await db.query(createUserQuery, [user.email, user.password]);
  } catch (error:any) {
    console.error('Failed to register user', error);
    throw new Error(error.message);
  }
  return res.rows[0]?.id;
}

export default {createUser}