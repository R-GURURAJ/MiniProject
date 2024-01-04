const express = require('express')
const app = express()
const callapi= require('./ProductList')
findmainpage=require("./productpage");
const cors=require('cors');
const fs = require('fs');
const filepath='../Client/src/database.json';

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.get('/',async(req, res) => {
    res.send("USE /getAPIResponse");
})
app.get("/getAPIResponse",async (req, res, next) => {
    next();
    },
    (req, res) => {
        callapi.make_API_call("hp pavilion")
    }
);
app.post("/postproductname",async (req,res)=>{
    let{name}=req.body;
    console.log("hai....");
    let nonObj={
        "amazon": [
             {
                  "detials": {
                    "name": "Loading......"
                }
             }
            ],
            "flipkart": [
                {
                "detials": {
                     "productName": "Loading......"
                }
                }
               ]
        }
    // fs.writeFileSync("F://webScrapingProject//client//myapp//src//database.json",JSON.stringify(nonObj));
    fs.writeFile(filepath, JSON.stringify(nonObj,10000,5), err => {
        if (err) throw err;
    });
    console.log(name);
    callapi.make_API_call(name)
    res.redirect('/home')
})
app.get("/home",cors(),async(req,res)=>{
        res.send(" ")
})


app.listen(2023, () => console.log(`App listening on port !`))
