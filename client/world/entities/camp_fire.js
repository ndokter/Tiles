'use strict';

class CampFire {
    constructor() {
        this.sprite = new Sprite(
            resources.get('assets/64/entities/camp_fire.png'),
            5,
            6,
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
