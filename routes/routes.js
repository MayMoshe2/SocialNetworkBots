const express = require('express'),
    backendRoutes = require('./backend');

var router = express.Router();

//change ' _'
// router.put('/updateJson', backendRoutes.updateJson);
// router.get('/getTour/:id', tripsRoutes.getTour);
router.post('/updateJson/:id', backendRoutes.updateJson);
// router.post('/createSiteInPath/:id', tripsRoutes.createSiteInPath);
// router.put('/updateTour/:id', tripsRoutes.updateTour);
// router.delete('/deleteTour/:id', tripsRoutes.deleteTour);
// router.delete('/deleteSite/:id/:site_name', tripsRoutes.deleteSite);

module.exports = router;