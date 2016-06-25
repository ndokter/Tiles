'use strict';

class SimpleIsometricViewport extends IsometricViewport {

    constructor(canvas, world, inputHandler, width, height)  {
        super(canvas, world, inputHandler, width, height);

        this.tileWidth = 8;
        this.tileHeight = 4;
    }


    render() {
        this.context.fillStyle = '#eeeeee';
        this.context.fillRect(this.windowPositionX, this.windowPositionY, this.width, this.height);

        let gridX, gridY, posX, posY, gamePosition, tile,
            gridBoundary = this.gameGridBoundary(1);

        for (gridY = gridBoundary.yMin; gridY < gridBoundary.yMax; gridY++) {
            for (gridX = gridBoundary.xMax - 1; gridX >= gridBoundary.xMin; gridX--) {
                tile = this.world.map[gridY * this.world.width + gridX];
                gamePosition = this.gridToScreen(gridX, gridY);

                this.context.fillStyle = tile.imageColorCode;
                this.context.fillRect(gamePosition.x, gamePosition.y, this.tileWidth, this.tileHeight);
            }
        }
    }
}
