MyGame.components.AnimatedSprite = function(spec) {
  'use strict';
  let that = {
    get name() {return "animatedSprite"; },
    get spriteSheet() { return spec.spriteSheet; },
    get pixelWidth() { return spec.spriteSheet.width / spec.spriteCount; },
    get pixelHeight() { return spec.spriteSheet.height; },
    get width() { return spec.spriteSize.width; },
    get height() { return spec.spriteSize.height; },
    get center() { return spec.spriteCenter; },
    set center(center) {spec.spriteCenter = center; },
    get sprite() { return spec.sprite; }, // index of the sprite to show
    set sprite(sprite) {spec.sprite = sprite},
    get animationTime() {return spec.animationTime},
    set animationTime(time) { spec.animationTime = time},
    get spriteTime() { return spec.spriteTime},
    get spriteCount() { return spec.spriteCount },
  };
  
  spec.sprite = 0;
  spec.animationTime = 0;

  return that;
}