const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api.controller');

router.get('/', apiController.getAll);

router.get('/range/:id', apiController.getRange);

router.get('/findOne/:id', apiController.findOne);

router.put('/update/:id', apiController.editOne);

router.delete('/delete/:id', apiController.deleteOne);

router.post('/create', apiController.createOne);

module.exports = router;