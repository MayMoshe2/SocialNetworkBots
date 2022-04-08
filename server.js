const express = require('express')
;(path = require('path')), (fs = require('fs')), (cors = require('cors')), (routers = require('./routes/routes.js'))
const port = process.env.PORT || 5000
const host = '0.0.0.0'
const app = express()

app.use('/', express.static(path.join(__dirname, 'html')))
app.use('/MessageOnEvent', express.static(path.join(__dirname, 'html/messageOnEvent.html')))
app.use('/mainPage', express.static(path.join(__dirname, '/mainPage.html')))
app.use('/addConnections', express.static(path.join(__dirname, 'html/addConnections.html')))
app.use('/index', express.static(path.join(__dirname, 'index.html')))
app.use('/manageData', express.static(path.join(__dirname, 'html/manageData.html')))
app.use('/newEmployee', express.static(path.join(__dirname, 'html/newEmployee.html')))
app.use('/sendEmails', express.static(path.join(__dirname, 'html/sendEmails.html')))
app.use('/withdrawConnections', express.static(path.join(__dirname, 'html/withdrawConnections.html')))

app.use('/js', express.static(path.join(__dirname, 'js')))
app.use(express.static('style'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routers)

const server = app.listen(port, host, function () {
  console.log('listening on port %s...', server.address().port)
})
