import express from 'express';
import { BooksController } from '../controllers/books.controller';

const booksRouter=express.Router();


booksRouter.route('/addBook').post(
    (req,res)=>new BooksController().addBook(req,res)
)
booksRouter.route('/getAllBooks').get(
    (req,res)=>new BooksController().getAllBooks(req,res)
)
booksRouter.route('/deleteBookIfNotRented').post(
    (req,res)=>new BooksController().deleteBookIfNotRented(req,res)
)

booksRouter.route('/findBookById').post(
    (req,res)=>new BooksController().findBookById(req,res)
)

booksRouter.route('/updateBook').post(
    (req,res)=>new BooksController().updateBook(req,res)
)
booksRouter.route('/searchByAuthor').post(
    (req,res)=>new BooksController().searchByAuthor(req,res)
)
booksRouter.route('/searchByName').post(
    (req,res)=>new BooksController().searchByName(req,res)
)
booksRouter.route('/searchByAuthorAndName').post(
    (req,res)=>new BooksController().searchByAuthorAndName(req,res)
)
booksRouter.route('/rentABook').post(
    (req,res)=>new BooksController().rentABook(req,res)
)
booksRouter.route('/getRentedBooks').post(
    (req,res)=>new BooksController().getRentedBooks(req,res)
)
booksRouter.route('/takeBackBook').post(
    (req,res)=>new BooksController().takeBackBook(req,res)
)
booksRouter.route('/getHistoryOfRentingBooks').post(
    (req,res)=>new BooksController().getHistoryOfRentingBooks(req,res)
)
booksRouter.route('/addComment').post(
    (req,res)=>new BooksController().addComment(req,res)
)
booksRouter.route('/getBookOfTheDay').get(
    (req,res)=>new BooksController().getBookOfTheDay(req,res)
)

booksRouter.route('/getAverageRating').post(
    (req,res)=>new BooksController().getAverageRating(req,res)
)

export default booksRouter