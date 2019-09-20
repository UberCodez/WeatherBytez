/*
 *   Weather MongoDB DAO
 *     Third Party Database wrapper for DB CRUD
 *     Wraps MongoDb to encapsulate the implementation,
 *     allowing us to change APIs if needed in the future
 *
 *  TODO: Add error handling
 */
const BaseDao = require("./BaseDao");
const DbConnection = require("../core/ConnectMeCore");

class WeatherMongoDao extends BaseDao {
  constructor() {
    super();
  }

  //Store the current Weather forecast query
  async storeWeatherForecast(jsonObj) {
    try {
      //Once we have the async DB connection, continue to Insert
      await DbConnection.connectDb();
      //Get the DB, then insert into the Collection
      const myDBO = DbConnection.dbClient.db("weatherDB");
      myDBO.collection("forecasts").insertOne(jsonObj, (err, results) => {
        //Check results of DB Insert
        if (err) console.error(`Error occurred > ${err.errmsg}`);
        else console.log(`Inserted ${results.insertedCount} document!`);

        //Close DB connection
        DbConnection.closeDb();
        return results;
      });
    } catch (error) {
      console.error(`An error occurred in DAO${error}`);
      throw error;
    }
  }

  //Retrieve all the Weather forecast queries made
  async getForecasts() {
    await DbConnection.connectDb();
    try {
      //Get the DB, then insert into the Collection
      const myDBO = DbConnection.dbClient.db("weatherDB");
      const cursor = await myDBO
        .collection("forecasts")
        .find()
        .sort({ $natural: -1 }); //Ascending order by last added
      const results = await cursor.toArray();

      //Close DB connection
      DbConnection.closeDb();
      console.log(`Found ${results.length} documents!`);
      return results;
    } catch (error) {
      console.error(`An error occurred in DAO${error}`);
      DbConnection.closeDb();
      throw error;
    }
  }
}

//Export the whole Class as a Module
module.exports = WeatherMongoDao;
