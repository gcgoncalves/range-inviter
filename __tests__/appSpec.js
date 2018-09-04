'use strict'
const app = require('../app');

describe('validateUser', () => {
    test('Valid customer', () => {
        const customer = {
            name: 'John Doe',
            user_id: 1,
            latitude: '1',
            longitude: '1'
        };
        const result = app.validateCustomer(customer);
        expect(result).toBeTruthy();
    });

    test('Empty customer', () => {
        const customer = {};
        expect(() => {
            app.validateCustomer(customer)
        }).toThrow();
    });

    test('Invalid customer', () => {
        const customer = {
            name: 'John Doe',
            user_id: 1,
            latitude: '1N',
            longitude: '1W'
        };
        expect(() => {
            app.validateCustomer(customer)
        }).toThrow();
    });
});

describe('processLine', () => {
    test('Valid line of near customer', () => {
        const line = '{"latitude": "53.357250", "user_id": 1, "name": "John Doe", "longitude": "-6.251088"}',
            customer = {
                name: 'John Doe',
                user_id: 1,
                latitude: '53.357250',
                longitude: '-6.251088'
            },
            result = app.processLine(line);
        expect(result).toEqual(customer);
    });

    test('Valid line of far customer', () => {
        const line = '{"latitude": "1.1", "user_id": 1, "name": "John Doe", "longitude": "-1.1"}',
            customer = {
                name: 'John Doe',
                user_id: 1,
                latitude: '1.1',
                longitude: '-1.1'
            },
            result = app.processLine(line);
        expect(result).toBeFalsy();
    });

    test('Invalid line', () => {
        const line = '{"latitude": "1.1N", "user_id": 1, "name": "John Doe"}';
        expect(() => {
            app.validateCustomer(line);
        }).toThrow();
    });

    test('Invalid JSON line', () => {
        const line = 'This is not a proper client line.';
        expect(() => {
            app.validateCustomer(line);
        }).toThrow();
    });
});
