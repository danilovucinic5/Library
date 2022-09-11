"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Book = new Schema({
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
});
exports.default = mongoose_1.default.model('Book', Book, 'books');
//# sourceMappingURL=book.js.map