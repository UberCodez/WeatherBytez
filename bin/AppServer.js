/*
 *   Application Server
 *     Third Party Server wrapper for Express Server
 *
 *  TODO: Add error handling
 */
const BaseCore = require("../core/BaseCore");
const express = require("express");

class AppServer extends BaseCore {
  constructor() {
    super();
    this.initialize();
  }

  //Move dynamic vars to config files TODO
  initialize() {
    this.app = express();
    this.port = 3000;
    this.app.use(express.json());
    // this.app.on("error", this.onError);
    // this.app.on("listening", this.onListening);
    this.app.listen(process.env.PORT || this.port, () =>
      console.log(`WeatherBytes app is listening on port ${this.port}!`)
    );
  }

  //Set our routes for our endpoints
  //Each API controller holds the endpoint definitions
  setRoutes(router) {
    this.app.use(router);
  }

  // Event listener for HTTP server "error" event.
  //   onError(error) {
  //     if (error.syscall !== "listen") {
  //       throw error;
  //     }

  //     var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  //     // handle specific listen errors with friendly messages
  //     switch (error.code) {
  //       case "EACCES":
  //         console.error(bind + " requires elevated privileges");
  //         process.exit(1);
  //         break;
  //       case "EADDRINUSE":
  //         console.error(bind + " is already in use");
  //         process.exit(1);
  //         break;
  //       default:
  //         throw error;
  //     }
  //   }

  //   //Event listener for HTTP server "listening" event.
  //   onListening() {
  //     var addr = server.address();
  //     var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  //     console.debug("Listening on " + bind);
  //   }
}

module.exports = AppServer;
