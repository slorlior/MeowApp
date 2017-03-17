var express = require('express');
var bodyParser = require('body-parser-json');
var app = express();

var series = require('./routes/series');
app.use(bodyParser.json());
app.use('/series', series);

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
