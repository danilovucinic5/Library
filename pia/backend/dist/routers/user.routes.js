"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/loginAdmin').post((req, res) => new user_controller_1.UserController().loginAdmin(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/adminAccept').post((req, res) => new user_controller_1.UserController().adminAccept(req, res));
userRouter.route('/adminReject').post((req, res) => new user_controller_1.UserController().adminReject(req, res));
userRouter.route('/waitingUsers').get((req, res) => new user_controller_1.UserController().waitingUsers(req, res));
userRouter.route('/getUsers').get((req, res) => new user_controller_1.UserController().getUsers(req, res));
userRouter.route('/findUser').post((req, res) => new user_controller_1.UserController().findUser(req, res));
userRouter.route('/updateUser').post((req, res) => new user_controller_1.UserController().updateUser(req, res));
userRouter.route('/checkRented').post((req, res) => new user_controller_1.UserController().checkRented(req, res));
userRouter.route('/deleteUser').post((req, res) => new user_controller_1.UserController().deleteUser(req, res));
userRouter.route('/changePass').post((req, res) => new user_controller_1.UserController().changePass(req, res));
userRouter.route('/updateLimit').post((req, res) => new user_controller_1.UserController().updateLimit(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map