import express from "express"
import mongoose from 'mongoose'
import {shortUrl , originalUrl } from './Controllers/url.js'
import ejs from 'ejs'

import dotenv from "dotenv";



dotenv.config();

//Create Server
const app = express();

//Use MiddleWare to deal with express data ( for encoded)
app.use(express.urlencoded({ extended: true }));

//MongoDb connected with mongoose : mongoose.connect(' ' , { })
mongoose.connect(process.env.MONGO_URI, {
  dbName: process.env.DB_NAME
}).then(()=>console.log("MongoDB connected..")).catch((err)=>console.log("Error is :", err))


// Rendering the EJS file
app.get('/' , (req , res)=>{
  res.render("index.ejs", {shortUrl:null})
})

//PORT , shortUrl is coming from Controllers. ( Shorting URL Logic)
app.post('/short', shortUrl)

// redirect to original url(long) using short code : Dynamic routing
app.get('/:shortCode' , originalUrl )


// Start Server
const port = 2000;
app.listen(port , ()=>console.log(`Serveris running on port ${port}`))