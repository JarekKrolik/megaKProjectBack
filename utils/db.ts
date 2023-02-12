import {createPool} from "mysql2/promise";

export const pool =createPool({
    host:'localhost',
    user:'madmaxla_api',
    password:'loF504jlnj',
    database:'madmaxla_api',
    namedPlaceholders:true,
    decimalNumbers:true,
})