const express = require('express')
;(path = require('path')), (fs = require('fs')), (cors = require('cors')), (routers = require('./routes/routes.js'))
const port = 3002

const app = express()

app.use('/', express.static(path.join(__dirname, 'html')))
app.use('/MessageOnEvent', express.static(path.join(__dirname, 'html/messageOnEvent.html')))
app.use('/mainPage', express.static(path.join(__dirname, 'html/mainPage.html')))
app.use('/addConnections', express.static(path.join(__dirname, 'html/addConnections.html')))
app.use('/login', express.static(path.join(__dirname, 'html/login.html')))

// app.use('/', express.static(path.join(__dirname, 'public')))
// app.use('/MessageOnEvent', express.static(path.join(__dirname, 'public/messageOnEvent.html')))
// app.use('/mainPage', express.static(path.join(__dirname, 'public/mainPage.html')))
// app.use('/addConnections', express.static(path.join(__dirname, 'public/addConnections.html')))
// app.use('/login', express.static(path.join(__dirname, 'public/login.html')))

app.use('/js', express.static(path.join(__dirname, 'js')))
app.use(express.static('style'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routers)

const server = app.listen(port, () => {
  console.log('listening on port %s...', server.address().port)
})
