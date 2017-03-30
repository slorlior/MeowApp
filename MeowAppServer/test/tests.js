var express = require('express');
var Q = require('q');
var test = require('mocha');
var expect = require('chai').expect;
var should = require('chai').should();

describe('end to end tests', function() {
  var fileAccess = require('../modules/fileAccess.js');
  var tvmaze = require('../modules/tvmaze.js');

  it('get all episodes of all series in the file', function(done) {
    fileAccess.getSeries()
    .then(function (series) {
      tvmaze.getIds(series)
      .then(function (ids) {
        var seriesDataPromises = ids.map(tvmaze.getSerieData);
        Promise.all(seriesDataPromises)
        .then(function(seriesData) {
          var episodesPromises = seriesData.map(tvmaze.getEpisodes);
          Promise.all(episodesPromises)
          .then(function(episodes) {
            episodes.should.be.a('array');
            episodes.length.should.above(0);
            done();
          })
        }).catch(function(error) {
          done(error);
        });
      }).catch(function(error) {
        done(error);
      });
    })
    .catch(function(error){
      done(error);
    });

  });

});


describe('fileAccess', function() {
  var fileAccess = require('../modules/fileAccess.js');

  it('get series should return the series', function(done) {
    fileAccess.getSeries()
    .then(function (series) {
      series.should.include('arrow');
      done();
    })
    .catch(function(error){
      done(error);
    });

  });

});

describe('tvmaze', function() {
  var tvmaze = require('../modules/tvmaze.js');

  it('get serie id should return correct id', function(done) {
    tvmaze.getIds(["arrow"])
    .then(function (ids) {
      ids.should.include(4);
      done();
    })
    .catch(function(error){
      done(error);
    });

  });

  it('get series ids should return correct ids', function(done) {

    tvmaze.getIds(["arrow", "Marvel's Agents of S.H.I.E.L.D."])
    .then(function (ids) {
      ids.should.include(4);
      ids.should.include(31);
      done();
    })
    .catch(function(error){
      done(error);
    });

  });

  it('get serie data should return correctly', function(done) {

    tvmaze.getIds(["arrow"])
    .then(function (ids) {
      tvmaze.getSerieData(ids[0])
      .then(function(serie) {
        serie.id.should.equal(4);
        serie.name.should.equal('Arrow');
        serie.image.should.equal('http://static.tvmaze.com/uploads/images/medium_portrait/75/189983.jpg');
        done();
      }).catch(function(error) {
        done(error);
      });
    }).catch(function(error) {
      done(error);
    });

  });

  it('get episodes should return array', function(done) {

    tvmaze.getIds(["arrow"])
    .then(function (ids) {
      tvmaze.getSerieData(ids[0])
      .then(function(serie) {
        tvmaze.getEpisodes(serie)
        .then(function(episodes) {
          episodes.should.be.a('array');
          episodes.length.should.above(0);
          done();
        })
      }).catch(function(error) {
        done(error);
      });
    }).catch(function(error) {
      done(error);
    });

  });

});
