 
const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../modules/users/users.model'),
    Haji: require('../modules/haji/haji.model'),
    Umroh: require('../modules/haji/umroh.model'),
    Quiz : require('../modules/quiz/quiz.model'),
    ResultQuiz : require('../modules/quiz/result.model')

};