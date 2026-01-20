const express = require('express');
const router = express.Router();
const subController = require('../controllers/subController');

router.get('/', subController.getSubs);
router.post('/', subController.createSub);
router.delete('/:id', subController.deleteSub);

module.exports = router;