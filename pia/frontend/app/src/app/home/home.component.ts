import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../models/book';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private bookService:BookService,private router:Router) { }
  bestBooks:Book[]=[]  //ako radis push u niz moras ga prvo ovako definisati!!!!!!!!!!!
  slideIndex=1
  loggedUser:User
  ngOnInit(): void {

     this.loggedUser=JSON.parse(localStorage.getItem("logged"))
    if(this.loggedUser!=undefined)
    {
      if(this.loggedUser.type==0)
      this.router.navigate(["/admin"]);
      else
      this.router.navigate(["/user"]);
    }

    this.bookService.getAllBooks().subscribe((data)=>
    {
      let allBooks=data as Book[]
      allBooks.sort(function(a,b){
        
         if(a.totalRents>b.totalRents)
         return -1;
         else return 1;

      });
      let n
      if(allBooks.length>=3)
      n=3
      else
      n=allBooks.length

      for(let i=0;i<n;i++)
      {
        this.bestBooks.push(allBooks[i])
      }
      setTimeout(() => {this.showSlides(this.slideIndex); }, 0); 
  })
}





plusSlides(n) {
  this.showSlides(this.slideIndex += n);
}


currentSlide(n) {
  this.showSlides(this.slideIndex = n);
}

showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {this.slideIndex = 1}
  if (n < 1) {this.slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[this.slideIndex-1].style.display = "block";
  dots[this.slideIndex-1].className += " active";
}




}
