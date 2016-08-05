var AWS = require("aws-sdk");
var cfg = require("./../config");

AWS.config.update({
    region:cfg.region,
    endpoint: cfg.endpoint
});

var docClient = new AWS.DynamoDB.DocumentClient();

// get this from the database, as a DB test!
var Version = 1.0;

var table = 'Version'; // add to global

function GetVersion (callback) {

}

function ApiVersion(version, date) {
    this.version = version;
    this.date = date;
    return this;
}

function SetVersion (version, callback) {
    if (!version) {
        version = cfg.version;
    }

    var date = Date.now();

    // this should be read from the db?
    var ver = new ApiVersion(version, date);

    var params = {
        TableName:table,
        Item:{
            "version": version,
            "date": date
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.log("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            callback(err);
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            callback(ver);
        }
    });

}

module.exports = {
    version: Version,
    getVersion: GetVersion,
    setVersion: SetVersion
};
