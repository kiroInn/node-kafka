class Kafka {
    
    constructor(){
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