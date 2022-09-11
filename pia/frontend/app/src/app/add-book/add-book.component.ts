import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  book:Book;
  message:string;
  genres:string;
  writers:string;
  picture:string
  loggedUser:User
  constructor(private bServis:BookService,private userService:UserService) { }

  ngOnInit(): void {
    this.loggedUser=JSON.parse(localStorage.getItem("logged"))
    this.book=new Book();
  }
  addBook()
  {
    this.book.writers = this.writers.split(',');
    this.book.genres = this.genres.split(',');
    this.book.picture=this.picture
    
    this.bServis.addBook(this.book).subscribe((resp)=>
    {
      this.message=resp.message;

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
    this.userService.logout();
  
  }
}
