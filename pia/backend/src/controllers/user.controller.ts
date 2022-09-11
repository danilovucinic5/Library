import * as express from 'express';
import user from '../models/user';
import User from '../models/user'
export class UserController
{
    login=(req:express.Request,res:express.Response)=>
    {
        let username=req.body.username;
        let password=req.body.password;
       
        User.findOne({'username':username,'password':password,'status':"accepted"},(err,user,type)=>
        {
            if(user)
            {
                
            if (user.type==0)
            {
                console.log("admin se ne loguje ovde!")
                res.json(null)
            }
           
            else 
            res.json(user)
            }
            else res.json(null)
            
        } )
    }
 
    loginAdmin=(req:express.Request,res:express.Response)=>
    {   
        let username=req.body.username;
        let password=req.body.password;

        User.findOne({'username':username,'password':password,'type':0} ,(err,user)=>
        {
            if(err) console.log(err);
            else res.json(user)
        } )
    }
    register=(req:express.Request,res:express.Response)=>
    {


        let username=req.body.username;
        let email=req.body.email;
        let limitRent
        User.findOne({username:"admin"},(err,data,limit)=>              //admin prvi limit mora imati predefinisan
        {
            if(err)
            console.log(err)

            limitRent=data.limit

        })

        User.findOne({'username':username} ,(err,user)=>
        {
            if(user)
            {
                res.status(200).json({'message':'username exists'})
                
            }
            else
            {
                User.findOne({'email':email,} ,(err,user)=>
                {
                    if(user)
                    {
                        res.status(200).json({'message':'email exists'})
            
                    }
                        else
                        {
                           

                            let user = new User({firstname:req.body.firstname,lastname:req.body.lastname,username:req.body.username,password:req.body.password,type:req.body.type,telephone:req.body.telephone,email:req.body.email,address:req.body.address,status:req.body.status,picture:req.body.picture,limit:limitRent,rented:[]})
     
      
                            user.save().then(user=>
                                {
                                    
                                    res.status(200).json({'message':'user added'})
                                }).catch(err=>{
                                    
                                    res.status(400).json({'message':'error'})
                                })
                        }
                    
                } )
            }
        } )

    }

    waitingUsers= async  (req:express.Request,res:express.Response)=>
    {
        let waitings = await User.find({ status: "pending" });
        if(waitings)
        res.status(200).json(waitings);
        else console.log("Greska u pretrazi cekajucih");
        
    }
    adminAccept=(req:express.Request,res:express.Response)=>
    {
        
       
        let username=req.body.username;
        User.collection.updateOne({'username':username},{$set:{'status':'accepted'}})
        res.json({'message':'ok'});
        
    }
    adminReject=(req:express.Request,res:express.Response)=>
    {
       
        let username=req.body.username;
        User.collection.updateOne({'username':username},{$set:{'status':'rejected'}})
        res.json({'message':'ok'});
    }
    
    getUsers= async (req:express.Request,res:express.Response)=>
    {
       
        let users = await User.find();
        if(users)
        res.status(200).json(users);
        else console.log("Greska u pretrazi usera");
    }

    findUser=(req:express.Request,res:express.Response)=>
    {
        
        let username=req.body.username;
        //console.log(username);
       
        User.findOne({'username':username},(err,user)=>
        {
            if(err)
            console.log(err);
            else {
                //console.log("proso");
                res.status(200).json(user);
                //console.log(user);
            }
            
            
        });
       
    }

    updateUser=(req:express.Request,res:express.Response)=>
    {
       
       
        let _id=req.body._id;
        let username=req.body.username;
        let firstname=req.body.firstname;
        let lastname=req.body.lastname;
        let password=req.body.password;
        let address=req.body.address;
        let telephone=req.body.telephone;
        let type=req.body.type;
        let status=req.body.status;
        let email=req.body.email;
        let picture=req.body.picture;
        User.updateOne({_id:_id},{$set:{'status':status,
       'username':username,'firstname':firstname,'lastname':lastname,'password':password,'address':address,'telephone':telephone,'type':type,'email':email,'picture':picture}},(err,user)=>
       {
        console.log(user)

        if(err)
        console.log(err)
        else
        {
            res.status(200).json({"message":"User updated"});
            
        }
        
       })
    }
    checkRented=(req:express.Request,res:express.Response)=>
    {
        let username=req.body.username;
        User.findOne({username:username}, { numberOfRented: 1 ,status:1},(err,user,status,numberOfRented)=>
        {
            if(user)
            {
                res.status(200).json(user);
                //console.log(user);

            }
            else
            console.log(err);
            
        })
      
       
    }
    deleteUser=(req:express.Request,res:express.Response)=>
    {
        let username=req.body.username;
        User.collection.deleteOne({'username':username},(err,news)=>
        {
            if(err) console.log(err);
            else res.json({'message':'ok'});

        })

    }
    
    changePass=(req:express.Request,res:express.Response)=>
    {
       let username=req.body.username;
       let newPass=req.body.newPass;
       let oldPass=req.body.oldPass;

      
        
       User.findOne({username:username}, { password: 1 },(err,user,password)=>
       {
           if(user)
           {

                
                 if(oldPass == user.password)
                 {
                    User.updateOne({username:username},{$set:{'password':newPass,}},(err,user)=>
                    {   
                        if(err)
                            console.log(err);
                        else
                       
                            res.status(200).json({'message':'Password updated'});
                        

                    })
                 }
                 else
                                    
                    res.status(200).json({'message':'Old password is not correct'});

           }
           else
           console.log(err);
           
       })
       
    }


    updateLimit=(req:express.Request,res:express.Response)=>
    {
        let limit=req.body.limit
        User.updateMany({},{$set:{limit:limit}},(err)=>
        {
            if(err)
            console.log(err)
            res.json({"message":"Limit successfully changed"})
        })
    }
}