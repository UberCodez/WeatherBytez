/*
 *   SOL (Standard Object Library) Controller class
 *     Allows for future upgrades at a common level.
 */
const BaseCore = require("../core/BaseCore");

class BaseController extends BaseCore {
  constructor() {
    super();
  }
}

//Export the whole Class as a Module
module.exports = BaseController;
