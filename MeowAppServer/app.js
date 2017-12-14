var express = require('express');
var bodyParser = require('body-parser-json');
var app = express();

var series = require('./routes/series');
var seriesData = require('./routes/seriesData');

app.use(function (req, res, next) {
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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

var port = 3000;
if (process.env.PORT) {
  port = process.env.PORT;
}
app.listen(port, function () {
  console.log('MeowApp listening on port ' + port + "!");
});
