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
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password, 'status': "accepted" }, (err, user, type) => {
                if (user) {
                    if (user.type == 0) {
                        console.log("admin se ne loguje ovde!");
                        res.json(null);
                    }
                    else
                        res.json(user);
                }
                else
                    res.json(null);
            });
        };
        this.loginAdmin = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password, 'type': 0 }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.register = (req, res) => {
            let username = req.body.username;
            let email = req.body.email;
            let limitRent;
            user_1.default.findOne({ username: "admin" }, (err, data, limit) => //admin prvi limit mora imati predefinisan
             {
                if (err)
                    console.log(err);
                limitRent = data.limit;
            });
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (user) {
                    res.status(200).json({ 'message': 'username exists' });
                }
                else {
                    user_1.default.findOne({ 'email': email, }, (err, user) => {
                        if (user) {
                            res.status(200).json({ 'message': 'email exists' });
                        }
                        else {
                            let user = new user_1.default({ firstname: req.body.firstname, lastname: req.body.lastname, username: req.body.username, password: req.body.password, type: req.body.type, telephone: req.body.telephone, email: req.body.email, address: req.body.address, status: req.body.status, picture: req.body.picture, limit: limitRent, rented: [] });
                            user.save().then(user => {
                                res.status(200).json({ 'message': 'user added' });
                            }).catch(err => {
                                res.status(400).json({ 'message': 'error' });
                            });
                        }
                    });
                }
            });
        };
        this.waitingUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let waitings = yield user_1.default.find({ status: "pending" });
            if (waitings)
                res.status(200).json(waitings);
            else
                console.log("Greska u pretrazi cekajucih");
        });
        this.adminAccept = (req, res) => {
            let username = req.body.username;
            user_1.default.collection.updateOne({ 'username': username }, { $set: { 'status': 'accepted' } });
            res.json({ 'message': 'ok' });
        };
        this.adminReject = (req, res) => {
            let username = req.body.username;
            user_1.default.collection.updateOne({ 'username': username }, { $set: { 'status': 'rejected' } });
            res.json({ 'message': 'ok' });
        };
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let users = yield user_1.default.find();
            if (users)
                res.status(200).json(users);
            else
                console.log("Greska u pretrazi usera");
        });
        this.findUser = (req, res) => {
            let username = req.body.username;
            //console.log(username);
            user_1.default.findOne({ 'username': username }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    //console.log("proso");
                    res.status(200).json(user);
                    //console.log(user);
                }
            });
        };
        this.updateUser = (req, res) => {
            let _id = req.body._id;
            let username = req.body.username;
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let password = req.body.password;
            let address = req.body.address;
            let telephone = req.body.telephone;
            let type = req.body.type;
            let status = req.body.status;
            let email = req.body.email;
            let picture = req.body.picture;
            user_1.default.updateOne({ _id: _id }, { $set: { 'status': status,
                    'username': username, 'firstname': firstname, 'lastname': lastname, 'password': password, 'address': address, 'telephone': telephone, 'type': type, 'email': email, 'picture': picture } }, (err, user) => {
                console.log(user);
                if (err)
                    console.log(err);
                else {
                    res.status(200).json({ "message": "User updated" });
                }
            });
        };
        this.checkRented = (req, res) => {
            let username = req.body.username;
            user_1.default.findOne({ username: username }, { numberOfRented: 1, status: 1 }, (err, user, status, numberOfRented) => {
                if (user) {
                    res.status(200).json(user);
                    //console.log(user);
                }
                else
                    console.log(err);
            });
        };
        this.deleteUser = (req, res) => {
            let username = req.body.username;
            user_1.default.collection.deleteOne({ 'username': username }, (err, news) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.changePass = (req, res) => {
            let username = req.body.username;
            let newPass = req.body.newPass;
            let oldPass = req.body.oldPass;
            user_1.default.findOne({ username: username }, { password: 1 }, (err, user, password) => {
                if (user) {
                    if (oldPass == user.password) {
                        user_1.default.updateOne({ username: username }, { $set: { 'password': newPass, } }, (err, user) => {
                            if (err)
                                console.log(err);
                            else
                                res.status(200).json({ 'message': 'Password updated' });
                        });
                    }
                    else
                        res.status(200).json({ 'message': 'Old password is not correct' });
                }
                else
                    console.log(err);
            });
        };
        this.updateLimit = (req, res) => {
            let limit = req.body.limit;
            user_1.default.updateMany({}, { $set: { limit: limit } }, (err) => {
                if (err)
                    console.log(err);
                res.json({ "message": "Limit successfully changed" });
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map