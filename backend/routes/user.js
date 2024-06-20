const express = require('express');
const zod = require('zod');
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config');
const authMiddleware = require('../middleware/auth.middleware');
const Account = require('../models/accouts');

const router = express.Router();

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

router.post('/signup', async (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(body);

    if (!success) {
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: body.username
    })

    console.log(user, "obj")

    if (user) {
        return res.json({
            message: "Email already taken / Incorrect data"
        })
    }

    const newUser = await User({
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName
    });

    let hashedPassword = await User.createHash(body.password);
    newUser.password = hashedPassword;

    // Save newUser object to database
    await newUser.save();


    await Account.create({
        userId: newUser._id,
        balance: 1 * Math.random() * 10000
    })

    const token = jwt.sign({
        userId: newUser._id
    }, JWT_SECRET)

    res.json({
        message: "User created successfully",
        token: token
    })
});

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

router.post('/signin', async (req, res) => {
    const body = req.body;
    const { success } = signinSchema.safeParse(body);

    if (!success) {
        return res.json({
            message: "Invalid inputs"
        })
    }

    const user = await User.findOne({ username: body.username });

    if (!user) {
        return res.json({
            message: "Invalid username or password"
        })
    }
console.log('ismatch', user)
    const isMatch = await user.validatePassword(body.password);

    if (!isMatch) {
        return res.json({
            message: "Invalid username or password"
        })
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.json({
        message: "Signin successful",
        user: {
            username: user?.username,
            firstName: user?.firstName,
            lastName: user?.lastName
        },
        token: token
    });
});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/update", authMiddleware, async (req, res) => {
    const body = req.body;
    const { success, data } = updateBody.safeParse(body);

    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    // const updatedFields = {
    //     ...(data.password && { password: data.password }),
    //     ...(data.firstName && { firstName: data.firstName }),
    //     ...(data.lastName && { lastName: data.lastName })
    // };

    const updatedFields = {};

    if (data.password) {
        let hashedPassword = await User.createHash(body.password);
        updatedFields.password = hashedPassword;
    }

    if (data.firstName) updatedFields.firstName = data.firstName;
    if (data.lastName) updatedFields.lastName = data.lastName;


    const user = await User.updateOne({
        _id: req.userId
    }, updatedFields)

    console.log(user?._id, 'user')
    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    
    const users = await User.find({
        $or: [
            { firstName: { "$regex": filter, "$options": "i" } },
            { lastName: { "$regex": filter, "$options": "i" } }
        ]

    });


    res.json({
        users: users.map(u => ({
            username: u.username,
            firstName: u.firstName,
            lastName: u.lastName,
            _id: u._id
        }))
    });
});


module.exports = router;