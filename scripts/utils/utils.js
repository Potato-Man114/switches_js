//miscelaneous utility functions.
MyGame.utils = (function() {

  let that = {};

  that.gridPositionToPixelPosition = function(position, gridSize) {
    let gridPosition = {
      topLeft: {
        x: (MyGame.graphics.width / gridSize.x) * position.x,
        y: (MyGame.graphics.height / gridSize.y) * position.y,
      },
      center: {
        x: ((MyGame.graphics.width / gridSize.x) * position.x) + (MyGame.graphics.width / gridSize.x) / 2,
        y: ((MyGame.graphics.height / gridSize.y) * position.y) + (MyGame.graphics.height / gridSize.y) / 2,
      },
    };
    return gridPosition;
  }

  that.getSpriteSize = function(gridSize) {
    let spriteSize = {
      width: MyGame.graphics.width / gridSize.x,
      height: MyGame.graphics.height / gridSize.y,
    };
    return spriteSize;
  }

  return that;
}())