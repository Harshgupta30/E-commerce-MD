const { MongoClient } = require('mongodb');
const url = 'mongodb://0.0.0.0:27017';
const client = new MongoClient(url);
const dbName = 'myProject';
client.connect().then(function () {
    db = client.db(dbName);
})
const insert = async(dbname,req,res,user)=>{
    let collection = db.collection(dbname);
    collection.insertOne(user);
}

module.exports = insert;