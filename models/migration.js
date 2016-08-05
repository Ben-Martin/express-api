var AWS = require("aws-sdk");
var cfg = require("./../config");

AWS.config.update({
    region:cfg.region,
    endpoint: cfg.endpoint
});

var docClient = new AWS.DynamoDB.DocumentClient();

/**
 * Create tables
 */
var dynamodb = new AWS.DynamoDB();

var logName = 'MIGRATION : ';

CreateVersionTable = function(callback) {

    var tableName = 'Version';

    console.log(logName + 'deleting table ' + tableName);
    DeleteTable(tableName);

    // LocationData
    var params = {
        TableName : tableName,
        KeySchema: [       
            { AttributeName: 'version', KeyType: "HASH"},  //Partition key
        ],
        AttributeDefinitions: [       
            { AttributeName: 'version', AttributeType: 'N' }
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 5, 
            WriteCapacityUnits: 5
        }
    };

    CreateTable(tableName, params, function onComplete(data) {
        callback(data);
    });
    
};

CreateLocationsTable = function() {
    // LocationData
    var params = {
        TableName : 'LocationData',
        KeySchema: [       
            { AttributeName: 'user_guid', KeyType: "HASH"},  //Partition key
            { AttributeName: 'datetime', KeyType: "RANGE" }  //Sort key
        ],
        AttributeDefinitions: [       
            { AttributeName: 'user_guid', AttributeType: 'S' },
            { AttributeName: 'datetime', AttributeType: 'N' }
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 5, 
            WriteCapacityUnits: 5
        }
    };

    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });

    return 'ok';
    
};

function CreateTable (table, params, callback) {

    dynamodb.createTable(params, function(err, data) {

        // validate the table was created successfully
        if (err) {
            callback(err);
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            callback('ok');
        }
    });

}

function DeleteTable(table) {
    var params = {
        TableName : table
    };

    dynamodb.deleteTable(params, function(err, data) {
        if (err) {
            console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}


module.exports = {
    createVersionTable: CreateVersionTable,
    createLocationsTable: CreateLocationsTable
};

