const config = require('../src/Config');

test('host to be string', () => {
    expect(typeof config.host).toBe('string');
});

test('port to be number', () => {
    expect(typeof config.port).toBe('number');
});