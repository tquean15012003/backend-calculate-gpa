const express = require('express');
const { isExist } = require('../middlewares/validation/isExist.js');
const { Request } = require('../models/index.js');
const { authenticate } = require('../middlewares/auth/authenticate.js');
const { authorize } = require('../middlewares/auth/authorize.js');
const { getRequestList, getRequestListSentBy, createRequest, updateRequest } = require('../controllers/request.controllers.js')

const requestRouter = express.Router();

requestRouter.get('/', authenticate, authorize(["admin"]), getRequestList);
requestRouter.get('/sentby/:username', authenticate, getRequestListSentBy);
requestRouter.post('/', authenticate, createRequest);
requestRouter.put('/:id', authenticate, authorize(["admin"]), isExist(Request), updateRequest);

module.exports = {
    requestRouter
}