const express = require('express');
const cors = require('cors')
const mysql2 = require('mysql2')
const app = express();

app.use(cors());

//create connection database
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password:'123456789',
    database: 'tallerbd'
})

app.get('/PELICULAS',(req,res)=>{//consulta en el diagonal el nombre de la tabla
    
    console.log(req.query.ID_PELICULA);

    let consulta=''

    if(typeof(req.query.ID_PELICULA)=='undefined'){
        consulta = `SELECT * FROM PELICULAS`;
    }
    else{
        consulta = `SELECT * FROM PELICULAS WHERE ID_PELICULA = ${req.query.ID_PELICULA}`;
    }

    console.log(consulta)

    connection.query(
        consulta,
        function(err, results, fields) {
            if(results.length==0){
                res.json({ mensaje:"ID_PELICULA no existe"});
            } 
            else {
                res.json(results);
            }
            
        }
    )
});

app.post('/',(req,res)=>{//alta
    res.json({ mensaje:"Servidor Express respondiendo a post"});
});

app.delete('/',(req,res)=>{//alta
    res.json({ mensaje:"Servidor Express respondiendo a delete"});
});

app.listen(8082,(req,res)=>{
    console.log("Servidor express corriendo en  puerto 8082")
});