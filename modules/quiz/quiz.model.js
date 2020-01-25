const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id : { type : Number },
    title : { type : String },
    imageLink : { type  : String },
    description : { type : String },
    isHome : { type : Boolean },
    time : { type : Number},
    countQuestion : { type : Number }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Haji', schema);