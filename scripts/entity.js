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

    api.getSwitchSpriteName = (switch_type, is_on, clickable, direction) => {
        let sprite_name = "" + switch_type.toLowerCase();
        sprite_name = direction ? sprite_name + "_" + direction.toLowerCase() : sprite_name;
        sprite_name = is_on ? sprite_name + "_on" : sprite_name + "_off";
        sprite_name = clickable ? sprite_name + "_clickable" : sprite_name;
        return sprite_name;
    }

    api.createSwitch = (attributes, gridSize) => {
        //basic checks
        if (!attributes.hasOwnProperty("pos") || !attributes.hasOwnProperty("switch_type")) {
            return undefined;
        }

        let entity = Entity.createEntity();
        entity.addComponent(MyGame.components.Position(attributes.pos.x, attributes.pos.y));

        let sprite_name = api.getSwitchSpriteName(attributes.switch_type, attributes.is_on, attributes.clickable, attributes.direction);

        if (!!MyGame.assets[sprite_name]) {
            entity.addComponent(MyGame.components.Sprite({
                image: MyGame.assets[sprite_name],
                ready: true,
                spriteSize: MyGame.utils.getSpriteSize(gridSize),
                spriteCenter: MyGame.utils.gridPositionToPixelPosition(attributes.pos, gridSize).center,
            }));
        }
        else {
            console.log("could not find a sprite for the object:");
            console.log(attributes);
            console.log(sprite_name);
            return undefined;
        }
        entity.addComponent(MyGame.components.Activateable(attributes.is_on));
        if (attributes.is_goal) {
            let spriteSize = MyGame.utils.getSpriteSize(gridSize);
            spriteSize.width /= 4;
            spriteSize.height /= 4;
            let mainSize = MyGame.utils.getSpriteSize(gridSize);
            let spriteCenter = MyGame.utils.gridPositionToPixelPosition(attributes.pos, gridSize).center;
            spriteCenter.x += mainSize.width / 2 - spriteSize.width / 2 - (mainSize.width * (2/28));
            spriteCenter.y -= mainSize.width / 2 - spriteSize.width / 2 - (mainSize.height * (2/28));
            entity.addComponent(MyGame.components.Goal({
                image: MyGame.assets[attributes.is_on ? "goal_annotation_on" : "goal_annotation_off"],
                ready: true,
                spriteSize: spriteSize,
                spriteCenter: spriteCenter
            }));
        }
        if (attributes.clickable) {
            entity.addComponent(MyGame.components.Clickable());
        }

        entity.addComponent(MyGame.components.SwitchType(attributes.switch_type));
        if (attributes.direction) {
            entity.addComponent(MyGame.components.Directional(attributes.direction));
        }

        return entity;
    }

    return api;
}());