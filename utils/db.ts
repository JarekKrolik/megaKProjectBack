import {createPool} from "mysql2/promise";

export const pool =createPool({
    host:'localhost',
    user:'root',
    database:'megakmapproject',
    namedPlaceholders:true,
    decimalNumbers:true,
})