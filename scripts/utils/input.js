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

    function Keyboard() {
        let that = {}

        //TODO: this

        that.update = (elapsedTime) => {
            //TODO: this
        }

        return that;

    }

    return {
        Mouse,
        Keyboard
    }
}());