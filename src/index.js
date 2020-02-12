const Producer = require('./producer');
const Consumer = require('./consumer');

class Kafka {

    static Producer(client) {
        return new Producer(client);
    }

    static Consumer(client) {
        return new Consumer(client);
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
        if(this.consumers.length > 0){
            this.consumers[0].emit('message', message);
        }
    }

    addConsumer(consumer){
        this.consumers.push(consumer);
    }
}
module.exports = Kafka;