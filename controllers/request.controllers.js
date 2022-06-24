const { Request } = require('../models/index.js')

const createRequest = async (req, res) => {
    const request = {
        sentBy: req.body.sentBy,
        resBy: "",
        data: req.body.data,
        isDone: "false",
        isApproved: ""
    };
    console.log(request)
    try {
        const newRequest = await Request.create(request);
        res.status(201).send({
            message: "Create request successfully",
            request: newRequest
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const getRequestList = async (req, res) => {
    try {
        const requestList = await Request.findAll();
        res.status(200).send({
            message: "Get the request list successfully",
            requestList
        })
    } catch (error) {
        res.status(500).send(error);
    }
}

const getRequestListSentBy = async (req, res) => {
    const { username } = req.params
    try {
        const requestList = await Request.findAll({
            where: {
                sentBy: username
            }
        });
        res.status(200).send({
            message: "Get the request list successfully",
            requestList
        })
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateRequest = async (req, res) => {
    const { id } = req.params;
    const { isApproved, resBy } = req.body
    try {
        const updatedRequest = await Request.findOne({
            where: {
                id
            }
        });
        if (updatedRequest.isDone === "false") {
            updatedRequest.resBy = resBy
            updatedRequest.isDone = "true";
            updatedRequest.isApproved = isApproved
            await updatedRequest.save();
            res.status(200).send({
                message: "Update the request successfully",
                request: updatedRequest
            });
        } else {
            res.status(401).send({
                message: "Request have been proccessed already!",
                request: updatedRequest
            });
        }
    } catch (error) {
        res.status(500).send(error);
    };
}

module.exports = {
    createRequest,
    getRequestList,
    getRequestListSentBy,
    updateRequest
}