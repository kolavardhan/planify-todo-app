const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => { 
    try {
        const {username, email, password} = req.body
        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

        const existingUserName = await User.findOne({ username })
        if (existingUserName) {
            return res.status(400).json({
                message: 'Username already exists'
            })
        }

        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({
                message: 'Email already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            username,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            message: 'User registered successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }   
} 

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        } 
 
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) {
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }

        const token = jwt.sign( 
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        ) 

        res.status(200).json({
            message: 'Login successful',
            token,
            userName: user.username,
            email: user.email
        }) 
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {registerUser, loginUser} 