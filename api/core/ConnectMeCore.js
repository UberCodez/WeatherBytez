/*
 *   Connection 'singleton' class for DB and other connections
 *     Simple connection manager
 */
const MongoClient = require("mongodb").MongoClient;
const BaseCore = require("./BaseCore");

class ConnectMeCore extends BaseCore {
  constructor() {}

  //Common connection to external DBs
  static async connectDb() {
    //If MongoDB is already connected, return db object
    if (this.dbClient) {
      const currDbClient = Promise.resolve(this.dbClient);
      console.log(`MongoDB already connected!`);
      return currDbClient;
    }
    //Otherwise connect using 'await', the whole method is async
    else {
      try {
        const newDbClient = await MongoClient.connect(this.url, this.options);
        console.log(`DB is connected? ${newDbClient.isConnected()}`);
        this.dbClient = newDbClient;
        return newDbClient;
      } catch (error) {
        console.error(`MongoDB connection failed with > ${error}`);
        throw error;
      }
    }
  }

  //Check connection status
  static isConnected() {
    return !!this.dbClient && this.dbClient.isConnected();
  }

  //Close DB connection to MongoDb
  static closeDb() {
    //Do any cleanup and close DB connection
    if (this.isConnected()) {
      this.dbClient.close().then(function(db) {
        console.log(`MongoDB connection closed successfully!`);
      });
    }
  }
}

//Connection variables
ConnectMeCore.dbClient = null;
//Local MongoDB
//ConnectMeCore.url = "mongodb://localhost:27017/weatherDB";
//Remote Azure Cosmos (Prod)
ConnectMeCore.url =
  "mongodb://ubercodez:NxHmj4IBFArs0OhdokvxneqTJEi8IfbEbOMaJRojCVNQZDWH0J75LoGhT0IjaDtL5T7c7f6RSAkEqiNfTTdEOA%3D%3D@ubercodez.documents.azure.com:10255/weatherDB/?ssl=true";
ConnectMeCore.options = {
  bufferMaxEntries: 0,
  reconnectTries: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

//Export the whole Class as a Module
module.exports = ConnectMeCore;
