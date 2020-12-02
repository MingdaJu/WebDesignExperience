const express = require('express');
const router = express.Router();
const User = require('../models/User')
const {check, validationResult} = require('express-validator')

router.post('/create', 
    [
        check('email').isEmail(),
        check('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?~&])[A-Za-z\d@$!%*?#~&]{8,}$/, "i")
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array(), message:"Please enter valid password" });
        } 

        const user = new User({
            email: req.body.email,
            password: req.body.password
        });

        try {
            const savePost = await user.save();
            res.json(savePost);
        } catch(err) {
            res.json(err)
        }
    }
);

router.delete('/delete', async (req, res) => {
    try {
        const deleteResult = await User.remove({password: req.body.password});
        if(deleteResult.deletedCount == 0){
            res.send("Password doesn't match!")
        }
        else{
            res.send("delete successfully!")
        }
    } catch(err) {
        res.json(err);
    }
});

router.patch('/edit', 
    [
        check('email').isEmail(),
        check('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?~&])[A-Za-z\d@$!%*?#~&]{8,}$/, "i")
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array(),message:"Please enter valid password" });
        } 
        try {
            const patchResult = await User.updateOne(
                { _id: req.body.id },
                {$set: 
                    {
                        password: req.body.password,
                        email: req.body.email
                    }
                }
            );
            res.json(patchResult);
        } catch(err) {
            res.json(err);
        }
    }
);

router.get("/getAll", async (req, res) => {
    try {
        const getResult = await User.find();
        res.json(getResult);
    } catch(err) {
        res.json(err);
    }
});




module.exports = router;