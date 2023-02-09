import express, {json, Request, Response, Router} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleErrors, ValidationError} from "./utils/handleErrors";
import rateLimit from 'express-rate-limit';
import {AdRecord} from "./records/ad.record";


const app =express()


app.use(cors({
    origin:'http://localhost:3000',
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
}))
app.use('/',Router().get('/',async (res:Response,req:Request)=>{
    const newAd = new AdRecord({  name:'nowy rower',
        lon:0,
        lat:0,
        description:'blah jakiś rower czarny',
        url:'https://www.wp.pl',
        price:0,})
  // const id = await newAd.addOne();
  //   const foundOne = await AdRecord.getOne(id)
   const found = await  AdRecord.ListAdsByCriteria('')

    console.log(found.length)
    res.send(found)

}))
app.use(handleErrors)
app.listen(3001,'0.0.0.0',()=>{
    console.log('listening on port http://localhost:3001')
})