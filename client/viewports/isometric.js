'use strict';

class IsometricViewport extends BaseViewport {

    constructor(canvas, world, inputHandler, width, height)  {
        super(canvas, world, inputHandler, width, height);

        this.keyInputStepSize = 20;
        this.mouseDragStart = null;

        this.tileWidth = 64;
        this.tileHeight = 32;
    }

    processUserInput() {
        if (this.inputHandler.isKeyPressed(this.inputHandler.KEY_UP))
            this.viewPositionY += this.keyInputStepSize;

        if (this.inputHandler.isKeyPressed(this.inputHandler.KEY_DOWN))
            this.viewPositionY -= this.keyInputStepSize;

        if (this.inputHandler.isKeyPressed(this.inputHandler.KEY_LEFT))
            this.viewPositionX += this.keyInputStepSize;

        if (this.inputHandler.isKeyPressed(this.inputHandler.KEY_RIGHT))
            this.viewPositionX -= this.keyInputStepSize;

        if (this.inputHandler.isMouseDragging()) {
            if (!this.mouseDragStart) {
                this.mouseDragStart = {
                    'x': this.viewPositionX,
                    'y': this.viewPositionY
                };
            }

            // console.log(
            //     this.screenToGrid(
            //         this.inputHandler.mousePosition().x,
            //         this.inputHandler.mousePosition().y
            //     )
            // );

            let mouseDragOffset = this.inputHandler.mouseDragOffset();

            this.viewPositionX = this.mouseDragStart.x - mouseDragOffset.x;
            this.viewPositionY = this.mouseDragStart.y - mouseDragOffset.y;
        }
        else {
            this.mouseDragStart = null;
        }
    }

    screenToGrid(posX, posY) {
        posX -= this.windowPositionX + this.viewPositionX + (this.width / 2);
        posY -= this.windowPositionY + this.viewPositionY + (this.height / 2);

        let gridX = (posX / this.tileWidth) - (posY / this.tileHeight),
            gridY = (posY / this.tileHeight) + (posX / this.tileWidth);

        return {
            'x': gridX + 0.5,
            'y': gridY - 0.5
        };
    }

    gridToScreen(gridX, gridY) {
        let posX = ((gridX * this.tileWidth) / 2) + ((gridY * this.tileWidth) / 2),
            posY = ((gridY * this.tileHeight) / 2) - ((gridX * this.tileHeight) / 2);

        return {
            'x': posX + this.windowPositionX + this.viewPositionX + (this.width / 2),
            'y': posY + this.windowPositionY + this.viewPositionY + (this.height / 2)
        };
    }

    gameGridBoundary(margin) {
        let minY = this.screenToGrid(0, 0).y,
            maxY = this.screenToGrid(this.width, this.height).y,
            minX = this.screenToGrid(0, this.height).x,
            maxX = this.screenToGrid(this.width, 0).x;

        minY -= margin;
        maxY += margin;
        minX -= margin;
        maxX += margin;

        return {
            'xMin': Math.min(Math.max(parseInt(minX), 0), this.world.width),
            'xMax': Math.min(Math.max(parseInt(maxX), 0), this.world.width),
            'yMin': Math.min(Math.max(parseInt(minY), 0), this.world.height),
            'yMax': Math.min(Math.max(parseInt(maxY), 0), this.world.height)
        }
    }

    render() {
        this.processUserInput();

        this.context.clearRect(0, 0, this.width, this.height);

        let gridX, gridY, posX, posY, gamePosition, tile,
            gridBoundary = this.gameGridBoundary(1);

        for (gridY = gridBoundary.yMin; gridY < gridBoundary.yMax; gridY++) {
            for (gridX = gridBoundary.xMax - 1; gridX >= gridBoundary.xMin; gridX--) {
                tile = this.world.map[gridY * this.world.width + gridX];
                gamePosition = this.gridToScreen(gridX, gridY);

                this.renderTile(this.context, tile, gamePosition.x, gamePosition.y);
            }
        }
    }

    renderTile(context, tile, x, y) {
        context.drawImage(tile.image, x, y);
    }
}
