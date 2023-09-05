MyGame.input = (function() {
  'use strict';
  function Keyboard() {
    
    let that = {
      keys : {},
      handlers : []
    };
    let key;

    function keyPress(e) {
      that.keys[e.key] = e.timeStamp;
    }
    
    function keyRelease(e) {
      delete that.keys[e.key];
    }
    
    that.registerCommand = function(key, handler) {
      that.handlers.push({ key : key, handler : handler});
    };

    that.unregisterCommand = function(key) {
      that.handlers.splice(that.handlers.findIndex((h) => {h.key == key}), 1);
    }

    that.update = function(elapsedTime) {
      for (key = 0; key < that.handlers.length; key++) {
        if (typeof that.keys[that.handlers[key].key] !== 'undefined') {
          that.handlers[key].handler(elapsedTime);
        }
      }
    };

    window.addEventListener('keydown', keyPress);
    window.addEventListener('keyup', keyRelease);
    
    return that;
  }

  return {
    Keyboard
  }  
}());
