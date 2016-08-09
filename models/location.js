

/*
TODO: list
    correct handling of errors inc. from db
    correct format of datetime in the response
    add a count filter
    add callback functionality to the SaveLocations method
    Add identity functionality
    Correct storage of dates including region (UTC)
 */

var db = require('./../config/database').init(),
    api = require('./../controllers/api');


// location object
function Location(longitude, latitude, speed, course, altitude, timestamp, true_heading, magnetic_heading, heading_accuracy) {
    this.longitude =  longitude;
    this.latitude = latitude;
    this.speed = speed;
    this.course = course;
    this.altitude = altitude;
    this.timestamp = timestamp;
    this.true_heading = true_heading;
    this.magnetic_heading = magnetic_heading;
    this.heading_accuracy = heading_accuracy;
    return this;
}

/**
 * Get a complete list of locations by date range
 * GET ../locations?startDate=2015-01-01&endDate=2015-12-31
 * @param {user}   user       Optional user parameter
 * @param {datetime}   startDate     The start range to get locations for, in yyyy-mm-dd hh-mm-ss format (in UTC)
 * @param {datetime}   endDate     The end range to get locations for, in yyyy-mm-dd hh-mm-ss format (in UTC)
 * @param {Function} callback   callback once data is received from the db
 */
function GetLocations(user, startDate, endDate, callback) {

    // check to ensure valid data has been sent
    if (!startDate || !endDate) {
        var error = api.error('missing params', 'startDate and endDate must be provided.');
        callback(error, [], 400);
    }
    
    // correct the date / time values
    var epochStartDate = GetEpoch(startDate);
    var epochEndDate = GetEpoch(endDate);

    // construct the db query - ideally this should be moved
    var params = {
        TableName : db.locationsTable(),
        KeyConditionExpression: "user_guid = :user_guid and #dstamp between :startDate and :endDate",
        ExpressionAttributeNames:{
            "#dstamp": "datetime"
        },
        ExpressionAttributeValues: {
            ":user_guid": user,
            ":startDate": epochStartDate,
            ":endDate": epochEndDate
        }
    };
    
    db.query(params, callback);

}

/**
 * Save a new location to the db
 * @param {user} user     user of the location to be saved to
 * @param {Location} location new location object
 */
SaveLocations = function(user, location) {

    var date = GetEpoch(Date.now());
    console.log('adding item : ' + date);

    var params = {
        TableName: db.locationsTable(),
        Item:{
            "user_guid": user, // pull this from a token
            "datetime": date,
            "location":{
                "latitude": location.latitude,
                "longitude": location.longitude,
                "speed": location.speed,
                "course": location.course,
                "altitude": location.altitude,
                "timestamp": location.timestamp,
                "true_heading": location.true_heading,
                "magnetic_heading": location.magnetic_heading,
                "heading_accuracy": location.heading_accuracy
            }
        }
    };

    db.dbClient.put(params, function(err, data, callback) {
        if (err) {
            callback(err);
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            callback(data);
        }
    });

};


/**
 * Get a Unix time stamp
 * @param {date} date datetime to be converted to an epoch
 */
function GetEpoch (date) {
    return Math.floor((new Date(date)).getTime()/1000);
}

module.exports = {
    location: Location,
    getLocations: GetLocations,
    saveLocations: SaveLocations
};
