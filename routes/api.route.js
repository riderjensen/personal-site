const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api.controller');

router.get('/', apiController.getAll);

router.get('/:id', apiController.getRange);

router.put('/update/:id', apiController.editOne);

router.delete('/delete/:id', apiController.deleteOne);

router.post('/create', apiController.createOne);

module.exports = router;