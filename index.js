let express = require('express')
let app = express();
var port = process.env.PORT || 8080;

let apiRoutes = require("/home/rafiudd/Documents/quizqoeh/quizquh-apis/routes/router.js")
app.use('/api', apiRoutes)
app.get('/', (req, res) => res.send('Hello World with Express'));
app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});