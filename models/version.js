
var db = require('./../config/database').init(),
    api = require('./../controllers/api');

function ApiVersion(version, datetime) {
    this.version = version;
    this.datetime = datetime;
    return this;
}

/**
 * [GetVersion description]
 * @param {Function} callback [description]
 */
function GetVersion (callback) {

    var params = {
        TableName : db.versionTable()
    };

    db.scan(params, callback);
    // db.dbClient.scan(params, function(err, data) {
    //     if (err) {
    //         console.log("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    //         callback(err);
    //     } else {
    //         console.log("Item read: ", JSON.stringify(data, null, 2));
    //         callback(data.Items);
    //     }
    // });
}

/**
 * [SetVersion description]
 * @param {[type]}   version  [description]
 * @param {Function} callback [description]
 */
function SetVersion (version, callback) {

    if (!version) {
        console.log('no version number provided');
        var error = api.error('missing params', 'version number must be provided');
        callback(error, [], 400);
    }

    var datetime = Math.floor((new Date()).getTime()/1000);

    // this should be read from the db to validate?
    // var ver = new ApiVersion(version, datetime);

    var params = {
        TableName: db.versionTable(),
        Item:{
            "version": round(version, 2),
            "datetime": datetime
        }
    };

    db.put(params, callback);

    // db.dbClient.put(params, function(err, data) {
    //     if (err) {
    //         console.log("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    //         callback(err);
    //     } else {
    //         console.log("Added item:", JSON.stringify(data, null, 2));
    //         callback(ver);
    //     }
    // });

}

// helper function to turn string into a number
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

module.exports = {
    getVersion: GetVersion,
    setVersion: SetVersion
};
