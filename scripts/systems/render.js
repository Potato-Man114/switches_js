//this system delegates to other systems for rendering. 
//The idea is that the game model only needs to call this system's update to show everything on the screen.
MyGame.systems.Render = (function(graphics) { 
    'use strict';
  
    // function sortLayer(a, b) {
    //   let layerA = 0;
    //   let layerB = 0;
    //   if (a.components.layer) {
    //     layerA = a.components.layer.value
    //   }
    //   if (b.components.layer) {
    //     layerB = b.components.layer.value
    //   }
  
    //   return layerA - layerB;
    // }
  
    // function sortEntitiesByLayer(entities) {
    //   entities.sort(sortLayer);
    // }

    function update(elapsedTime, entities) {
      MyGame.graphics.clear();
      MyGame.render.background(graphics);
      
    //   sortEntitiesByLayer(entities);
  
    //   MyGame.systems.RenderAnimatedSprite.update(elapsedTime, entities);
      MyGame.systems.RenderSprite.update(elapsedTime, entities);
      MyGame.systems.RenderParticleSystem.update(elapsedTime, MyGame.particleSystems);
    }

    return {
      update,
    };
  }(MyGame.graphics))