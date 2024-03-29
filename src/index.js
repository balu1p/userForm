import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import bodyParser from 'body-parser';
import userRouter from "./routes/user.route.js"
import cors from 'cors';
import cookieParser from 'cookie-parser'

dotenv.config({
    path: '.env'
});
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

connectDB()
const port = process.env.PORT || 5050

app.use('/user',userRouter)

app.listen(port,()=>{
    console.log(`app listening on ${ port}`)
})

