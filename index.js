function Logic () {
  this._args.set(Array.from(arguments));
  this.logics = [];
}

Logic.prototype = {
  _args: {
    args: [],
    set: function (arr) {
      this.args = arr;
    },
    get: function () {
      return this.args;
    }
  },
  _findAndManipulate: function (name, callback) {
    this.logics.forEach(function (logic) {
      if (logic.name === name) {
        callback(arguments);
      }
    });
  },
  init: function () {
    this._args.set(Array.from(arguments));
    //this.args = Array.from(arguments);
    return this;
  },
  _exec: function () {
    var input = this._args.get();
    this.logics.forEach(function (logic) {
      input = logic.logic.apply(this, input);
    });
    return input;
  },
  exec: function (callback) {
    //var input = this.args;
    callback(this._exec());
  },
  get: function () {
    return this._exec();
  },
  add: function (name, logic) {
    
    //add validation for exisiting prorotype method

    this.logics.push({name: name, logic: logic});
    Logic[name] = name;
    Logic[name].prototype = Logic.prototype;

    this.prototype[name] = {
      update: Logic.update,
      map: Logic.map,
      delete: Logic.delete,
      before: Logic.before,
      after: Logic.after
    }

    return this;
  },
  update: function (name, newLogic) {
    this._findAndManipulate(name, function (logic) {
      logic.logic = newLogic;
    })
  },
  map: function (callback) {
    this._findAndManipulate(this.name, function (logic, index) {
      var oriLogic = this.logics[index];
      var newLogic = callback(oriLogic);
      oriLogic = newLogic;
    });
  }
  delete: function () {
    this._findAndManipulate(this.name, function (logic, index) {
      this.logics.splice(index, 1);
    });
  },
  before: function (newLogic) {
    this._findAndManipulate(this.name, function (logic, index) {
      this.logics.splice(index - 1, 0, newLogic);
    });
    
  },
  after: function (newLogic) {
    this._findAndManipulate(this.name, function (logic, index) {
      this.logics.splice(index + 1, 0, newLogic);
    });
  },
  inherit: function() {

    var child = new Logic();
    child.prototype = Logic.prototype;
    child.logics = this.logics;

    return child;
  }
}

module.exports = Logic;