
class Consumer {
    constructor(client) {
        this.handlers = {};
        if (client) {
            this.client = client;
        }
        client.addConsumer(this);
    }

    on(eventType, handler) {
        if (!(eventType in this.handlers)) {
            this.handlers[eventType] = [];
        }
        this.handlers[eventType].push(handler);
    }

    emit(eventType) {
        var handlerArgs = Array.prototype.slice.call(arguments, 1);
        for (var i = 0; i < this.handlers[eventType].length; i++) {
            this.handlers[eventType][i].apply(this, handlerArgs);
        }
    }
}

module.exports = Consumer;