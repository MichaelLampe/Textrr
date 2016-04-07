var app = angular.module('textrr', ['ionic'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
})


highlightWord = function(){
  //alert($scope.selectedItem);
  var menu = document.getElementById('select_menu');
  var selected = menu.selectedIndex;
  var button = document.getElementById('button_' + selected.toString());
  button.setAttribute('class','highlight_key');
  alert('here');
}

var lastindex = -1;
var words;
var default_words = [
  "want","ipad","help","love","colors","yes","no","bath","school","read","hug","brush teeth",
  "ball","music","potty","up","snack","sing","alphabet","walk","milk","mama","daddy","go","car","numbers","more","blanket","stop"
];


document.addEventListener("deviceready", function(){

  if(window.localStorage['words'] === undefined){
    window.localStorage['words'] = default_words.toString();
  }
  words = window.localStorage['words'].split(",");

  var ldiv = document.getElementById("l_button_container");
  var mldiv = document.getElementById("ml_button_container");
  var mrdiv = document.getElementById("mr_button_container");
  var rdiv = document.getElementById("r_button_container");



  for(var i = 0; i < 8; i++){
    var button = document.createElement('button');
    button.setAttribute('class', 'key');
    button.setAttribute('id', 'button_' + i.toString());
    button.setAttribute('value', words[i]);

    button.addEventListener('click', function(){
      alert(this.getAttribute('value'));
    })

    ldiv.appendChild(button);

    var button1 = document.createElement('button');
    button1.setAttribute('class','key');
    button1.setAttribute('id', 'button_' + (i + 8).toString());
    button1.setAttribute('value', words[i + 8]);

    button1.addEventListener('click', function(){
      alert(this.getAttribute('value'));
    })

    mldiv.appendChild(button1);

    var button2 = document.createElement('button');
    button2.setAttribute('class','key');
    button2.setAttribute('id', 'button_' + (i + 16).toString());
    button2.setAttribute('value', words[i + 16]);

    button2.addEventListener('click', function(){
      alert(this.getAttribute('value'));
    })

    mrdiv.appendChild(button2);

    if(i !== 7){
      var button3 = document.createElement('button');
      button3.setAttribute('class','key');
      button3.setAttribute('id', 'button_' + (i + 24).toString());
      button3.setAttribute('value', words[i + 24]);

      button3.addEventListener('click', function(){
        alert(this.getAttribute('value'));
      })

      rdiv.appendChild(button3);
    }
  }


  var dropdown = document.getElementById('dropdown_menu');
  for(var i = 0; i < words.length; i++){
    var option = document.createElement('option');
    option.innerHTML = words[i];
    dropdown.appendChild(option);
  }

  dropdown.addEventListener('change', function() {

    if (dropdown.selectedIndex == -1)
      return null;

    var index = dropdown.selectedIndex - 1;
    if(lastindex !== -1){
      var lastbutton = document.getElementById("button_" + lastindex.toString());
      lastbutton.style.background = "#d9d9d9";
    }
    var button = document.getElementById("button_" + index.toString());
    button.style.background='#32CD32';
    lastindex = index;

    TTS
    .speak({
      text: words[index],
      locale: 'en-US',
      rate: 1.25
    });
  })
});


document.getElementById("playbutton").addEventListener('click', function () {
  TTS
  .speak({
    text: words[Math.floor(Math.random() * 29)],
    locale: 'en-US',
    rate: 1.25
  });
}, false);
