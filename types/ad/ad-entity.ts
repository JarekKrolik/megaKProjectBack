
export interface SingleAdEntity {
    id?:string,
    lat:number,
    lon:number,
}

export interface AdEntity extends SingleAdEntity{

    name:string,
    description:string,
    price:number,
    url:string,

}