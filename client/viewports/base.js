'use strict';

class BaseViewport {
    constructor(canvas, world, inputHandler, width, height) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.world = world;
        this.inputHandler = inputHandler;
        this.width = width;
        this.height = height;

        this.windowPositionX = 0;
        this.windowPositionY = 0;

        this.viewPositionX = 0;
        this.viewPositionY = 0;
    }

    viewBoundaryCheck(x, y, marginX, marginY) {
        return x + marginX > this.windowPositionX
               && x - marginX < this.windowPositionX + this.width
               && y + marginY > this.windowPositionY
               && y - marginY < this.windowPositionY + this.height;
    }

    render() {}
}
