// import React, { Component } from "react";

export default class DataHolder {
  constructor() {
    this.dataContext = {};
  }

  //Get the context object
  static getContext() {
    return this.dataContext;
  }

  //Get the context object
  static setContext(context) {
    this.dataContext = context;
  }
}
//Export the whole Class as a Module
// module.exports = DataHolder;
