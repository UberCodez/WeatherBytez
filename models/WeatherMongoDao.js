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
  storeWeatherForecast(jsonObj) {
    //Once we have the async DB connection, continue to Insert
    DbConnection.connectDb().then(() => {
      //Get the DB, then insert into the Collection
      const myDBO = DbConnection.dbClient.db("weatherDB");
      myDBO.collection("forecasts").insertOne(jsonObj, (err, results) => {
        //Check results of DB Insert
        if (err) console.error(`Error occurred > ${err.errmsg}`);
        else console.log(`Inserted ${results.insertedCount} document!`);

        //Close DB connection
        DbConnection.closeDb();
      });
    });
  }

  //Retrieve all the Weather forecast queries
  retrieveWeatherForecasts() {}
}

//Export the whole Class as a Module
module.exports = WeatherMongoDao;
