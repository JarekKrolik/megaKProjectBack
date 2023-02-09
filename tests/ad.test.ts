import {AdRecord} from "../records/ad.record";

test('AdRecord returns data from database from one entry',async ()=>{

    const ad =  await AdRecord.getOne('cb1e065e-a70e-11ed-aa97-145afc8bcda2');
    console.log(ad)
    expect(ad).toBeDefined();
    expect(ad.name).toBe('testowe ogłoszenie')


})

test('AdRecord returns null for not existing entry',async ()=>{

    const ad = await AdRecord.getOne('---');

    expect(ad).toBeNull();


})

test('adding new add to the database',async ()=>{
    const defaultObject= {

        name:'test',
        lon:0,
        lat:0,
        description:'blah',
        url:'https://www.wp.pl',
        price:0,


    }
    const ad = new AdRecord(defaultObject);

     const addedId = await ad.addOne();


    expect(addedId).toBeDefined()



})

test('find specific ad',async ()=>{

   const newAd = await AdRecord.ListAdsByCriteria('');
console.log(newAd)
   expect(newAd).toBeDefined()


})