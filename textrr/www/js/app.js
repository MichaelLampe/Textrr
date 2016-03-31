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
});


document.getElementById("playbutton").addEventListener('click', function () {
    TTS
        .speak({
            text: words[Math.floor(Math.random() * 29)],
            locale: 'en-US',
            rate: 1.25
        });
}, false);
