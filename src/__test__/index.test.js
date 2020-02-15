const Kafka = require('../index');
const fs = require("fs");
const FILE_PATH = './src/__test__/';
const PDF_DATA = fs.readFileSync(`${FILE_PATH}input/wizard-economics.pdf`);
const CSV_DATA = fs.readFileSync(`${FILE_PATH}input/kafka.csv`);

test('should list empty message when getMessage given no data by producer', () => {
    const expected = [];

    const acutal = new Kafka().getMessages();

    expect(expected).toEqual(acutal);
});

test('should list one json message when getMessage given json data by producer', () => {
    const broker = new Kafka();
    const producer = Kafka.Producer(broker);
    const expected = [{ topic: 'topic-1', type: 'json', data: { key: 'json', value: 'json-value' } }];
    producer.send({ topic: 'topic-1', type: 'json', data: { key: 'json', value: 'json-value' } })

    const acutal = broker.getMessages();

    expect(expected).toEqual(acutal);
});

test('should throw error when init producer given not pass broker', () => {
    const expected = Kafka.Producer;

    expect(expected).toThrowError('kafka producer need broker to instance');
});

test('should receive message when producer send given json data and consumer receive message', () => {
    const broker = new Kafka();
    const producer = Kafka.Producer(broker);
    const consumer = Kafka.Consumer(broker);
    const expected = { topic: 'topic-1', type: 'json', data: { key: 'json', value: 'json-value' } };
    let acutal;
    consumer.on('message', (message) => {
        acutal = message;
    })

    producer.send({ topic: 'topic-1', type: 'json', data: { key: 'json', value: 'json-value' } })

    expect(expected).toEqual(acutal);
    expect(broker.getMessages().length).toBe(0);
});

test('should throw error when init consumer not pass broker', () => {
    const expected = Kafka.Consumer;

    expect(expected).toThrowError('kafka consumer need broker to instance');
});

test('should list pdf file message when given send pdf data by producer', () => {
    const broker = new Kafka();
    const producer = Kafka.Producer(broker);
    producer.send({ topic: 'topic-1', type: 'pdf', data: PDF_DATA })
    const expected = [{ topic: 'topic-1', type: 'pdf', data: PDF_DATA }];

    const acutal = broker.getMessages();
    
    expect(expected).toEqual(acutal);
    expect(broker.getMessages().length).toBe(1);
});

test('should receive pdf file when producer send pdf data and consumer receive message', () => {
    const broker = new Kafka();
    const producer = Kafka.Producer(broker);
    const consumer = Kafka.Consumer(broker);
    let acutal;
    consumer.on('message', (message) => {
        acutal = message;
    })
    producer.send({ topic: 'topic-1', type: 'pdf', data: PDF_DATA })
    const expected = { topic: 'topic-1', type: 'pdf', data: PDF_DATA };

    expect(expected).toEqual(acutal);
    expect(broker.getMessages().length).toBe(0);
});

test('should list csv file message when given send pdf data by producer', () => {
    const broker = new Kafka();
    const producer = Kafka.Producer(broker);
    producer.send({ topic: 'topic-1', type: 'csv', data: CSV_DATA })

    const acutal = broker.getMessages();
    const expected = [{ topic: 'topic-1', type: 'csv', data: CSV_DATA }];
    expect(expected).toEqual(acutal);
    expect(broker.getMessages().length).toBe(1);
});

test('should receive csv file when producer send pdf data and consumer receive message', () => {
    const broker = new Kafka();
    const producer = Kafka.Producer(broker);
    const consumer = Kafka.Consumer(broker);
    let acutal;
    consumer.on('message', (message) => {
        acutal = message;
    })
    producer.send({ topic: 'topic-1', type: 'csv', data: CSV_DATA })
    const expected = { topic: 'topic-1', type: 'csv', data: CSV_DATA };

    expect(expected).toEqual(acutal);
    expect(broker.getMessages().length).toBe(0);
});

test('should not receive message when producer send not same topic message', () => {
    const broker = new Kafka();
    const producer = Kafka.Producer(broker);
    const option = { topic: 'topic-3' }
    const consumer = Kafka.Consumer(broker, option);
    let acutal;
    consumer.on('message', (message) => {
        acutal = message;
    })
    producer.send({ topic: 'topic-1', type: 'json', data: { key: 'json', value: 'json-value' } })

    expect(acutal).toBeUndefined();
    expect(broker.getMessages().length).toBe(1);
});

test('should receive message when producer send given same topic message', () => {
    const JSON_DATA = { topic: 'topic-1', type: 'json', data: { key: 'json', value: 'json-value' } };
    const broker = new Kafka();
    const producer = Kafka.Producer(broker);
    const option = { topic: 'topic-1' }
    const consumer = Kafka.Consumer(broker, option);
    const expected = { topic: 'topic-1', type: 'json', data: { key: 'json', value: 'json-value' } }
    let acutal;
    consumer.on('message', (message) => {
        acutal = message;
    })

    producer.send(JSON_DATA)

    expect(expected).toEqual(acutal);
    expect(broker.getMessages().length).toBe(0);
});