const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String },
    id : { type : Number },
    title : { type : String },
    imageLink : { type  : String },
    videoLink : { type : String },
    description : { type : String },
    subMateri : [
        {
            id : { type : Number },
            title : { type : String },
            description : { type : String }
        }
    ],
    isHome : { type : Boolean },
    tag : { type : String }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Umrah', schema);