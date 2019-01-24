const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api.controller');

router.get('/', apiController.getAll);

module.exports = router;