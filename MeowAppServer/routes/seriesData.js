var express = require('express');
var fileAccess = require('../modules/fileAccess.js');
var tvmaze = require('../modules/tvmaze.js');
var router = express.Router();

router.get('/', function (req, res) {
  fileAccess.getSeries()
  .then(function (series) {
    tvmaze.getIds(series)
    .then(function (ids) {
      var seriesDataPromises = ids.map(tvmaze.getSerieData);
      Promise.all(seriesDataPromises)
      .then(function(seriesData) {
        var episodesPromises = seriesData.map(serieData => tvmaze.getEpisodes(serieData, req.query.fromDate));
        Promise.all(episodesPromises)
        .then(function(episodes) {
          var allEpisodes = [];
          allEpisodes = [].concat.apply([], episodes);
          res.send(allEpisodes);
        })
      }).catch(function(error) {
        throw error;
      });
    }).catch(function(error) {
      throw error;
    });
  })
  .catch(function(error){
    throw error;
  });

});

module.exports = router;
