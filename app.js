const http = require('http');
const cors = require('cors')
const imageController = require('./src/fileController')
const express = require('express')
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

bodyParser = require('body-parser');
app.use(cors({
  origin: true
}));
app.use(function (req, response, next) {
  response.setTimeout(3600);
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

imageController(app)

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});