'use strict';

class SimpleTopViewport extends BaseViewport {

    constructor(canvas, world, inputHandler, width, height)  {
        super(canvas, world, inputHandler, width, height);

        this.tileScale = 0.1;
        this.context.fillStyle = '#ccc';
    }

    render() {
        this.context.fillRect(this.windowPositionX, this.windowPositionY, this.width, this.height);

        let gridX, gridY, posX, posY, tile, tileWidth, tileHeight;

        for (gridY = 0; gridY < this.world.height; gridY++) {
            for (gridX = this.world.width - 1; gridX >= 0; gridX--) {
                tile = this.world.map[gridY * this.world.width + gridX];

                tileWidth = (tile.imageWidth + tile.imageOffsetX) * this.tileScale;
                tileHeight = (tile.imageHeight + tile.imageOffsetY) * this.tileScale;

                posX = (gridX * tileWidth / 2) + (gridY * tileWidth / 2);
                posY = (gridY * tileHeight / 2) - (gridX * tileHeight / 2);

                // TODO nice solution to apply offset?
                posX += this.windowPositionX;
                posY += this.windowPositionY;

                posX += this.tileScale * this.viewPositionX;
                posY += this.tileScale * this.viewPositionY;

                // TODO perform boundary check up front?
                if (this.viewBoundaryCheck(posX + (tileWidth / 2), posY + (tileHeight / 2), 0, 0)) {
                    this.context.drawImage(tile.image, posX, posY, tileWidth, tileHeight);
                }
            }
        }
    }
}
