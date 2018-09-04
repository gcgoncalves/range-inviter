'use strict'
const geo = require('../geo');

describe('degreesToRadians', () => {
    test('Converts 180º', () => {
        const result = geo.degreesToRadians(180);
        expect(result).toBe(Math.PI);
    });

    test('Converts 90º', () => {
        const result = geo.degreesToRadians(90);
        expect(result).toBe(Math.PI/2);
    });

    test('Converts 45º', () => {
        const result = geo.degreesToRadians(45);
        expect(result).toBe(Math.PI/4);
    });

    test('Converts 0º', () => {
        const result = geo.degreesToRadians(0);
        expect(result).toBe(0);
    });
});

describe('geoDistance', () => {
    test('One degree away', () => {
        const pointA = {latitude: 0, longitude: 0},
            pointB = {latitude: 0, longitude: 1};
        const result = geo.geoDistance(pointA, pointB);
        expect(result).toBe(111.19492664455873);
    });

    test('One diagonal degree away', () => {
        const pointA = {latitude: 0, longitude: 0},
            pointB = {latitude: 1, longitude: 1};
        const result = geo.geoDistance(pointA, pointB);
        expect(result).toBe(157.24938127194397);
    });

    test('Home to work is about 2km', () => {
        const dublinOffice = {
                latitude: 53.339428,
                longitude: -6.257664
            },
            home = {
                latitude: 53.357250,
                longitude: -6.251088
            };
        const result = geo.geoDistance(dublinOffice, home);
        expect(result).toBe(2.029219047406646);
    });

    test('Distance 0', () => {
        const pointA = {
                latitude: 53.357250,
                longitude: -6.251088
            },
            pointB = {
                latitude: 53.357250,
                longitude: -6.251088
            };
        const result = geo.geoDistance(pointA, pointB);
        expect(result).toBe(0);
    });

    test('Same result for symmetrical values', () => {
        const pointA = {latitude: 0, longitude: 0},
            pointB = {latitude: 10, longitude: 5},
            pointC = {latitude: -10, longitude: -5};
        const resultA = geo.geoDistance(pointA, pointB),
            resultB = geo.geoDistance(pointA, pointC);
        expect(resultA).toEqual(resultB);
    });

    test('Results are symmetrical', () => {
        const pointA = {latitude: 10, longitude: 5},
            pointB = {latitude: -10, longitude: -5};
        const resultA = geo.geoDistance(pointA, pointB),
            resultB = geo.geoDistance(pointB, pointA);
        expect(resultA).toEqual(resultB);
    });
});

describe('areClose', () => {
    test('Home is close from work', () => {
        const dublinOffice = {
                latitude: 53.339428,
                longitude: -6.257664
            },
            home = {
                latitude: 53.357250,
                longitude: -6.251088
            };
        const result = geo.areClose(dublinOffice, home);
        expect(result).toBeTruthy();
    });

    test('Hometown is from from work', () => {
        const dublinOffice = {
                latitude: 53.339428,
                longitude: -6.257664
            },
            homeTown = {
                latitude: -30.034319,
                longitude: -51.241106
            };
        const result = geo.areClose(dublinOffice, homeTown);
        expect(result).toBeFalsy();
    });

    test('Custom distance check', () => {
        const dublinOffice = {
                latitude: 53.339428,
                longitude: -6.257664
            },
            home = {
                latitude: 53.357250,
                longitude: -6.251088
            };
        const result = geo.areClose(dublinOffice, home, 2);
        expect(result).toBeFalsy();
    });
});