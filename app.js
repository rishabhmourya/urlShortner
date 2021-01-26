const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

let app = express();

app.use(express.static(path.join(__dirname, '/public/')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views/');
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

const frontRouter = require('./src/routes/frontRoutes')();

app.use('/', frontRouter);
app.listen(80, function () {
  console.log('App has been started');
})
