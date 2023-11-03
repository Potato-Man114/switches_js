MyGame.input = (function() {
    'use strict';

    function Mouse() {
        let that = {}
        //TODO: create functions for button press and (maybe) update?
        
        that.update = (elapsedTime) => {
            //TODO: this
        }
        
        //window.addEventListener('onclick', mousePress); //TODO: is this right?
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