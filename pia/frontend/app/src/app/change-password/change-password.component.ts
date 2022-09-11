import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private servis:UserService,private router:Router) { }


oldPass:string
newPass:string
newPassRepeat:string
message:string=""
usernameToChangePassword;
loggedUser:User

  ngOnInit(): void {
    this.loggedUser=JSON.parse(localStorage.getItem("logged")) 

    this.usernameToChangePassword=this.loggedUser.username;
    //this.servis.logged.username
  }

  checkPassRegex()
{
  let reg= new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    return reg.test(this.newPass)
}
checkPassVer()
{
  if (this.newPass != this.newPassRepeat)
  return false;
  else return true;
}

checkFields()
{
  if (this.oldPass == "" || this.oldPass==undefined) return false;
  if (this.newPass == "" || this.newPass==undefined) return false;
  if (this.newPassRepeat == "" || this.newPassRepeat==undefined) return false;
  
  return true;
}

  changePass()
  {
    if(!this.checkFields())
    {
      this.message="All fields must be filled"
      return
    }
    if(!this.checkPassRegex())
    {
      this.message="Password must contain small letter, big letter, digit, special character and length must be minimum 8!"
      return 
    }
    if(!this.checkPassVer())
    {
      this.message="New password and repeated new password must be the same"
      return 
    }
    this.servis.changePassIfCorrect(this.usernameToChangePassword,this.oldPass,this.newPass).subscribe((data=>
      {
       
        this.message=data.message;
        if(this.message!="Old password is not correct")
        {
          setTimeout(() => 
{
  this.servis.logout();
},
2000);
        
        }
        

      }))
    {

    }

  }


  logout()
  {
    this.servis.logout();
  
  }

}
function resolve(resolve: any, arg1: number) {
  throw new Error('Function not implemented.');
}

