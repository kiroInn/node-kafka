
class Consumer {
    constructor(client, option) {
        this.handlers = {};
        this.option = option;
        if (client) {
            this.client = client;
        } else {
            throw new Error('kafka consumer need client to instance');
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

    hasTopic() {
        return this.option && this.option.topic;
    }

    isSameTopic(topic){
        return this.hasTopic() && this.option.topic === topic;
    }
}

module.exports = Consumer;