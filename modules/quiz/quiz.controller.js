const express = require('express');
const router = express.Router();
const db = require('../../helpers/db');
const jwt = require('jsonwebtoken');

const Quiz = db.Quiz;
const User = db.User;
const ResultQuiz = db.ResultQuiz;
let dataSoal = require('../../data/soal.json')
// routes

router.post('/post/all', create);
router.get('/all', getAll);
router.get('/result', getResultQuiz);
router.get('/', getById);
router.delete('/delete', _delete);
router.post('/post/quiz', checkAnswer);

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
    if(req.query.data === "quiz") {
        let query = await Quiz.remove();
        let result = res.json({"message" : "Success Remove Haji" , "code" : 204, "data" : query})
        return result
    } else if(req.query.data === "result") {
        let query = await ResultQuiz.remove();
        let result = res.json({"message" : "Success Remove Result" , "code" : 204, "data" : query})
        return result
    }
    
}

async function checkAnswer(req,res) {
    let model = {
        _id : req.query.id,
    }

    let getQuiz = await Quiz.findById(model._id);
    let payloadAnswer = req.body.answer;
    let answer = [];

    getQuiz.question.map( obj => {
        answer.push(obj.answer);
    })

    let isTrue = 0;
    let isFalse = 0;

    for(let i=0; i<answer.length; i++) {
        console.log(payloadAnswer[i],['gsfgfs'],answer[i])
        if(payloadAnswer[i] === answer[i]) {
            isTrue ++
        } else {
            isFalse --
        }
    }
    let token = req.headers.authorization.replace('Bearer ','');
    
    let decode = jwt.decode(token);
    let userId = decode.sub

    let query = await User.findById(userId);
    // console.log(query,['QIERY'])
    
    function formatDate(date) {
        let d = new Date(date);
        let formatedDate, hours, minutes, milisecond, formatedTime;
      
        formatedDate = d.getFullYear() + "-" + ("0" + d.getMonth() + 1).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        hours = ("0" + d.getHours()).slice(-2);
        minutes = ("0" + d.getMinutes()).slice(-2);
        milisecond = ("0" + d.getSeconds()).slice(-2);
      
        formatedTime = hours + ":" + minutes + ":" + milisecond
        return formatedDate + " " + formatedTime  
    }
  
      
    let resultAnswer = {
        "userId" : userId,
        "fullname" : query.fullname,
        "email" : query.email,
        "userAnswer" : payloadAnswer,
        "trueAnswer" : isTrue,
        "falseAnswer" : Math.abs(isFalse),
        "value" : isTrue * 10,
        "timestamp" : formatDate(new Date())
    }

    await ResultQuiz.insertMany(resultAnswer)

    let result = res.json(
        {
            "message" : "Success Cleared Quiz" ,
            "code" : 204, 
            "data" : resultAnswer
        }
    )
    
    return result
}

async function getResultQuiz(req, res, next) {
    let query = await ResultQuiz.find();
    let result = res.json({"message" : "Success Get All Soal" , "code" : 200, "data" : query })
        
    return result
}