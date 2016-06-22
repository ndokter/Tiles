'use strict';

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.isRunning = false;
        this.lastTick = 0;

        this.UPDATE_RATE = 1;
        this.MS_PER_UPDATE = 1000 / this.UPDATE_RATE;
        this.updateLag = 0;

        this.MAX_FPS = 600;
        this.FRAME_TIME = 1000 / this.MAX_FPS;
        this.lastRender = 0;

        this.fpsCounter = 0;
        this.fpsStart = Date.now();
        this.fpsSampleSize = 2000; // milliseconds

        this.world = new World();

        this.inputHandler = new InputHandler();

        this.camera = new IsometricViewport(canvas, this.world, this.inputHandler, canvas.width, canvas.height);
        this.miniMap = new SimpleTopViewport(canvas, this.world, this.inputHandler, 150, 150);
        this.miniMap.windowPositionX = canvas.width - 150;
        this.miniMap.windowPositionY = 0;

        this.miniMap.viewPositionX = this.camera.viewPositionX;
        this.miniMap.viewPositionY = this.camera.viewPositionY;
    }

    start() {
        this.isRunning = true;
        this.lastTick = Date.now();

        window.requestAnimationFrame(() => this.tick());
    }

    tick() {
        // TODO separate rendering from updating
        while (this.updateLag >= this.MS_PER_UPDATE) {
            this.update();
            this.updateLag -= this.MS_PER_UPDATE;
        }

        this.render(this.updateLag / this.MS_PER_UPDATE);

        this.updateLag += Date.now() - this.lastTick;
        this.lastTick = Date.now();

        if (this.isRunning) {
            window.requestAnimationFrame(() => this.tick());
        }
    }

    render(interpolation) {
        this.camera.render();

        this.miniMap.viewPositionX = this.camera.viewPositionX;
        this.miniMap.viewPositionY = this.camera.viewPositionY;
        this.miniMap.render();
    }

    update() {
        // Reserved for game logic
    }
}
