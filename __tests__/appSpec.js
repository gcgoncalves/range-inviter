'use strict'
const app = require('../app');

describe('validateUser', () => {
    test('Valid customer', () => {
        const customer = {
            name: '',
            user_id: 1,
            latitude: 1,
            longitude: 1
        };
        const result = app.validateCustomer(customer);
        expect(result).toBeTruthy();
    });

    test('Invalid customer', () => {
        const customer = {};
        expect(() => {
            app.validateCustomer(customer)
        }).toThrow();
    });
});