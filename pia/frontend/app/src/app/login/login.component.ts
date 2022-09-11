import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userServie:UserService,private router:Router) { }

  ngOnInit(): void {
  }
username:string;
password:String;
message:String="";

login()
{
  
  this.userServie.login(this.username,this.password).subscribe((user:User)=>{

    if(user!=null) 
    {
      localStorage.setItem("logged", JSON.stringify(user));
        this.userServie.logged = user;
      
      if(user.type==1 || user.type==2)
      {
        this.message="";
        this.router.navigate(['/user']);
      }
      else if (user.type==0)
      {
        this.message="";
        this.router.navigate(['/admin']);
      }
      
    }
    else
    this.message="User is not valid"
  })
}

}
