const express = require('express');
const userController = require('../controllers/event-user-controller')

const router = express.Router();


router.post('/register' , userController.register);
router.post('/create-poll' , userController.createPoll);
router.get('/getactivepoll' , userController.getActivePoll);
router.post('/update-poll' , userController.updatepoll);

router.post('/message' , userController.sendMessage);
router.get('/message' , userController.getMessages);

router.post('/question' , userController.createQuestion);
router.get('/question' , userController.getQuestion);

router.post('/create-ans' , userController.createAns)
router.post('/getanss' , userController.getAns)

module.exports = router;