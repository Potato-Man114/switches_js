//TODO: this is a direct copy from BBIY; see if any performance gains can be made.

MyGame.systems.RenderParticleSystem = (function(graphics) {
    'use strict';

    function update(elapsedTime, particleSystems) {
        let toBeDeleted = [];
        for (let i = 0; i < particleSystems.length; i++) {
            particleSystems[i].update(elapsedTime);
            if (particleSystems[i].isDone()) {
                toBeDeleted.push(particleSystems[i]);
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
        for (let i = 0; i < toBeDeleted.length; i++) {
            particleSystems.splice(particleSystems.findIndex((system) => toBeDeleted[i] == system), 1);
        }
    }

    return {
        update
    }

}(MyGame.graphics))