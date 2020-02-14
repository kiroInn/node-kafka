const Producer = require('./producer');
const Consumer = require('./consumer');

class Kafka {

    static Producer(client) {
        return new Producer(client);
    }

    static Consumer(client, option) {
        return new Consumer(client, option);
    }

    constructor() {
        this.messageQueue = [];
        this.consumers = [];
    }

    getMessages() {
        return this.messageQueue;
    }

    push(message) {
        this.messageQueue.push(message);
        if (this.consumers.length > 0) {
            const consumer = this.consumers[0];
            if (!consumer.hasTopic()) {
                consumer.emit('message', message);
                this.messageQueue.shift();
            }
            if (consumer.hasTopic() && message.topic && consumer.isSameTopic(message.topic)) {
                consumer.emit('message', message);
                this.messageQueue.shift();
            }
        }
    }

    addConsumer(consumer) {
        this.consumers.push(consumer);
    }
}
module.exports = Kafka;