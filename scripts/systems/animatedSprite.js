MyGame.systems.AnimatedSprite = (function() {
  'use strict';

  function updateAnimatedSprite(elapsedTime, entity) {
    let animatedSprite = entity.components.animatedSprite;
    animatedSprite.animationTime += elapsedTime;

    if (animatedSprite.animationTime >= animatedSprite.spriteTime[animatedSprite.sprite]) {
      animatedSprite.animationTime -= animatedSprite.spriteTime[animatedSprite.sprite];
      animatedSprite.sprite += 1;
      animatedSprite.sprite = animatedSprite.sprite % animatedSprite.spriteCount;
    }
  }

  function update(elapsedTime, entities) {
    let relevantEntities = entities.filter((e) => e.components.animatedSprite && e.components.position);
    for (let i = 0; i < relevantEntities.length; i++) {
      updateAnimatedSprite(elapsedTime, relevantEntities[i]);
    }
  }

  return {
    update
  };
}());