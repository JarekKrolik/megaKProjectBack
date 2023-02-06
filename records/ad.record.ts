import {AdEntity} from "../types";
import {ValidationError} from "../utils/handleErrors";

export class AdRecord implements AdEntity{
   public description: string;
   public id?: string;
   public lat: number;
   public lon: number;
   public name: string;
   public price: number;
   public url: string;

   constructor(obj:AdEntity) {
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

}