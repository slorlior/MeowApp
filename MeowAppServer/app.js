var express = require('express');
var bodyParser = require('body-parser-json');
var app = express();

var series = require('./routes/series');
var seriesData = require('./routes/seriesData');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    next();
});

app.use(bodyParser.json());
app.use('/series', series);
app.use('/seriesData', seriesData);

app.get('/', function (req, res) {
  res.send('MeowApp is Up')
});

process.on('uncaughtException', (err) => {
  console.log("\n\n\n" + new Date().toLocaleString() + ":\n" + err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
  });

app.listen(3000, function () {
  console.log('MeowApp listening on port 3000!');
});
