"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const book_1 = __importDefault(require("../models/book"));
const user_1 = __importDefault(require("../models/user"));
class BooksController {
    constructor() {
        this.addBook = (req, res) => {
            let newBook = new book_1.default({
                name: req.body.name,
                writers: req.body.writers,
                genres: req.body.genres,
                publisher: req.body.publisher,
                publishYear: req.body.publishYear,
                language: req.body.language,
                rentals: [],
                available: req.body.available,
                comments: [],
                numberOfRented: 0,
                picture: req.body.picture,
                totalRents: 0
            });
            newBook.save().then(book => {
                res.status(200).json({ 'message': 'Book added' });
            }).catch(err => {
                console.log(err);
                res.status(400).json({ 'message': 'error' });
            });
        };
        this.getAllBooks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let books = yield book_1.default.find();
            if (books) {
                res.status(200).json(books);
            }
            else
                console.log("greska u pretrazi knjiga");
        });
        this.deleteBookIfNotRented = (req, res) => {
            let id = req.body.id;
            book_1.default.findOne({ '_id': id }, { numberOfRented: 1 }, (err, book) => {
                if (book.numberOfRented > 0) {
                    res.status(200).json({ 'message': 'You cant delete rented book!' });
                }
                else {
                    book_1.default.deleteOne({ '_id': id }, (err, message) => //findOne i deleteOne ne rade sa jebenim collection
                     {
                        console.log(message);
                    });
                    res.status(200).json({ 'message': 'Book deleted!' });
                }
            });
        };
        this.findBookById = (req, res) => {
            let id = req.body.id;
            book_1.default.findOne({ '_id': id }, (err, book, message) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json(book);
                }
                console.log(message);
            });
        };
        this.updateBook = (req, res) => {
            book_1.default.updateOne({ '_id': req.body.id }, { $set: { 'name': req.body.name,
                    'writers': req.body.writers, 'genres': req.body.genres, 'publisher': req.body.lastname, 'picture': req.body.picture, 'publishYear': req.body.publishYear, 'language': req.body.language, 'available': req.body.available } }, (err, book, message) => {
                if (err)
                    console.log(err);
                if (book) {
                    res.status(200).json({ "message": "Book updated" });
                }
            });
        };
        this.searchByAuthor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let author = req.body.author;
            let books = yield book_1.default.find({ 'writers': { $regex: author, $options: 'i' } });
            if (books)
                res.status(200).json(books);
            else
                console.log("GRESKA U PRETRAZI");
        });
        this.searchByName = (req, res) => {
            let name = req.body.name;
            book_1.default.find({ 'name': { $regex: name, $options: 'i' } }, (err, books) => {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.searchByAuthorAndName = (req, res) => {
            let author = req.body.author;
            let name = req.body.name;
            book_1.default.find({
                "$and": [
                    { name: { '$regex': name, '$options': 'i' } },
                    { writers: { '$regex': author, '$options': 'i' } }
                ]
            }).then((books) => {
                res.json(books);
            });
        };
        this.rentABook = (req, res) => {
            let bookId = req.body.bookId;
            let username = req.body.username;
            user_1.default.findOne({ 'username': username }, { numberOfRented: 1 }, (err, data, numberOfRented) => {
                if (err)
                    console.log(err);
                else {
                    if (data.numberOfRented == 3)
                        res.json({ 'message': "You are already renting 3 books" });
                    else {
                        book_1.default.findOne({ '_id': bookId }, { available: 1 }, (err, data, available) => {
                            if (err)
                                console.log(err);
                            else {
                                if (data.available == 0)
                                    res.json({ 'message': "The book is not available" });
                                else {
                                    user_1.default.findOne({ 'username': username }, { rented: 1, limit: 1 }, (err, user) => {
                                        if (err)
                                            console.log(err);
                                        if (user) {
                                            let startDate = new Date();
                                            let endDate = new Date();
                                            endDate.setDate(startDate.getDate() + user.limit);
                                            if (this.checkIfStillRenting(user.rented, bookId)) {
                                                res.json({ 'message': "You are already renting this book" });
                                            }
                                            else {
                                                if (this.checkIfStole(user.rented)) {
                                                    res.json({ 'message': "You did not give back our book on time, so you can not take new one" });
                                                }
                                                else {
                                                    user_1.default.updateOne({ "username": username }, { $push: { "rented": { "bookId": bookId, "startDate": startDate, "endDate": endDate } } }, (err) => {
                                                        if (err)
                                                            console.log(err);
                                                    });
                                                    user_1.default.updateOne({ "username": username }, { $inc: { numberOfRented: 1 } }, (err) => {
                                                        if (err)
                                                            console.log(err);
                                                    });
                                                    book_1.default.updateOne({ _id: bookId }, { $inc: { numberOfRented: 1, available: -1, totalRents: 1 } }, (err) => {
                                                        if (err)
                                                            console.log(err);
                                                    });
                                                    res.json({ 'message': "You took this book" });
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        };
        this.getRentedBooks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let username = req.body.username;
            let books = [];
            let book;
            let user = yield user_1.default.findOne({ username: username }, { rented: 1 });
            for (let i = 0; i < user.rented.length; i++) {
                if (user.rented[i].dateReturned == undefined) {
                    book = yield book_1.default.findOne({ '_id': user.rented[i].bookId });
                    books.push({
                        book: book,
                        startDate: user.rented[i].startDate,
                        endDate: user.rented[i].endDate
                    });
                }
            }
            res.json(books);
        });
        this.takeBackBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let bookId = req.body.bookId;
            let username = req.body.username;
            let today = new Date();
            let user = yield user_1.default.findOne({ username: username }, { rented: 1 });
            for (let i = 0; i < user.rented.length; i++) {
                if (user.rented[i].dateReturned == undefined && user.rented[i].bookId == bookId) {
                    user.rented[i].dateReturned = today;
                    break;
                }
            }
            yield user_1.default.updateOne({ username: username }, { $set: { rented: user.rented } });
            yield user_1.default.updateOne({ username: username }, { $inc: { numberOfRented: -1 } });
            yield book_1.default.updateOne({ _id: bookId }, { $inc: { available: 1 } });
            yield book_1.default.updateOne({ _id: bookId }, { $inc: { numberOfRented: -1 } });
            res.json({ "message": "You successfully returned book" });
        });
        this.getHistoryOfRentingBooks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let username = req.body.username;
            let books = [];
            let book;
            let user = yield user_1.default.findOne({ username: username }, { rented: 1 });
            for (let i = 0; i < user.rented.length; i++) {
                if (user.rented[i].dateReturned != undefined) {
                    book = yield book_1.default.findOne({ '_id': user.rented[i].bookId });
                    books.push({
                        book: book,
                        startDate: user.rented[i].startDate,
                        endDate: user.rented[i].dateReturned
                    });
                }
            }
            res.json(books);
        });
        this.addComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.body.id;
            let username = req.body.username;
            let comment = req.body.comment;
            let rating = req.body.rating;
            let today = new Date();
            if (yield this.checkIfCommented(id, username)) {
                res.json({ "message": "You already commented this book" });
            }
            else {
                book_1.default.updateOne({ _id: id }, { $push: { comments: { text: comment, username: username, rating: rating, date: today } } }, (err) => {
                    if (err)
                        console.log(err);
                    res.json({ "message": "Comment added" });
                });
            }
        });
        this.getBookOfTheDay = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let allBooks;
            let today = new Date();
            let sum = today.getDate() + today.getMonth() + today.getFullYear();
            allBooks = yield book_1.default.find();
            let n = allBooks.length;
            let i = sum % n;
            res.json(allBooks[i]);
        });
        this.getAverageRating = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.body.id;
            let book = yield book_1.default.findOne({ '_id': id }, { comments: 1 });
            //Ne prebacuj ovo u promenjivu radi sa ovakvim nizom
            if (book.comments.length == 0)
                res.json({ 'averageRating': '-1' });
            else {
                let sum = 0; // moze dopuna ako neko nije bacio rating to nisam uradio sad
                for (let i = 0; i < book.comments.length; i++) {
                    sum += book.comments[i]['rating'];
                }
                let avg = sum / book.comments.length;
                res.json({ 'averageRating': avg });
            }
        });
    }
    checkIfStole(rented) {
        let stole = false;
        let thisDay = new Date();
        rented.forEach(book => {
            if (book.dateReturned == undefined) {
                if (thisDay > book.endDate)
                    stole = true;
            }
        });
        return stole;
    }
    checkIfStillRenting(rented, bookId) {
        let contains = false;
        rented.forEach(book => {
            if (book.dateReturned == undefined && book.bookId == bookId)
                contains = true;
        });
        return contains;
    }
    checkIfCommented(id, username) {
        return __awaiter(this, void 0, void 0, function* () {
            let commented = false;
            let book = yield book_1.default.findOne({ _id: id }, { comments: 1 });
            let comments = book.comments;
            for (let i = 0; i < comments.length; i++) {
                if (comments[i].username == username) {
                    commented = true;
                    break;
                }
            }
            return commented;
        });
    }
}
exports.BooksController = BooksController;
//# sourceMappingURL=books.controller.js.map