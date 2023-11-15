const http = require('http');

const servidor = http.createServer((req, res) => {
    res.write("Servidor Http Node contestando a petición get");
    res.end();
});

servidor.listen(8082, () => {
    console.log("Servidor Node http corriendo en puerto 8082");
});






