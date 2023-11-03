MyGame.components.Position = function(x, y) {
    'use strict';

    let that = {
        get name() { return 'position'; },
        get x() { return x; },
        get y() { return y; },
        set x(newX) { x = newX; },
        set y(newY) { y = newY; },
    };

    return that;
}