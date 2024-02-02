MyGame.particleSystems = [];

/**
 * spec: {
 *  center: {x, y},
 *  size: {mean, stdev},
 *  speed: {mean, stdev},
 *  lifetime: {mean, stdev},
 *  images: [MyGame.assets[<something>], ...],
 *  count: number
 *  borderDimensions: {width, height} // optional depending on 'placement' value
 * },
 * placement: MyGame.constants.ParticleEffectPlacements,
 */
MyGame.utils.ParticleSystem = function(spec, placement) {
    'use strict';
    let nextId = 0;

    let particles = [];

    let that = {
        get particles() { return particles },
    };

    function create(center, image) {
        let size = MyGame.utils.Random.nextGaussian(spec.size.mean, spec.size.stdev);
        let p = {
            center, 
            size: {width: size, height: size},
            direction: MyGame.utils.Random.nextCircleVector(),
            speed: MyGame.utils.Random.nextGaussian(spec.speed.mean, spec.speed.stdev),
            rotation: MyGame.utils.Random.nextDouble(0, 360),
            lifetime: MyGame.utils.Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev),
            alive: 0,
            image: image
        }
        return p;
    }

    function initialize() {
        particles.length += spec.count;
        switch (placement) {
            case MyGame.constants.ParticleEffectPlacements.centered:
                for (let i = 0; i < spec.count; i++) {
                    particles[nextId++] = create(_.clone(spec.center), spec.images[MyGame.utils.Random.nextRange(0, spec.images.length - 1)]);
                }
                break;
            case MyGame.constants.ParticleEffectPlacements.circularArea:
                for (let i = 0; i < spec.count; i++) {
                    let vector = MyGame.utils.Random.nextCircleVector();
                    let center = {
                        x: spec.center.x + (vector.x * MyGame.utils.Random.nextRange(1, spec.radius)),
                        y: spec.center.y + (vector.y * MyGame.utils.Random.nextRange(1, spec.radius)),
                    };
                    particles[nextId++] = create(center, spec.images[MyGame.utils.Random.nextRange(0, spec.images.length)]);
                }
            case MyGame.constants.ParticleEffectPlacements.rectBorder:
                for (let i = 0; i < spec.count; i++) {
                    let center = {x: 0, y: 0};
                    switch (MyGame.utils.Random.nextRange(0, 4)) {
                        case 0:
                        //top
                        center.x = spec.center.x + (MyGame.utils.Random.nextDouble(-(spec.borderDimensions.width / 2), spec.borderDimensions.width / 2));
                        center.y = spec.center.y - spec.borderDimensions.height / 2;
                        break;
                        case 1:
                        //bottom
                        center.x = spec.center.x + (MyGame.utils.Random.nextDouble(-(spec.borderDimensions.width / 2), spec.borderDimensions.width / 2));
                        center.y = spec.center.y + spec.borderDimensions.height / 2;
                        break;
                        case 2:
                        //left
                        center.x = spec.center.x - spec.borderDimensions.width / 2;
                        center.y = spec.center.y + (MyGame.utils.Random.nextDouble(-(spec.borderDimensions.height / 2), spec.borderDimensions.height / 2));
                        break;
                        case 3:
                        //right
                        center.x = spec.center.x + spec.borderDimensions.width / 2;
                        center.y = spec.center.y + (MyGame.utils.Random.nextDouble(-(spec.borderDimensions.height / 2), spec.borderDimensions.height / 2));
                        break;
                    }
                    particles[nextId++] = create(center, spec.images[MyGame.utils.Random.nextRange(0, spec.images.length)]);
                }
                break;
            case MyGame.constants.ParticleEffectPlacements.rectArea:
                for (let i = 0; i < spec.count; i++) {
                    let center = {
                      x: spec.center.x + (MyGame.utils.Random.nextDouble(-(spec.rectDimensions.width / 2), spec.rectDimensions.width / 2)),
                      y: spec.center.y + (MyGame.utils.Random.nextDouble(-(spec.rectDimensions.height / 2), spec.rectDimensions.height / 2)),
                    }
                    particles[nextId++] = create(center, spec.images[MyGame.utils.Random.nextRange(0, spec.images.length)]);
                }
                break;
            default:
                //nothing.
        }
    }

    that.clear = function() {
        nextId = 0;
        particles.length = 0;
    }

    that.update = function(elapsedTime) {
        let removeMe = [];

        let elapsedSeconds = elapsedTime / 1000;
    
        for (let p = 0; p < particles.length; p++) {
          let particle = particles[p];
    
          particle.alive += elapsedSeconds;
    
          particle.center.x += (elapsedSeconds * particle.speed * particle.direction.x);
          particle.center.y += (elapsedSeconds * particle.speed * particle.direction.y);
    
          if (particle.alive > particle.lifetime) {
            removeMe.push(p);
          }
        }
    
        for (let i = 0; i < removeMe.length; i++) {
          particles.splice(particles.findIndex((particle) => removeMe[i] == particle), 1);
        }
    
        nextId -= removeMe.length;
        removeMe.length = 0;
    }

    that.isDone = function() {
        return particles.length == 0;
    }

    initialize();
    return that;
}

MyGame.utils.ParticleSystemFactory = (function() {
    'use strict';

    let that = {};
    
    that.activateSwitchEffect = function(positions, gridSize) {

    }

    that.deactivateSwitchEffect = function(positions, gridSize) {

    }
    
    that.createWinEffect = function(positions, gridSize) {
        let systems = [];
        for (let position of positions) {
            systems.push(
                MyGame.utils.ParticleSystem(
                    {
                        center: MyGame.utils.misc.gridPositionToPixelPosition(position, gridSize).center,
                        size: {mean: 5, stdev: 2},
                        speed: {mean: 300, stdev: 30},
                        lifetime: {mean: 3, stdev: 0.25},
                        images: [
                        MyGame.assets['blue-particle'],
                        MyGame.assets['red-particle'],
                        MyGame.assets['yellow-particle'],
                        MyGame.assets['purple-particle'],
                        MyGame.assets['green-particle'],
                        ],
                        count: 250,
                        rectDimensions: MyGame.utils.misc.getSpriteSize(gridSize),
                    }, 
                MyGame.constants.ParticleEffectPlacements.rectArea
                )
            );
        }
        return systems;
    }

    return that;
}());