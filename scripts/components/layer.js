MyGame.components.Layer = function(layer) {
  'use strict';
  let that = {
    get name() { return 'layer'; },
    get value() {return layer; },
  }

  return that;
}