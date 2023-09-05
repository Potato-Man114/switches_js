MyGame.systems.RenderAnimatedSprite = (function(graphics) {
  'use strict';

  function update(elapsedTime, entities) {
    let relevantEntities = entities.filter((e) => e.components.animatedSprite && e.components.position);
    for (let i = 0; i < relevantEntities.length; i++) {
      let entity = relevantEntities[i];
      let animatedSprite = entity.components.animatedSprite;
        MyGame.graphics.drawSubTexture(
          animatedSprite.spriteSheet,
          animatedSprite.sprite,
          animatedSprite.pixelWidth,
          animatedSprite.center,
          0, //no rotations in this game
          {
            x: animatedSprite.width,
            y: animatedSprite.height
          },
        );
    }
  }

  return {
    update
  };
}(MyGame.graphics));