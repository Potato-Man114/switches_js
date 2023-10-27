function GameModel(level_data) {
    'use strict';

    let entities = [];

    function initializeLevel(level_data) {
        //TODO: level_data has no meaning for now. Change that.
        //TODO: loading levels
        

        //TODO: initialize a NORMAL_ON Switch
        //TODO: figure out how to store switch data
        entities.length = 0;

        entities.push(EntityFactory.createNormalSwitch(true));

        //initialize any systems that have an "initialize" method
        // for (system of MyGame.systems) {
        //     if (Object.keys(system).includes("initialize")) {
        //         system.initialize();
        //     }
        // }

    }

    function resetLevel() {
        initializeLevel(level_data);
    }

    function initialize() {
        initializeLevel(level_data);
        //TODO: begin background music.
    }

    function update(elapsedTime) {
        console.log("update is working.");
        //It's update, it goes through the updates of each of the systems in the correct order.
        //Make sure the pubsub model is levereged.
    }

    initialize();

    return {
        update,
    };
}