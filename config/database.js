
var AWS = require("aws-sdk");
var cfg = require("./../config");
var api = require('./../controllers/api');

var dbClient = new AWS.DynamoDB.DocumentClient();

function VersionTable() {
    return 'Version';
}

function LocationsTable() {
    return 'LocationData';
}

function Query(params, callback) {
    dbClient.query(params, function(err, data, status) {
        if (err) {
            console.log(err, err.stack);
            var error = api.error('error', 'could not read from the database'); // make these more generic - abstract an additional layer
            callback(error, [], 500);
        } 
        else {
            console.log(data);
            callback([], data, 200);
        }   
    });
}


module.exports.init = function() {
    
    AWS.config.update({
        region: "ap-southeast-2",
        endpoint: cfg.databaseEndpoint,
    });

    this.versionTable = VersionTable;
    this.locationsTable = LocationsTable;

    this.query = Query;

    this.dbParent = new AWS.DynamoDB();
    this.dbClient = new AWS.DynamoDB.DocumentClient();

    return this;
};