"use strict";

class World {
    constructor() {
        this.width = 30, this.height = 30;
        this.map = this.generateMap(this.width, this.height);
        this.map[0].entities.push(new CampFire());
    }

    // tmp method for debugging purposes
    generateMap(width, height) {
        let map = [],
            tileClass,
            tileClasses = [
                GrassTile,
                SandTile,
            ];

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                tileClass = tileClasses[Math.floor(Math.random()*tileClasses.length)];
                map.push(new tileClass());
            }
        }

        map[0].entities.push(new CampFire());

        return map;
    }
}
