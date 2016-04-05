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

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('remappingkeys', {
    url: '/help',
    views: {
      help: {
        templateUrl: 'help.html'
      }
    }
  })
})

highlightWord = function(){
    var menu = document.getElementById('select_menu');
    var selected = menu.selectedIndex;
    var button = document.getElementById('button_' + selected.toString());
    button.setAttribute('class','highlight_key');
    alert('here');
}

var default_words = [
  "want","ipad","help","love","colors","yes","no","bath","school","read","hug","brush teeth",
  "ball","music","potty","up","snack","sing","alphabet","walk","milk","mama","daddy","go","car","numbers","more","blanket","stop"
];

var words;




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
    var div = document.createElement('div');

    var text = document.createElement('p');
    text.setAttribute('class','button_text');
    text.innerHTML=words[i];

    var button = document.createElement('button');

    button.setAttribute('class', 'key');
    button.setAttribute('id', 'button_' + i.toString());
    div.appendChild(button);
    //div.appendChild(text);
    ldiv.appendChild(div);



    var div1 = document.createElement('div');

    var text1 = document.createElement('p');
    text1.setAttribute('class','button_text');
    text1.innerHTML=words[i+8];

    var button1 = document.createElement('button');
    button1.setAttribute('class','key');
    button1.setAttribute('id', 'button_' + (i + 8).toString());
    div1.appendChild(button1);
    //div1.appendChild(text1);
    mldiv.appendChild(div1);




    var div2 = document.createElement('div');

    var text2 = document.createElement('p');
    text2.setAttribute('class','button_text');
    text2.innerHTML=words[i+16];

    var button2 = document.createElement('button');
    button2.setAttribute('class','key');
    button2.setAttribute('id', 'button_' + (i + 16).toString());
    div2.appendChild(button2);
  //  div2.appendChild(text2);
    mrdiv.appendChild(div2);




    var div3 = document.createElement('div');

    var text3 = document.createElement('p');
    text3.setAttribute('class','button_text');
    text3.innerHTML=words[i+24];

    var button3 = document.createElement('button');
    button3.setAttribute('id', 'button_' + (i + 24).toString());

    if(i === 0){
      button3.setAttribute('class','dead_key');
    }
    else{
      button3.setAttribute('class','key');
    }
    div3.appendChild(button3);
    //div3.appendChild(text3);
    rdiv.appendChild(div3);
  }


  var dropdown = document.getElementById('dropdown_menu');
  for(var i = 0; i < words.length; i++){
    var option = document.createElement('option');
    option.innerHTML = words[i];
    dropdown.appendChild(option);
  }
});


document.getElementById("playbutton").addEventListener('click', function () {
    TTS
        .speak({
            text: words[Math.floor(Math.random() * 29)],
            locale: 'en-US',
            rate: 1.25
        });
}, false);
