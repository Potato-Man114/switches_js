MyGame.components.Directional = function(direction) {
    'use strict';

    let that = {
        get name() { return 'directional'; },
        get direction() {return direction },
        set direction(d) {direction = d}
    };

    return that;
}