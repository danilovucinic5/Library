import express from 'express';
import { UserController } from '../controllers/user.controller';
const userRouter=express.Router();

 userRouter.route('/login').post(
    (req,res)=>new UserController().login(req,res)
 )

 userRouter.route('/loginAdmin').post(
   (req,res)=>new UserController().loginAdmin(req,res)
)
 
    userRouter.route('/register').post(
   (req,res)=>new UserController().register(req,res)
)
   userRouter.route('/adminAccept').post(
   (req,res)=>new UserController().adminAccept(req,res)
   )
   userRouter.route('/adminReject').post(
      (req,res)=>new UserController().adminReject(req,res)
      )
   userRouter.route('/waitingUsers').get(
   (req,res)=>new UserController().waitingUsers(req,res)
 
)

   userRouter.route('/getUsers').get(
   (req,res)=>new UserController().getUsers(req,res)
 
)
userRouter.route('/findUser').post(
   (req,res)=>new UserController().findUser(req,res)
   )

   userRouter.route('/updateUser').post(
      (req,res)=>new UserController().updateUser(req,res)
      )
      userRouter.route('/checkRented').post(
         (req,res)=>new UserController().checkRented(req,res)
         )     

         userRouter.route('/deleteUser').post(
            (req,res)=>new UserController().deleteUser(req,res)
            )     
         
            userRouter.route('/changePass').post(
               (req,res)=>new UserController().changePass(req,res)
               )     


               userRouter.route('/updateLimit').post(
                  (req,res)=>new UserController().updateLimit(req,res)
                  )     

               
 export default userRouter;