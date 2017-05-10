class EventManager {

    constructor() {
        this._listeners = {};
    }

    // Register new observer
    on(eventName, callback) {
        if (this._listeners[eventName] === undefined) {
            this._listeners[eventName] = [];
        }
        
        this._listeners[eventName].push(callback);
    }

    // Trigger event for observable
    notify(eventName, ...args) {
        if (this._listeners[eventName] === undefined) {
            return;
        }

        for (let callback of this._listeners[eventName]) {
            callback(...args);
        }
    }
}
