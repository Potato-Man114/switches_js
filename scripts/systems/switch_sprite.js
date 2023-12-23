MyGame.systems.SwitchSprite = (function() {

    let updatedSwitches = [];

    function switchUpdated(entity) {
        updatedSwitches.push(entity);
    }

    function initialize() {
        MyGame.pubsub.subscribe(MyGame.constants.Events.switchUpdated, (data) => switchUpdated(data));
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
                    spriteSize: MyGame.utils.getSpriteSize(gridSize),
                    spriteCenter: MyGame.utils.gridPositionToPixelPosition(
                        {x: updatedSwitch.components.position.x, y: updatedSwitch.components.position.y}, gridSize
                        ).center,
                }));
            }
            else {
                console.log("No matching sprite: " + spriteName);
            }
        }

        updatedSwitches.length = 0;
    }

    return {
        initialize,
        update,
    };

}());