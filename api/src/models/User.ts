import bcrypt from 'bcryptjs';
import config from '../config/config';

class User{
  id?: number;
  email:string;
  password:string;

  constructor(email:string,password:string,id?:number){
    this.email = email;
    this.password =password;
    this.id = id;
  }
  async hashPassword() {
		let salt = await bcrypt.genSalt(config.saltRounds);
		let hash = await bcrypt.hash(this.password, salt);
		this.password = hash;
	}
  async verifyPassword(pass: string): Promise<boolean> {
		return await bcrypt.compare(pass, this.password);
	}
}

export default User