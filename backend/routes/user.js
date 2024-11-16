const express = require('express');
const { Signup, Signin, Update } = require('../auth');
const jwt = require('jsonwebtoken');
const { User, Account } = require('../db');
const JWT_SECRET = process.env.JWT_SECRET;
const { authMiddleware } = require('../middleware');

const router = express.Router();

router.post("/signup",async function(req,res){
    signupPayload = req.body;
    const response = Signup.safeParse(signupPayload);
    if(!response.success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
        username:req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        username:signupPayload.username,
        firstName:signupPayload.firstName,
        lastName:signupPayload.lastName,
        password:signupPayload.password
    })

    const userId=user._id

    await Account.create({
        userId,
        balance:1+Math.random()*10000
    })

    const token = jwt.sign({userId:userId},JWT_SECRET);

    res.status(200).json({
        message: "User created successfully",
        token: token
    })
})

router.post('/signin',async function(req,res){
    const signinPayload = req.body;
    const {success} = Signin.safeParse(signinPayload);
    if(!success){
        res.status(411).json({
            message: "Error while logging in"
        })
    }
    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if(!user){
        res.status(411).json({
            message: "Error while logging in"
        })
    }
    const userId = user._id;
    const token = jwt.sign({userId:userId},JWT_SECRET);

    res.status(200).json({
        token: token
    })

})

router.put("/",authMiddleware, async function(req,res){
    const updatePayload = req.body;
    const {success}=Update.safeParse(updatePayload);
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne({ _id: req.userId }, req.body)
    res.status(200).json({
        message: "updated successfully"
    })
})

router.get("/bulk",authMiddleware,async (req,res)=>{
    let filter = req.query.filter;
    if (!filter) {
        filter = ""; 
    }
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;