/*
 *   Application Server
 *     Third Party Server wrapper for Express Server
 *
 *  TODO: Add error handling
 */
const BaseCore = require("../api/core/BaseCore");
const express = require("express");
const cors = require("cors");
const path = require("path");

class AppServer extends BaseCore {
  constructor() {
    super();
    this.initialize();
  }

  //Move dynamic vars to config files TODO
  initialize() {
    this.app = express();
    this.port = 5000;
    this.app.use(express.json());
    //this.app.use(cors());
    this.app.listen(process.env.PORT || this.port, () =>
      console.log(`WeatherBytes app is listening on port ${this.port}!`)
    );
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  //Set our routes for our endpoints
  //Each API controller holds the endpoint definitions
  setRoutes(router) {
    this.app.use(router);
  }
}

module.exports = AppServer;
