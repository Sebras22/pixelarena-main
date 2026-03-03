/**
 * Event Bus - Communication entre Micro-Frontends
 *
 * Pattern Pub/Sub simple et efficace.
 *
 * Usage:
 *   import eventBus from 'shared/eventBus';
 *
 *   // S'abonner
 *   eventBus.on('event:name', (data) => console.log(data));
 *
 *   // Emettre
 *   eventBus.emit('event:name', { key: 'value' });
 *
 *   // Se desabonner
 *   eventBus.off('event:name', callback);
 */

class EventBus {
    constructor() {
        this.listeners = {};
    }

    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
        return () => this.off(event, callback);
    }

    off(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(
            (cb) => cb !== callback,
        );
    }

    emit(event, data) {
        if (!this.listeners[event]) return;
        console.log(`[EventBus] ${event}`, data);
        this.listeners[event].forEach((callback) => {
            try {
                callback(data);
            } catch (error) {
                console.error(
                    `[EventBus] Error in listener for ${event}:`,
                    error,
                );
            }
        });
    }

    once(event, callback) {
        const wrapper = (data) => {
            callback(data);
            this.off(event, wrapper);
        };
        this.on(event, wrapper);
    }
}

if (!window.__EVENT_BUS__) {
    window.__EVENT_BUS__ = new EventBus();
}

export default window.__EVENT_BUS__;
