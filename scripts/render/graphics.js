MyGame.graphics = (function() {
  'use strict';

  let that = {};
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');

  CanvasRenderingContext2D.prototype.clear = function() {
    this.save();
    this.setTransform(1, 0, 0, 1, 0, 0);
    this.clearRect(0, 0, canvas.clientWidth, canvas.height);
    this.restore();
  };

  that.clear = function() {
    context.clear();
  };

  that.saveContext = function() {
    context.save();
  }

  that.restoreContext = function() {
    context.restore();
  }

  /**
   * 
   * @param {x: number, y: number} center 
   * @param {number} rotation 
   */
  that.rotateCanvas = function(center, rotation) {
    context.translate(center.x * canvas.width, center.y * canvas.width);
    context.rotate(rotation);
    context.translate(-center.x * canvas.width, -center.y * canvas.width);
  };

  /**
   * 
   * @param {x: number, y: number} corner 
   * @param {number} width 
   * @param {number} height 
   * @param {string?} fill 
   * @param {string?} stroke 
   */
  that.drawRect = function(corner, width, height, fill, stroke) {
    if (fill) {
      context.fillStyle = fill;
      context.fillRect(corner.x, corner.y, width, height);
    }
    if (stroke) {
      context.strokeStyle = stroke;
      context.strokeRect(corner.x, corner.y, width, height);
    }
  };

  /**
   * 
   * @param {x: number, y: number} corner 
   * @param {number} size 
   * @param {string?} fill 
   * @param {string?} stroke 
   */
  that.drawSquare = function(corner, size, fill, stroke) {
    that.drawRect(corner, size, size, fill, stroke);
  };

  //from class slides
  /**
   * 
   * @param {
   * ready: bool,
   * center: {x: number, y: number},
   * rotation: number,
   * image: image,
   * width: number,
   * height: number
   * } texture 
   */
  that.drawTexture = function(texture) {
    if (texture.ready) {
      context.save();
      
      context.translate(texture.center.x, texture.center.y);
      context.rotate(texture.rotation);
      context.translate(-texture.center.x, -texture.center.y);
      context.drawImage(
        texture.image,
        texture.center.x - texture.width / 2,
        texture.center.y - texture.height / 2,
        texture.width,
        texture.height
        );
      context.restore();
      }
  }

  /**
   * 
   * @param {Image} image 
   * @param {number} index 
   * @param {number} subTextureWidth 
   * @param {x: number, y: number} center 
   * @param {number} rotation: radians
   * @param {x: number, y: number} size 
   */
  that.drawSubTexture = function(image, index, subTextureWidth, center, rotation, size) {
    that.saveContext();

    that.rotateCanvas(center, rotation);

    context.drawImage(
      image,
      subTextureWidth * index, 0,
      subTextureWidth, image.height,
      center.x - size.x / 2,
      center.y - size.y / 2,
      size.x, size.y
    );

    that.restoreContext();
  }
  
  /**
   * 
   * @param {x: number, y: number} center 
   * @param {number} radius 
   * @param {number} start 
   * @param {number} end 
   * @param {number?} lineWidth 
   * @param {string?} stroke 
   * @param {string?} fill 
   */
  that.drawArc = function(center, radius, start, end, lineWidth, stroke, fill) {
    context.strokeStyle = stroke;
    if (fill) {
      context.fillStyle = fill;
    }
    if (lineWidth) {
      context.lineWidth = lineWidth;
    }
    context.beginPath();
    context.arc(
      center.x,
      center.y,
      radius,
      start,
      end
    );
    if (fill) {
      context.fill();
    }
    if (stroke) {
      context.stroke();
    }
    context.closePath();
  };

  /**
    * 
    * @param {x: number, y: number} center 
    * @param {number} radius 
    * @param {number?} lineWidth 
    * @param {string?} stroke 
    * @param {string?} fill 
    */
  that.drawCircle = function(center, radius, lineWidth, stroke, fill) {
    that.drawArc(
      center,
      radius,
      0,
      2 * Math.PI,
      lineWidth,
      stroke,
      fill
    );
  };

  that.measureTextWidth = function(spec) {
    context.save();

    context.font = spec.font;
    context.fillStyle = spec.fill;
    if (spec.hasOwnProperty('stroke')) {
      context.strokeStyle = spec.stroke;
    }
    var width = context.measureText(spec.text).width;

    context.restore();

    return width;
  }

  that.measureTextHeight = function(spec) {
    let saveText = spec.text;

    spec.text = 'm';    // Clever trick to get font height
    context.save();

    context.font = spec.font;
    context.fillStyle = spec.fill;
    if (spec.hasOwnProperty('stroke')) {
      context.strokeStyle = spec.stroke;
    }
    let width = context.measureText(spec.text).width;
    spec.text = saveText;

    context.restore();

    return width;
  }

  that.drawText = function(spec) {
    context.save();

    context.font = spec.font,
    context.fillStyle = spec.fill;
    if (spec.hasOwnProperty('stroke')) {
        context.strokeStyle = spec.stroke;
    }
    context.textBaseline = 'top';

    context.fillText(spec.text, spec.position.x, spec.position.y);
    context.strokeText(spec.text, spec.position.x, spec.position.y);

    context.restore();
}

  Object.defineProperty(that, 'width', {
    get: () => canvas.width
  });

  Object.defineProperty(that, 'height', {
    get: () => canvas.height
  });

  return that;
}());