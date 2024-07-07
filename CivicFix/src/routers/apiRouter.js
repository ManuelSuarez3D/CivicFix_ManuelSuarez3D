const express = require('express');
const router = express.Router();
const ApiController = require('../controllers/apiController.js');
const {isDeveloperMiddleware} = require("../middleware/auth");

router.get('/getParts', isDeveloperMiddleware, ApiController.getParts);
router.get('/getPart/:id', isDeveloperMiddleware, ApiController.getPartById);
router.post('/addPart', isDeveloperMiddleware, ApiController.addPart);
router.put('/updatePart/:id', isDeveloperMiddleware, ApiController.updatePart);
router.delete('/deletePart/:id', isDeveloperMiddleware, ApiController.deletePart);

module.exports = router;