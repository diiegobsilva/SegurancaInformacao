import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";


dotenv.config();

const info = async ():Promise< Response | any> => {
    const client = new MongoClient(`${process.env.mongo}`);
         await client.connect();

         const collection = client.db('seguranca').collection('info');

        return collection;
         
}

const warm = async ():Promise< Response | any> => {
    const client = new MongoClient(`${process.env.mongo}`);
         await client.connect();

         const collection = client.db('seguranca').collection('warm');

        return collection;
         
}

const error = async ():Promise< Response | any> => {
    const client = new MongoClient(`${process.env.mongo}`);
         await client.connect();

         const collection = client.db('seguranca').collection('error');

        return collection;
         
}

export {
    info,
    warm,
    error
}