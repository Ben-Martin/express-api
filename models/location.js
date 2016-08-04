var AWS = require("aws-sdk");
var cfg = require("./../config");

AWS.config.update({
    region:cfg.region,
    endpoint: cfg.endpoint
});

var docClient = new AWS.DynamoDB.DocumentClient();

/*
TODO: list
    Move AWS configuration to the global config
    correct handling of errors inc. from db
    extract the db methods
    correct format of datetime in the response
    add a count filter
    add callback functionality to the SaveLocations method
    Add identity functionality
    Correct storage of dates including region (UTC)
 */

var table = "LocationData";

// user object - this should be a global object based on identity
function User(user_guid) {
    this.user_guid = user_guid;
    return this;
}

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
    
    var epochStartDate = GetEpoch(startDate);
    var epochEndDate = GetEpoch(endDate);

    var params = {
        TableName : table,
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
    
    // move this to a seperate function
    docClient.query(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); 
            callback(err); // this error should be generic
        } 
        else {
            console.log(data);
            callback(data); 
        }   
    });
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
        TableName:table,
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

    docClient.put(params, function(err, data) {
        if (err) {
            console.log("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            return false;
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            return true;
        }
    });
    return true; // this needs to be validated
};

function GetEpoch (date) {
    return Math.floor((new Date(date)).getTime()/1000);
}

module.exports = {
    user: User,
    location: Location,
    getLocations: GetLocations,
    saveLocations: SaveLocations
};
