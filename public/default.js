var season = new Promise(function(resolve, reject) {
  var seasonXhr = new XMLHttpRequest();
  seasonXhr.open('GET', 'http://localhost:1337/seasonppg');
  seasonXhr.send();
  seasonXhr.addEventListener('load', function() {
    var myPlayers = JSON.parse(seasonXhr.responseText);
    var myResponse = [];
    for(var i = 0; i < myPlayers.length; i++) {
      var rppg = (myPlayers[i].FantasyPoints / myPlayers[i].Games);
      var ppg = rppg.toFixed(2);
      var playerName = myPlayers[i].Name;
      myResponse.push(myPlayers[i]);
    };
    resolve(myResponse);
  });
});

var game = new Promise(function(resolve, reject) {
  var gameXhr = new XMLHttpRequest();
  gameXhr.open('GET', 'http://localhost:1337/gamepoints');
  gameXhr.send();
  gameXhr.addEventListener('load', function() {
    var myPlayers = JSON.parse(gameXhr.responseText);
    var myResponse = [];
    for(var i = 0; i < myPlayers.length; i++) {
      var myPlayer = {};
      myPlayer.lastPoints = myPlayers[i].FantasyPoints;
      myPlayer.playerName = myPlayers[i].Name;
      myResponse.push(myPlayer);
    };
    resolve(myResponse);
  });
});

var news = new Promise(function(resolve, reject) {
  var newsXhr = new XMLHttpRequest();
  newsXhr.open('GET', 'http://localhost:1337/playernews');
  newsXhr.send();
  newsXhr.addEventListener('load', function() {
    var myPlayers = JSON.parse(newsXhr.responseText);
    var myResponse =[];
    for(var i = 0; i < myPlayers.length; i++) {
      var playerNews = myPlayers[i].Content;
      myResponse.push(myPlayers[i]);
    };
    resolve(myResponse);
  });
});

Promise.all([season, game, news]).then(function(data) {
  var seasonStats = data[0];
  var gameStats = data[1];
  var recentNews = data[2];
  for(var i = 0; i < seasonStats.length; i++) {
    for(var k = 0; k < gameStats.length; k++) {
      for(var j = 0; j < recentNews.length; j++) {
        if(gameStats[k].playerName === seasonStats[i].Name) {
          if(seasonStats[i].PlayerID === recentNews[j].PlayerID) {
            var news = recentNews[j];
          } else {
            var news = {
              PlayerID: recentNews[j].PlayerID, 
              content: 'No Recent News'
            }
          }
          buildCard(seasonStats[i], gameStats[k], news);
          buildTicker(seasonStats[i], gameStats[k]);
        }
      }
    }
  };
});

var playerPhotos = { 
  20000571: '/images/lebron.png',
  20000485: '/images/steph.png',
  20001406: '/images/porzingis.png',
  20000544: '/images/harden.png',
  20000442: '/images/wall.png',
  20000468: '/images/davis.png',
  20000646: '/images/kawhi.png',
  20000664: '/images/paul.png',
  20000742: '/images/george.png',
  20000877: '/images/westbrook.png',
  20000884: '/images/durant.png',
  20000515: '/images/butler.png',
  20001449: '/images/boban.png',
  20000862: '/images/cousins.png',
  20000784: '/images/anthony.png',
  20000705: '/images/kobe.png',
  20000619: '/images/lillard.png',
  20000482: '/images/green.png',
  20000771: '/images/bosh.png',
  20000772: '/images/wade.png',
  20000441: '/images/beal.png',
  20000486: '/images/thompson.png',
  20000530: '/images/rondo.png',
  20000516: '/images/rose.png',
  20000616: '/images/aldridge.png',
  20000561: '/images/thomas.png',
  20000620: '/images/mccollum.png',
  20000795: '/images/wiggins.png',
  20000574: '/images/irving.png',
  20000810: '/images/drummond.png',
  20000457: '/images/lowry.png',
  20000497: '/images/antetokounmpo.png',
  20001431: '/images/towns.png',
  20000680: '/images/payton.png',
  20000629: '/images/matthews.png'
};

function buildTicker(data, gameData) {
  var rppg = (data.FantasyPoints / data.Games);
  var ppg = rppg.toFixed(2);
  var rStockChange = (gameData.lastPoints - ppg);
  var stockChange = rStockChange.toFixed(2);
  var ticker = document.getElementsByClassName('marquee');
  ticker[0].textContent += data.Name + ': ' + stockChange + ' ';
};



function buildCard(data, gameData, news) {
  if(playerPhotos[data.PlayerID]) {

    var rppg = (data.FantasyPoints / data.Games);
    var ppg = rppg.toFixed(2);
    var rStockChange = (gameData.lastPoints - ppg);
    var stockChange = rStockChange.toFixed(2);

    var deck = document.createElement('div');
    deck.className = "medium-4 columns";

    var outerCard = document.createElement('div');
    outerCard.className = "card";
    deck.appendChild(outerCard);

    var container = document.createElement('div');
    container.className = "container";
    outerCard.appendChild(container);

    var cardFront = document.createElement('div');
    cardFront.className = "front";
    container.appendChild(cardFront);

    var photoHolder = document.createElement('div');
    photoHolder.className = "image";
    cardFront.appendChild(photoHolder);

    var playerPhoto = document.createElement('img');
    playerPhoto.setAttribute('src', playerPhotos[data.PlayerID]);
    photoHolder.appendChild(playerPhoto);

    var playerTitle = document.createElement('span');
    playerTitle.className = "title";
    playerTitle.textContent = data.Name;
    photoHolder.appendChild(playerTitle);

    var stockMove = document.createElement('div');
    stockMove.className = "content";
    cardFront.appendChild(stockMove);

    var arrow = document.createElement('img');
    arrow.setAttribute('src', '/images/arrows.png');
    stockMove.appendChild(arrow);

    var arrowInfo = document.createTextNode('Fantasy stock value changed by ' + stockChange + ' points');
    stockMove.appendChild(arrowInfo);

    var stats = document.createElement('div');
    stats.className = "action";
    cardFront.appendChild(stats);

    var seasonPpg = document.createElement('p');
    seasonPpg.textContent = 'Season fantasy PPG: ' + ppg;
    stats.appendChild(seasonPpg);
    
    var recentPoints = document.createElement('p');
    recentPoints.textContent = 'Previous game fantasy points: ' + gameData.lastPoints;
    stats.appendChild(recentPoints);

    var cardBack = document.createElement('div');
    cardBack.className = "back";
    container.appendChild(cardBack);

    var backContent = document.createElement('div');
    backContent.className = "content";
    cardBack.appendChild(backContent);

    var playerInfo = document.createElement('h2');
    playerInfo.textContent = 'Player Info';
    backContent.appendChild(playerInfo);

    var playerTitle = document.createElement('span');
    playerTitle.className = "title";
    playerTitle.textContent = data.Name;
    backContent.appendChild(playerTitle);

    var playerRecentNews = document.createElement('p');
    playerRecentNews.textContent = news.Content;
    backContent.appendChild(playerRecentNews);

    var playerLinks = document.createElement('div');
    playerLinks.className = "action";
    cardBack.appendChild(playerLinks);

    var linkOne = document.createElement('a');
    linkOne.setAttribute('href', 'www.nba.com');
    linkOne.textContent = 'NBA.com';
    playerLinks.appendChild(linkOne);

    var linkTwo = document.createElement('a');
    linkTwo.setAttribute('href', 'espn.go.com/nba');
    linkTwo.textContent = 'ESPN.com';
    playerLinks.appendChild(linkTwo);

    var cardHolders = document.getElementById('newCard');
    cardHolders.appendChild(deck);
  };
};
