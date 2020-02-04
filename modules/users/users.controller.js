const express = require('express');
const router = express.Router();
const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../helpers/db');
const User = db.User;

// routes
router.post('/login', authenticate);
router.post('/register', create);


module.exports = router;

async function create(req,res) {
    let model = {
        username : req.body.username,
        fullname : req.body.fullname,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 10)
    }

    let checkEmail = await User.findOne({ "email" : model.email });
    let checkUsername = await User.findOne({ "username" : model.username });

    if (checkEmail) {
        return res.status(409).json(
            { 
                "code" : 409, 
                "message" : "Email is already taken"
            }
        )
    }

    if(checkUsername) {
        return res.status(409).json(
            { 
                "code" : 409, message : "Username is already taken"
            }
        )
    }

    const user = new User(model)
   
    let query = await user.save();
    let result = res.json(
        {
            "message" : "Success Register User" , 
            "code" : 201, 
            "data" : query
        }
    )
    return result
}

async function authenticate(req, res) {
    let model = {
        email : req.body.email,
        password : req.body.password
    }
    const checkEmail = await User.findOne({ "email" : model.email });

    if(!checkEmail) {
        return res.status(204).json({"message" : "email not found"})
    }

    if(checkEmail && bcrypt.compareSync(model.password, checkEmail.password)) {
        const token = jwt.sign({ sub: checkEmail.id }, config.secret);

        return res.status(200).json(
            { 
                code : 200, 
                message : "Succes Login", 
                data: checkEmail, 
                token: token
            }
        )        
    } else {
        return res.status(403).json({ code : 403, message : "Password Incorrect" })        
    }
}

