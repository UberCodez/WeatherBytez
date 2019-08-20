/*
 *   SOL (Standard Object Library) Data Access Object (DAO) class
 *     Allows for future upgrades at a common level.
 */
const BaseCore = require("../core/BaseCore");

class BaseDao extends BaseCore {
  constructor() {
    super();
  }
}

//Export the whole Class as a Module
module.exports = BaseDao;
