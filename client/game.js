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

        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom);

        this.world = new World();
        this.inputHandler = new InputHandler();

        this.camera = new IsometricViewport(canvas, this.world, this.inputHandler, canvas.width, canvas.height);
        this.miniMap = new SimpleIsometricViewport(canvas, this.world, this.inputHandler, 300, 300);
        // this.miniMap.windowPositionX = canvas.width - 300;
        this.miniMap.windowPositionX = canvas.width / 2;
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
        this.stats.begin();

        // TODO separate rendering from updating
        while (this.updateLag >= this.MS_PER_UPDATE) {
            this.update();
            this.updateLag -= this.MS_PER_UPDATE;
        }

        this.render(this.updateLag / this.MS_PER_UPDATE);

        this.updateLag += Date.now() - this.lastTick;
        this.lastTick = Date.now();

        this.stats.end();

        if (this.isRunning) {
            window.requestAnimationFrame(() => this.tick());
        }
    }

    render(interpolation) {
        this.camera.render();

        this.miniMap.gridPosition = this.camera.gridPosition;
        // this.miniMap.render();
    }

    update() {
        // Reserved for game logic
    }
}
