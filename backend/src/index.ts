import express,{Request,Response} from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import cors from 'cors';
const app:express.Application=express()

app.use(express.json())
app.use(cors())

app.get('/',(req:Request,res:Response)=>{
    //demo route
    res.status(200).json({"message":"Started node with ts"})
})

app.post('/',async(req:Request,res:Response)=>{
    //Note This is specifically designed for wikipedia pages
    const URL:string|undefined=req.body.url;
    if(URL===undefined){
        res.status(400).json({"message":"Something went wrong"})
    }
    try{
        const validUrl:string=URL?URL:"";
        const response=await axios.get(validUrl);
        const html=response.data;
        const $=cheerio.load(html);
        //You can inspect and modify accordingly or use title and body(not recommended)
        const title=$('h1').text();
        const content=$('#mw-content-text').text();
        //Call my local python api to summarize text
        let response1=await axios.post('http://localhost:5000/getSummary',{"message":content},{headers:{'Content-Type':'application/json'}})
        let data=await response1.data;
        console.log(data)
        let summary=data.summary;
        console.log(summary)
        res.status(200).json({"title":title,"summary":summary})

    }catch(e){
        console.log(e);
        res.status(400).json({"message":"Something went wrong"});
    }
})

const PORT:number|string=3000||process.env.PORT
app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})
