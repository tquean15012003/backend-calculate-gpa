const { User } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

// register
const register = async (req, res) => {
    const { username, password, name, email, phoneNumber } = req.body
    try {
        // generate a string randomly
        const salt = bcrypt.genSaltSync(10);
        // encrypt random string + password
        const hashPassword = bcrypt.hashSync(password, salt);
        const newUser = await User.create({ username, password: hashPassword, name, email, phoneNumber });
        res.status(201).send({
            message: "Register successfully",
            user: newUser
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

// login
const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        where: {
            username
        }
    })
    if (user) {
        const isAuth = bcrypt.compareSync(password, user.password);
        if (isAuth) {
            const token = jwt.sign({
                username: user.username,
                type: user.type
            }, "calculate-gpa-harry-tran", { expiresIn: 60 * 60 })
            res.status(200).send({
                message: "Login successfully",
                token,
                user
            });
        } else {
            res.status(500).send({
                message: "Incorrect password!"
            });
        }
    } else {
        res.status(500).send({
            message: "Username does not exist!"
        });
    }
}

// logged in or not
const isLoggedIn = async (req, res) => {
    const token = await req.headers["token"];
    try {
        const decode = jwt.verify(token, "calculate-gpa-harry-tran");
        if (decode) {
            username = decode.username;
            const user = await User.findOne({
                where: {
                    username
                }
            });
            res.status(200).send({
                message: "Logged in already",
                token,
                user
            });
        } else {
            res.status(401).send("Haven't logged in yet!!");
        }
    } catch (error) {
        res.status(401).send("Haven't logged in yet!!");
    }
}

// get user list (admin only)
const getUserList = async (req, res) => {
    const { username } = req.query;
    try {
        if (username) {
            const userList = await User.findAll({
                where: {
                    username: {
                        [Op.like]: `%${username}%`
                    }
                }
            });
            res.status(200).send({
                message: "Get the user list successfully",
                userList
            });
        }
        else {
            const userList = await User.findAll();
            res.status(200).send({
                message: "Get the user list successfully",
                userList
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }

}

// get user detail (admin only)
const getUserDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({
            where: {
                id
            }
        });
        res.status(200).send({
            message: "Get the user detail successfully",
            user
        });
    } catch (error) {
        res.status(500).send(error);
    };
}

// update user (admin only)
const updateUserForAdmin = async (req, res) => {
    const { id } = req.params;
    const { name, email, phoneNumber } = req.body
    try {
        const updatedUser = await User.findOne({
            where: {
                id
            }
        });
        updatedUser.name = name;
        updatedUser.email = email;
        updatedUser.phoneNumber = phoneNumber;
        await updatedUser.save();
        res.status(200).send({
            message: "Update the user successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).send(error);
    };
}

// delete user (admin only)
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findOne({
            where: {
                id
            }
        });
        await User.destroy({
            where: {
                id
            }
        });
        res.status(200).send({
            message: "Delete the user successfully",
            user: deletedUser
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    register,
    login,
    getUserList,
    getUserDetail,
    updateUserForAdmin,
    deleteUser,
    isLoggedIn
}