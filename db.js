var url = '<insetYourDbURL>';
var MongoClient = require('mongodb').MongoClient;
function getDb() {
    return MongoClient.connect(url).then(function (db) {
        console.log("Connected successfully to server");
        return db;
    })
}
module.exports = getDb();