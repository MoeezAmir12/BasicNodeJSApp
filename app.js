const mongodb = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

const port = 3200;
const MongoPass = process.env.mongopass;

mongodb.connect(`mongodb+srv://moeex:${MongoPass}@cluster0.nx9opu0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
    app.listen(3200, () => {
        console.log(`Running at http://localhost:${3200}`);
    })
});

const usersCollection = require('./Models/users');

// insert data API into users Collection
app.post("/api/insertUser",async(req,res)=> {
    try{
if(req?.body?.userName && req?.body?.email)
{

await usersCollection.create(req.body).then(() => {
    res.status(200).json({
        message: "Data inserted success!!"
    })
})
}
else
    {
        res.status(400).json({
            message: "Incorrect or missing payload"
        })
    }
    }
catch(error){
res.status(500).json({
    message: error.message
})
}
})
// get data from mongoDB
app.get("/api/getData",async(req,res) => {
try{
await usersCollection.find().then((data) => {
    res.status(200).json({
        data: data,
        message: "Data fetched success !!"
    })
})
}
catch(error){
res.status(500).json({
    message: error.message
})
}
})
