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

function binaryInsert(customer, customerList) {
    const newCustomerList = _.clone(customerList);
    let begin = 0,
        end = newCustomerList.length,
        middle = Math.floor((begin + end)/2);
    if (newCustomerList.length) {
        while (begin < end) {
            if (customer.user_id >= newCustomerList[middle].user_id) {
                begin = middle + 1
            } else {
                end = middle
            }
            middle = Math.floor((begin + end)/2);
        }
        newCustomerList.splice(middle, 0, customer);
        return newCustomerList;
    } else {
        return [customer]
    }
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
    let closeCustomers = [],
        lineNumber = 1;

    stream.on('line', (line) => {
        const customer = processLine(line, lineNumber);
        if (customer) {
            closeCustomers = binaryInsert(customer, closeCustomers);
        }
        lineNumber = lineNumber + 1;
    }).on('close', () => {
        _.forEach(closeCustomers, (customer) => {
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
    binaryInsert,
    processLine
}