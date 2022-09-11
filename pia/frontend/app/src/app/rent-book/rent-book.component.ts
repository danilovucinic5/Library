import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-rent-book',
  templateUrl: './rent-book.component.html',
  styleUrls: ['./rent-book.component.css']
})
export class RentBookComponent implements OnInit {

  book:Book
  message:string
  averageRating
  loggedUser:User
  constructor(private bookService:BookService,private userService:UserService,private router:Router) { }

 
  ngOnInit(): void 
  {
    this.loggedUser=JSON.parse(localStorage.getItem("logged"))   //mora parse da bi znao nzm kako u searchu radi bez
    this.book=this.bookService.bookForShowingInfo;
    this.book.comments.sort(this.sortFunction);
    this.bookService.getAverageRating(this.book._id).subscribe((data)=>
    {
      this.averageRating=data['averageRating']
      if(this.averageRating==-1)
      this.averageRating="There are no ratings for this book"
    })
  }
  sortFunction = (b1, b2) => 
  {
      if (b1.endDate > b2.endDate) 
      return -1 
      else 
      return 1 
  }
  rentBook(id)
  {
    let user=JSON.parse(localStorage.getItem("logged"))
    this.bookService.rentABook(id,user.username).subscribe((data)=>
    {
      //id,this.userService.logged.username
      this.message=data['message'];

    })

  }
  editBook(id)
  {
    this.bookService.idBookToBeUpdated=id;
    this.router.navigate(['editBook'])
  }
  deleteBook(id)
  {
    this.bookService.deleteBookIfNotRented(id).subscribe((resp)=>
    {
      this.message=resp.message;
     
    });
  }

  logout()
  {
    this.userService.logout();
  
  }
}
