// Declare application
var app = angular.module('textrr', ['ionic']);

// Basic constants
// TODO: Define these colors and properties in css classes that we add and remove.
var dropdownSelectedButtonColor = "#32CD32";
var buttonColor = "#d9d9d9";
var lastindex = -1;
var default_words = [
  "want","ipad","help","love","colors","yes","no","bath",
  "school","read","hug","brush teeth", "ball","music","potty","up",
  "snack","sing","alphabet","walk","milk","mama","daddy","go",
  "car","numbers","more","blanket","stop"
];

// Global variables
var words;

saveWordsToLocalStorage = function(words){
  window.localStorage['words'] = words.toString();
};

sayString = function(words) {
  // https://forum.ionicframework.com/t/problems-with-text-to-speech/31927
  if (window.TTS != undefined) {
    window.TTS
      .speak({
        text: words[index],
        locale: 'en-US',
        rate: 1.25
      });
  } else{
    console.log("Unable to find Text to speech plugin");
  }
};

/*
Controller that controls editing of words
 */
app.controller('edit_words',function($scope, $ionicPopup, $timeout, $compile) {
  // Check for words in local storage, otherwise use defaults.
  if(window.localStorage['words'] === undefined){
    saveWordsToLocalStorage(default_words);
  }
  words = window.localStorage['words'].split(",");

  /*
  Buttons
   */

  // Containers for buttons, 4 columns
  var c1 = document.getElementById("l_button_container");
  var c2 = document.getElementById("ml_button_container");
  var c3 = document.getElementById("mr_button_container");
  var c4 = document.getElementById("r_button_container");
  var buttonContainers = [c1, c2, c3, c4];

  for (var i = 0; i < 31; i++){
    // Create a given button
    var button = document.createElement('button');
    button.setAttribute('class', 'key');
    button.setAttribute('id', 'button_' + i.toString());
    button.setAttribute('value', words[i]);
    button.setAttribute('ng-click', "showPopup($event)");
    button.style.background = buttonColor;

    // Recompile so ng-click update registers.
    $compile(button) ($scope);

    // Append to the correct div
    buttonContainers[Math.floor(i/8)].appendChild(button);
  }

  // Button action on click
  $scope.showPopup = function($event) {
    // Keep scope
    $scope.data = {};

    $scope.data.current_button_index = $event.currentTarget.id.replace("button_","");
    $scope.data.current_button = $event.currentTarget;

    var myPopup = $ionicPopup.show({
      template: '<input ng-model="data.new_word" type="text" placeholder="New Word">',
      title: 'Change Button Words',
      subTitle: 'Current word: ' + $event.currentTarget.value,
      scope: $scope,
      buttons: [
        {
          text: '<b>Finished</b>',
          onTap: function(e) {
              return $scope;
          }
        }
      ]
    });

    myPopup.then(function(res) {
      // Check if there is an update
      if (res.data.new_word) {
        // Change word to new word and save to local storage for later use.
        words[res.data.current_button_index] = res.data.new_word;
        console.log($scope.data.current_button_index);

        // Update button value
        res.data.current_button.setAttribute('value', words[res.data.current_button_index]);
        saveWordsToLocalStorage(words);
      } else{
        // Log a cancellation.
        console.log("No word supplied.")
      }
    });
  };





  /*
   Dropdown Menu
   */

// Make the dropdown menu have all the words.
  var dropdown = document.getElementById('dropdown_menu');
  for(var j = 0; j < words.length; j++){
    // Assign an option for each with the value of a single word.
    var option = document.createElement('option');
    option.innerHTML = words[j];
    dropdown.appendChild(option);
  }

// Say words when a user selects
  dropdown.addEventListener('change', function() {
    // No selection nothing happens
    if (dropdown.selectedIndex <= -1) {
      return;
    }

    // If selection, grab that word and say it
    var index = dropdown.selectedIndex - 1;
    if(lastindex > -1){
      console.log("Last index");
      var lastButton = document.getElementById("button_" + lastindex.toString());
      lastButton.style.background = buttonColor;
    }

    var button = document.getElementById("button_" + index.toString());
    button.style.background=dropdownSelectedButtonColor;
    lastindex = index;

    // Say something.
    sayString(words[index])
  });
});


/*
Highlight designate words
 */
highlightWord = function(){
  var menu = document.getElementById('select_menu');
  var button = document.getElementById('button_' + menu.selectedIndex.toString());
  button.setAttribute('class','highlight_key');
};
