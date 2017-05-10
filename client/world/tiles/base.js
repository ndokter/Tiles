'use strict';

class BaseTile {
    constructor() {
        this.tileWidth = 64;
        this.tileHeight = 32;

        this.offsetX = 0;
        this.offsetY = 0;

        this.image;
        this.entities = [];
    }

    render(context, screenPositionX, screenPositionY) {
        context.drawImage(this.image, screenPositionX, screenPositionY);

        for (let entity of this.entities) {
            entity.render(context, screenPositionX, screenPositionY);
        }
    }

    renderSelected(context, screenPositionX, screenPositionY) {
        context.beginPath();
        context.rect(screenPos.x + 32 - 5, screenPos.y + 16 - 5, 10, 10);
        context.stroke();
        context.closePath();      
    }
}
