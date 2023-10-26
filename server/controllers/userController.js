// Controller for user-related operations
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const cookie = require('cookie-parser') 
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;





exports.signup = (req, res) => {
    // Your validation and signup logic here
    let { first_name, last_name, username, email, password } = req.body;
    first_name = first_name.trim();
    last_name = last_name.trim();
    username = username.trim();
    email = email.trim();
    password = password.trim();
    if (first_name == "" || last_name == "" || username == "" || email == "" || password == "") {
        res.json({
            status: 'FAILED',
            message: 'INVALID INPUT FIELDS!'
        });
    } else if (!/^[a-zA-Z ]*$/.test(first_name) || !/^[a-zA-Z ]*$/.test(last_name)) {
        res.json({
            status: 'FAILED',
            message: 'INVALID NAME ENTER'
        });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.json({
            status: 'FAILED',
            message: 'INVALID EMAIL ENTER'
        });
    } else if (password.length < 8) {
        res.json({
            status: 'FAILED',
            message: 'WEAK PASSWORD ENTER'
        });
    } else {
        // check if user already exists
        User.findOne({ email }).then(result => {
            if (result) {
                // a user with the provided email already exists
                res.json({
                    status: 'FAILED',
                    message: 'User with the provided email already exists'
                });
            } else {
                // try to create a new user

                // password handling
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new User({
                        first_name,
                        last_name,
                        username,
                        email,
                        password: hashedPassword,

                    });
                    newUser.save().then(result => {
                        res.json({
                            status: 'SUCCESS',
                            message: 'Signup successful',
                            data: result,
                        });
                    })
                    .catch(err => {
                        console.error(err)
                            res.json({
                                status: 'FAILED',
                                message: 'An error occurred while saving user account',
                                error: err
                            });
                        });
                })
                    .catch(err => {
                        res.json({
                            status: 'FAILED',
                            message: 'An error occurred while hashing the password',
                        });
                    });
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: 'FAILED',
                message: 'An error occurred while checking for an existing user'
            });
        });
    }
};

exports.signin = (req, res) => {
    // Your signin logic here
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (email == "" || password == "") {
        res.json({
            status: 'FAILED',
            message: 'Empty credentials supplied!'
        });
    } else {
        // Check if user exists
        User.find({ email }).then(data => {
            if (data.length) {
                // User exists
                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result => {
                    if (result) {
                        const token = jwt.sign(
                            { username: data.username, email: data.email },
                            JWT_SECRET,
                            { expiresIn: "2h" }
                          );
                          res.cookie("token", token, { httpOnly: true });
                        // Passwords match
                        res
                        .cookie("token", token, { httpOnly: true })
                        .json({
                            status: 'SUCCESS',
                            message: 'Signin successful',
                            data: data,
                            token: token
                        });

                    } else {
                        // Passwords do not match
                        res.json({
                            status: 'FAILED',
                            message: 'Invalid password entered'
                        });
                    }
                }).catch(err => {
                    res.json({
                        status: 'FAILED',
                        message: 'An error occurred while comparing passwords'
                    });
                });
            } else {
                res.json({
                    status: 'FAILED',
                    message: 'Invalid credentials entered'
                });
            }
        }).catch(err => {
            res.json({
                status: 'FAILED',
                message: 'An error occurred while checking for the user'
            });
        });
    }
};


exports.getAllUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    try {
        const users = await User.find()
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};











