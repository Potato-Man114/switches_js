function GameModel(level_data) {
    'use strict';

    let entities = [];

    function initializeLevel(level_data) {
        entities.length = 0;
        for (var object of level_data["objects"]) {
            let entity = undefined;
            switch (object["type"]) {
                case "SWITCH":
                    entity = EntityFactory.createSwitch(object["attributes"], level_data.size);
                    break;
                default:
                    console.log("Unkown object type");
                    console.log(object["type"]);
                    break;
            }
            if (entity) {
                entities.push(entity);
            }
        }

        // entities.push(EntityFactory.createNormalSwitch({x: 4, y: 4}, level_data.size, false));

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
        // console.log("update is working.");
        //It's update, it goes through the updates of each of the systems in the correct order.
        //Make sure the pubsub model is levereged.
        MyGame.systems.Input.update(elapsedTime, entities);
        MyGame.systems.Render.update(elapsedTime, entities);
        
    }

    initialize();

    return {
        update,
    };
}