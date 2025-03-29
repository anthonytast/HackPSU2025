import express from "express";
import db from "./dbConnection.js";

const router = express.Router();

router.post("/create-account", async (req, res) =>{
    try{
        const {username, password} = req.body;

        if(!username || !password){
            return res.json({error: "Username and password required!"}).status(400);
        }
        
        const collection = db.collection("Authentication");
        const existingUser = await collection.findOne({username});
        if (existingUser){
            return res.json({error: "Username already exists"})
        }
        const result = await collection.insertOne({username: username, password: password})
        res.json({message: "Account created!", userId: result.insertedId});
    } catch(err){
        console.log("Error creating account: ", error);
        res.json({error: "Internal server error"}).status(500);
    }
});

router.post("/sign-in", async(req, res) =>{
    try{
        const {username, password} = req.body;

        if(!username || !password){
            return res.json({error: "Username and password required"}).status(400);
        }

        const collection = db.collection("Authentication");
        const user = await collection.findOne({username :username, password: password});
        
        if(!user){
            return res.json({error: "Username or password invalid"}).status(401);
        }

        return res.json({message: "Login Successful"});
    }catch(error){
        console.log("Error during sign-in: " + error);
        res.json({error: "Internal server error"}).status(500)
    }
})


export default router





