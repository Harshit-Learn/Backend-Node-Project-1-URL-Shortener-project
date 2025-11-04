import {Url} from '../Models/Url.js'
import shortid from 'shortid'

export const shortUrl = async (req , res)=>{
    const longUrl = req.body.longUrl;
    const shortCode = shortid.generate();

    const shortUrl = `http://localhost:2000/${shortCode}`

    // save  to database
    const newUrl = new Url({shortCode, longUrl }) // EJS se name:longUrl liya he
    await newUrl.save();

    console.log("short url saved =" , newUrl)

    res.render("index.ejs" , {shortUrl})
}

//Dynamic routing
export const originalUrl = async (req , res)=>{
  const shortCode = req.params.shortCode

  // Find on DataBase
  const originalUrl = await Url.findOne({shortCode})

  if(originalUrl){
    res.redirect(originalUrl.longUrl );
  }else{
    res.json({message:"Invalid Short Code"})
}
  }
  


    