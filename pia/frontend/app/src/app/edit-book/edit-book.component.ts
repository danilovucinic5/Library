import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book:Book
  message:string
  picture:string
  pictureChanged=0
  loggedUser:User

  constructor(private bServis:BookService,private userService:UserService) { }

  ngOnInit(): void {
    this.loggedUser=JSON.parse(localStorage.getItem("logged"))
    this.bServis.findBookById().subscribe((data)=> //id u servisu
    {
      this.book=data as Book
      
    })
  }

  updateBook()
  {
    let writers
    writers=this.book.writers.toString()
    this.book.writers=writers.split(',')

    let genres
    genres=this.book.genres.toString()
    this.book.genres=genres.split(',')



    if(this.pictureChanged==1)
    this.book.picture=this.picture
    
    this.bServis.updateBook(this.book.name,this.book.writers,this.book.genres,this.book.publisher,this.book.publishYear,this.book.language,this.book.available,this.book.picture).subscribe((resp)=>
    {
      this.message=resp.message;

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
    this.userService.logout();
  
  }
}
