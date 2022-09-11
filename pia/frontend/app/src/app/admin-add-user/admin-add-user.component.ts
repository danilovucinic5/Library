import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css']
})
export class AdminAddUserComponent implements OnInit {

  constructor(private servis: UserService) { }
  loggedUser:User
  ngOnInit(): void {
    this.loggedUser=JSON.parse(localStorage.getItem("logged"))
  }
  firstname:string;
  lastname:string;
  username:string;
  password:string;
  passwordVer:string;
  address:string;
  telephone:number;
  email:string;
  type:number;
  status:string="accepted";
  messageError:string="";
  messageCorrect:string="";
  picture:string
  
checkPassRegex()
  {
    let reg= new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
      return reg.test(this.password)
  }
  checkPassVer()
  {
    if (this.password != this.passwordVer)
    return false;
    else return true;
  }
  
  checkFields()
  {
    if (this.firstname == "" || this.firstname==undefined) return false;
    if (this.lastname == "" || this.lastname==undefined) return false;
    if (this.username == "" || this.username==undefined) return false;
    if (this.password == "" || this.password==undefined) return false;
    if (this.passwordVer == "" || this.passwordVer==undefined) return false;
    if (this.address == "" || this.address==undefined) return false;
    if (this.telephone==undefined) return false;
    if (this.email == "" || this.email==undefined) return false;
    return true;
  }
  
  register()
  { 
    if(!this.checkFields())
    {
      this.messageError="ALL FIELDS MUST BE FILLED!"
      this.messageCorrect="";
      return
    }
    if (!this.checkPassVer())
   {
    this.messageError="PASSWORD AND REPEATED PASSWORD ARE NOT THE SAME!"
    this.messageCorrect="";
    return;
   }
   if (!this.checkPassRegex())
   {
    this.messageError="PASSWORD VERIFICATION FALSE!PASSWORD MUST CONTAINS SMALL LETTER, BIG LETTER, NUMBER, SPECIAL CHARACTER AND LENGTH MUST BE MINIMUM 8"
    this.messageCorrect="";
    return;
  
   }
   
    this.servis.registerUser(this.firstname,this.lastname,this.username,this.password,this.type,this.address,this.telephone,this.email,this.status,this.picture).subscribe((resp)=>
    {
  
  
     if(resp['message']=='user added'){
        this.messageError=""
        this.messageCorrect="User added";
      }
      else if(resp['message']=='username exists'){
        this.messageError="This username already exists"
        this.messageCorrect="";
      }
      else if(resp['message']=='email exists'){
        this.messageError="This email already exists"
        this.messageCorrect="";
      }
      else
      {
        this.messageError="Error!"
        this.messageCorrect="";
        
      }
    })
  
  }
  async uploadFile(event) 
{
  const file = event.target.files[0]
  this.picture =await this.getPicture(file);
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