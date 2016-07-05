'use strict';

class BaseTile {
    constructor() {
        this.tileWidth = 64;
        this.tileHeight = 32;

        this.image = new Image();

        this.entities = [];
    }

    render(context, screenPositionX, screenPositionY) {
        context.drawImage(this.image, screenPositionX, screenPositionY);

        for (let entity of this.entities) {
            entity.render(context, screenPositionX, screenPositionY);
        }
    }
}
