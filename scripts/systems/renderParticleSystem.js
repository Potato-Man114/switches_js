MyGame.systems.RenderParticleSystem = (function(graphics) {
  'use strict';

  function update(elapsedTime, particleSystems) {
    let removeMe = [];
    for (let i = 0; i < particleSystems.length; i++) {
      particleSystems[i].update(elapsedTime);
      if (particleSystems[i].done()) {
        removeMe.push(particleSystems[i]);
      }
      for (let p = 0; p < particleSystems[i].particles.length; p++) {
        let particle = particleSystems[i].particles[p];
        graphics.drawTexture(
          {
            ready: true,
            image: particle.image, 
            center: particle.center, 
            rotation: particle.rotation, 
            width: particle.size.width,
            height: particle.size.height
          }
        );
      }
    }
    for (let i = 0; i < removeMe.length; i++) {
      particleSystems.splice(particleSystems.findIndex((system) => removeMe[i] == system), 1);
    }
  }

  return {
    update
  }
}(MyGame.graphics))