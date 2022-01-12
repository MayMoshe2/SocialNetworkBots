const express = require('express')
const { updateJson, firstPython, writeFile, readFile, addCon } = require('./backend')
var router = express.Router()

router.post('/updateJson/:id', updateJson)
router.get('/firstPython', firstPython)
router.get('/addCon', addCon)

module.exports = router
