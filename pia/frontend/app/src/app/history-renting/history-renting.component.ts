import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { bookWithDate } from '../models/bookWithDate';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-history-renting',
  templateUrl: './history-renting.component.html',
  styleUrls: ['./history-renting.component.css']
})
export class HistoryRentingComponent implements OnInit {

  books:bookWithDate[]
  message:string
  sortType:string
  side:number
  loggedUser:User
  constructor(private bookServis:BookService,private userServis:UserService,private router:Router) { }

  ngOnInit(): void {
    this.loggedUser=JSON.parse(localStorage.getItem("logged"))
    this.bookServis.getHistoryOfRentingBooks(this.loggedUser.username).subscribe((data)=>
    //this.userServis.logged.username u zagradi
    {
     this.books=data as bookWithDate[]
     if (this.books.length==0)
     this.message="You do not have history of renting books"  
     this.side=1
     this.books.sort(this.sortDateReturned)  
    })
  }
sortDateReturned = (b1, b2) => 
{
    if (b1.endDate > b2.endDate) 
    return (-1 * this.side);
    else 
    return (1 * this.side);
}
sortDateStarted = (b1, b2) => 
{
    if (b1.startDate > b2.startDate) 
    return (-1 * this.side);
    else 
    return (1 * this.side);
}
sortByName = (b1, b2) => 
{
    if (b1.book.name[0] > b2.book.name[0]) 
    return (-1 * this.side);
    else 
    return (1 * this.side);
}
sortByWriter = (b1, b2) => 
{
    if (b1.book.writers[0] > b2.book.writers[0]) 
    return (-1 * this.side);
    else 
    return (1 * this.side);
}
sort() 
{
  let sortFunction;
  switch (this.sortType) 
  {
    case "writer": 
      sortFunction = this.sortByWriter;
      break;

    case "name":
      sortFunction = this.sortByName;
      break;

    case "dateStart":
      sortFunction = this.sortDateStarted;
      break;

    case "dateEnd":
     
      sortFunction = this.sortDateStarted;
      break;

    default:
      break;
  }
   this.books.sort(sortFunction);
}


bookInfo(book)
  {
    this.bookServis.bookForShowingInfo=book
    this.router.navigate(['rentBook']);
    
  }

  logout()
  {
    this.userServis.logout();
  
  }
}
