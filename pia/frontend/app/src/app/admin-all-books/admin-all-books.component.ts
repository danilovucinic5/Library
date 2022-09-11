import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-all-books',
  templateUrl: './admin-all-books.component.html',
  styleUrls: ['./admin-all-books.component.css']
})
export class AdminAllBooksComponent implements OnInit {

  constructor(private bServis:BookService,private router:Router,private servis:UserService) { }
  
  books:Book[];
  message:String;
  loggedUser:User
  ngOnInit(): void {
    this.loggedUser=JSON.parse(localStorage.getItem("logged"))
    this.bServis.getAllBooks().subscribe((data)=>
    {
      this.books=data as Book[];

    })
  }
  updateBook(id)
  {
    this.bServis.idBookToBeUpdated=id;
    this.router.navigate(['editBook']);
    
  }
  deleteBook(id)
  {
    this.bServis.deleteBookIfNotRented(id).subscribe((resp)=>
    {
      this.message=resp.message;
      this.bServis.getAllBooks().subscribe((data)=>
    {
      this.books=data as Book[];

    })
    });
  }

  logout()
  {
    this.servis.logout();
  
  }
}
