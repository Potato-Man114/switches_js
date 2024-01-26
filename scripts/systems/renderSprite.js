MyGame.systems.RenderSprite = (function(graphics) {
    'use strict';
  
    function renderEntities(entities) {
      let relevantEntities = entities.filter((e) => e.components.sprite && e.components.position);
  
      for (let id in relevantEntities) {
        graphics.drawTexture(relevantEntities[id].components.sprite);
      }
    }

    function renderGoalSprites(entities) {
      let relevantEntities = entities.filter((e) => e.components.position && e.components.goal && e.components.goal.sprite);

      for (let id in relevantEntities) {
        graphics.drawTexture(relevantEntities[id].components.goal.sprite);
      }
    }
  
    function update(elapsedTime, entities) {
      renderEntities(entities);    
      renderGoalSprites(entities);
    }
  
    return {
      update
    }
  
  
  }(MyGame.graphics));