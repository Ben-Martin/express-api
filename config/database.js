
var AWS = require("aws-sdk");
var cfg = require("./../config");

var VersionTable = 'Version';
var LocationsTable = 'LocationData';

module.exports.init = function() {
    
    AWS.config.update({
        region: "ap-southeast-2",
        endpoint: cfg.databaseEndpoint
    });

    this.versionTable = VersionTable;
    this.locationsTable = LocationsTable;

    this.dbClient = new AWS.DynamoDB.DocumentClient();

    return this;
};