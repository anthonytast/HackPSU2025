import { GoogleGenAI } from "@google/genai";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const ai = new GoogleGenAI({ apiKey: process.env.AI_API_KEY });
const PORT = process.env.PORT || 3001;  


//Calls
app.get('/', (req, res) =>{
    res.send("Hello World");
});

app.listen(PORT, () =>{
    console.log(`Server is running on https://localhost:${PORT}`);
});