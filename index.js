/**
 * Se levanta un servidor usando node.js puro, con el método http
*/
import http from 'http';
import fs from 'fs';
import Mustache from 'mustache';
import {} from "dotenv/config";

// Variables para especificar el tipo archivo, de los archivos estáticos (carpeta public)
const HTML_CONTENT_TYPE = 'text/html';
const CSS_CONTENT_TYPE = 'text/css';
const JS_CONTENT_TYPE = 'text/javascript';

const requestListener = (req, res) => {
    const { url } = req;
    // Ruta de los archivos públicos
    let pathFile = `${process.env.INIT_CWD}${url}`;
    let contentType = HTML_CONTENT_TYPE;
    // Si estamos pidiendo la ruta principal, devolvemos el contenido del idex.html
    if (url === '/') pathFile = `${process.env.INIT_CWD}/views/index.html`;
    // Para los archivos públicos .css
    if (url.match('\.css$')) contentType = CSS_CONTENT_TYPE;
    // Para los archivos públicos .js
    if (url.match('\.js$')) contentType = JS_CONTENT_TYPE; 

    fs.readFile(pathFile, (err, data) => {
        let file = data;
        // Manda error en caso de que la ruta del archivo no se encuentre
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        // Agrega las variables dinámicas para el archivo index.html
        if (url === '/') {
            file = Mustache.render(data.toString('utf-8'), { key: process.env.KEY });
        }
        res.setHeader('Content-Type', contentType);
        res.writeHead(200);
        res.end(file);
    });
}

const server = http.createServer(requestListener);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Servidor activo en el puerto ${port}`);
    console.log(`Ruta del servidor ${process.env.BASE_URL}`);
});