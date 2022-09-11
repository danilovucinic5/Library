import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import userRouter from './routers/user.routes';

import booksRouter from './routers/books.routes';
//import { resolve } from 'path';
const app = express();
app.use(cors());
app.use(bodyParser.json({limit:'50mb'}));
mongoose.connect('mongodb://localhost:27017/pia');
const connection=mongoose.connection;
connection.once('open',()=>
{
    console.log('db connection ok')
}
)
const router=express.Router();


router.use('/users',userRouter);

router.use('/books',booksRouter)

app.use('/',router);

app.get('/', (req, res) => res.send('Hello World!')); 
app.get('/hello',(req,res)=>res.send('CODA')); 
app.listen(4000, () => console.log(`Express server running on port 4000`));