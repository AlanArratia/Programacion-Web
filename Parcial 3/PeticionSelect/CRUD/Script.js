window.onload = function () {
    new gridjs.Grid({
        search: true,
        pagination: true,
        fixedHeader: true,
        sort: true,
        height: '200px',
        width: '1200px',
        pagination: {
            limit: 50
        },
        columns: ['ID_PELICULA', 'NOMBRE_PELICULA'],
        server: {
            url: 'http://localhost:8082',
            then: data => data.map(pelicula =>
                [pelicula.ID_PELICULA, pelicula.NOMBRE_PELICULA]
            )
        }
    }).render(document.getElementById("tabla"));

    document.getElementById("btnConsultar").addEventListener("click", async () => {
        let id = document.getElementById("inputID").value;
        let response = await fetch(`http://localhost:8082/pelicula?ID=${id}`, { method: "GET" });
        let data = await response.json();
        console.log(data)
        if (data.status == 0) {
            alert(data.mensaje);
            console.log(data.status);
        }
        else {
            alert(data.mensaje);
            console.log(data.datos);
            console.log(data.status);
            document.getElementById("nombre").value = data.datos.NOMBRE_PELICULA;
            document.getElementById("duracion").value = data.datos.DURACION;
            document.getElementById("genero").value = data.datos.GENERO;
            document.getElementById("fecha").value = data.datos.FECHA_LANZAMIENTO;
        }
    });

    document.getElementById("btnAgregar").addEventListener("click", async () => {
        let vNombre = document.getElementById("nombre").value;
        let vDuracion = document.getElementById("duracion").value;
        let vGenero = document.getElementById("genero").value;
        let vFecha = document.getElementById("fecha").value;
        await fetch(`http://localhost:8082/pelicula?NOMBRE_PELICULA=${vNombre}&DURACION=${vDuracion}&GENERO=${vGenero}&FECHA_LANZAMIENTO=${vFecha}`, { method: "POST" })
            .then(response => response.json())
            .then(data => {
                if (data.status === 1) {
                    alert(data.mensaje);
                } else {
                    alert(data.mensaje);
                }
            })
    });

    document.getElementById("btnModificar").addEventListener("click", async () => {
        let vID = document.getElementById("inputID").value;
        let vNombre = document.getElementById("nombre").value;
        let vDuracion = document.getElementById("duracion").value;
        let vGenero = document.getElementById("genero").value;
        let vFecha = document.getElementById("fecha").value;
        await fetch(`http://localhost:8082/pelicula?ID=${vID}&NOMBRE_PELICULA=${vNombre}&DURACION=${vDuracion}&GENERO=${vGenero}&FECHA_LANZAMIENTO=${vFecha}`, { method: "PUT" })
            .then(response => response.json())
            .then(data => {
                
                if (data.status === 1) {
                    alert(data.mensaje);
                } else {
                    alert(data.mensaje);
                }
            })
    });

    document.getElementById("btnEliminar").addEventListener("click", async () => {
        let id = document.getElementById("inputID").value;
        await fetch(`http://localhost:8082/pelicula?ID=${id}`, { method: "DELETE" })
            .then(response => response.json())
            .then(data => {
                if (data.status === 1) {
                    alert(data.mensaje);
                } else {
                    alert(data.mensaje);
                }
            })
    });

    document.getElementById("btnPDFConsulta").addEventListener("click", async () => {
        let vID = document.getElementById("inputID").value;
        let vNombre = document.getElementById("nombre").value;
        let vDuracion = document.getElementById("duracion").value;
        let vGenero = document.getElementById("genero").value;
        let vFecha = document.getElementById("fecha").value;
        
        let response = await fetch(`http://localhost:8082/pelicula/formato?ID=${vID}&NOMBRE_PELICULA=${vNombre}&DURACION=${vDuracion}&GENERO=${vGenero}&FECHA_LANZAMIENTO=${vFecha}`, { method: "GET" });
        
        if (response.ok) {
            let blob = await response.blob();
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = `consulta_${vID}.pdf`;
            a.click();
        } else {
            console.error("Error al generar el PDF. Detalles:", response.statusText);
            alert("Error al generar el PDF. Consulta la consola para más detalles.");
        }
    });
    
    
    
    
};
