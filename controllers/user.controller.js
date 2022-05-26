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
            message: "Register successfullu",
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
                message: "Incorrect password"
            });
        }
    } else {
        res.status(500).send({
            message: "User does not exist"
        });
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
            res.status(400).send(userList);
        }
        else {
            const userList = await User.findAll();
            res.status(400).send({
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
    const { password, name, email, phoneNumber } = req.body
    try {
        const updatedUser = await User.findOne({
            where: {
                id
            }
        });
        // generate a string randomly
        const salt = bcrypt.genSaltSync(10);
        // encrypt random string + password
        const hashPassword = bcrypt.hashSync(password, salt);

        updatedUser.password = hashPassword;
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
    deleteUser
}