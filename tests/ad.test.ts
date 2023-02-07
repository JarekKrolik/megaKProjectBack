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