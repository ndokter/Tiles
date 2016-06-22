'use strict';

class InputHandler {
    constructor() {
        this.KEY_UP = 38;
        this.KEY_DOWN = 40;
        this.KEY_LEFT = 37;
        this.KEY_RIGHT = 39;

        this.MOUSE_LEFT = 0;

        this._pressedKeys = {};
        this._mousePosition = {
            'current': null,
            'dragStart': null
        };

        window.addEventListener('keydown', (event) => this.onKeyDown(event), false);
        window.addEventListener('keyup', (event) => this.onKeyUp(event), false);
        window.addEventListener('mousedown', (event) => this.onMouseDown(event), false);
        window.addEventListener('mouseup', (event) => this.onMouseUp(event), false);
        window.addEventListener('mousemove', (event) => this.onMouseMove(event), false);
    }

    isMouseDragging() {
        return this._mousePosition['dragStart'] !== null;
    }

    mouseDragOffset() {
        return {
            'x': this._mousePosition['dragStart'].x - this._mousePosition['current'].x,
            'y': this._mousePosition['dragStart'].y - this._mousePosition['current'].y
        };
    }

    mousePosition() {
        return this._mousePosition['current'];
    }

    isKeyPressed(keyCode) {
        return Boolean(this._pressedKeys[keyCode]);
    }

    onKeyDown(event) {
        this._pressedKeys[event.keyCode] = true;
    }

    onKeyUp(event) {
        delete this._pressedKeys[event.keyCode];
    }

    onMouseDown(event) {
        this._pressedKeys[event.button] = true;
    }

    onMouseUp(event) {
        this._mousePosition['dragStart'] = null;

        delete this._pressedKeys[event.button];
    }

    onMouseMove(event) {
        this._mousePosition['current'] = {
            'x': event.clientX,
            'y': event.clientY
        };

        if (this.isKeyPressed(this.MOUSE_LEFT) && this._mousePosition['dragStart'] === null)
            this._mousePosition['dragStart'] = this._mousePosition['current']
    }
}
