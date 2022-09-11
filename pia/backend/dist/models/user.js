"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: Number
    },
    rented: {
        type: Array
    },
    telephone: {
        type: Number
    },
    email: {
        type: String
    },
    status: {
        type: String
    },
    address: {
        type: String
    },
    picture: {
        type: String
    },
    numberOfRented: {
        type: Number
    }, limit: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('User', User, 'users');
//# sourceMappingURL=user.js.map