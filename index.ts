import express, {json, Request, Response} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleErrors, ValidationError} from "./utils/handleErrors";



const app =express()


app.use(cors({
    origin:'http://localhost:3000',
}));
app.use(json());
app.get('/',async (res:Response,req:Request)=>{
    throw new ValidationError('daaamn!!!')
})
app.use(handleErrors)
app.listen(3001,'0.0.0.0',()=>{
    console.log('listening on port http://localhost:3001')
})