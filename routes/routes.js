const express = require('express')
const { updateJson, firstPython, writeFile, readFile, addCon, addEmployee, withrowPy, manage_data, sendEmailsUrl } = require('./backend')
var router = express.Router()

router.post('/updateJson/:id', updateJson)
router.get('/firstPython', firstPython)
router.get('/addCon/:value', addCon)
router.get('/addEmployee', addEmployee)
router.get('/withrowPy/:value', withrowPy)
router.get('/manage_data/:value/:option', manage_data)
router.get('/sendEmailsUrl/:headLine/:mess', sendEmailsUrl)

module.exports = router
