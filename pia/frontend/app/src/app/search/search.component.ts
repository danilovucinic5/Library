import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private bookService:BookService,private router:Router,private userService:UserService) { }

  name:String=""
  writer:String=""
  message:String=""
  books:Book[]
  loggedUser:User
  ngOnInit(): void {
  
    
    this.loggedUser=JSON.parse(localStorage.getItem("logged"))

    if(this.loggedUser==null)
    this.loggedUser=undefined
    
    this.bookService.getAllBooks().subscribe((books)=>
    {
      
      this.books=books as Book[]
    })
  }

  search()  //"moze dodati i || or undefined"
  {
    if (this.name=="" && this.writer!="")
    {
      this.bookService.searchByAuthor(this.writer).subscribe((books)=>
      {
        this.books=books as Book[]
        
        if (this.books.length==0)
        this.message="Nothing found"
        else this.message=""

      })
    }
    else if(this.writer=="" && this.name!="")
    {
      this.bookService.searchByName(this.name).subscribe((books)=>
      {
        this.books=books as Book[]

        if(this.books.length==0)                                                               
        this.message="Nothing found"
        else this.message=""

      })
    }
    else if(this.writer!="" && this.name!="")
    {
      this.bookService.searchByAuthorAndName(this.writer,this.name).subscribe((books)=>
      {
        this.books=books as Book[]

        if (this.books.length==0)
        this.message="Nothing found"
        else this.message=""

      })
    }
    else if(this.writer=="" && this.name=="")
    {
      this.bookService.getAllBooks().subscribe((books)=>
      {
        this.books=books as Book[]
        if (this.books.length==0)
        this.message="There are no books in system"
        else this.message=""
      })
    }
    
  }

  bookInfo(book)
  {
    this.bookService.bookForShowingInfo=book
    this.router.navigate(['rentBook']);
    
  }
  logout()
  {
    this.userService.logout();
  
  }
}
