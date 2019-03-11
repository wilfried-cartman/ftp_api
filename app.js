const http = require('http');
const cors = require('cors')
const routers = require('./src/routers')
const express = require('express')
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

bodyParser = require('body-parser');
app.use(cors({origin: true}));
app.use(function(req, response, next) {
    response.setTimeout(3600);
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });
routers(app)
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});