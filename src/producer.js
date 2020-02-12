class Producer {
    constructor(client) {
        if (client) {
            this.client = client;
        }
    }

    send(data) {
        this.client.push(data);
    }
}
module.exports = Producer;