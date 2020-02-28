const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id : { type : Number },
    title : { type : String },
    imageLink : { type  : String },
    description : { type : String },
    isHome : { type : Boolean },
    isQuiz : { type : Boolean },
    time : { type : Number},
    count : { type : Number },
    question : [
        {
            questionId : { type : Number },
            title : { type : String },
            0 : { type : String },
            1 : { type : String },
            2  : { type : String },
            3 : { type : String },
            answer : { type : String },
            pembahasan: { type: String }
        }
    ]
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Quiz', schema);