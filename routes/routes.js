const express = require('express')
const { updateJson,firstPython,writeFile,readFile } = require('./backend')
var router = express.Router();

router.post('/updateJson/:id', updateJson);
router.get('/firstPython', firstPython);

module.exports = router;