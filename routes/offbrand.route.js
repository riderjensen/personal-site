const express = require('express');
const router = express.Router();

const offBrandController = require('../controllers/offbrand.controller');

router.get('/', offBrandController.index);

module.exports = router;