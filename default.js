var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:1337/dashboard');
xhr.send();
xhr.addEventListener('load', function() {
  var player = document.getElementById('player');
  var info = document.createTextNode(xhr.responseText);
  player.appendChild(info);
  var myPlayers = JSON.parse(xhr.responseText);
  for(var i = 0; i < 20; i++) {
    var rppg = (myPlayers[i].FantasyPoints / myPlayers[i].Games);
    var ppg = rppg.toFixed(2);
    console.log(ppg);
  };

  // console.log(xhr.responseText);
});
