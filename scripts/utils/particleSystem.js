MyGame.particleSystems = [];

MyGame.utils.ParticleSystem = function(spec, placement, timing) {
    'use strict';
    let nextId = 0;

    let particles = [];

    let that = {
        get particles() { return particles },
    };

    function create(center, image) {

    }

    function initialize() {

    }

    that.clear = function() {
        nextId = 0;
        particles.length = 0;
    }

    that.update = function(elapsedTime) {

    }

    that.isDone = function() {
        return particles.length == 0;
    }

    initialize();
    return that;
}

MyGame.utils.ParticleSystemFactory = (function() {
    'use strict';

    let that = {};
    
    that.activateSwitchEffect = function(positions, gridSize) {

    }

    that.deactivateSwitchEffect = function(positions, gridSize) {

    }

    that.createWinEffect = function(positions, gridSize) {

    }

    return that;
}());