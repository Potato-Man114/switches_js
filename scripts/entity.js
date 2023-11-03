let Entity = (function() {
    'use strict';
    let nextId = 1;

    let api = {};

    /**
     * Creates an Entity with no components.
     * @param {int} id Optional id for the entity.
     */
    api.createEntity = function(id) {
        let that = {};
        that.components = {};

        that.addComponent = (c) => {
            that.components[c.name] = c;
        }

        that.removeComponent = (c) => {
            delete that.components[c.name];
        }

        that.clone = () => {
            let newEntity = api.createEntity(that.id);
            for (let componentId in that.components) {
                let component = that.components[componentId];
                newEntity.addComponent(_.cloneDeep(component));
            }
            return newEntity;
        }

        that.id = id || nextId++;
        
        return that;
    }

    return api;
}());

//Factory for easy creation of many different entities. May separate into differnt file later.

let EntityFactory = (function() {
    'use scrict';
    let api = {};

    api.createNormalSwitch = (position, gridSize, status) => {
        //TODO: this
        let entity = Entity.createEntity();
        entity.addComponent(MyGame.components.Position(position.x, position.y));
        entity.addComponent(MyGame.components.Sprite({
            image: MyGame.assets["normal-off"],
            ready: true,
            spriteSize: MyGame.utils.getSpriteSize(gridSize),
            spriteCenter: MyGame.utils.gridPositionToPixelPosition(position, gridSize).center,
        }));
        return entity;
    }

    return api;
}());