"use strict";

class World {
    constructor() {
        this.width = 80, this.height = 80;
        this.map = this.generateMap(this.width, this.height);
    }

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

        return map;
    }
}














// let x, y, tile;
// Single loop
// for (let i = 0; i < this.mapWidth * this.mapHeight; i++) {
//     y = Math.floor(i / this.mapWidth);
//     x = i % this.mapWidth;
//     tile = this.map[i];
//
//     x = (x * tile.width / 2) + (y * tile.width / 2);
//     y = (y * tile.height / 2) - (x * tile.height / 2);
//
//     tile.render(
//         context,
//         x + 200,
//         y + 200
//      );
// }
