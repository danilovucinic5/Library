import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-accepting',
  templateUrl: './admin-accepting.component.html',
  styleUrls: ['./admin-accepting.component.css']
})
export class AdminAcceptingComponent implements OnInit {


  waitingUsers: User[];

 // username:string;
  message:string;
  loggedUser:User
  constructor(private service: UserService,private router:Router) { }
  ngOnInit(): void {
    this.loggedUser=JSON.parse(localStorage.getItem("logged"))
      this.service.getWaitingUsers().subscribe(waitings => {
      this.waitingUsers = waitings as User[];
    })
  }

adminAccept(username:string)
{
  this.service.adminAccept(username).subscribe(message => {
    
    this.message="User accepted";
    this.service.getWaitingUsers().subscribe(waitings => {
      this.waitingUsers = waitings as User[];
    })
  })
  

}

adminReject(username:string)
{
  this.service.adminReject(username).subscribe(message => {
    
    this.message="User rejected";
    this.service.getWaitingUsers().subscribe(waitings => {
      this.waitingUsers = waitings as User[];
    })
  })
  
}
logout()
  {
    this.service.logout();
  
  }

}
