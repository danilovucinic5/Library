"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("../controllers/books.controller");
const booksRouter = express_1.default.Router();
booksRouter.route('/addBook').post((req, res) => new books_controller_1.BooksController().addBook(req, res));
booksRouter.route('/getAllBooks').get((req, res) => new books_controller_1.BooksController().getAllBooks(req, res));
booksRouter.route('/deleteBookIfNotRented').post((req, res) => new books_controller_1.BooksController().deleteBookIfNotRented(req, res));
booksRouter.route('/findBookById').post((req, res) => new books_controller_1.BooksController().findBookById(req, res));
booksRouter.route('/updateBook').post((req, res) => new books_controller_1.BooksController().updateBook(req, res));
booksRouter.route('/searchByAuthor').post((req, res) => new books_controller_1.BooksController().searchByAuthor(req, res));
booksRouter.route('/searchByName').post((req, res) => new books_controller_1.BooksController().searchByName(req, res));
booksRouter.route('/searchByAuthorAndName').post((req, res) => new books_controller_1.BooksController().searchByAuthorAndName(req, res));
booksRouter.route('/rentABook').post((req, res) => new books_controller_1.BooksController().rentABook(req, res));
booksRouter.route('/getRentedBooks').post((req, res) => new books_controller_1.BooksController().getRentedBooks(req, res));
booksRouter.route('/takeBackBook').post((req, res) => new books_controller_1.BooksController().takeBackBook(req, res));
booksRouter.route('/getHistoryOfRentingBooks').post((req, res) => new books_controller_1.BooksController().getHistoryOfRentingBooks(req, res));
booksRouter.route('/addComment').post((req, res) => new books_controller_1.BooksController().addComment(req, res));
booksRouter.route('/getBookOfTheDay').get((req, res) => new books_controller_1.BooksController().getBookOfTheDay(req, res));
booksRouter.route('/getAverageRating').post((req, res) => new books_controller_1.BooksController().getAverageRating(req, res));
exports.default = booksRouter;
//# sourceMappingURL=books.routes.js.map