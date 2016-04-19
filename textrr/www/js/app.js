// Declare application
var app = angular.module('textrr', ['ionic']);

var voiceActive = true;

// Basic constants
// TODO: Define these colors and properties in css classes that we add and remove.
var dropdownSelectedButtonColor = "#32CD32";
var buttonColor = "#d9d9d9";
var lastindex = -1;
var default_words = [
  "want","ipad","help","love","colors","yes","no","bath",
  "school","read","hug","brush teeth", "ball","music","potty","up",
  "snack","sing","alphabet","walk","milk","mama","daddy","go",
  "car","numbers","more","blanket","stop", "", ""
];

// Containers for buttons, 4 columns
var c1 = document.getElementById("l_button_container");
var c2 = document.getElementById("ml_button_container");
var c3 = document.getElementById("mr_button_container");
var c4 = document.getElementById("r_button_container");
var buttonContainers = [c1, c2, c3, c4];

// Word labels
var word_labels = [];
for (i = 0; i < 8; i++){
  word_label = document.getElementById("word_label_" + String(i));
  word_labels.push(word_label)
}

// Global variables
var words;
var showingAllColumns = true;
var current_k;


/*
Helper Functions
*/
saveWordsToLocalStorage = function(words){
  window.localStorage['words'] = words.toString();
};

sayString = function(words) {
  // https://forum.ionicframework.com/t/problems-with-text-to-speech/31927
  if (voiceActive) {
    if (window.TTS != undefined) {
      window.TTS
        .speak({
          text: words[index],
          locale: 'en-US',
          rate: 1.25
        });
    } else {
      console.log("Unable to find Text to speech plugin");
    }
  }
};



/*
Controller
*/
app.controller('edit_words',function($scope, $ionicPopup, $timeout, $compile) {

//bluetoothSerial.enable();
//refreshDeviceList();

  // Check for words in local storage, otherwise use defaults.
  if(window.localStorage['words'] === undefined){
    console.log("Loading default word list");
    saveWordsToLocalStorage(default_words);
  }
  words = window.localStorage['words'].split(",");

  /*
  Buttons
  */

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

    // Log these for later use when we reassign word in word array
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
        // Get dropdown option before we reassign
        var dropdown_option = document.getElementById(words[res.data.current_button_index] + "_option");

        // Change word to new word and save to local storage for later use.
        words[res.data.current_button_index] = res.data.new_word;

        // Update dropdown with new word
        dropdown_option.innerHTML = words[res.data.current_button_index];
        dropdown_option.setAttribute("id", words[res.data.current_button_index] + "_option");

        // Update button value
        res.data.current_button.setAttribute('value', words[res.data.current_button_index]);
        saveWordsToLocalStorage(words);
        if (!showingAllColumns) {
          modifyWordLabels(current_k);
        }
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
    option.setAttribute("id", words[j] + "_option");
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


/*
Display word drawers
 */
displayWordsColumn = function(keep) {
    k = parseInt(keep);

    if (showingAllColumns){
      displayWordLabels();
      current_k = k;
    } else {
      hideWordLabels();
    }

    // Switch word labels to correct values
    modifyWordLabels(k);
    for (i = 0; i < 4; i++) {

      // Add or remove all but the column that signaled.
      if (i !== k) {
        if (showingAllColumns) {
            buttonContainers[i].classList.add("hidden-button-container");
        } else
          {
            buttonContainers[i].classList.remove("hidden-button-container");
          }
        }
      }

  // Invert showing
  showingAllColumns = !showingAllColumns;
};

/*
refreshDeviceList = function() {
  bluetoothSerial.discoverUnpaired(
    function(){
      console.log("discovered devices!")
    }, function(){
      console.log("error discovering unpaired devices")
    });
  };

  onDeviceList = function(devices) {
    var option;

    // remove existing devices
    deviceList.innerHTML = "";
    app.setStatus("");

    devices.forEach(function(device) {

    });

    if (devices.length === 0) {
      console.log("No devices were found.")
    } else {
      console.log("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
    }

  };
  connect = function(e) {
    var onConnect = function() {
      // subscribe for incoming data
      bluetoothSerial.subscribe('\n', app.onData, app.onError);
    };

    var deviceId = e.target.dataset.deviceId;
    if (!deviceId) { // try the parent
      deviceId = e.target.parentNode.dataset.deviceId;
    }
    bluetoothSerial.connect(deviceId, onConnect, app.onError);
  };
  disconnect = function(event) {
    bluetoothSerial.disconnect(function(){
      console.log("disconnected")
    }, function(){
      console.log("error disconnecting")
    });
  };
*/

/*
Word labels
 */
modifyWordLabels = function(column) {
  start = 8*column;
  var fudge = 0;
  if (column === 3){
    fudge = 1;
    word_labels[0].innerHTML = "";
  }

  for (i = start + fudge; i < start+8; i++){
    message = words[i-fudge];
    if (words[i-fudge] == undefined) {
      message = "";
    }

    word_labels[i - start].innerHTML = message;
  }
};

displayWordLabels = function() {
  document.getElementById("word_labels").classList.remove("hidden-word-labels");
  document.getElementById("word_labels").classList.add("show-word-labels");
};

hideWordLabels = function() {
  document.getElementById("word_labels").classList.add("hidden-word-labels");
  document.getElementById("word_labels").classList.remove("show-word-labels");
};

toggleVoiceActive = function(){
  voiceActive = !voiceActive;
  voice_active = document.getElementById("voice-active");
  if (voiceActive){
    voice_active.style.background = "green";
  } else {
    voice_active.style.background = "red";
  }
};
