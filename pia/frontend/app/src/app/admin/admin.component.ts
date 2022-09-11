import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService:UserService) { }

  limit:number
  message:string
  loggedUser:User
  picture
  ngOnInit(): void {
    this.loggedUser=JSON.parse(localStorage.getItem("logged"))
    if(this.loggedUser.picture==undefined)
    {
      this.loggedUser.picture="/assets/user.jpg"
      localStorage.setItem("logged", JSON.stringify(this.loggedUser));
    }

  }
  
  updateLimit()
  { 
    this.userService.updateLimit(this.limit).subscribe((data)=>
    {
      this.message=data['message']
    })

  }
  logout()
  {
    this.userService.logout();
  
  }
}
