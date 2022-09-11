import mongoose from 'mongoose'

const Schema=mongoose.Schema;

let User=new Schema({
    firstname:{
       type:String 
    },
    lastname:
    {
        type:String 
     },
     username:
     {
        type:String 
     },
     password:
     {
        type:String 
     },
     type:
     {
        type:Number
     },
     rented: {
      type: Array
  },
     telephone:
     {
        type:Number
     },
     email:
     {
        type:String
     },
     status:
     {
        type:String
     },
     address:
     {
      type:String
     },
     picture:
     {
      type:String
     },
     numberOfRented:
     {
      type:Number
     },limit:
     {
      type:Number
     }
    
    })
    
export default mongoose.model('User',User,'users');