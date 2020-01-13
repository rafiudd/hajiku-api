let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();

let apiRoutes = require("/home/rafiudd/Documents/quizqoeh/quizquh-apis/routes/router.js");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://rafiudd:123123123@0.0.0.0:27017/quizquh', { useNewUrlParser: true});
const db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

const port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Hello World with Express'));
app.use('/api', apiRoutes);


app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});