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
