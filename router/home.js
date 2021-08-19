const express = require('express');
const router = express.Router();
const controllerIndex = require('../controller/home.js');


router.get('/', controllerIndex.getHome);


module.exports = router;