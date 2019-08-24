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

  //Retrieve all the Weather forecast queries made
  getForecasts() {
    //Once we have the async DB connection
    const prom = new Promise((err, results) => {
      const tmparray = [
        { name: "City", temp: "75", cond: "Light Rain" },
        { name: "City", temp: "75", cond: "Light Rain" },
        { name: "City", temp: "75", cond: "Light Rain" }
      ];
      results = tmparray;
      return results;
    });

    // return DbConnection.connectDb().then(() => {
    //   //Get the DB, then insert into the Collection
    //   const myDBO = DbConnection.dbClient.db("weatherDB");
    //   const cursor = myDBO.collection("forecasts").find();
    //   return cursor.toArray((err, results) => {
    //     //Check results
    //     if (err) console.error(`Error occurred > ${err.errmsg}`);
    //     else console.log(`Found ${results.length} documents!`);

    //     //Close DB connection
    //     DbConnection.closeDb();
    //     return results;
    //   });
    // });
  }
}

//Export the whole Class as a Module
module.exports = WeatherMongoDao;
