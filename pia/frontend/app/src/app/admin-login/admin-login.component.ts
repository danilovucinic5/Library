import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private userServie:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  username:string;
  password:String;
  message:String="";


  login()
{
  
  this.userServie.loginAdmin(this.username,this.password).subscribe((user:User)=>{
    if(user) 
    {
      localStorage.setItem("logged", JSON.stringify(user));
        this.userServie.logged = user;
      
        this.message="";
        this.router.navigate(['/admin']);
     
      
    }
    else
    this.message="User is not valid"
  })
}
}
