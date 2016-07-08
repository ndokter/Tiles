"use strict";

window.resources = new ResourceManager();
window.resources.load([
    'assets/32/tiles/simple/grass.png',
    'assets/32/tiles/simple/sand.png',
    'assets/32/entities/camp_fire.png',
    'assets/64/tiles/plain/grass.png',
    'assets/64/tiles/plain/sand.png',
    'assets/64/tiles/simple/grass.png',
    'assets/64/tiles/simple/sand.png',
    'assets/64/entities/camp_fire.png'
]);

var game = new Game(document.getElementById('canvas'));
game.start();
