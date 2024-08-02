const express = require('express');
const router = express.Router();
const addressController = require('../Controllers/addressController');
const authenticate = require('../Middleware/authenticate')
router.delete('/address/:id',authenticate, addressController.deleteAddress);
router.put('/address/:id', authenticate, addressController.updateAddress);
router.get('/addresses/:userId',authenticate,  addressController.getAddressesByUser);

module.exports = router;
