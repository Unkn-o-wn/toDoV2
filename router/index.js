const express = require('express');
const router = express.Router();
const controllerIndex = require('../controller/index');


router.get('/', controllerIndex.getToDo);

router.post('/', controllerIndex.addNewToDo);

router.put('/:id', controllerIndex.editSomeToDo);

router.put('/complete/:id', controllerIndex.completeToDo);

router.delete('/:id', controllerIndex.deleteSomeToDo);




module.exports = router;