import mongoose from 'mongoose';

const Schema=mongoose.Schema;

let Book=new Schema
(
    {
      
        name: {
            type: String
        },
        writers: {
            type: Array
        },
        genres: {
            type: Array
        },
        publisher: {
            type: String
        }, totalRents: {
            type: Number
        },
        publishYear: {
            type: Number
        },
        language: {
            type: String
        },
        
        available: {
            type: Number
        },
        comments: {
            type: Array
        },
        numberOfRented: {
            type: Number
        }, picture: {
            type: String
        }

    }
)
export default mongoose.model('Book',Book,'books');
