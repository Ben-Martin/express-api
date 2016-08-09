


var db = require('./../config/database').init(),
    api = require('./../controllers/api');
var logName = 'MIGRATION : ';

/**
 * Create tables
 */

CreateVersionTable = function(callback) {

    // create version table
    var params = {
        TableName : db.versionTable(),
        KeySchema: [       
            { AttributeName: 'version', KeyType: "HASH"},  //Partition key
            { AttributeName: 'datetime', KeyType: "RANGE"}
        ],
        AttributeDefinitions: [       
            { AttributeName: 'version', AttributeType: 'N' },
            { AttributeName: 'datetime', AttributeType: 'N' }
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 5, 
            WriteCapacityUnits: 5
        }
    };

    db.createTable(params, callback);
    
};

CreateLocationsTable = function(callback) {
    // LocationData
    var params = {
        TableName : db.locationsTable(),
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
    db.createTable(params, callback);
    //  {
    //     if (err) {
    //         console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    //         callback(err);
    //     } else {
    //         console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    //         callback(data);
    //     }
    // });

    // return 'ok';
    
};


module.exports = {
    createVersionTable: CreateVersionTable,
    createLocationsTable: CreateLocationsTable
};

