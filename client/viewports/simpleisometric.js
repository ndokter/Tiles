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

        let gridX, gridY, posX, posY, tile,
            gridBoundary = this.gameGridBoundary(0);

        for (gridY = gridBoundary.yMin; gridY < gridBoundary.yMax; gridY++) {
            for (gridX = gridBoundary.xMax - 1; gridX >= gridBoundary.xMin; gridX--) {
                tile = this.world.map[gridY * this.world.width + gridX];

                this.renderTile(tile, gridX, gridY);
            }
        }
    }

    renderTile(tile, gridX, gridY) {
        let screenPosition = this.gridToScreen(gridX, gridY);

        this.context.fillStyle = tile.imageColorCode;
        this.context.fillRect(screenPosition.x, screenPosition.y, this.tileWidth, this.tileHeight);
    }
}
