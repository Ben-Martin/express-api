
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
        endpoint: cfg.databaseEndpoint,
        accessKeyId: "AKIAJPSHAO3Q4CJX72RA",
        secretAccessKey: "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"
    });

    this.versionTable = VersionTable;
    this.locationsTable = LocationsTable;

    this.dbParent = new AWS.DynamoDB();
    this.dbClient = new AWS.DynamoDB.DocumentClient();

    return this;
};