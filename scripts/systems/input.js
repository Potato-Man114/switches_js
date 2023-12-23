MyGame.systems.Input = (function() {
    'use strict';

    let clicked_locations = [];
    

    function mouseDown(e) {
        clicked_locations.push({x: e.clientX, y: e.clientY});
    }

    function update(elapsedTime, entities) {
        for (let click = 0; click < clicked_locations.length; click++) {
            //TODO: publish mousedown message with x, y data.
            MyGame.pubsub.publish(MyGame.constants.Events.mouseDown, clicked_locations[click]);
            // console.log(clicked_locations[click].x + "," + clicked_locations[click].y);
        }
        clicked_locations.length = 0;
    }

    window.addEventListener('mousedown', mouseDown);

    return {
        update,
        clicked_locations,
    };
}());