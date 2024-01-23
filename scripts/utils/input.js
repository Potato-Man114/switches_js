MyGame.input = (function() {
    'use strict';

    function Mouse() {
        let that = {
            actions: {},
            handlers: [],
        };

        function mousedown(e) {
            that.actions['mousedown'] = {x: e.clientX, y: e.clientY};
        }        

        that.registerCommand = (action, handler)  => {
            that.handlers.push({ action: action, handler: handler});
        }
        
        that.unregisterCommand = (action) => {
            that.handlers.splice(that.handlers.findIndex((h) => {h.action == action}), 1);
        }

        that.update = (elapsedTime) => {
            for (let handler = 0; hanlder < that.handlers.length; handler++) {
                that.handlers[handler].handler(elapsedTime, that.actions[that.handlers[handler].action]);
            }
        }
        
        window.addEventListener('mousedown', mousedown); //TODO: is this right?
        return that;


    }

    //TODO: this is a direct copy from BBIY. Change it to make it better.
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
        Mouse,
        Keyboard
    }
}());