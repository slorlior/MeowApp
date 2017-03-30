var express = require('express');
var fs = require('fs');
var fileAccess = require('../modules/fileAccess.js');
var router = express.Router();
var seriesPath = '././files/series.json';

router.get('/', function (req, res) {
  fileAccess.getSeries()
  .then(function(data) {
    res.send(data);
  }).catch(function(error) {
    throw error;
  });
});

router.post('/', function (req, res) {
  var serie = req.body.serie;
  fs.readFile(seriesPath, function (err, data) {
    if (err) {
      throw err;
    }

    var series = JSON.parse(data);
    var i = series.indexOf(serie);
    if(i != -1) {
      res.status(400);
      res.send();
    }
    else {
      series.push(serie);

      fs.writeFile(seriesPath, JSON.stringify(series), function (err) {
        if (err) {
          throw err;
        }
        res.send();
      });
    }
  });
});

router.delete('/', function (req, res) {
  var serie = req.body.serie;
  fs.readFile(seriesPath, function (err, data) {
    if (err) {
      throw err;
    }

    var series = JSON.parse(data);
    var i = series.indexOf(serie);
    if(i == -1) {
      res.status(404);
      res.send();
    }
    else {
      series.splice(i, 1);

      fs.writeFile(seriesPath, JSON.stringify(series), function (err) {
        if (err) {
          throw err;
        }
        res.send();
      });
    }
  });
});

module.exports = router;
