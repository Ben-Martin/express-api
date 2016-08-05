
var AWS = require("aws-sdk");
var cfg = require("./../config");

function VersionTable() {
    return 'Version';
}

function LocationsTable() {
    return 'LocationData';
}

module.exports.init = function() {
    
    AWS.config.update({
        region: "ap-southeast-2",
        endpoint: cfg.databaseEndpoint
    });

    this.versionTable = VersionTable;
    this.locationsTable = LocationsTable;

    this.dbParent = new AWS.DynamoDB();
    this.dbClient = new AWS.DynamoDB.DocumentClient();

    return this;
};