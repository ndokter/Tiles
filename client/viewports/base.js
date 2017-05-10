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

        this.gridPosition = {'x': 0, 'y': 0};
    }

    render() {}

    renderSelected() {}
}
