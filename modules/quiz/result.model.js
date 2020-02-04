const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: { type : String },
    fullname: { type : String },
    email: { type : String },
    userAnswer: { type : Array },
    trueAnswer: { type : Number },
    falseAnswer: { type : Number },
    value: { type : Number },
    timestamp: { type : String }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ResultQuiz', schema);