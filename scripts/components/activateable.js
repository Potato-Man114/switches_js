MyGame.components.Activateable = function(active) {
    'use strict';

    active = !!active;

    let that = {
        get name() { return 'activateable'; },
        get active() { return active; },
        set active(a) { active = a } 
    };

    return that;
}