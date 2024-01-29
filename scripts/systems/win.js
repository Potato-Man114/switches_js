MyGame.systems.Win = (function() {
    'use strict';

    let updatedSwitches = [];

    function switchUpdated(entity) {
        updatedSwitches.push(entity);
    }

    function initialize() {
        MyGame.pubsub.subscribe(MyGame.constants.Events.switchUpdated, (data) => switchUpdated(data));
    }

    function update(elapsedTime, entities) {
        //TODO: this.
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
        if (allGoalsOn) {
            MyGame.pubsub.publish(MyGame.constants.Events.win, undefined);
        }

        updatedSwitches.length = 0;
    }
    
      return {
        update,
        initialize
      }
    
    
}());   