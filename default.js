var seasonXhr = new XMLHttpRequest();
seasonXhr.open('GET', 'http://localhost:1337/seasonppg');
seasonXhr.send();
seasonXhr.addEventListener('load', function() {
  var myPlayers = JSON.parse(seasonXhr.responseText);
  for(var i = 0; i < myPlayers.length; i++) {
    var rppg = (myPlayers[i].FantasyPoints / myPlayers[i].Games);
    var ppg = rppg.toFixed(2);
    var playerName = myPlayers[i].Name;
    buildCard(myPlayers[i]);
  };
});

var gameXhr = new XMLHttpRequest();
gameXhr.open('GET', 'http://localhost:1337/gamepoints');
gameXhr.send();
gameXhr.addEventListener('load', function() {
  var myPlayers = JSON.parse(gameXhr.responseText);
  for(var i = 0; i < myPlayers.length; i++) {
    var lastPoints = myPlayers[i].FantasyPoints
    var playerName = myPlayers[i].Name;
    console.log(playerName, lastPoints);
  };
});


// var newsXhr = new XMLHttpRequest();
// newsXhr.open('GET', 'http://localhost:1337/playernews');
// newsXhr.send();
// newsXhr.addEventListener('load', function() {
//   var playerNews = JSON.parse(newsXhr.responseText);
  
// });


var playerPhotos = { 
  20000571: '/images/lecry.jpg',
  20000485: '/images/steph.jpg',
  20001406: '/images/pzinger.jpg',
  20000544: '/images/harden.jpg',
  20000442: '/images/wall.png',
  20000468: '/images/davis.gif',
  20000646: '/images/kawhi.jpg',
  20000664: '/images/paul.jpg',
  20000742: '/images/george.jpg',
  20000877: '/images/westbrook.jpg',
  20000884: '/images/durant.jpg',
  20000515: '/images/butler.jpg',
  20001449: '/images/boban.jpg',
  20000862: '/images/cousins.jpg',
  20000784: '/images/anthony.jpg',
  20000705: '/images/kobe.jpg',
  20000619: '/images/lillard.jpg',
  20000482: '/images/green.jpg',
};

// var stockChange = (ppg - lastPoints);


function buildCard(data) {

  if(playerPhotos[data.PlayerID]) {

    var rppg = (data.FantasyPoints / data.Games);
    var ppg = rppg.toFixed(2);

    var deck = document.createElement('div');
    deck.className = "playerCard";

    var card = document.createElement('div');
    card.className = "row";
    deck.appendChild(card);

    var holder = document.createElement('div');
    holder.className = "medium-4 columns";
    card.appendChild(holder);

    var outerCard = document.createElement('div');
    outerCard.className = "card";
    holder.appendChild(outerCard);

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

    var arrowInfo = document.createTextNode('Fantasy stock value changed by ' + "stockChange" + ' points');
    stockMove.appendChild(arrowInfo);

    var stats = document.createElement('div');
    stats.className = "action";
    cardFront.appendChild(stats);

    var seasonPpg = document.createElement('p');
    seasonPpg.textContent = 'Season fantasy PPG: ' + ppg;
    stats.appendChild(seasonPpg);
    
    var recentPoints = document.createElement('p');
    recentPoints.textContent = 'Previous game fantasy points: ' + "lastPoints";
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
    playerRecentNews.textContent = 'XXXX';
    backContent.appendChild(playerRecentNews);

    var playerLinks = document.createElement('div');
    playerLinks.className = "action";
    cardBack.appendChild(playerLinks);

    var linkOne = document.createElement('a');
    linkOne.setAttribute('href', 'www.nba.com/playerfile/lebron_james/');
    linkOne.textContent = 'NBA.com';
    playerLinks.appendChild(linkOne);

    var linkTwo = document.createElement('a');
    linkTwo.setAttribute('href', 'espn.go.com/nba/player/_/id/1966/lebron-james');
    linkTwo.textContent = 'ESPN.com';
    playerLinks.appendChild(linkTwo);

    var cardHolders = document.getElementById('newCard');
    cardHolders.appendChild(deck);
  };
};
