const express = require('express')
const {PicGo} = require('picgo')
const path =require('node:path')

const picgo = new PicGo('../pic-github.json')

const app=express()
const port=3000
const base="C:\\"

app.get('/',(req,res)=>{
    res.send("hello picgo!")
})

app.listen(port,()=>{
    console.log("server run at http://localhost:"+port)
})