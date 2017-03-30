var fs = require('fs');
var Q = require('q');
var seriesPath = '././files/series.json';

function getSeries() {
  var deferred = Q.defer();
  fs.readFile(seriesPath, function (err, data) {
    if (err) {
      deferred.reject(err);
    }
    deferred.resolve(JSON.parse(data));
  });
  return deferred.promise;
}

module.exports = {
  getSeries:getSeries
};
