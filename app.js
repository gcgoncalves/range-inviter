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
    if (!customer.hasOwnProperty('user_id') || isNaN(+customer.user_id)) {
        missingAttributes.push('user_id');
    }
    if (!customer.hasOwnProperty('latitude') || isNaN(+customer.latitude)) {
        missingAttributes.push('latitude');
    }
    if (!customer.hasOwnProperty('longitude') || isNaN(+customer.longitude)) {
        missingAttributes.push('longitude');
    }
    if (missingAttributes.length) {
        throw 'Invalid customer. Missing/invalid attributes: ' + missingAttributes.join(', ');
    }
    return true;
}

function processLine(line, lineNumber) {
    const dublinOffice = {
        latitude: 53.339428,
        longitude: -6.257664
    };

    try {
        const customer = JSON.parse(line);
        validateCustomer(customer);
        if (geo.areClose(customer, dublinOffice)) {
            return customer;
        }
        return null;
    } catch(error) {
        console.error(`Error processing input file line ${lineNumber}:`, error);
        return null;
    }
}

function processFile(stream) {
    const closeCustomers = [];
    let lineNumber = 1;

    stream.on('line', (line) => {
        const customer = processLine(line, lineNumber);
        if (customer) {
            closeCustomers.push(customer);
        }
        lineNumber = lineNumber + 1;
    }).on('close', () => {
        let sortedCustomers = _.sortBy(closeCustomers, [(customer) => +customer.user_id]);
        _.forEach(sortedCustomers, (customer) => {
            console.log(`Name: ${customer.name}, User ID: ${customer.user_id}`);
        });
    });
}

function main(filename='customers.txt') {
    const stream = readline.createInterface({
        input: fs.createReadStream(filename),
        crlfDelay: Infinity
    });

    processFile(stream);
}

if (typeof require != 'undefined' && require.main == module) {
    main();
}

module.exports = {
    validateCustomer,
    processLine
}