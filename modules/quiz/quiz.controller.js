const express = require('express');
const router = express.Router();
const db = require('../../helpers/db');
const Quiz = db.Quiz;
let dataSoal = require('../../data/soal.json')
// routes

router.post('/post/all', create);
router.get('/all', getAll);
router.get('/', getById);
router.delete('/delete', _delete);

module.exports = router;

async function create(req,res) {
    let query = await Quiz.insertMany(dataSoal);
    let result = res.json({"message" : "Success Post Soal" , "code" : 201, "data" : query})
   
    return result
}

async function getAll(req, res, next) {
    let query = await Quiz.find();
    let result = res.json({"message" : "Success Get All Soal" , "code" : 200, "data" : query })
        
    return result
}

async function getById(req, res, next) {
    let model = {
        _id : req.query.id
    }

    let query = await Quiz.findById(model._id);
    let result = res.json({"message" : "Success Get Haji by Id" , "code" : 200, "data" : query })
    
    return result
}

async function _delete(req, res, next) {
    let query = await Quiz.remove();
    let result = res.json({"message" : "Success Remove Haji" , "code" : 204, "data" : query})
    return result
}
