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

async function test(){
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "Generate a skeleton for a basic webapp"
    })
    console.log(response.text);
}

//await test();