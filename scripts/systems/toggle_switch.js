MyGame.systems.ToggleSwitch = (function() {

    let clicked_positions = [];

    function on_click(position) {
        let pos = MyGame.utils.viewPortPositionToPixelPosition(position);
        if (pos != undefined) {
            clicked_positions.push(pos);
        }
    }

    function initialize() {
        MyGame.pubsub.subscribe(MyGame.constants.Events.mouseDown, (data) => on_click(data));
    }

    function update(elapsedTime, entities, gridSize) {
        for (let i = 0; i < clicked_positions.length; i++) {
            let clicked_pos = MyGame.utils.pixelPositionToGridPosition(clicked_positions[i], gridSize);
            for (let j = 0; j < entities.length; j++) {
                let entity = entities[j];
                if (!(entity.components.position && entity.components.clickable && entity.components.activateable)) {
                    continue;
                }
                let pos = entity.components.position;
                if (pos.x == clicked_pos.x && pos.y == clicked_pos.y) {
                    entity.components.activateable.toggle();
                    MyGame.pubsub.publish(MyGame.constants.Events.switchUpdated, entity);
                }
            }
        }
        clicked_positions.length = 0;
    }

    return {
        initialize,
        update
    };

}());