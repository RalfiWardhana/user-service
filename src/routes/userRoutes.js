const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../configs/verify').authMiddleware;
const { authorize } = require('../configs/verify');

router.post('/login', userController.login);

router.get('/', authMiddleware,userController.getUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.post('/', authMiddleware, userController.createUser);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);
router.post('/upload', authMiddleware, userController.uploadPhoto);


module.exports = router;