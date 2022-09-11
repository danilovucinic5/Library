import { Comment } from "./comment";

export class Book {

    _id: string;
    numberOfRented: number;
    picture: String;
    name: String;
    writers: Array<String>;
    genres: Array<String>;
    publisher: String;
    publishYear: Number;
    language: String;
    totalRents:Number
    available: number;
    comments: Array<Comment>;
    
}