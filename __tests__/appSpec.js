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

describe('binaryInsert', () => {
    test('Empty array', () => {
        const customer = {
                name: 'John Doe',
                user_id: 1,
                latitude: '1',
                longitude: '1'
            },
            customerList = [],
            expected = [customer];
        let result = app.binaryInsert(customer, customerList);
        expect(result).toEqual(expected);
    });

    test('Insert in the beginning', () => {
        const customer1 = {
                name: 'John Doe',
                user_id: 1,
                latitude: '1',
                longitude: '1'
            },
            customer2 = {
                name: 'Jane Doe',
                user_id: 2,
                latitude: '1',
                longitude: '1'
            },
            customer3 = {
                name: 'Gabriel Costa',
                user_id: 3,
                latitude: '1',
                longitude: '1'
            },
            customerList = [customer2, customer3],
            expected = [customer1, customer2, customer3];
        let result = app.binaryInsert(customer1, customerList);
        expect(result).toEqual(expected);
    });

    test('Insert in the middle', () => {
        const customer1 = {
                name: 'John Doe',
                user_id: 1,
                latitude: '1',
                longitude: '1'
            },
            customer2 = {
                name: 'Jane Doe',
                user_id: 2,
                latitude: '1',
                longitude: '1'
            },
            customer3 = {
                name: 'Gabriel Costa',
                user_id: 3,
                latitude: '1',
                longitude: '1'
            },
            customerList = [customer1, customer3],
            expected = [customer1, customer2, customer3];
        let result = app.binaryInsert(customer2, customerList);
        expect(result).toEqual(expected);
    });

    test('Insert in the end', () => {
        const customer1 = {
                name: 'John Doe',
                user_id: 1,
                latitude: '1',
                longitude: '1'
            },
            customer2 = {
                name: 'Jane Doe',
                user_id: 2,
                latitude: '1',
                longitude: '1'
            },
            customer3 = {
                name: 'Gabriel Costa',
                user_id: 3,
                latitude: '1',
                longitude: '1'
            },
            customerList = [customer1, customer2],
            expected = [customer1, customer2, customer3];
        let result = app.binaryInsert(customer3, customerList);
        expect(result).toEqual(expected);
    });

    test('Insert in the right position for longer lists', () => {
        const customer1 = {
                name: 'John Doe',
                user_id: 1,
                latitude: '1',
                longitude: '1'
            },
            customer2 = {
                name: 'Jane Doe',
                user_id: 2,
                latitude: '1',
                longitude: '1'
            },
            customer3 = {
                name: 'Gabriel Costa',
                user_id: 3,
                latitude: '1',
                longitude: '1'
            },
            customer4 = {
                name: 'Mary Who',
                user_id: 4,
                latitude: '1',
                longitude: '1'
            },
            customer5 = {
                name: 'Robert Nill',
                user_id: 5,
                latitude: '1',
                longitude: '1'
            },
            customerList = [customer1, customer2, customer3, customer5],
            expected = [customer1, customer2, customer3, customer4, customer5];
        let result = app.binaryInsert(customer4, customerList);
        expect(result).toEqual(expected);
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