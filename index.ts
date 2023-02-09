import express, {json, Request, Response, Router} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleErrors, ValidationError} from "./utils/handleErrors";
import rateLimit from 'express-rate-limit';
import {AdRecord} from "./records/ad.record";
import {adRouter} from "./routers/ad.router";


const app =express()


app.use(cors({
    origin:'http://localhost:3000',
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}))

app.use('/ad',adRouter)

app.use(handleErrors)
app.listen(3001,'0.0.0.0',()=>{
    console.log('listening on port http://localhost:3001')
})