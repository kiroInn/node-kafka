const Kafka = require('../index');

test('should list empty message when not given any data by producer', () => {
    const expected = [];
    const acutal = new Kafka().getMessages();
    expect(expected).toEqual(acutal);
});

test('should list one json message when given send json data by producer', () => {
    const client = new Kafka();
    const producer = Kafka.Producer(client);
    producer.send({ type: 'json', data: { key: 'json', value: 'json-value' } })

    const acutal = client.getMessages();
    const expected = [{ type: 'json', data: { key: 'json', value: 'json-value' } }];
    expect(expected).toEqual(acutal);
});

test('should throw error when init producer not pass client', () => {
    const expected = Kafka.Producer;
    expect(expected).toThrowError('kafka producer need client to instance');
});

test('should receive message when producer send json data and consumer receive message', () => {
    const client = new Kafka();
    const producer = Kafka.Producer(client);
    const consumer = Kafka.Consumer(client);
    let acutal;
    consumer.on('message', (message) => {
        acutal = message;
    })
    producer.send({ type: 'json', data: { key: 'json', value: 'json-value' } })
    const expected = { type: 'json', data: { key: 'json', value: 'json-value' } };
    
    expect(expected).toEqual(acutal);
})