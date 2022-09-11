import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { bookWithDate } from '../models/bookWithDate';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-rented-books',
  templateUrl: './rented-books.component.html',
  styleUrls: ['./rented-books.component.css']
})
export class RentedBooksComponent implements OnInit {

  constructor(private bookServis:BookService,private userServis:UserService) { }

  books: bookWithDate[]
  message:string
  daysToReturnBook:Number
  comment:String
  rating:Number
  loggedUser:User
  ngOnInit(): void {
    this.loggedUser=JSON.parse(localStorage.getItem("logged"))
    this.bookServis.getRentedBooks(this.loggedUser.username).subscribe((data)=>
    //this.userServis.logged.username
    {
     this.books=data as bookWithDate[]
     if (this.books.length==0)
     this.message="You do not have rented books"
    })
    }

    calculateDiff(endDate)
  {
        let dateEnd=new Date(endDate)
        let today=new Date()
        var diff = Math.abs(dateEnd.getTime() - today.getTime());
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
        return diffDays
  }
        takeBack(id)
        {
          let user=JSON.parse(localStorage.getItem("logged"))
          this.bookServis.takeBackBook(id,user.username).subscribe((data)=>
          {
            //id,this.userServis.logged.username
            this.message=data['message'];
            this.bookServis.getRentedBooks(user.username).subscribe((data)=>
            {
              //this.userServis.logged.username
             this.books=data as bookWithDate[] 
             if (this.books.length==0)
                this.message="You do not have rented books"  
            })
          })
        }
        addComent(id)
        {
          let comment=this.comment
          let rating=this.rating

          if(comment==undefined && rating==undefined)
          {
            this.message="You have to write comment and give rating"
            return
          }
          let user=JSON.parse(localStorage.getItem("logged"))
          this.bookServis.addComment(id,user.username,comment,rating).subscribe((data)=>
          {
            //id,this.userServis.logged.username,comment,rating
            this.message=data['message'];
          })


        }
        logout()
        {
          this.userServis.logout();
        
        }
}
