import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  
  bookOfTheDay:Book
  averageRating
  picture
  loggedUser:User
  constructor(private userService:UserService,private bookService:BookService) { }

  ngOnInit(): void {
   
    this.loggedUser=JSON.parse(localStorage.getItem("logged")) as User
    if(this.loggedUser.picture==undefined)
    {
      this.loggedUser.picture="/assets/user.jpg"
      localStorage.setItem("logged", JSON.stringify(this.loggedUser));
    }
    
    this.bookService.getBookOfTheDay().subscribe((book)=>
    {
     this.bookOfTheDay=book as Book
     
     this.bookService.getAverageRating(this.bookOfTheDay._id).subscribe((data)=>
    {
      this.averageRating=data['averageRating']
      if(this.averageRating==-1)
      this.averageRating="There are no ratings for this book"

      if(this.averageRating=='-1')
     this.averageRating="There are no ratings for this book"
       
    })
     
    })
    
  }

id:number;
comment:string;


searchParam:string;


logout()
{
  this.userService.logout();

}

}
