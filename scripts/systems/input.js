MyGame.systems.Input = (function() {
    'use strict';

    let clicked_locations = [];
    let unsubscribe_functions = [];


    function mouseDown(e) {
        clicked_locations.push({x: e.clientX, y: e.clientY});
    }

    function initialize() {
        window.addEventListener('mousedown', mouseDown);
    }

    function update(elapsedTime, entities) {
        for (let click = 0; click < clicked_locations.length; click++) {
            MyGame.pubsub.publish(MyGame.constants.Events.mouseDown, clicked_locations[click]);
        }
        clicked_locations.length = 0;
    }

    function remove() {
        for (let i = 0; i < unsubscribe_functions.length; i++) {
            unsubscribe_functions[i]();
        }
        window.removeEventListener('mousedown', mouseDown);
    }


    return {
        update,
        clicked_locations,
        remove,
        initialize,
    };
}());