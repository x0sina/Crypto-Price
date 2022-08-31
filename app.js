const express = require('express');
const path = require('path');

const app = express();

app.use('/public' , express.static(path.resolve(__dirname,'public')));

app.get('/images/errorImg.png' , (req,res)=>{
    res.sendFile(path.resolve(__dirname,'public/images' , "errorImg.png"));
}) 

app.get('/*' , (req,res)=>{
    res.sendFile(path.resolve(__dirname,'public',"index.html"));
})

app.listen(process.env.PORT || 5000 , ()=> console.log("server is runing..."));