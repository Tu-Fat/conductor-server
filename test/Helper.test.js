const isJsonString = require('../src/Helper').isJsonString;

const mockJsonEmptyObject = '{}';
const mockJsonEmptyArray = '[]';
const mockJsonArray = '["string", "string2"]';
const mockJsonObject = '{"p": "something", "p2": "something else"}';

const mockJson = `
[{
  "id": 1,
  "first_name": "Jehu",
  "last_name": "Asche",
  "email": "jasche0@mapy.cz",
  "gender": "Male",
  "ip_address": "77.250.49.195"
}, {
  "id": 2,
  "first_name": "Hanson",
  "last_name": "Alenshev",
  "email": "halenshev1@addthis.com",
  "gender": "Male",
  "ip_address": "120.3.194.105"
}, {
  "id": 3,
  "first_name": "Rorke",
  "last_name": "Dawtry",
  "email": "rdawtry2@dailymotion.com",
  "gender": "Male",
  "ip_address": "190.7.13.220"
}]
`;

const mockJsonMinorError = `
[{
  "id": 1,
  "first_name": "Jehu",
  "last_name": "Asche",
  "email": "jasche0@mapy.cz",
  "gender": "Male',
  "ip_address": "77.250.49.195"
}, {
  "id": 2,
  "first_name": "Hanson",
  "last_name": "Alenshev",
  "email": "halenshev1@addthis.com",
  "gender": "Male",
  "ip_address": "120.3.194.105"
}, {
  "id": 3,
  "first_name": "Rorke",
  "last_name": "Dawtry",
  "email": "rdawtry2@dailymotion.com",
  "gender": "Male",
  "ip_address": "190.7.13.220"
}]
`;

test('no JSON to return false', () => {
    expect(isJsonString()).toBeFalsy();
});

test('Array to return true', () => {
    expect(isJsonString(mockJsonArray)).toBeTruthy();
});

test('Empty Array to return true', () => {
    expect(isJsonString(mockJsonEmptyArray)).toBeTruthy();
});

test('Object to return true', () => {
    expect(isJsonString(mockJsonObject)).toBeTruthy();
});

test('Empty object to return true', () => {
    expect(isJsonString(mockJsonEmptyObject)).toBeTruthy();
});

test('Real Data JSON to return true', () => {
    expect(isJsonString(mockJson)).toBeTruthy();
});

test('Real Data JSON with Minor Error to return false', () => {
    expect(isJsonString(mockJsonMinorError)).toBeFalsy();
});