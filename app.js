const _ = require('lodash'),
    fs = require('fs'),
    readline = require('readline'),
    rl = readline.createInterface({
        input: fs.createReadStream('customers.txt'),
        crlfDelay: Infinity
    });

const dublinOffice = {
        latitude: 53.339428,
        longitude: -6.257664
    },
    closeCustomers = [];

function areClose(place1, place2) {
    return Math.abs(place1.latitude - place2.latitude) < 1 &&
        Math.abs(place1.longitude - place2.longitude) < 1;
}

rl.on('line', (line) => {
    let customer = JSON.parse(line);
    if (areClose(customer, dublinOffice)) {
        closeCustomers.push(customer);
    }
}).on('close', () => {
    let sortedCustomers = _.sortBy(closeCustomers, 'user_id');
    _.forEach(sortedCustomers, (customer) => {
        console.log(`Name: ${customer.name}, User ID: ${customer.user_id}`);
    });
});
