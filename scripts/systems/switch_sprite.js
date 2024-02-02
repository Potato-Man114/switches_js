MyGame.systems.SwitchSprite = (function() {

    let updatedSwitches = [];
    let unsubscribe_functions = [];

    function switchUpdated(entity) {
        updatedSwitches.push(entity);
    }

    function initialize() {
        unsubscribe_functions.push(MyGame.pubsub.subscribe(MyGame.constants.Events.switchUpdated, (data) => switchUpdated(data)).unsubscribe);
    }

    function update(elapsedTime, entities, gridSize) {
        for (let i = 0; i < updatedSwitches.length; i++) {
            let updatedSwitch = updatedSwitches[i];
            let spriteName = EntityFactory.getSwitchSpriteName(
                updatedSwitch.components.switch_type.type,
                updatedSwitch.components.activateable ? updatedSwitch.components.activateable.active : false,
                updatedSwitch.components.clickable,
                updatedSwitch.components.directional ? updatedSwitch.components.directional.direction : undefined,
            )
            if (!!MyGame.assets[spriteName]) {
                updatedSwitch.addComponent(MyGame.components.Sprite({
                    image: MyGame.assets[spriteName],
                    ready: true,
                    spriteSize: MyGame.utils.misc.getSpriteSize(gridSize),
                    spriteCenter: MyGame.utils.misc.gridPositionToPixelPosition(
                        {x: updatedSwitch.components.position.x, y: updatedSwitch.components.position.y}, gridSize
                        ).center,
                }));
            }
            else {
                console.log("No matching sprite: " + spriteName);
            }
            if (updatedSwitch.components.goal) {
                let spriteSize = MyGame.utils.misc.getSpriteSize(gridSize);
                spriteSize.width /= 4;
                spriteSize.height /= 4;
                let mainSize = MyGame.utils.misc.getSpriteSize(gridSize);
                let spriteCenter = MyGame.utils.misc.gridPositionToPixelPosition(updatedSwitch.components.position, gridSize).center;
                spriteCenter.x += mainSize.width / 2 - spriteSize.width / 2 - (mainSize.width * (2/28));
                spriteCenter.y -= mainSize.width / 2 - spriteSize.width / 2 - (mainSize.height * (2/28));

                updatedSwitch.addComponent(MyGame.components.Goal({
                    image: MyGame.assets[updatedSwitch.components.activateable && updatedSwitch.components.activateable.active ? "goal_annotation_on" : "goal_annotation_off"],
                    ready: true,
                    spriteSize: spriteSize,
                    spriteCenter: spriteCenter
                }));
            }
        }
        updatedSwitches.length = 0;
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