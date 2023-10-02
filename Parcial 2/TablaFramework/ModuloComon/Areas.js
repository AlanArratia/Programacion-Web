function areacuadrado(lado) {
    return lado * lado;
}

function areaTriangulo(base, altura) {
    return (base * altura) / 2;
}

function areaCirculo(radio) {
    return Math.PI * radio * radio;
}

function areaRectangulo(ancho, alto) {
    return ancho * alto;
}

module.exports.areacuadrado = areacuadrado;
module.exports.areaTriangulo = areaTriangulo;
module.exports.areaCirculo = areaCirculo;
module.exports.areaRectangulo = areaRectangulo;

//console.log(module);
