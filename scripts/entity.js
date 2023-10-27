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
}());

let EntityFactory = (function() {
    'use scrict';
    let api = {};


    //Factory for easy creation of many different entities. May separate into differnt file later.

    api.createNormalSwitch = (status) => {
        //TODO: this
    }

    return api;
})