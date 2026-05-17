const express = require('express');
const router = express.Router();

const { protect, adminOnly } = require('../middlewares/auth.middleware');
const adminController = require('../controllers/admin.controller');

router.get('/users', protect, adminOnly, adminController.getUsers);
router.put('/users/:id', protect, adminOnly, adminController.updateUser);

router.delete('/users/:id', protect, adminOnly, adminController.deleteUser);


router.get('/shipments', protect, adminOnly, adminController.getShipments);
router.put('/shipments/:id', protect, adminOnly, adminController.updateShipment);
router.delete('/shipments/:id', protect, adminOnly, adminController.deleteShipment);

router.get('/dashboard', protect, adminOnly, adminController.getDashboard);

router.get('/dashboard-stats', protect, adminOnly, adminController.getDashboardStats);

router.get('/contacts', protect, adminOnly, adminController.getContacts);


router.delete( '/contacts/:id', protect, adminOnly, adminController.deleteContact);

module.exports = router;