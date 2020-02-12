const Producer = require('./producer');

class Kafka {

    static Producer(client) {
        return new Producer(client);
    }

    constructor() {
        this.messageQueue = [];
    }

    getMessages() {
        return this.messageQueue;
    }

    push(message) {
        this.messageQueue.push(message);
    }
}
module.exports = Kafka;