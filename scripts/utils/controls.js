MyGame.controls = (function() {

  let that = {
    configuration: {},
  };

  let defaultControls = {
    'up': "w",
    'down': "s",
    'left': "a",
    'right': "d",
    'undo': "z",
    'reset': "r",
  }

  const storageName = "BBIY.controls"

  function configurationExists() {
    let controls = localStorage.getItem(storageName);
    if (controls) {
      return true;
    }
    return false;
  }

  that.restoreDefaults = function() {
    for (let command in defaultControls) {
      that.configuration[command] = defaultControls[command];
    }
    saveControls();
  }

  function saveControls() {
    localStorage[storageName] = JSON.stringify(that.configuration);
  }

  function initialize() {
    if (configurationExists()) {
      //load controls set by the user
      that.configuration = JSON.parse(localStorage.getItem(storageName));
    }
    else {
      //use default controls
      that.restoreDefaults();
    }
  }


  that.setControl = function(command, key) {
    that.configuration[command] = key;
    saveControls();
  }

  that.getKeyForCommand = function(command) {
    return that.configuration[command];
  }



  initialize();
  return that;
}())