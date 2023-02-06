import {AdRecord} from "../records/ad.record";

const defaultObject= {

    name:'test',
        lon:0,
    lat:0,
    description:'blah',
    url:'https://www.wp.pl',
    price:0,


}

test('can build ad record',()=>{

    const ad =  new AdRecord(defaultObject)

    expect(ad.name).toBe('test')
    expect(ad.lon).toBeGreaterThanOrEqual(0)




})
test('validates invalid price',()=>{
    const ad =  new AdRecord({...defaultObject,price:-9})




    expect(ad.price).toThrow('Cena nie może być 9 999 999 zł')
})