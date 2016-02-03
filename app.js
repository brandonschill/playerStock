var express = require('express');
var moment = require('moment');
var fs = require('fs');
var app = express();
var Promise = require('promise');


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

var season = '2016REG';

app.use(express.static('./public'));

app.get('/seasonppg', function(req, res) {
  fantasyData.nba.playerSeasonStats(season, function(err, results) {
    res.send(JSON.stringify(results, null, 2));
  });
});

var today = moment().format('ll');
console.log(today);

var gameDay = moment().subtract(1, 'days').format('ll');

console.log(gameDay);

app.get('/gamepoints', function(req, res) {
  fantasyData.nba.playerGameStatsByDate(gameDay, function(err, results) {
    res.send(JSON.stringify(results, null, 2));
  });
});

var thePlayers = [
  '20000571',
  '20000485',
  '20001406',
  '20000544',
  '20000442',
  '20000468',
  '20000646',
  '20000664',
  '20000742',
  '20000877',
  '20000884',
  '20000515',
  '20001449',
  '20000862',
  '20000784',
  '20000705',
  '20000619',
  '20000482'
];


// app.get('/playernews', function(req, res) {
  fantasyData.nba.newsByPlayerId(thePlayers, function (err, results) {
    console.log(JSON.stringify(results, null, 2));
  });
// });

app.listen('1337');
console.log('1337 is up');