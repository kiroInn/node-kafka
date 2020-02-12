const Kafka = require('../index');
const Producer = require('../producer');

test('should list empty message when not given any data by producer', () => {
    const expected = [];
    const acutal = new Kafka().getMessages();
    expect(expected).toEqual(acutal);
});

test('should list one json message when given send json data by producer', () => {
    const expected = [{type: 'json', data: {key: 'json', value: 'json-value'}}];
    const client = new Kafka();
    const producer = new Producer(client);
    producer.send({type: 'json', data: {key: 'json', value: 'json-value'}})
    const acutal = client.getMessages();
    expect(expected).toEqual(acutal);
});