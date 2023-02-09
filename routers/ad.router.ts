import {Request, Response, Router} from "express";
import {AdRecord} from "../records/ad.record";


export const adRouter = Router()
    .get('/search/:name?',async (req:Request, res:Response)=>{

      const adsList = await  AdRecord.ListAdsByCriteria(req.params.name??'')
        res.json(adsList)
    })
     .get('/:id',async (req:Request,res:Response)=>{
         const foundAd = await AdRecord.getOne(req.params.id);
         res.json(foundAd)

     })
     .post('/',async (res:Response,req:Request)=>{
         const newAd = await new AdRecord(req.body);
         await newAd.addOne();
         res.send('ok')


     })