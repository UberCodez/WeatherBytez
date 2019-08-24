/*
 *   SOL (Standard Object Library) Service class
 *     Allows for future upgrades at a common level.
 */
const BaseCore = require("../core/BaseCore");

class BaseService extends BaseCore {
  constructor() {
    super();
  }
}

//Export the whole Class as a Module
module.exports = BaseService;
