/*
 *   SOL (Standard Object Library) Base class
 *     Allows for future upgrades at a common level. All classes inherit from this class.
 */
class BaseCore {
  constructor() {}

  //Common logger method TODO Add Winston or other here
  log(s) {
    console.log(s);
  }
}

//Export the whole Class as a Module
module.exports = BaseCore;
