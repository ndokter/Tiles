'use strict';

class IsometricViewport extends BaseViewport {

    constructor(canvas, world, inputHandler, width, height)  {
        super(canvas, world, inputHandler, width, height);

        this.EVENT_TILE_HOVER = 1;  // todo

        this.keyInputStepSize = 0.4;
        this.mouseDragStart = null;

        this.tileWidth = 64;
        this.tileHeight = 32;

        this.events = new EventManager();
    }

    // TODO move this to Game?
    processUserInput() {
        if (this.inputHandler === undefined)
            return;

        if (this.inputHandler.isKeyPressed(this.inputHandler.KEY_UP)) {
            this.gridPosition.y -= this.keyInputStepSize * 2;
            this.gridPosition.x += this.keyInputStepSize * 2;
        }
        if (this.inputHandler.isKeyPressed(this.inputHandler.KEY_DOWN)) {
            this.gridPosition.y += this.keyInputStepSize * 2;
            this.gridPosition.x -= this.keyInputStepSize * 2;
        }
        if (this.inputHandler.isKeyPressed(this.inputHandler.KEY_LEFT)) {
            this.gridPosition.x -= this.keyInputStepSize;
            this.gridPosition.y -= this.keyInputStepSize;
        }
        if (this.inputHandler.isKeyPressed(this.inputHandler.KEY_RIGHT)) {
            this.gridPosition.x += this.keyInputStepSize;
            this.gridPosition.y += this.keyInputStepSize;
        }
        if (this.inputHandler.isMouseDragging()) {
            if (!this.mouseDragStart) {
                this.mouseDragStart = this.gridPosition;
            }

            let mouseDragOffset = this.inputHandler.mouseDragOffset();

            // Convert back to pixels so the mouse drag offset can be applied
            let mouseDragStartPosition = this.gridToScreen(
                this.mouseDragStart.x,
                this.mouseDragStart.y
            );

            // Calculate the updated pixel position becomes the new grid position
            this.gridPosition = this.screenToGrid(
                mouseDragStartPosition.x + mouseDragOffset.x,
                mouseDragStartPosition.y + mouseDragOffset.y
            );
        }
        else {
            this.mouseDragStart = null;
        }
    }

    screenToGrid(posX, posY) {
        posX -= this.windowPositionX + (this.width / 2);
        posY -= this.windowPositionY + (this.height / 2);

        let gridX = (posX / this.tileWidth) - (posY / this.tileHeight),
            gridY = (posY / this.tileHeight) + (posX / this.tileWidth);

        return {
            'x': gridX + this.gridPosition.x,
            'y': gridY + this.gridPosition.y
        };
    }

    gridToScreen(gridX, gridY) {
        gridX -= this.gridPosition.x;
        gridY -= this.gridPosition.y;

        let posX = ((gridX * this.tileWidth) / 2) + ((gridY * this.tileWidth) / 2),
            posY = ((gridY * this.tileHeight) / 2) - ((gridX * this.tileHeight) / 2);

        // Adjust for tiles being 'rotated'
        posY -= this.tileHeight / 2;

        return {
            'x': posX + this.windowPositionX + (this.width / 2),
            'y': posY + this.windowPositionY + (this.height / 2)
        };
    }

    gameGridBoundary(margin) {
        let minY = this.screenToGrid(this.windowPositionX, this.windowPositionY).y,
            maxY = this.screenToGrid(this.windowPositionX + this.width, this.windowPositionY + this.height).y,
            minX = this.screenToGrid(this.windowPositionX, this.windowPositionY + this.height).x,
            maxX = this.screenToGrid(this.windowPositionX + this.width, this.windowPositionY).x;

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

        this.context.fillStyle = '#ffffff';
        this.context.clearRect(this.windowPositionX, this.windowPositionY, this.width, this.height);

        let gridX, gridY, screenPosition, tile, gridBoundary = this.gameGridBoundary(1);
               
        for (gridY = gridBoundary.yMin; gridY < gridBoundary.yMax; gridY++) {
            for (gridX = gridBoundary.xMax - 1; gridX >= gridBoundary.xMin; gridX--) {
                tile = this.world.map[gridY * this.world.width + gridX];

                screenPosition = this.gridToScreen(gridX, gridY);

                tile.render(this.context, screenPosition.x, screenPosition.y);
            }
        }

        this.renderTileHover(gridBoundary);
    }

    renderTileHover(gridBoundary) {
        let mousePosition = this.inputHandler.mousePosition(),
            gridPos = this.screenToGrid(mousePosition.x, mousePosition.y);
            //screenPos = this.gridToScreen(parseInt(gridPos.x), parseInt(gridPos.y));
        
        if (gridPos.x > gridBoundary.xMin && gridPos.x < gridBoundary.xMax 
                && gridPos.y > gridBoundary.yMin && gridPos.y < gridBoundary.yMax) {
            let tile = this.world.map[parseInt(gridPos.y) * this.world.width + parseInt(gridPos.x)];

            this.events.notify(this.EVENT_TILE_HOVER, tile);
        }
    }
}
