import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";


dotenv.config();

const logs = async ():Promise< Response | any> => {
    const client = new MongoClient(`${process.env.mongo}`);
         await client.connect();

         const collection = client.db('seguranca').collection('logs');

        return collection;
         
}

export default logs;