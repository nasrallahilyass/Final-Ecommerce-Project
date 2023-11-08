// Controller for user-related operations
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const paginate = require('express-paginate');



// const cookie = require('cookie-parser') 


// Add a new user
exports.signup = (req, res) => {
    // Your validation and signup logic here
    let { first_name, last_name, username, email, password, role } = req.body;
    first_name = first_name.trim();
    last_name = last_name.trim();
    username = username.trim();
    email = email.trim();
    password = password.trim();
    role = role.trim();
    if (first_name == "" || last_name == "" || username == "" || email == "" || password == ""|| role == "") {
        res.json({
            status: 'FAILED',
            message: 'INVALID INPUT FIELDS!'
        });
    } else if (!/^[a-zA-Z ]*$/.test(first_name) || !/^[a-zA-Z ]*$/.test(last_name) || !/^[a-zA-Z ]*$/.test(role)) {
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
                        role,
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

// Perform a user authentication
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

//Get all the users list
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

//Get a user by ID
exports.getUserById = async (req, res) => {
    // Get the user's ID from the URL parameter
    const userId = req.params.id;

    // Assuming you have a 'role' field in your User model
    const user = await User.findById(userId); // Assuming you have a user object in your request after authentication
    if (!user || (user.role !== 'admin' && user.role !== 'manager')) {
        return res.status(403).json({
            status: 'FAILED',
            message: 'Unauthorized: Only admin and manager users can access this endpoint.',
        });
    }

    try {
        // Find the user by ID
        const foundUser = await User.findById(userId);

        if (!foundUser) {
            return res.status(404).json({
                status: 'FAILED',
                message: 'User not found',
            });
        }

        // If the user is found and the requester has the right role, return the user's details
        res.status(200).json(foundUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}; 

// Searching for a user
exports.searchUsers = async (req, res) => {
    try {
        const query = req.query.name; // Get the search query from the request
        const limit = req.query.limit || 10; // Set a default limit (e.g., 10) or use the one provided in the query

        const page = req.query.page || 1; // Set a default page (e.g., 1) or use the one provided in the query
        const offset = (page - 1) * limit;

        // Create a MongoDB query to search for users
        const searchCriteria = {
            $or: [
                { first_name: { $regex: query, $options: 'i' } },
                { username: { $regex: query, $options: 'i' } },
                { last_name: { $regex: query, $options: 'i' } }
            ]
        };
        

        const [results, itemCount] = await Promise.all([
            User.find(searchCriteria)
                .limit(limit)
                .skip(offset)
                .exec(),
            User.countDocuments(searchCriteria).exec()
        ]);

        const pageCount = Math.ceil(itemCount / limit);

        res.status(200).json({
            users: results,
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, page),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Update the user's data
exports.updateUser = async (req, res) => {
    // Get the user's ID from the URL parameter
    const userId = req.params.id;

    // Assuming you have a 'role' field in your User model
    const user = await User.findById(userId);

    // Only allow admin users to update user data
    // if (!user || (user.role !== 'admin' && user.role !== 'manager')) { // hundel it on thebackoffice 
    if (!user) {
        return res.status(403).json({
            status: 'FAILED',
            message: 'Unauthorized: Only admin and manager users can access this endpoint.',
        });
    }

    // Check if the username and email are unique
    const { username, email } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({
            status: 'FAILED',
            message: 'Username is already taken.',
        });
    }
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser && existingEmailUser._id.toString() !== userId) {
        return res.status(400).json({
            status: 'FAILED',
            message: 'Email is already taken.',
        });
    }

    // Update the user's data
    await User.findByIdAndUpdate(userId, { $set: req.body });

    // Update the last updated date
    await User.findByIdAndUpdate(userId, { $set: { lastUpdated: new Date() } });

    // Return the updated user data
    const updatedUser = await User.findById(userId);
    res.status(200).json(updatedUser);
};

//Delete a user
exports.deleteUser = async (req, res) => {
    // Get the user's ID from the URL parameter
    const userId = req.params.id;

    // Assuming you have a 'role' field in your User model
    const user = await User.findById(userId);

    // Only allow admin users to delete other users
    // if (!user || user.role !== 'admin') {  verifia this later on back-office
    if (!user) {
        return res.status(403).json({
            status: 'FAILED',
            message: 'Unauthorized: Only admin and manager users can access this endpoint.',
        });
    }
    try {
        // Delete the user by ID
        await User.findByIdAndDelete(userId);

        // Return a success message
        res.status(200).json({
            status: 'SUCCESS',
            message: 'User deleted successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
