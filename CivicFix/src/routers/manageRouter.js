const express = require('express');
const router = express.Router();
const PartController = require('../controllers/manageController.js');
const {isEmployeeMiddleware} = require("../middleware/auth");

router.get('/manage', isEmployeeMiddleware, PartController.getParts);
router.get('/manage/:id', isEmployeeMiddleware, PartController.getPartById);
router.post('/manage/add', isEmployeeMiddleware, PartController.addPart);
router.post('/manage/update', isEmployeeMiddleware, PartController.updatePart);
router.post('/manage/delete/:id', isEmployeeMiddleware, PartController.deletePart);

module.exports = router;