import express from "express";
import db from "./dbConnection.js";

const router = express.Router();

router.post("/create-account", async (req, res) =>{
    try{
        const {firstName, lastName, email, password} = req.body;
        console.log(req.body)

        if(!email || !password || !firstName || !lastName){
            return res.json({error: "Username and password required!"}).status(400);
        }
        
        const collection = db.collection("Authentication");
        const existingUser = await collection.findOne({email});
        if (existingUser){
            return res.json({error: "Email already exists"}).status(400)
        }
        let projects = [];
        const result = await collection.insertOne({email, password, firstName, lastName, projects})
        res.json({message: "Account created!", userId: result.insertedId}).status(200);
    } catch(err){
        console.log("Error creating account: ", error);
        res.json({error: "Internal server error"}).status(500);
    }
});

router.post("/sign-in", async(req, res) =>{
    try{
        const {email, password} = req.body;
        console.log(email, password);

        if(!email || !password){
            return res.json({error: "Email and password required"}).status(400);
        }

        const collection = db.collection("Authentication");
        const user = await collection.findOne({email, password});
        
        if(!user){
            return res.json({error: "Email or password invalid"}).status(400);
        }

        return res.json({message:"Login Successful"}).status(200);
    }catch(error){
        console.log("Error during sign-in: " + error);
        res.json({error: "Internal server error"}).status(500)
    }
})

router.get("get-projects", async(req, res) =>{
    try{
        const{email} = req.query;

        if(!email){
            return res.json({error: "Email is required"}).status(400);
        }

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({projects: user.projects}).status(200);

    }catch(error){
        console.log("Error fetching projects: " + error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.post("/add-project", async (req, res) => {
    try{
        const {email, projectName} = req.body;

        if(!email || !projectName){
            return res.status(400).json({ error: "Email and project name are required" });
        }

        const collection = db.collection("Authentication");
        const result = await collection.updateOne(
            {email},
            {$push: {projects: {name: projectName}}}
        )

        res.send().status(204);
    }catch(error){
        console.log(error);
    }
})

export default router;