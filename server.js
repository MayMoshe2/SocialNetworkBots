const express = require('express')
path = require('path'),
fs = require('fs'),
cors = require('cors'),
routers = require('./routes/routes.js');
const port = 3001;

const app=express();

app.use('/', express.static(path.join(__dirname, 'html')));
// app.use('/main', express.static(path.join(__dirname, 'html/main.html')));
app.use('/MessageOnEvent', express.static(path.join(__dirname, 'html/messageOnEvent.html')));
app.use('/mainPage', express.static(path.join(__dirname, 'html/mainPage.html')));

// app.use('/style', express.static(path.join(__dirname, 'style')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use(express.static('style'));
app.get('/runPy', (req, res)=>{
    var dataToSend;
    const python = spawn('python', ['temp.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend)
    });
})
//restfull 
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routers);

const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});