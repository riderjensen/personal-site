const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api.controller');

router.get('/', apiController.getAll);

router.get('/:id', apiController.getOneSub);

router.get('/range/:id', apiController.getRange);

router.get('/:sub/:id', apiController.findOne);

router.put('/update/:id', apiController.editOne);

router.delete('/delete/:id', apiController.deleteOne);

router.post('/create', apiController.createOne);

module.exports = router;