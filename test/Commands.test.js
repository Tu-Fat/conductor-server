const listAllUser = require('../src/Commands').listAllUser;

const wss = {};
wss.clients = new Set(['1', '2', '3']);

test('listAllUsers to return users', () => {
    expect(typeof listAllUser(wss)).toBe('object');
});

test('listAllUsers to return 3', () => {
    expect(listAllUser(wss).length).toBe(3);
});


