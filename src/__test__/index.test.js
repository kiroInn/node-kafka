const Kafka = require('../index');
const fs = require("fs");
const FILE_PATH = './src/__test__/';
const PDF_DATA = fs.readFileSync(`${FILE_PATH}input/wizard-economics.pdf`);
const CSV_DATA = fs.readFileSync(`${FILE_PATH}input/kafka.csv`);

test('should list empty message when not given any data by producer', () => {
    const expected = [];
    const acutal = new Kafka().getMessages();
    expect(expected).toEqual(acutal);
});

test('should list one json message when given send json data by producer', () => {
    const client = new Kafka();
    const producer = Kafka.Producer(client);
    producer.send({ topic: 'topic-1', type: 'json', data: { key: 'json', value: 'json-value' } })

    const acutal = client.getMessages();
    const expected = [{ topic: 'topic-1', type: 'json', data: { key: 'json', value: 'json-value' } }];
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
    producer.send({ topic: 'topic-1', type: 'json', data: { key: 'json', value: 'json-value' } })
    const expected = { topic: 'topic-1', type: 'json', data: { key: 'json', value: 'json-value' } };

    expect(expected).toEqual(acutal);
});

test('should throw error when init consumer not pass client', () => {
    const expected = Kafka.Consumer;
    expect(expected).toThrowError('kafka consumer need client to instance');
});

test('should list pdf file message when given send pdf data by producer', () => {
    const client = new Kafka();
    const producer = Kafka.Producer(client);
    producer.send({ topic: 'topic-1', type: 'pdf', data: PDF_DATA })

    const acutal = client.getMessages();
    const expected = [{ topic: 'topic-1', type: 'pdf', data: PDF_DATA }];
    expect(expected).toEqual(acutal);
});

test('should receive pdf file when producer send pdf data and consumer receive message', () => {
    const client = new Kafka();
    const producer = Kafka.Producer(client);
    const consumer = Kafka.Consumer(client);
    let acutal;
    consumer.on('message', (message) => {
        acutal = message;
    })
    producer.send({ topic: 'topic-1', type: 'pdf', data: PDF_DATA })
    const expected = { topic: 'topic-1', type: 'pdf', data: PDF_DATA };

    expect(expected).toEqual(acutal);
});

test('should list csv file message when given send pdf data by producer', () => {
    const client = new Kafka();
    const producer = Kafka.Producer(client);
    producer.send({ topic: 'topic-1', type: 'csv', data: CSV_DATA })

    const acutal = client.getMessages();
    const expected = [{ topic: 'topic-1', type: 'csv', data: CSV_DATA }];
    expect(expected).toEqual(acutal);
});

test('should receive csv file when producer send pdf data and consumer receive message', () => {
    const client = new Kafka();
    const producer = Kafka.Producer(client);
    const consumer = Kafka.Consumer(client);
    let acutal;
    consumer.on('message', (message) => {
        acutal = message;
    })
    producer.send({ topic: 'topic-1', type: 'csv', data: CSV_DATA })
    const expected = { topic: 'topic-1', type: 'csv', data: CSV_DATA };

    expect(expected).toEqual(acutal);
});