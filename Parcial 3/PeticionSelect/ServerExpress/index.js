const express = require('express');
//const cors =require('cors');
const mysql2 =require('mysql2');
const app = express();

//app.use(cors());



app.get('/',(req,res)=>{
    res.json({mensaje: "Server express respondiendo a get "});
});

app.post('/',(req,res)=>{   
  res.json({mensaje: " Server Express respondiendo post "})
});

app.delete('/',(req,res)=>{
    res.json({mensaje: "Server express respondiendo a delete"});
});



app.listen(8082,(req,res)=>{
    console.log("Servidor express corriendo en puerto 8082")
});