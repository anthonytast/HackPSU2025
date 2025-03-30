import { GoogleGenAI } from "@google/genai";
import express from "express";
import dotenv from "dotenv";
import router from "./routes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({origin: "http://localhost:3000"}))
app.use(express.json()); 
app.use("/api", router);
const PORT = process.env.PORT || 3000;  

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_AI_API_KEY });


//Calls
app.get('/', (req, res) =>{
    res.send("Hello World");
});

app.listen(PORT, () =>{
    console.log(`Server is running on https://localhost:${PORT}`);
});

// async function test(){
//     const response = await ai.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents: "Generate a skeleton for a basic webapp"
//     })
//     console.log(response.text);
// }

//await test();