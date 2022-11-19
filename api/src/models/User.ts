class User{
  id?: number;
  email:string;

  constructor(email:string,id?:number){
    this.email = email;
    this.id = id;
  }
}

export default User