import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import service from '../services/auth';

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = new User(email, password);
  let id:number;

  if (!email || !password) {
    return res.status(400).send({
      message: 'Required fields missing',
    })
  }

  try {
    id = await service.createUser(user);
    res.status(201).send({
      message: 'User created',
      id:id
    })
  } catch (error:any) {
    res.status(400).send({
      error
    })
  }
}

export default{
  registerUser
}