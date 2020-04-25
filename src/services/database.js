const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://root:12345678@localhost:27017";

const Database = async () => {
   const dbConnection = await MongoClient.connect(url, {useUnifiedTopology: true });
   return dbConnection.db('mern');
}
module.exports = Database;
