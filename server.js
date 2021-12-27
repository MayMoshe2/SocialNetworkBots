const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    fs = require('fs'),
    cors = require('cors'),
    routers = require('./routes/routes.js');
const port = 3001;

const app=express();

app.use('/', express.static(path.join(__dirname, 'html')));
// app.use('/main', express.static(path.join(__dirname, 'html/main.html')));
app.use('/MessageOnEvent', express.static(path.join(__dirname, 'html/messageOnEvent.html')));
// app.use('/style', express.static(path.join(__dirname, 'style')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use(express.static('style'));

//restfull 
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routers);

const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});