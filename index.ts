import express, {json, Request, Response} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleErrors, ValidationError} from "./utils/handleErrors";
import rateLimit from 'express-rate-limit';


const app =express()


app.use(cors({
    origin:'http://localhost:3000',
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}))

app.use(handleErrors)
app.listen(3001,'0.0.0.0',()=>{
    console.log('listening on port http://localhost:3001')
})