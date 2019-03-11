'use strict'

var multer = require('multer')
const path = require('path');
const fs = require('fs');
let name = ''
let urlFile = ''
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.json('request success !')
    });
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            console.log('files : ', file);
            cb(null, 'src/images/')
        },
        filename: function (req, file, cb) {
            let ext = ''
            if (file.originalname.split(".").length > 1) // checking if there is an extension or not.
                ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            name = req.params.name + ext;
            console.log('name: ' + name)
            cb(null, name)
        }
    });

    var upload = multer({
        storage: storage
    }).single('file')
    app.post('/upload/:name', function (req, res, next) {
        urlFile = `${req.protocol}:\/\/${req.get('host')}` + '/src/images/'
        upload(req, res, (error) => {
            if (error) {
                console.log('upload files error: ', error);
                res.status(501).json({
                    error: error
                })
            }
            console.log('upload files end');
            res.json({
                // originalname: file.originalname,
                path: path.join(__dirname, 'images') + '/' + name
            })
        })
    });
    app.post('/delete', function (req, res, next) {
        const paths = req.body.paths;
        const limit = paths.length
        let count = 0
        paths.forEach(path => {
            fs.exists(path, function (exists) {
                count++
                if (exists) {
                    //Show in green
                    console.log('File exists. Deleting now ...');
                    fs.unlink(path, function (result) {
                        if (count === limit)
                            res.json({
                                result: true
                            })
                    });
                } else {
                    //Show in red
                    console.log('File not found, so not deleting.');
                    if (count === limit)
                        res.json({
                            result: false
                        })
                }
            });
        });

    });
    app.get('/path', function (req, res, next) {
        // const url = `${req.protocol}:\/\/${req.get('host')}`
        const url = path.join(__dirname, 'images')
        res.json({
            'url': url
        })
    });
}