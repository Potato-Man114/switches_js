function GameModel(level_data) {
    'use strict';

    let entities = [];
    let won = false;
    let afterWinTimer = 1500;

    let unsubscribe_functions = [];

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

    }

    function clear() {
        for (let system in MyGame.systems) {
            if (Object.keys(MyGame.systems[system]).includes("remove")) {
                MyGame.systems[system].remove();
            }
        }
        MyGame.particleSystems.length = 0;
        entities.length = 0;
    }

    function resetLevel() {
        console.log("here");
        clear();
        initialize();
    }
    function subscribe_to_events() {
        
        //subscribe to win event
        unsubscribe_functions.push(MyGame.pubsub.subscribe(MyGame.constants.Events.win, () => won = true).unsubscribe);
        //subscribe to reset event
        unsubscribe_functions.push(MyGame.pubsub.subscribe(MyGame.constants.Events.reset, resetLevel).unsubscribe);
    }

    function initialize() {
        initializeLevel(level_data);
        for (let system in MyGame.systems) {
            if (Object.keys(MyGame.systems[system]).includes("initialize")) {
                MyGame.systems[system].initialize();
            }
        }
        //TODO: begin background music.
    }

    function update(elapsedTime) {
        //It's update, it goes through the updates of each of the systems in the correct order.
        if (!won) {
            MyGame.systems.Input.update(elapsedTime, entities);
            MyGame.systems.ToggleSwitches.update(elapsedTime, entities, level_data.size);
            MyGame.systems.Win.update(elapsedTime, entities, level_data.size);
        }
        else {
            afterWinTimer -= elapsedTime;
        }
        MyGame.systems.SwitchSprite.update(elapsedTime, entities, level_data.size);
        MyGame.systems.Render.update(elapsedTime, entities);

        if (afterWinTimer <= 0) {
            return true;
        }
        
    }

    initialize();
    subscribe_to_events();
    
    return {
        update,
    };
}