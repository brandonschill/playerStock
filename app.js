var express = require('express');
var fs = require('fs');
var app = express();
var YahooFantasy = require('yahoo-fantasy');

var yf = new YahooFantasy('dj0yJmk9OUltMDZrdlBEMkQ0JmQ9WVdrOVZIZDBUV3d6TXpJbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0zOQ--', 'a76121efce846e9598e50ba081ffa2e52bb4e548');

yf.player.stats('nba.p.5479', function(err, stats) {
  console.log(err, stats);
});

// yf.players.fetch('353.p.5479', function(err, fetch) {
//   console.log(err, fetch);
// });

app.use(express.static('./public'));

app.get('/dashboard', function(req, res) {
  yf.player.stats('nba.p.5479', function(err, stats) {
    res.send(stats);
  });
});


app.listen('1337');