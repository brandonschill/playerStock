var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:1337/dashboard');
xhr.send();
xhr.addEventListener('load', function() {
  console.log(xhr.responseText);
});