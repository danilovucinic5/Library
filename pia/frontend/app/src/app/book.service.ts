import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from './models/book';

export interface Response {
  
  message: string
}


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient,private router:Router) { }
  uri='http://localhost:4000/books';

  
  idBookToBeUpdated:string
  bookForShowingInfo:Book


  addBook(book:Book)
  {
    return this.http.post<Response>(`${this.uri}/addBook`,book)
  }
  getAllBooks()
  {
    return this.http.get(`${this.uri}/getAllBooks`)
  }
  deleteBookIfNotRented(id)
  {
    let data=
    {
      id:id
    }
    return this.http.post<Response>(`${this.uri}/deleteBookIfNotRented`,data)
  }
  findBookById()
  {
    let data=
    {
      id:this.idBookToBeUpdated
    }
    return this.http.post(`${this.uri}/findBookById`,data)
  }

  updateBook(name,writers,genres,publisher,publishYear,language,available,picture)
  {
   
    let data=
    {
      name:name,
      id:this.idBookToBeUpdated,
      writers:writers,
      genres:genres,
      publisher:publisher,
      publishYear:publishYear,
      language:language,
      available:available,
      picture:picture
    }
    return this.http.post<Response>(`${this.uri}/updateBook`,data)
  }
  

  searchByName(name)
  {
    let data=
    {
      name:name
    }
    return this.http.post(`${this.uri}/searchByName`,data)

  }

  searchByAuthor(author)
  {
    let data=
    {
      author:author
    }
    return this.http.post(`${this.uri}/searchByAuthor`,data)

  }

  searchByAuthorAndName(author,name)
  {

    let data=
    {
      author:author,
      name:name
    }


    return this.http.post(`${this.uri}/searchByAuthorAndName`,data)

  }
  rentABook(bookId,username)
  {
    let data=
    {
      bookId:bookId,
      username:username
    }
    return this.http.post(`${this.uri}/rentABook`,data)
  }

  getRentedBooks(username)
  {
    let data=
    {
      username:username
    }
    return this.http.post(`${this.uri}/getRentedBooks`,data)
  }

  takeBackBook(bookId,username)
  {
    let data=
    {
      bookId:bookId,
      username:username
    }

    return this.http.post(`${this.uri}/takeBackBook`,data)

  }

  getHistoryOfRentingBooks(username)
  {
    let data=
    {
      username:username
    }

    return this.http.post(`${this.uri}/getHistoryOfRentingBooks`,data)

  }

  addComment(id,username,comment,rating)
  {
    let data=
    {
      id:id,
      username:username,
      comment:comment,
      rating:rating
    }

    return this.http.post(`${this.uri}/addComment`,data)

  }

  getBookOfTheDay()
  {
    return this.http.get(`${this.uri}/getBookOfTheDay`)
  }


  getAverageRating(id)
  {
    let data=
    {
      id:id
    }
    return this.http.post(`${this.uri}/getAverageRating`,data)
  }

 

}
