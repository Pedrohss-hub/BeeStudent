import {apiIndex} from './routes/api.js';
import path from 'path'
import fs from 'fs'
import http from 'http'

/*
const path = require('path');
const fs = require('fs');
const http = require('http');
*/

const hostname = "0.0.0.0";
const port = 3000;


const server = http.createServer((req, res) => {
    res.statusCode = 200;

    let frontDir = '../frontend'
    let pathFile = req.url === '/'
    ? path.join(frontDir,'index.html')
    : path.join(frontDir, req.url)

    let contentType = 'text/html'
    switch (path.extname(pathFile)){
        case ".css":
            contentType = 'text/css'
            break
            
        case ".js":
            contentType = 'text/javascript'
            break
        
        case ".ico":
            contentType = 'image/x-ico'
            break
    }       

    res.setHeader('Content-Type', contentType);
    fs.readFile(pathFile,(err,data)=>{
        //if (err) throw err
        res.end(data);
    })

    if (req.url == "/api"){
        apiIndex(req)
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
    res.writeHead(204); // No Content
    res.end();
    return;
}
    
});

server.listen(port, hostname, () => {
    console.log(`Servidor em execução em http://${hostname}:${port}/`);
});
