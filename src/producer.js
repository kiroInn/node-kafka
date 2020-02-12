class Producer {
    constructor(client) {
        if (client) {
            this.client = client;
        } else {
            throw new Error('kafka producer need client to instance');
        }
    }

    send(data) {
        this.client.push(data);
    }
}
module.exports = Producer;