MyGame.systems.ToggleSwitches = (function() {

    let clicked_positions = [];
    let unsubscribe_functions = [];

    function on_click(position) {
        let pos = MyGame.utils.viewPortPositionToPixelPosition(position);
        if (pos != undefined) {
            clicked_positions.push(pos);
        }
    }

    function initialize() {
        unsubscribe_functions.push(MyGame.pubsub.subscribe(MyGame.constants.Events.mouseDown, (data) => on_click(data)).unsubscribe);
    }

    function get_adjacent_switches(current_switch, entities) {
        let adjacent_switches = [];
        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i];
            if (!(entity.components.position && entity.components.activateable && entity.components.switch_type)) {
                continue;
            }
            if (entity.components.position.x >= current_switch.components.position.x - 1 && 
                entity.components.position.x <= current_switch.components.position.x + 1 &&
                entity.components.position.y >= current_switch.components.position.y - 1 && 
                entity.components.position.y <= current_switch.components.position.y + 1
                ) {
                    adjacent_switches.push(entity);
                }
        }
        return adjacent_switches;
    }

    function get_cascading_switches(current_switch, already_found, entities) {
        if (already_found.includes(current_switch)) {
            return;
        }
        if (!(current_switch.components.switch_type && current_switch.components.switch_type && current_switch.components.switch_type.type == MyGame.constants.SwitchTypes.CASCADE)) {
            return;
        }
        already_found.push(current_switch);
        let adjacent_switches = get_adjacent_switches(current_switch, entities);
        for (let i = 0; i < adjacent_switches.length; i++) {
            get_cascading_switches(adjacent_switches[i], already_found, entities);
        }
        
    }

    function cascade(clicked_switch, entities) {
        let cascading_switches = [];
        get_cascading_switches(clicked_switch, cascading_switches, entities);
        for (let i = 0; i < cascading_switches.length; i++) {
            cascading_switches[i].components.activateable.toggle();
            MyGame.pubsub.publish(MyGame.constants.Events.switchUpdated, cascading_switches[i]);
        }
    }

    function distance(clicked_switch, entities) {
        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i];
            if (!(entity.components.position && entity.components.activateable && entity.components.switch_type)) {
                continue;
            }
            if (entity.components.switch_type.type == MyGame.constants.SwitchTypes.DISTANCE) {
                    entity.components.activateable.toggle();
                    MyGame.pubsub.publish(MyGame.constants.Events.switchUpdated, entity);
                }
        }
    }

    function normal(clicked_switch, entities, additional_condition = (e) => true) {
        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i];
            if (!(entity.components.position && entity.components.activateable && entity.components.switch_type)) {
                continue;
            }
            if (entity.components.position.x >= clicked_switch.components.position.x - 1 && 
                entity.components.position.x <= clicked_switch.components.position.x + 1 &&
                entity.components.position.y >= clicked_switch.components.position.y - 1 && 
                entity.components.position.y <= clicked_switch.components.position.y + 1 &&
                additional_condition(entity)
                ) {
                    entity.components.activateable.toggle();
                    MyGame.pubsub.publish(MyGame.constants.Events.switchUpdated, entity);
                }
        }
    }

    function directional(clicked_switch, entities) {
        if (!clicked_switch.components.directional) {
            return;
        }
        let condition = (entity) => false;
        switch (clicked_switch.components.directional.direction) {
            case MyGame.constants.Directions.RIGHT:
                condition = (entity) => {
                    return (
                        entity.components.position.y == clicked_switch.components.position.y &&
                        entity.components.position.x >= clicked_switch.components.position.x
                    )
                }
                break;
            case MyGame.constants.Directions.LEFT:
                condition = (entity) => {
                    return (
                        entity.components.position.y == clicked_switch.components.position.y &&
                        entity.components.position.x <= clicked_switch.components.position.x
                    )
                }
                break;
            case MyGame.constants.Directions.UP:
                condition = (entity) => {
                    return (
                        entity.components.position.x == clicked_switch.components.position.x &&
                        entity.components.position.y <= clicked_switch.components.position.y
                    )
                }
                break;
            case MyGame.constants.Directions.DOWN:
                condition = (entity) => {
                    return (
                        entity.components.position.x == clicked_switch.components.position.x &&
                        entity.components.position.y >= clicked_switch.components.position.y
                    )
                }
                break;
            default:
                break;
        }
        for (let i = 0; i < entities.length; i++) {
            let entity = entities[i];
            if (!(entity.components.position && entity.components.activateable && entity.components.switch_type)) {
                continue;
            }
            if (condition(entity)) {
                    entity.components.activateable.toggle();
                    MyGame.pubsub.publish(MyGame.constants.Events.switchUpdated, entity);
                }
        }
    }

    function toggle_switch(clicked_switch, entities) {
        switch (clicked_switch.components.switch_type.type) {
            case MyGame.constants.SwitchTypes.GOAL:
            case MyGame.constants.SwitchTypes.NORMAL:
                normal(clicked_switch, entities);
                break;
            case MyGame.constants.SwitchTypes.CASCADE:
                cascade(clicked_switch, entities);
                break;
            case MyGame.constants.SwitchTypes.DIRECTIONAL:
                directional(clicked_switch, entities);
                break;
            case MyGame.constants.SwitchTypes.DISTANCE:
                distance(clicked_switch, entities);
                break;
            default:
                console.log("unkown switch type");
                break;
        }
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
                    // entity.components.activateable.toggle();
                    toggle_switch(entity, entities);
                    // MyGame.pubsub.publish(MyGame.constants.Events.switchUpdated, entity);
                }
            }
        }
        clicked_positions.length = 0;
    }

    function remove() {
        for (let i = 0; i < unsubscribe_functions.length; i++) {
            unsubscribe_functions[i]();
        }
    }

    return {
        initialize,
        update,
        remove,
    };

}());