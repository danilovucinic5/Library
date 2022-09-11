import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-all-users',
  templateUrl: './admin-all-users.component.html',
  styleUrls: ['./admin-all-users.component.css']
})
export class AdminAllUsersComponent implements OnInit {

  constructor(private service :UserService,private router:Router) { }

  allUsers: User[];
  message:string
  loggedUser:User
  ngOnInit(): void {
    this.loggedUser=JSON.parse(localStorage.getItem("logged"))
      this.service.geAllUsers().subscribe(users => {
      this.allUsers = users as User[];
      this.message="";
       }) 
      }
  updateUser(username:string)
  {
    this.service.usernameToUpdateAdmin=username;
    this.router.navigate(['/admin/updateUser']);
  }
  
  deleteUser(username:string)
  {
    this.service.checkRentedForUser(username).subscribe(user => {
    let userr=user as User
    let rent =userr.numberOfRented
     if (rent>0)
     {
      this.message="You can`t delete user with books rented";
     }
     else
     {
      this.service.deleteUser(username).subscribe(deleted => {


        this.service.geAllUsers().subscribe(users => {
      this.allUsers = users as User[];
      this.message="User deleted";
       }) 
       
      })

     }
       }) 
    
  }


  logout()
  {
    this.service.logout();
  
  }
}
