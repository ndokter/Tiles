'use strict';

class Sprite {
    constructor(image, numberOfFrames, animationSpeed, width, height, offsetX, offsetY) {
        this.image = image;

        this.width = width;
        this.height = height;

        this.offsetX = offsetX;
        this.offsetY = offsetY;

        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = animationSpeed;
        this.numberOfFrames = numberOfFrames;
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
