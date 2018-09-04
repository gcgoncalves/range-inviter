'use strict'
function degreesToRadians(degrees) {
    return degrees * (Math.PI/180);
}

function geoDistance(pointA, pointB) {
    const earthRadius = 6371,
        pointALatitudeRadians = degreesToRadians(pointA.latitude),
        pointBLatitudeRadians = degreesToRadians(pointB.latitude),
        latitudeDifference = degreesToRadians(pointB.latitude - pointA.latitude),
        longitudeDifference = degreesToRadians(pointB.longitude - pointA.longitude);

    const centralAngle = Math.pow(Math.sin(latitudeDifference/2), 2) +
            (Math.cos(pointALatitudeRadians) *
            Math.cos(pointBLatitudeRadians) *
            Math.pow(Math.sin(longitudeDifference/2), 2));
    const angularDistance = 2 * Math.atan2(Math.sqrt(centralAngle ), Math.sqrt(1-centralAngle));

    return earthRadius * angularDistance;
}

function areClose(pointA, pointB, distance=100) {
    return geoDistance(pointA, pointB) <= distance;
}

module.exports = {
    degreesToRadians,
    geoDistance,
    areClose
}