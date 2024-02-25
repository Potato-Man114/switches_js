MyGame.systems.Win = (function() {
    'use strict';

    let updatedSwitches = [];
    let unsubscribe_functions = [];

    function switchUpdated(entity) {
        updatedSwitches.push(entity);
    }

    function initialize() {
        unsubscribe_functions.push(MyGame.pubsub.subscribe(MyGame.constants.Events.switchUpdated, (data) => switchUpdated(data)).unsubscribe);
    }

    function winParticleEffect(entities, gridSize) {
        let positions = [];
        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i];
            if (entity.components.goal && entity.components.position) {
                positions.push({
                    x: entity.components.position.x,
                    y: entity.components.position.y,
                });
            }
        }
        MyGame.particleSystems.push(
            ...MyGame.utils.ParticleSystemFactory.createWinEffect(
                positions, gridSize,
            )
        );
    }

    function update(elapsedTime, entities, gridSize) {
        if (updatedSwitches.length == 0) {
            return;
        }   
        let allGoalsOn = true;
        let atLeastOneGoal = false;
        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i];
            if (entity.components.goal) {
                atLeastOneGoal = true;
                if (!(entity.components.activateable && entity.components.activateable.active)) {
                    allGoalsOn = false;
                    break;
                }
            } 
        }
        //publish "win" signal if allGoalsOn == true
        if (atLeastOneGoal && allGoalsOn) {
            MyGame.pubsub.publish(MyGame.constants.Events.win, undefined);
            winParticleEffect(entities, gridSize);
        }

        updatedSwitches.length = 0;
    }

    function remove() {
        for (let i = 0; i < unsubscribe_functions.length; i++) {
            unsubscribe_functions[i]();
        }
        unsubscribe_functions.length = 0;
    }

      return {
        update,
        initialize,
        remove
      }
    
    
}());   