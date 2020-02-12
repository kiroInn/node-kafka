const kafka = require('../index');

test('should list empty message when not given any data by producer', () => {
    const expected = [];
    const acutal = new kafka().getMessage();
    expect(expected).toEqual(acutal);
});