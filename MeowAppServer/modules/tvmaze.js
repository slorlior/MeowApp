var request = require("request");
var Q = require('q');
var moment = require('moment');

var tvmazeUrl = "http://api.tvmaze.com/";
var dateFormat = 'DD/MM/YYYY';

function getId(serieName) {
  var deferred = Q.defer();
  request(tvmazeUrl + "singlesearch/shows?q=" + serieName, function(error, response, body) {
    if (error) {
      deferred.reject(error);
    }
    var parsedBody = JSON.parse(body);
    deferred.resolve(parsedBody.id);
  });
  return deferred.promise;
};

function getIds(seriesNames) {
  var deferred = Q.defer();
  var idPromises = seriesNames.map(getId);
  Promise.all(idPromises)
  .then(function(seriesIds) {
    deferred.resolve(seriesIds);
  }).catch(function(error) {
    deferred.reject(error);
  });
  return deferred.promise;
};

function parseEpisode(episode, serieData) {
  var parsedEpisode = {};
  parsedEpisode.serieId = serieData.id;
  parsedEpisode.serieName = serieData.name;
  parsedEpisode.image = serieData.image;
  parsedEpisode.episodeName = episode.name;
  var seasonNumber = episode.season;
  if (seasonNumber < 10) {
    seasonNumber = "0" + seasonNumber;
  }
  var episodeNumber = episode.number;
  if (episodeNumber < 10) {
    episodeNumber = "0" + episodeNumber;
  }
  parsedEpisode.seasonAndEpisode = "S" + seasonNumber + "E" + episodeNumber;
  parsedEpisode.airDate = moment(episode.airdate, 'YYYY-MM-DD').add(1, 'day').format(dateFormat);
  var parsedForDisplaySerieName = parsedEpisode.serieName.replace(':', ' -');
  var parsedForDisplayEpisodeName = parsedEpisode.episodeName.replace(':', ' -');
  parsedEpisode.fullDisplayName = parsedForDisplaySerieName + " " + parsedEpisode.seasonAndEpisode + " - " + parsedForDisplayEpisodeName;

  return parsedEpisode;
};

function getEpisodes(serie, fromDate) {
  var deferred = Q.defer();
  request(tvmazeUrl + "shows/" + serie.id + "/episodes", function(error, response, body) {
    if (error) {
      deferred.reject(error);
    }
    var episodes = [];
    var parsedBody = JSON.parse(body);
    for (var episode in parsedBody) {
      var parsedEpisode = parseEpisode(parsedBody[episode], serie);
      if (fromDate != undefined ) {
        if (moment(parsedEpisode.airDate, dateFormat).isSameOrAfter(moment(fromDate, dateFormat))) {
          episodes.push(parsedEpisode);
        }
      } else {
        episodes.push(parsedEpisode);
      }
    }
    deferred.resolve(episodes);
  });
  return deferred.promise;
};

function parseSerieData(serie) {
  var parsedSerie = {};
  parsedSerie.id = serie.id;
  parsedSerie.name = serie.name;
  parsedSerie.image = serie.image.medium;

  return parsedSerie;
};

function getSerieData(serieId) {
  var deferred = Q.defer();
  request(tvmazeUrl + "shows/" + serieId, function(error, response, body) {
    if (error) {
      deferred.reject(error);
    }
    var parsedBody = JSON.parse(body);
    deferred.resolve(parseSerieData(parsedBody));
  });
  return deferred.promise;
};

module.exports = {
  getIds:getIds,
  getEpisodes:getEpisodes,
  getSerieData:getSerieData
};
