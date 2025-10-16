import express from "express"
import mongoose from 'mongoose'
import {shortUrl , originalUrl } from './Controllers/url.js'
//Create Server
const app = express();

//Use MiddleWare to deal with express data ( for encoded)
app.use(express.urlencoded({ extended: true }));

//MongoDb connected with mongoose : mongoose.connect(' ' , { })
mongoose.connect('mongodb+srv://harshitbaranwal609_db_user:k9ZVI4hmSymYVcDP@cluster0.ytkrazy.mongodb.net/', 
{
  dbName:"Url_shortener"
}
).then(()=>console.log("MongoDB connected..")).catch((err)=>console.log("Error is :", err))


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