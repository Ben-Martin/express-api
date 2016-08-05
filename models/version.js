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

function SetVersion (version, callback) {
    if (!version) {
        version = cfg.version;
    }

    var params = {
        TableName:table,
        Item:{
            "version": version,
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.log("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            callback(err);
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            callback(version);
        }
    });
    
}

module.exports = {
    version: Version,
    setVersion: SetVersion
};
