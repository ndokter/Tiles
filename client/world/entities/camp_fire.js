'use strict';

class Fire {
    constructor() {
        this.sprite = new Sprite(
            'assets/entities/camp_fire.png',
            5,
            64,
            64,
            0,
            -40
        );
    }

    render(context, screenPositionX, screenPositionY) {
        this.sprite.render(context, screenPositionX, screenPositionY);
    }
}
