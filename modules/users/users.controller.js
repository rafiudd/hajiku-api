const express = require('express');
const router = express.Router();
const userService = require('./users.service');
const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../helpers/db');
const User = db.User;

// routes
router.post('/login', authenticate);
router.post('/register', create);
router.get('/all', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

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
        return res.status(501).json({ "code" : 501, message : "Email is already taken"})
    }

    if(checkUsername) {
        return res.status(501).json({ "code" : 501, message : "Username is already taken"})
    }
    console.log(model)
    const user = new User(model)
   
    let query = await user.save();
    let result = res.json({"message" : "Success Register User" , "code" : 200, "data" : query})
    return result
}

async function authenticate(req, res) {
    let model = {
        email : req.body.email,
        password : req.body.password
    }
    const checkEmail = await User.findOne({ "email" : model.email });
    if(!checkEmail) {
        return res.status(404).json({"message" : "email not found"})
    }

    if(checkEmail && bcrypt.compareSync(model.password, checkEmail.password)) {
        const token = jwt.sign({ sub: checkEmail.id }, config.secret);
        return res.status(200).json({ code : 200, message : "Succes Login", data: checkEmail, token: token})        
    }
}

function register(req, res, next) {
    console.log(req.body,['CONTROLLER'])
    let userParam = req.body                                    
    create()
        .then(() => res.json({}))
        .catch(err => next(err));
    // console.log(create())
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
