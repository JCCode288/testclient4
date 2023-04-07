const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const uri = process.env.URI_DATABASE;
const client = new MongoClient(uri);
let database;

module.exports = {
  connection: async () => {
    try {
      database = await client.db("somelogoDB");

      console.log("connected to somelogo");
    } catch {
      await client.close();
    }
  },
  getDb: () => database,
};
