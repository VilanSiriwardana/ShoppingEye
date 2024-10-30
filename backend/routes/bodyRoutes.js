const express = require('express');
const router = express.Router();

const measurementController = require('../controllers/measurementController');
const bodyTypeController = require('../controllers/bodyTypeController');

const upload = require('../config/multer');






// Routes for Measurements
router.post('/measurements/saveMeasurements', measurementController.saveMeasurements);
router.get('/measurements', measurementController.getAllMeasurements);
router.put('/measurements/updateMyMeasurements/:id', measurementController.updateMeasurements);
router.delete('/measurements/deleteMyMeasurements/:id', measurementController.deleteMeasurements);
router.get('/measurements/getUserMeasurements/:id', measurementController.getUserMeasurements);
router.get('/measurements/getUserMeasurementsByUserId/:userId', measurementController.getUserMeasurementsByUserId);


// Routes for Body Types
router.post('/bodyTypes/addBodyType', upload.single('image'), bodyTypeController.addBodyType);
router.get('/bodyTypes/getAllBodyTypes', bodyTypeController.getAllBodyTypes);
router.put('/bodyTypes/updateBodyType/:id', upload.single('image'), bodyTypeController.updateBodyType);
router.delete('/bodyTypes/deleteBodyType/:id', bodyTypeController.deleteBodyType);
router.get('/bodyTypes/getBodyType/:id', bodyTypeController.getBodyType);
router.get('/bodyTypes/getBodyTypeByName/:name', bodyTypeController.getBodyTypeByName);




module.exports = router;