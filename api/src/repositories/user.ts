import db from '../config/db'
import User from '../models/User'

const createUserQuery = `INSERT INTO "User"(email, password) VALUES ($1, $2) RETURNING id;`
const getUserByEmailQuery = `SELECT * FROM "User" WHERE email = $1;`

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

const getUserByEmail = async (email:string):Promise<User>=>{
  let res;
  try {
    res = await db.query(getUserByEmailQuery, [email]);
  } catch (error:any) {
    console.error('Failed to get user by email', error);
    throw new Error(error.message);
  }

  if(res.rowCount === 0) throw new Error('User not found');

  return new User(
    res.rows[0]?.email,
    res.rows[0]?.password,
    res.rows[0]?.id
  )
}

export default {createUser,getUserByEmail}