'use strict'

var multer = require('multer')
const path = require('path');
const fs = require('fs');
const resolve_path = require("path").resolve
var base64Img = require('base64-img');
let fileName = new Map()
let urlFile = ''
module.exports = function (app) {
    
    app.get('/hello', function (request, response) {
        response.json('Hello World !')
    });

    /**
     * Function which save locally file
     */
    var storage = multer.diskStorage({
        destination: function (request, file, cb) {
            let path = 'src/images/' +  request.params.provider
            cb(null, path)
        },
        filename: function (request, file, cb) {
            let ext = ''
            if (file.originalname.split(".").length > 1) // checking if there is an extension or not.
                ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            const name = request.params.name + ext;
            fileName[request.params.name] =  name;
            console.log('name: ' + name)
            cb(null, name)
        }
    });

    /**
     * Function which store file
     */
    var upload = multer({
        storage: storage
    }).single('file')
    app.post('/image/set/:provider/:name', function (request, response, next) {
        console.log(__dirname)
        upload(request, response, (error) => {
            if (error) {
                console.log('upload files error: ', error);
                response.status(501).json({
                    error: error
                })
            }
            console.log('upload files end: ' + fileName[request.params.name]);
            response.json({
                name: fileName[request.params.name]
            })
        })
    });

    /**
     * Function which delete files
     */
    app.post('/image/delete/:provider/', function (request, response, next) {
        const paths = request.body.paths;
        const limit = paths.length
        let count = 0
        let result = ""
        paths.forEach(path => {
            path = 'src/images/'+  request.params.provider+ '/' + path
            fs.exists(path, function (exists) {
                count++
                if (exists) {
                    //Show in green
                    console.log('File exists. Deleting now ...');
                    fs.unlink(path, function (result) {
                        if (count === limit)
                            response.send(true)
                    });
                } else {
                    //Show in red
                    console.log('File not found, so not deleting.');
                    if (count === limit)
                        response.json({
                            result: false
                        })
                }
            });
        });

    });

    /**
     * Function which get file as base64
     */
    app.get('/image/get/:provider/:name', function (request, response, next) {
        const path = './src/images/' + request.params.provider + '/' + request.params.name
        base64Img.base64(path, function(err, data) {
            response.json({data: data})
        })
    });

    /**
     * Function which get path of file
     */
    app.get('/image/path/get/:provider/:name', function (request, response, next) {
        const path = './src/images/' + request.params.provider + '/' + request.params.name
        const absolute_path = resolve_path(path)
        response.json({path: absolute_path})
    });
}