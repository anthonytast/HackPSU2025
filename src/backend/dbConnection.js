import { MongoClient } from "mongodb";
import dotenv from "dotenv"
dotenv.config();


const uri = `mongodb+srv://admin:${process.env.MONGOPW}@hackpsu2025.lb2db.mongodb.net/`;
const client = new MongoClient(uri)

try{
    await client.connect();
    await client.db("AppDB").command({ping: 1});
    console.log("Connected to DB!");
}catch(err){
    console.log("Error: " + err);
}

let db = client.db("AppDB");
export default db;