const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api.controller');

router.get('/', apiController.getAll);

router.get('/:id', apiController.getRange);

module.exports = router;