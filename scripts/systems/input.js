MyGame.systems.Input = (function() {
    'use strict';

    let clicked_locations = [];
    let pressed_keys = [];
    let unsubscribe_functions = [];


    function mouseDown(e) {
        clicked_locations.push({x: e.clientX, y: e.clientY});
    }

    function keypress(e) {
        !pressed_keys.includes(e.key) && pressed_keys.push(e.key);
    }

    function initialize() {
        window.addEventListener('mousedown', mouseDown);
        window.addEventListener('keydown', keypress);
    }

    function update(elapsedTime, entities) {
        for (let click = 0; click < clicked_locations.length; click++) {
            MyGame.pubsub.publish(MyGame.constants.Events.mouseDown, clicked_locations[click]);
        }
        clicked_locations.length = 0;
        for (let key of pressed_keys) {
            if (MyGame.constants.Controls[key]) {
                MyGame.pubsub.publish(MyGame.constants.Controls[key], undefined);
            }
        }
        pressed_keys.length = 0;
    }

    function remove() {
        for (let i = 0; i < unsubscribe_functions.length; i++) {
            unsubscribe_functions[i]();
        }
        unsubscribe_functions.length = 0;
        window.removeEventListener('mousedown', mouseDown);
        window.removeEventListener('keydown', keypress);
    }


    return {
        update,
        clicked_locations,
        remove,
        initialize,
    };
}());