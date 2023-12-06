const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
const app = express();
const { jsPDF } = require("jspdf");
const fs = require('fs');
const path = require('path');
app.use(cors());

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'tallerbd'
});

app.get('/', (req, res) => {
    console.log(req.query.ID_PELICULA);
    let consulta = '';
    if (typeof (req.query.ID_PELICULA) == 'undefined') {
        consulta = `select * from PELICULAS`;
    } else {
        consulta = `select * from PELICULAS where ID_PELICULA=${req.query.ID_PELICULA}`;
    }
    console.log(consulta);

    connection.query(
        consulta,
        function (err, results, fields) {
            if (results.length == 0) {
                res.json({ mensaje: "Esta película no está registrada" });
            }
            else {
                res.json(results);
            }
        }
    );
});

app.get('/pelicula', (req, res) => {
    console.log(req.query.ID);
    let consulta = '';
    if (typeof (req.query.ID) == 'undefined') {
        consulta = `SELECT * FROM PELICULAS`;
    }
    else {
        consulta = `SELECT * FROM PELICULAS WHERE ID_PELICULA = ${req.query.ID}`;
    }
    console.log(consulta);

    connection.query(
        consulta,
        function (err, results, fields) {
            if (results.length == 0) {
                res.json({
                    status: 0,
                    mensaje: "Este ID no está registrado, intente con otro ID por favor",
                    datos: {}
                });
            }
            else {
                res.json({
                    status: 1,
                    mensaje: "Película encontrada exitosamente",
                    datos: (results.length == 1) ? results[0] : results
                });
            }
        }
    )
});

app.post('/pelicula', (req, res) => {
    console.log(req.query);
    let sentenciaSQL = '';
    if (typeof (req.query.NOMBRE_PELICULA) == 'undefined' || typeof (req.query.DURACION) == 'undefined' || typeof (req.query.GENERO) == 'undefined' || typeof (req.query.FECHA_LANZAMIENTO) == 'undefined') {
        res.json({
            status: 0,
            mensaje: "Completa todos los campos por favor",
            datos: {}
        });
    }
    else {
        sentenciaSQL = `INSERT INTO PELICULAS (NOMBRE_PELICULA, DURACION, GENERO, FECHA_LANZAMIENTO) VALUES ('${req.query.NOMBRE_PELICULA}', ${req.query.DURACION}, '${req.query.GENERO}', '${req.query.FECHA_LANZAMIENTO}')`;
        console.log(sentenciaSQL);

        connection.query(
            sentenciaSQL,
            function (err, results, fields) {
                console.log(results);
                if (results && results.affectedRows == 1) {
                    res.json({
                        status: 1,
                        mensaje: "Película agregada exitosamente",
                        datos: {}
                    });
                } else {
                    res.json({
                        status: 0,
                        mensaje: "Hubo un error al agregar la película, por favor intenta de nuevo",
                        datos: {}
                    });
                }
            }
        )
    }
});

app.put('/pelicula', (req, res) => {
    console.log(req.query);
    let sentenciaSQL = '';
    if (!req.query.ID || typeof req.query.NOMBRE_PELICULA === 'undefined' || typeof req.query.DURACION === 'undefined' || typeof req.query.GENERO === 'undefined' || typeof req.query.FECHA_LANZAMIENTO === 'undefined') {
        res.json({
            status: 0,
            mensaje: "Completa todos los campos por favor",
            datos: {}
        });
    } else {
        sentenciaSQL = `UPDATE PELICULAS SET NOMBRE_PELICULA = '${req.query.NOMBRE_PELICULA}', DURACION = ${req.query.DURACION}, GENERO = '${req.query.GENERO}', FECHA_LANZAMIENTO = '${req.query.FECHA_LANZAMIENTO}' WHERE ID_PELICULA = ${req.query.ID}`;
        console.log(sentenciaSQL);

        connection.query(
            sentenciaSQL,
            function (err, results, fields) {
                if (err) {
                    console.error("Error al ejecutar la consulta SQL:", err);
                    res.json({
                        status: 0,
                        mensaje: "Hubo un error al modificar la película, por favor intenta de nuevo",
                        datos: {}
                    });
                } else {
                    console.log("Resultado de la consulta SQL:", results);
                    if (results && results.affectedRows == 1) {
                        res.json({
                            status: 1,
                            mensaje: "Película modificada exitosamente",
                            datos: {}
                        });
                    } else {
                        console.error("Error: No se afectó ninguna fila durante la actualización.");
                        res.json({
                            status: 0,
                            mensaje: "Hubo un error al modificar la película, por favor intenta de nuevo",
                            datos: {}
                        });
                    }
                }
            }
        );
    }
});



app.delete('/pelicula', (req, res) => {
    console.log(req.query.ID);
    let sentenciaSQL = ''
    if (typeof (req.query.ID) == 'undefined') {
        res.json({
            status: 0,
            mensaje: "Ingresa el ID de la película que deseas eliminar por favor",
            datos: {}
        });
    }
    else {
        sentenciaSQL = `DELETE FROM PELICULAS WHERE ID_PELICULA = ${req.query.ID}`;
    }
    console.log(sentenciaSQL);

    connection.query(
        sentenciaSQL,
        function (err, results, fields) {
            console.log(results);
            if (results.affectedRows == 1) {
                res.json({
                    status: 1,
                    mensaje: "Película eliminada exitosamente",
                    datos: {}
                });
            }
            else {
                res.json({
                    status: 0,
                    mensaje: "Este ID no está registrado, intente con otro ID por favor",
                    datos: {}
                });
            }
        }
    )
});

app.get('/pelicula/formato', (req, res) => {
    let doc = new jsPDF();
    doc.setFontSize(14);

    const nombre = req.query.NOMBRE_PELICULA || '';
    const duracion = req.query.DURACION || '';
    const genero = req.query.GENERO || '';
    const fechaLanzamiento = req.query.FECHA_LANZAMIENTO || '';

    doc.text('Nombre de la película:', 10, 10);
    doc.text(nombre, 60, 10);
    doc.text('Duración:', 10, 30);
    doc.text(duracion, 60, 30);
    doc.text('Género:', 10, 50);
    doc.text(genero, 60, 50);
    doc.text('Fecha de Lanzamiento:', 10, 70);
    doc.text(fechaLanzamiento, 60, 70);

    const idPelicula = req.query.ID || 'sin_id';
    const folderPath = path.join(__dirname, 'CRUD', 'documents');
    
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    let archivoPDF = path.join(folderPath, `consulta_${idPelicula}.pdf`);

    try {
        doc.save(archivoPDF);
        res.download(archivoPDF);
    } catch (err) {
        console.error("Error al guardar o descargar el archivo PDF:", err);
        res.status(500).json({ error: err.message });
    }
});


/*app.get('/test/pdf', (req, res) => {
    let doc = new jsPDF();
    doc.text('Hello world!', 10, 10);

    const folderPath = path.join(__dirname, 'CRUD', 'documents');
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    let archivoPDF = path.join(folderPath, 'test.pdf');

    try {
        doc.save(archivoPDF);
        res.download(archivoPDF);
    } catch (err) {
        console.error("Error al guardar o descargar el archivo PDF:", err);
        res.status(500).json({ error: err.message });
    }
});*/









app.listen(8082, (req, res) => {
    console.log("Servidor Express en puerto 8082");
});
