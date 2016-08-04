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

CreateLocationsTable = function() {

    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });

    return 'ok';
    
};


module.exports = {
    createLocationsTable: CreateLocationsTable
};

