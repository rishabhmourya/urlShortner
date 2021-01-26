const express = require('express');
let Router = express.Router();
let path = require('path');

const fs = require('fs');

function frontController() {

    function generate(req, res) {

        let actualpath = req.body.generate;

        let array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z'];

        function giveRandomNumber() {
            return Math.floor(Math.random() * 26);
        };

        let randomString = `${array[giveRandomNumber()]}${array[giveRandomNumber()]}${array[giveRandomNumber()]}${array[giveRandomNumber()]}`;
        //creating obj to be pushed into json
        let pushData = { minified: randomString, actualpath: actualpath };

        //saving it into the json file
        fs.readFile('data.json', function (err, data) {
            if (err) throw err;
            obj = JSON.parse(data); // already saved data in the json
            obj.url.push(pushData); //adding our new obj into existing json data
            json = JSON.stringify(obj); //converting it back to json
            fs.writeFile('data.json', json, function (err) {
                if (err) throw err;
            })
        })

        //send response
        let resData = `http://15.207.95.41/${randomString}`
      return  res.render('greet', { resData: resData });

    };
    function minified(req, res) {
        let check = req.params.minified;
        //getting data from json
        fs.readFile('data.json', function (err, data) {
            if (err) throw err;
            parsedData = JSON.parse(data); // already saved data in the json
            let array = parsedData.url; //selected array presend in json

            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                if (check == element.minified) {
                    return res.redirect(element.actualpath);
                }
            }
            return res.redirect('/');
            
        })

    };


    return {
        generate,
        minified
    };
}

module.exports = frontController;