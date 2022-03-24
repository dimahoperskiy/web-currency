var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const rp = require("request-promise")


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get('/currency/:val', (req, res) => {
    console.log(req.params.val)
    let options = {
        method: "get",
        uri: "https://www.cbr-xml-daily.ru/daily_json.js",
        json: true
    }

    rp(options)
        .then(parsedBody => {
            let valutes = parsedBody.Valute
            console.log(req.params.val)
            console.log(valutes[req.params.val])
            res.send({currency: valutes[req.params.val]})
        })
        .catch(err => {
            res.send('error')
        })
    // res.send('ddd')
})

module.exports = app;
