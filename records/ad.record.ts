import {AdEntity, SingleAdEntity} from "../types";
import {ValidationError} from "../utils/handleErrors";
import {promises} from "dns";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import{v4}from'uuid'

type AdRecordResults = [AdEntity[],FieldPacket[]]

export class AdRecord implements AdEntity{
   public description: string;
   public id?: string;
   public lat: number;
   public lon: number;
   public name: string;
   public price: number;
   public url: string;

   constructor(obj:AdEntity) {
if(!obj.id){obj.id=v4()}
       if(!obj.name||obj.name.length>100){
           throw new ValidationError('Nazwa nie może być pusta i nie może być dłuższa niż 100 znaków.')
       }
       if(obj.description.length>1000){throw new ValidationError('Opis nie może być dłuższy niż 1000 znaków')}
       if(obj.price<0||obj.price>9999999){ throw new ValidationError('Cena nie może być 9 999 999 zł')}
     //  @TODO check if url is valid !!!
       if(!obj.url||obj.url.length>100){
           throw new ValidationError('Link nie może być pusty lub dłuższy niż 100')
       }
       if(typeof obj.lat !== "number"||typeof obj.lon !=="number"){
           throw new ValidationError('Nie można znaleźć ogłoszenia.')
       }

       this.name=obj.name;
       this.description=obj.description;
       this.id=obj.id;
       this.price=obj.price;
       this.url=obj.url;
       this.lat=obj.lat;
       this.lon=obj.lon
   }

   static async getOne(id:string):Promise<AdRecord|null>{
const [result] = await pool.execute("SELECT * FROM `ads` WHERE `id` = :id",{
    id:id,
}) as AdRecordResults
       return result.length ===0?null: new AdRecord(result[0])
   };

 async  addOne ():Promise<string>{
if(!this.id){this.id=v4()}

    await  pool.execute("INSERT INTO `ads`(`id`, `name`, `description`, `price`, `url`, `lat`, `lon`) VALUES (:id,:name,:description,:price,:url,:lat,:lon)",{
           id:this.id,
           name:this.name,
           description:this.description,
           price:this.price,
           url:this.url,
           lat:this.lat,
           lon:this.lon,
       });
return this.id;

   }

   static async ListAdsByCriteria(value:string):Promise<SingleAdEntity[]|null>{
const[result]=await pool.execute("SELECT * FROM `ads` WHERE `name`LIKE :value",{
    value:`%${value}%`
}) as [SingleAdEntity[],FieldPacket[]]

       // const[resultTwo]=await pool.execute("SELECT * FROM `ads` WHERE `description`LIKE :value",{
       //     value:`%${value}%`
       // }) as [AdRecord[],FieldPacket[]]

       // const results = [...resultOne,...resultTwo]
     return result.length===0?null:result.map(result=>{
         const{lon,lat,id}=result;
         return({
             id,lat,lon,
         })
         }
     )
   }


}