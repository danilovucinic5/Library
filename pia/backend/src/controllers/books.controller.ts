import { Console } from 'console'
import { privateEncrypt } from 'crypto'
import express, { response } from 'express'
import { json } from 'stream/consumers'
import book from '../models/book'
import Book from '../models/book'
import User from '../models/user'
export class BooksController
{
    addBook=(req:express.Request,res:express.Response)=>
    {
        
       let newBook= new Book(
       {
        name:req.body.name,
        writers:req.body.writers,
        genres:req.body.genres,
        publisher:req.body.publisher,
        publishYear:req.body.publishYear,
        language:req.body.language,
        rentals:[],
        available:req.body.available,
        comments:[],
        numberOfRented:0,
        picture:req.body.picture,
        totalRents:0
       })

       newBook.save().then(book=>
        {
            
            res.status(200).json({'message':'Book added'})
        }).catch(err=>{
            console.log(err)
            res.status(400).json({'message':'error'})
        })

    }
    getAllBooks= async (req:express.Request,res:express.Response)=>
    {
        
      let books= await Book.find();
        if (books)
        {
            res.status(200).json(books);

        }
        else console.log("greska u pretrazi knjiga");
    }


    deleteBookIfNotRented= (req:express.Request,res:express.Response)=>
    {
       

        let id=req.body.id;

          Book.findOne({'_id':id},{numberOfRented:1},(err,book)=>  
        {
            if (book.numberOfRented>0)
           {
            res.status(200).json({'message':'You cant delete rented book!'});
           }
           else
           {
                   Book.deleteOne({'_id':id},(err,message)=> //findOne i deleteOne ne rade sa jebenim collection
                   {
                    console.log(message)

                   });
                    res.status(200).json({'message':'Book deleted!'});

           }
        });
       
    }
    findBookById= (req:express.Request,res:express.Response)=>
    {
        let id=req.body.id;

        Book.findOne({'_id':id},(err,book,message)=>
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                res.status(200).json(book);

            }
            console.log(message);
        })


    }
    updateBook= (req:express.Request,res:express.Response)=>
    {
        
    Book.updateOne({'_id':req.body.id},{$set:{'name':req.body.name,
       'writers':req.body.writers,'genres':req.body.genres,'publisher':req.body.lastname,'picture':req.body.picture,'publishYear':req.body.publishYear,'language':req.body.language,'available':req.body.available}},(err,book,message)=>
       {
            if (err)
            console.log(err)
            if(book)
            {
                
                res.status(200).json({"message":"Book updated"})
            }
       })   
    }


    searchByAuthor= async (req:express.Request,res:express.Response)=>
    {
        
        let author=req.body.author;

       let books= await Book.find({'writers':{$regex:author,$options: 'i'}})
       if (books)
       res.status(200).json(books);
            else console.log("GRESKA U PRETRAZI")

    }

     

    searchByName=(req:express.Request,res:express.Response)=>
    {
        
        let name=req.body.name;

        Book.find({'name':{$regex:name,$options: 'i'}},(err,books)=>
        {
            if(err) console.log(err);
            else res.json(books);
        })
    }

    searchByAuthorAndName=(req:express.Request,res:express.Response)=>
    {
        

        let author=req.body.author;
        let name=req.body.name;
       
       
        Book.find({
            "$and": [
                { name: {  '$regex': name, '$options': 'i' } },
                { writers: { '$regex': author, '$options': 'i' } }
            ]
        }).then((books) => {
            res.json(books);
        });
    }



    checkIfStole(rented) 
    { 
        let stole = false;
        let thisDay = new Date(); 
        rented.forEach(book => 
            {
                if (book.dateReturned == undefined) 
                 {
                    if (thisDay > book.endDate) 
                    stole = true;
                
                 }
        });
        return stole 
    }

    checkIfStillRenting(rented,bookId)
    {
       
        let contains=false;
        rented.forEach(book => 
            {
                
                if (book.dateReturned == undefined && book.bookId==bookId)  
                        contains=true;     
            });
        return contains;
    }


rentABook=(req:express.Request,res:express.Response)=>
{
    let bookId=req.body.bookId;
    let username=req.body.username;

    User.findOne({'username':username},{numberOfRented:1},(err,data,numberOfRented)=>
    {
           if (err)
           console.log(err)
           else
           {
            if(data.numberOfRented==3)
            res.json({'message':"You are already renting 3 books"})
            else
            {
                Book.findOne({'_id':bookId},{available:1},(err,data,available)=>
                {
                    if(err)
                    console.log(err);
                    else
                    {
                        if(data.available==0)
                        res.json({'message':"The book is not available"})
                        else
                        {
                            User.findOne({'username':username},{rented:1,limit:1},(err,user)=>
                            {
                                    if(err)
                                    console.log(err)
                                    if(user)
                                    {
                                        let startDate=new Date()
                                        let endDate=new Date()

                                        endDate.setDate(startDate.getDate()+user.limit)

                                        
                                            if (this.checkIfStillRenting(user.rented,bookId))
                                            {
                                            res.json({'message':"You are already renting this book"})

                                            }
                                            else
                                            {
                                                if (this.checkIfStole(user.rented))
                                                {
                                                    res.json({'message':"You did not give back our book on time, so you can not take new one"})
                                                }
                                                else
                                                {
                                                    User.updateOne({ "username": username }, { $push: { "rented": { "bookId": bookId, "startDate": startDate, "endDate": endDate  } } },(err)=>
                                                    {
                                                        if (err)
                                                        console.log(err)
                                                    });
                                                    User.updateOne({"username": username},{$inc:{numberOfRented:1}},(err)=>
                                                    {
                                                        if (err)
                                                        console.log(err)
                                                    });
                                                    Book.updateOne({_id:bookId},{$inc:{numberOfRented:1,available:-1,totalRents:1}},(err)=>
                                                    {
                                                        if (err)
                                                        console.log(err)
                                                    })
                                                    res.json({'message':"You took this book"})
                                                }

                                            } 
                                        
                                    }
                                    

                            })
                            
                        }
                    }

                }) 
            }

           }
    }
    )
}


getRentedBooks= async (req:express.Request,res:express.Response)=>
{
    let username=req.body.username;
    let books=[]      
    let book

    let user= await User.findOne({username:username},{rented:1})
   
    for(let i=0;i<user.rented.length;i++)
    {
        if(user.rented[i].dateReturned==undefined)
        {
            book= await Book.findOne({'_id':user.rented[i].bookId})
                        
                                books.push({
                                    book:book,
                                    startDate:user.rented[i].startDate,
                                    endDate:user.rented[i].endDate
        
                                })
        }
    }

    res.json(books)   

}

takeBackBook= async (req:express.Request,res:express.Response)=>
    {
        
        let bookId=req.body.bookId
        let username=req.body.username

        let today=new Date()

        let user= await User.findOne({username:username},{rented:1})

        for(let i=0;i<user.rented.length;i++)
        {
                     if(user.rented[i].dateReturned==undefined && user.rented[i].bookId==bookId)
                     {
                        user.rented[i].dateReturned=today
                        break
                     }
         }

         await User.updateOne({username:username},{$set:{rented:user.rented}})
         await User.updateOne({username:username},{$inc:{numberOfRented:-1}})
         await Book.updateOne({_id:bookId},{$inc:{available:1}})
         await Book.updateOne({_id:bookId},{$inc:{numberOfRented:-1}})

        res.json({"message":"You successfully returned book"})

    }

    getHistoryOfRentingBooks= async (req:express.Request,res:express.Response)=>
    {
        let username=req.body.username;
        let books=[]      
        let book
    
        let user= await User.findOne({username:username},{rented:1})
       
        for(let i=0;i<user.rented.length;i++)
        {
            if(user.rented[i].dateReturned!=undefined)
            {
                book= await Book.findOne({'_id':user.rented[i].bookId})
                            
                                    books.push({
                                        book:book,
                                        startDate:user.rented[i].startDate,
                                        endDate:user.rented[i].dateReturned
            
                                    })
            }
        }
    
        res.json(books)   
    
    }


    async checkIfCommented (id,username)
    {

        let commented=false;

       let book=await Book.findOne({_id:id},{comments:1})

         
            let comments=book.comments

            for(let i=0;i<comments.length;i++)
            {
                if(comments[i].username==username)
                {
                    commented= true;
                    break;
                }
            }
           
           
         return commented;
       
    }

    addComment=async (req:express.Request,res:express.Response)=>
    {                                                   
        let id=req.body.id
        let username=req.body.username
        let comment=req.body.comment
        let rating=req.body.rating
        let today=new Date()

        
        if( await this.checkIfCommented(id,username))
        {

            res.json({"message":"You already commented this book"})
        }
        else
        {   
            Book.updateOne({_id:id},{$push:{comments:{text:comment,username:username,rating:rating,date:today}}},(err)=>
            {
                if(err)
                console.log(err)

                res.json({"message":"Comment added"})

            })
            
        }
    }

    getBookOfTheDay= async (req:express.Request,res:express.Response)=>
    {
        let allBooks;
        let today=new Date()
        let sum=today.getDate()+today.getMonth()+today.getFullYear()
        allBooks= await Book.find()
        let n=allBooks.length
        let i=sum % n
        res.json(allBooks[i])

    }
    getAverageRating= async (req:express.Request,res:express.Response)=>
    {
        let id=req.body.id

       let book= await Book.findOne({'_id':id},{comments:1})

      
        //Ne prebacuj ovo u promenjivu radi sa ovakvim nizom
        
        
        
       if (book.comments.length==0)
       res.json({'averageRating':'-1'})
       else
       {
        let sum=0                                                   // moze dopuna ako neko nije bacio rating to nisam uradio sad
        
        for(let i=0;i< book.comments.length;i++)
        {
          
            sum+=book.comments[i]['rating']
           
        }
        
       
        let avg=sum/book.comments.length as Number
       
        res.json({'averageRating':avg})

       }

    }
}
