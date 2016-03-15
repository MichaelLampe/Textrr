angular.module('textrr', ['ionic'])

.run(function($ionicPlatform) {
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


// make sure your the code gets executed only after `deviceready`.
document.addEventListener('deviceready', function () {
    TTS
        .speak({
            text: 'If the API is invoked when its still speaking, the previous speaking will be canceled immediately',
            locale: 'en-US',
            rate: 1.25
        });
}, false);
