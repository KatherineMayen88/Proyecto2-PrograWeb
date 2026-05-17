const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth.middleware');
const shipmentController = require('../controllers/shipment.controller');

router.get('/track/:trackingCode', shipmentController.trackShipment);

router.post('/', protect, shipmentController.createShipment);
router.get('/mine', protect, shipmentController.getMyShipments);

router.get('/track/:code', shipmentController.trackShipment);


module.exports = router;