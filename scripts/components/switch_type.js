MyGame.components.SwitchType = function(type) {
    'use strict';

    let that = {
        get name() { return 'switch_type'; },
        get type() { return type; },
        set type(t) { type = t; }
    };

    return that;
}