var request = require('request');
var Promise = require('bluebird');

var bays = [];

var geocodeRoadName = function geocodeRoadName(roadName) {
    var secure = false;
    if (roadName.includes(' (S)')) {
        secure = true;
        roadName = roadName.replace(' (S)', '');
    }
    return new Promise(function(resolve) {
        setTimeout(function() {
            request({
                method: 'GET',
                baseUrl: 'https://maps.googleapis.com/',
                url: '/maps/api/geocode/json',
                followAllRedirects: true,
                json: true,
                qs: {
                    address: roadName + ', Brighton',
                    key: '',
                    bounds: "50.798661,-0.040456|50.874331,-0.252286"
                }
            }, function(err, response) {
                if (err) console.log(err);
                console.log('Saving ' + roadName);

                var bay = { roadName: roadName, secure: secure };

                if (response.body.results.length > 0 && response.body.results[0]) {
                    bay.geometry = response.body.results[0];
                }

                bays.push(bay);

                resolve();
            });
        }, 1500);
    });
};

var readFile = function readFile() {
    return new Promise(function(resolve) {
        var roadNames = [];

        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream('road-names')
        });

        lineReader.on('line', function (roadName) {
            roadNames.push(roadName);
        });

        lineReader.on('close', function () {
            resolve(roadNames);
        });
    });
};

readFile()
    .then(function(roadNames) {
        return Promise.each(roadNames, geocodeRoadName);
    })
    .then(function() {
        require('fs').writeFile('bays.json', JSON.stringify(bays), function(err) {
            if (err) throw err;
            console.log('Romeo done.');
        });
    });
