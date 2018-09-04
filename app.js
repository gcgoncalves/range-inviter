'use strict'
const _ = require('lodash'),
    fs = require('fs'),
    readline = require('readline'),
    geo = require('./geo');

function validateCustomer(customer) {
    const missingAttributes = [];
    if (!customer.hasOwnProperty('name')) {
        missingAttributes.push('name');
    }
    if (!customer.hasOwnProperty('user_id')) {
        missingAttributes.push('user_id');
    }
    if (!customer.hasOwnProperty('latitude')) {
        missingAttributes.push('latitude');
    }
    if (!customer.hasOwnProperty('longitude')) {
        missingAttributes.push('longitude');
    }
    if (missingAttributes.length) {
        throw 'Invalid customer. Missing attributes: ' + missingAttributes.join(', ');
    }
    return true;
}

function processFile(filename='customers.txt') {
    const dublinOffice = {
            latitude: 53.339428,
            longitude: -6.257664
        },
        closeCustomers = [];

    readline.createInterface({
        input: fs.createReadStream(filename),
        crlfDelay: Infinity
    }).on('line', (line) => {
        try {
            const customer = JSON.parse(line);
            validateCustomer(customer);
            if (geo.areClose(customer, dublinOffice)) {
                closeCustomers.push(customer);
            }
        } catch(error) {
            console.error(error);
        }
    }).on('close', () => {
        let sortedCustomers = _.sortBy(closeCustomers, 'user_id');
        _.forEach(sortedCustomers, (customer) => {
            console.log(`Name: ${customer.name}, User ID: ${customer.user_id}`);
        });
    });
}

if (typeof require != 'undefined' && require.main==module) {
    processFile();
}

module.exports = {
    validateCustomer
}