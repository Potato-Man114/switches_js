MyGame.components.Goal = function(sprite_spec) {
    'use strict';

    let that = {
        get name() { return 'goal'; },
        sprite: {
            get ready() { return sprite_spec.ready; },
            get image() { return sprite_spec.image; },
            get pixelWidth() { return sprite_spec.image.width; },
            get pixelHeight() { return sprite_spec.image.height; },
            get width() { return sprite_spec.spriteSize.width; },
            get height() { return sprite_spec.spriteSize.height; },
            get center() { return sprite_spec.spriteCenter; },
            set center(center) { sprite_spec.spriteCenter = center; },
            get rotation() { return sprite_spec.rotation},
            set rotation(rotation) { sprite_spec.rotation = rotation; },
        }
    };

    return that;
}