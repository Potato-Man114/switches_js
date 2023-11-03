MyGame.components.Sprite = function(spec) {
    let that = {
        get name() { return 'sprite'; },
        get ready() { return spec.ready; },
        get image() { return spec.image; },
        get pixelWidth() { return spec.image.width; },
        get pixelHeight() { return spec.image.height; },
        get width() { return spec.spriteSize.width; },
        get height() { return spec.spriteSize.height; },
        get center() { return spec.spriteCenter; },
        set center(center) { spec.spriteCenter = center; },
        get rotation() { return spec.rotation},
        set rotation(rotation) { spec.rotation = rotation; },
    };

    return that;
}