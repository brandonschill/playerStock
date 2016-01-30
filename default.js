var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:1337/seasonppg');
xhr.send();
xhr.addEventListener('load', function() {
  // var response = JSON.parse(xhr.responseText);
  // buildCard(response);


  // var player = document.getElementById('player');
  // var info = document.createTextNode(xhr.responseText);
  // player.appendChild(info);
  var myPlayers = JSON.parse(xhr.responseText);
  for(var i = 0; i < 20; i++) {
    var rppg = (myPlayers[i].FantasyPoints / myPlayers[i].Games);
    var ppg = rppg.toFixed(2);
    var playerName = myPlayers[i].Name;
    console.log(ppg, playerName);
  };
  // console.log(JSON.parse(xhr.responseText));
});

// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'http://localhost:1337/gamepoints');
// xhr.send();
// xhr.addEventListener('load', function() {
//   var myPlayers = JSON.parse(xhr.responseText);
//   for(var i = 0; i < 20; i++) {
//     var rppg = (myPlayers[i].FantasyPoints / myPlayers[i].Games);
//     var ppg = rppg.toFixed(2);
//     var playerName = myPlayers[i].Name;
//     console.log(ppg, playerName);
//   };
//   console.log(JSON.parse(xhr.responseText));
// });


// buildCard() output

// <div class="playerCard">
//   <div class="row">
//     <div class="medium-4 columns">
//       <div class="card">
//         <div class="image">
//           <img src="/images/lecry.jpg">
//           <span class="title">Lebawl James</span>
//         </div>
//         <div class="content">
//           <p><img src="/images/downarrow.png"> Fantasy stock dropped by 2.5 points</p>
//         </div>
//         <div class="action">
//           <p>Season fantasy PPG: 25.6</p>
//           <p>Previous game fantasy points: 23.1</p>
//         </div>
//       </div>
//     </div>
//     <div class="medium-6 columns end">
//       <div class="card">
//         <div class="content">
//           <span class="title">Lebron James</span>
//           <p>LeBron James was tremendously efficient in 31 minutes vs. the Suns, scoring 21 points on 7-of-8 FGs and 7-of-7 FTs, with three rebounds, nine assists and two turnovers.</p>
//         </div>
//         <div class="action">
//           <a href='www.nba.com/playerfile/lebron_james/'>NBA.com</a>
//           <a href='espn.go.com/nba/player/_/id/1966/lebron-james'>ESPN.com</a>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

function buildCard(data) {
  var deck = document.createElement('div');
  deck.className = "row";

  var holder = document.createElement('div');
  holder.className = "medium-4 columns";
  deck.appendChild(holder);

  var outerCard = document.createElement('div');
  outerCard.className = "card";
  holder.appendChild(outerCard);

  var photoHolder = document.createElement('div');
  photoHolder.className = "image";
  outerCard.appendChild(photoHolder);

  var playerPhoto = document.createElement('img');
  playerPhoto.setAttribute('src', '/images/lebron.jpg');
  photoHolder.appendChild(playerPhoto);

  var statHolder = document.createElement('div');
  statHolder.className = 'content';
  photoHolder.appendChild(statHolder);

  var stats = document.createElement('p');
  var playerStats = document.createTextNode(playerName + ':' + ppg + 'fantasy ppg');
  statHolder.appendChild(stats);
  stats.appendChild(playerStats);
}