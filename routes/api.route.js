const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api.controller');

router.get('/', apiController.getAll);

router.get('/range/:id', apiController.getRange);

router.get('/sub/:id', apiController.getSub);

module.exports = router;