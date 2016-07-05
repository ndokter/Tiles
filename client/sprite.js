'use strict';

class Sprite {
    constructor(path, frames, width, height, offsetX, offsetY) {
        this.image = new Image();
        this.image.src = path;

        this.width = width;
        this.height = height;

        this.offsetX = offsetX;
        this.offsetY = offsetY;

        this.frameIndex = 0,
        this.tickCount = 0,
        this.ticksPerFrame = 7,
        this.numberOfFrames = 5;
    }

    update() {
        this.tickCount += 1;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;

            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex += 1;
            } else {
                this.frameIndex = 0;
            }
        }
    };

    render(context, screenPositionX, screenPositionY) {
        this.update();

        screenPositionX += this.offsetX;
        screenPositionY += this.offsetY;

        context.drawImage(
            this.image,
            this.width * this.frameIndex,
            0,
            this.width,
            this.height,
            screenPositionX,
            screenPositionY,
            this.width,
            this.height
        );
    }
}
