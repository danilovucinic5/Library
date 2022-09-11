import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService:UserService) { }


  
  loggedUser:User
  ngOnInit(): void {
   this.loggedUser=JSON.parse(localStorage.getItem("logged"))
    
    
  }


  logout()
  {
    this.userService.logout();
  
  }

}
