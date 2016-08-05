
var db = require('./../config/database').init();

function ApiVersion(version, datetime) {
    this.version = version;
    this.datetime = datetime;
    return this;
}

function VersionTable() {
    return db.versionTable;
}

function GetVersion (callback) {

    var params = {
        TableName : VersionTable()
    };

    db.dbClient.scan(params, function(err, data) {
        if (err) {
            console.log("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            callback(err);
        } else {
            console.log("Item read: ", JSON.stringify(data, null, 2));
            callback(data.Items);
        }
    });
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function SetVersion (version, callback) {

    if (!version) {
        console.log('setting a default version number');
        version = cfg.version;
    }

    var datetime = Math.floor((new Date()).getTime()/1000);

    // this should be read from the db to validate?
    var ver = new ApiVersion(version, datetime);

    var params = {
        TableName: VersionTable(),
        Item:{
            "version": round(version, 2),
            "datetime": datetime
        }
    };

    db.dbClient.put(params, function(err, data) {
        if (err) {
            console.log("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            callback(err);
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            callback(ver);
        }
    });

}

module.exports = {
    getVersion: GetVersion,
    setVersion: SetVersion
};
