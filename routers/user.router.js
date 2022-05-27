const express = require('express');
const { register, login, getUserList, getUserDetail, updateUserForAdmin, deleteUser, isLoggedIn } = require('../controllers/user.controller.js');
const { authenticate } = require('../middlewares/auth/authenticate.js');
const { authorize } = require('../middlewares/auth/authorize.js');
const { isExist } = require('../middlewares/validation/isExist.js');
const { User } = require('../models/index.js');

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/isloggedin', isLoggedIn);

userRouter.get('/', authenticate, authorize(["admin"]), getUserList);
userRouter.get('/:id', authenticate, authorize(["admin"]), isExist(User), getUserDetail);
userRouter.put('/:id', authenticate, authorize(["admin"]), isExist(User), updateUserForAdmin);
userRouter.delete('/:id', authenticate, authorize(["admin"]), isExist(User), deleteUser);

module.exports = {
    userRouter
}