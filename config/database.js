
var AWS = require("aws-sdk"),
    cfg = require("./../config"),
    api = require('./../controllers/api');

AWS.config.update({
    region: "ap-southeast-2",
    endpoint: cfg.databaseEndpoint,
});

var dbParent = new AWS.DynamoDB();
var dbClient = new AWS.DynamoDB.DocumentClient();

function VersionTable() {
    return 'Version';
}

function LocationsTable() {
    return 'LocationData';
}

/**
 * Query the database based on the params provided
 * @param {Table params}   params   Query params
 * @param {Error || data || status code} callback [description]
 */
function Query(params, callback) {
    dbClient.query(params, function(err, data, status) {
        if (err) {
            console.log(err, err.stack);
            var error = api.error('error', 'could not read from the database'); // make these more generic - abstract an additional layer
            callback(error, [], 500);
        } 
        else {
            console.log('Query data : ', data);
            callback(err, data, 200);
        }   
    });
}

/**
 * [Put description]
 * @param {[type]}   params   [description]
 * @param {Function} callback [description]
 */
function Put(params, callback) {
    dbClient.put(params, function(err, data) {
        if (err) {
            console.log("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            var error = api.error('error', 'could not update the database'); // make these more generic - abstract an additional layer
            callback(error, [], 500);
        } else {
            console.log("Added item :", JSON.stringify(data, null, 2));
            callback(err, data, 200);
        }
    });
}

/**
 * [Scan description]
 * @param {[type]}   params   [description]
 * @param {Function} callback [description]
 */
function Scan(params, callback) {
     dbClient.scan(params, function(err, data) {
        if (err) {
            console.log("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            callback(err, [], 500);
        } else {
            console.log("Item read: ", JSON.stringify(data, null, 2));
            callback(err, data.Items, 200);
        }
    });
}

/**
 * Create a table
 * @param {string}   table    table name
 * @param {Table params}   params   detail for the table to be created
 * @param {Function} callback The error or success message
 */
function CreateTable (params, callback) {

    // drop table first
    try {
        this.deleteTable(params.TableName);
    }
    catch(err) {
        console.log(err);
    }

    dbParent.createTable(params, function(err, data) {
        if (err) {
            callback(err, [], 500);
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table : ", JSON.stringify(data, null, 2));
            callback(err, data, 200);
        }
    });

}

/**
 * Drop a table
 * @param {string} table drops a table and all data within
 */
function DeleteTable(table) {
    var params = {
        TableName : table
    };

    dbParent.deleteTable(params, function(err, data) {
        if (err) {
            console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Deleted table : ", JSON.stringify(data, null, 2));
        }
    });
}

// fix this mess!
module.exports.init = function() {

    this.versionTable = VersionTable;
    this.locationsTable = LocationsTable;

    this.query = Query;
    this.scan = Scan;
    this.put = Put;
    this.createTable = CreateTable;
    this.deleteTable = DeleteTable;

    return this;
};