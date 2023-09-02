# Modelo Caja/Display

El concepto de "modelo de caja" en HTML se refiere a la forma en que se representan visualmente los elementos HTML en una página web. Cada elemento en HTML se considera como una caja rectangular, y esta representación visual se basa en el modelo de caja, que define cómo se combinan y muestran los diferentes componentes del contenido en la página.

Las diferentes partes que componen una caja en el modelo de caja de HTML son:

1. Contenido (Content): Es el contenido real del elemento HTML, como texto, imágenes u otros elementos HTML anidados.

2. Relleno (Padding): Es el espacio transparente que rodea el contenido dentro de la caja. El relleno se utiliza para separar el contenido de los bordes de la caja.

3. Borde (Border): Es la línea que rodea el relleno y el contenido de la caja. Define los límites físicos de la caja.

4. Margen (Margin): Es el espacio transparente que rodea el borde de la caja. Los márgenes se utilizan para separar las cajas entre sí.

![Partes del modelo de cajas](https://www.arkaitzgarro.com/css2/images/cap04/boxmodel_2d.png)




La propiedad CSS llamada "display" controla cómo se comporta un elemento en relación con otros elementos en el flujo de diseño de la página. La propiedad "display" permite ajustar el tipo de caja que un elemento será y cómo interactuará con otros elementos cercanos. Los valores que puede tomar la propiedad "display" son:

1. block: Los elementos con esta propiedad ocuparán todo el ancho disponible en su contenedor padre y se colocarán uno debajo del otro en el flujo vertical. Ejemplos de elementos de bloque incluyen divs, párrafos (p), encabezados (h1, h2, etc.) y elementos de lista (ul, ol).

2. inline: Los elementos con esta propiedad se mostrarán en línea con el flujo del texto y solo ocuparán el ancho necesario para su contenido. No habrá saltos de línea antes o después del elemento. Ejemplos de elementos en línea son los enlaces (a), las imágenes (img) y los elementos de texto en línea (span, em, strong).

3. inline-block: Esta propiedad combina características de elementos en línea y de bloque. Los elementos se muestran en línea, pero se les permite definir un ancho y alto, y también pueden tener márgenes y relleno.

4. none: Los elementos con esta propiedad no se mostrarán en absoluto. Se ocultan y no ocupan espacio en el diseño.

5. flex: Esta propiedad establece un contenedor flexible que organiza sus elementos hijos en una dirección (horizontal o vertical) y permite un control avanzado sobre su distribución y alineación.

6. grid: Similar a "flex", pero esta propiedad establece un contenedor de cuadrícula en el que los elementos hijos se organizan en filas y columnas, lo que permite un diseño más complejo y flexible.

Estos valores de la propiedad "display" son fundamentales para controlar cómo se estructura y organiza el diseño de la página web, permitiendo a los desarrolladores adaptar y diseñar las cajas de contenido de acuerdo con sus necesidades y objetivos de diseño.

![Propiedad display](https://res.cloudinary.com/practicaldev/image/fetch/s--165xtT0Q--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h0y0cf2fj9m16wpv7y2n.jpg)