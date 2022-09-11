import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from './models/user';
import { Router } from '@angular/router';



export interface Response {
  
  message: string
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private router:Router) { }


logged:User;
usernameToUpdateAdmin:string;


uri='http://localhost:4000/users';

  login(username,password)
  {
   const data={
    username:username,
    password:password
   }

  return this.http.post(`${this.uri}/login`,data);
  }
  loginAdmin(username,password)
  {
   const data={
    username:username,
    password:password
   }

  return this.http.post(`${this.uri}/loginAdmin`,data);
  }

  geAllUsers()
  {

    return this.http.get(`${this.uri}/getUsers`);
  }

  registerUser(firstname,lastname,username,password,type,address,telephone,email,status,picture)
  {    
    const data={
      firstname:firstname,
      lastname:lastname,
      username:username,
      password:password,
      type:type,
      address:address,
      telephone:telephone,
      email:email,
      status:status,
      picture:picture
    }
    return this.http.post(`${this.uri}/register`,data);
  }
  
  logout() 
  {
    this.logged = undefined;
    localStorage.removeItem("logged");
    this.router.navigate(['']);
  }

  getWaitingUsers()
  {
    return this.http.get(`${this.uri}/waitingUsers`);
    
  }
  
  adminAccept(username)
  {
    const data={
      username:username
     }
  
    return this.http.post(`${this.uri}/adminAccept`,data);
  }

  adminReject(username)
  {
    const data={
      username:username
     }
  
    return this.http.post(`${this.uri}/adminReject`,data);
    
  }
  findUserByUsername(username)
  {
    const data={
      username:username
     }
    return this.http.post(`${this.uri}/findUser`,data);
  }

  updateUser(_id,firstname,lastname,username,password,type,address,telephone,email,status,picture)
  {
    
    const data={
      _id:_id,
      firstname:firstname,
      lastname:lastname,
      password:password,
      username:username,
      type:type,
      address:address,
      telephone:telephone,
      email:email,
      status:status,
      picture:picture
     }

     
     return this.http.post(`${this.uri}/updateUser`,data);
  }
  

  checkRentedForUser(username)
  {
    const data={
      username:username
     }

     return this.http.post(`${this.uri}/checkRented`,data);
  }

  deleteUser(username)
  {
    const data={
      username:username
     }

     return this.http.post(`${this.uri}/deleteUser`,data);
  }

  changePassIfCorrect(username,oldPass,newPass)
  {
    const data={
      username:username,
      oldPass:oldPass,
      newPass:newPass
     }

     return this.http.post<Response>(`${this.uri}/changePass`,data);

  }

  updateLimit(limit)
  {
    let data=
    {
      limit:limit
    }
    return this.http.post(`${this.uri}/updateLimit`,data);
  }





}
