MyGame.utils.Random = (function() {
  'use strict';

  let that = {};

  that.nextCircleVector = function() {
    let angle = Math.random() * 2 * Math.PI;
    return {
        x: Math.cos(angle),
        y: Math.sin(angle)
    };
  }

  that.nextRange = function(min, max) {
    let range = max - min;
    return Math.floor((Math.random() * range) + min);
  }

  that.nextDouble = function(min, max) {
    let range = max - min;
    return (Math.random() * range) + min;
  }

  // This is used to give a small performance optimization in generating gaussian random numbers.
  let usePrevious = false;
  let y2;

  that.nextGaussian = function(mean, stdDev) {
      let x1 = 0;
      let x2 = 0;
      let y1 = 0;
      let z = 0;

      if (usePrevious) {
          usePrevious = false;
          return mean + y2 * stdDev;
      }

      usePrevious = true;

      do {
          x1 = 2 * Math.random() - 1;
          x2 = 2 * Math.random() - 1;
          z = (x1 * x1) + (x2 * x2);
      } while (z >= 1);
      
      z = Math.sqrt((-2 * Math.log(z)) / z);
      y1 = x1 * z;
      y2 = x2 * z;
      
      return mean + y1 * stdDev;
  }

  return that;
}());