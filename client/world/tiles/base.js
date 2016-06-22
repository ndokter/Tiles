'use strict';

class BaseTile {
    constructor() {
        this.tileWidth = 64;
        this.tileHeight = 32;

        this.imageWidth = 64;
        this.imageHeight = 44;

        this.imageOffsetX = 0;
        this.imageOffsetY = -12;

        this.image = new Image();
    }
}
