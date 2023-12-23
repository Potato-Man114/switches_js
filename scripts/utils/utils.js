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

  //Note: this will return undefined if click is not on the canvas.
  that.viewPortPositionToPixelPosition = function(viewPortPosition) {
    let pixelPosition = {
      x: viewPortPosition.x - (MyGame.graphics.boudingRect.left + (MyGame.graphics.boudingRect.width - MyGame.graphics.clientWidth) / 2),
      y: viewPortPosition.y - (MyGame.graphics.boudingRect.top + (MyGame.graphics.boudingRect.height - MyGame.graphics.clientHeight) / 2),
    }
    pixelPosition.x = (pixelPosition.x / MyGame.graphics.clientWidth) * MyGame.graphics.width;
    pixelPosition.y = (pixelPosition.y / MyGame.graphics.clientHeight) * MyGame.graphics.height;

    if (pixelPosition.x < 0 || pixelPosition.x > MyGame.graphics.width || pixelPosition.y < 0 || pixelPosition.y > MyGame.graphics.height) {
      return undefined;
    }

    return pixelPosition;
  }

  that.pixelPositionToGridPosition = function(position, gridSize) {
    if (position == undefined) {
      return undefined;
    }
    let gridPosition = {
      x: Math.floor(position.x / (MyGame.graphics.width / gridSize.x)),
      y: Math.floor(position.y / (MyGame.graphics.height / gridSize.y)),
    }
    return gridPosition;
  }

  return that;
}())