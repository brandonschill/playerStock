var express = require('express');
var fs = require('fs');
var app = express();


var options = {
  timeout: 15000, 
  nba: {
    version: 'nba/v2',
    key: 'e0722465e9d54e0bb15d05b675bc2925' 
  }
};

var fantasyData = require('fantasydata-api')(options);
var request = require('request');

// request(options, function(error, response, body) {
//   console.log(error, response, body);
// });



// fantasyData.nba.newsByPlayerId('20000571', function (err, results) {
//   console.log(err, results)
// });

var season = '2016REG';
// fantasyData.nba.playerSeasonStats(season, function(err, results) {
//   console.log(JSON.stringify(results[0].FantasyPoints, null, 2));
// });

app.use(express.static('./public'));

app.get('/dashboard', function(req, res) {
  fantasyData.nba.playerSeasonStats(season, function(err, results) {
    res.send(JSON.stringify(results, null, 2));
  });
});

app.get('/dashboard', function(req, res) {
  fantasyData.nba.playerGameStatsByDate('Jan 27, 2016', function(err, results) {
    res.send(JSON.stringify(results, null, 2));
  });
});


app.listen('1337');
console.log('1337 is up');