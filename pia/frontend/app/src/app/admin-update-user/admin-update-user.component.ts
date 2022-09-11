import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-update-user',
  templateUrl: './admin-update-user.component.html',
  styleUrls: ['./admin-update-user.component.css']
})
export class AdminUpdateUserComponent implements OnInit {

  constructor(private servis:UserService,private router:Router) { }

  user:User;
  message:string //dodati 
  picture:string
  pictureChanged=0
  loggedUser:User
  ngOnInit(): void {
    this.loggedUser=JSON.parse(localStorage.getItem("logged"))
    let username=this.servis.usernameToUpdateAdmin;
    this.servis.findUserByUsername(username).subscribe(user=>{
      this.user=user as User; 
    })

  }

updateUser()
{
  if(this.pictureChanged==1)
  this.user.picture=this.picture  

  

  this.servis.updateUser(this.user._id,this.user.firstname,this.user.lastname,this.user.username,this.user.password,this.user.type,this.user.address,this.user.telephone,this.user.email,this.user.status,this.user.picture).subscribe(data=>{
    
   this.message=data['message'];
  })
 
}
async uploadFile(event) 
{
  const file = event.target.files[0]
  this.picture =await this.getPicture(file);
  this.pictureChanged=1
}

async getPicture(fileBlob):Promise<string>
{  
  let reader: any = new FileReader();

  return 'data:image/png;base64,'+ await new Promise((resolve)=>
  {
    reader.onloadend=()=>
    {
      resolve(reader.result.split(",")[1]);
      }
    reader.readAsDataURL(fileBlob);
  });
}
logout()
  {
    this.servis.logout();
  
  }
}
