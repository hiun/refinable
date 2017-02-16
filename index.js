var BehaviorStore = require('./behavior-store.js');

function Behavior (initBehaviors) {

  this._args.set(Array.from(arguments));
  this.behaviorStore = new BehaviorStore();

  var self = this;

  if (initBehaviors) {
    if (initBehaviors.data) {

      initBehaviors.data.forEach(function (behavior) {
        self.behaviorStore.appendNewBehavior(behavior);
      })
    }
  }
}

Behavior.prototype = {
  _args: {
    args: [],
    set: function (arr) {
      this.args = arr;
    },
    get: function () {
      return this.args;
    }
  },
  init: function () {
    this._args.set(Array.from(arguments));
    return this;
  },
  exec: function () {

    var initArguments = Array.from(arguments).slice(0, -1);
    var callback = Array.from(arguments).slice(-1)[0];

    var result = this.behaviorStore.execBehavior.apply(this, initArguments);

    callback(result);
  },
  get: function () {
    return this._exec();
  },
  add: function (behavior, name) {

    if (!behavior.name) {
      if (name) {
        behavior.name = name;
      }

      if (!name) {
        throw 'Name Error : Please pass the name of behavior in explicitly in first argument or implicitly within Function or Behavior object';
      }
    }
    
    //add validation for exisiting prorotype method

    //add behavior to array
    //this.behaviors.push({name: behavior.name, behavior: behavior});

    this.behaviorStore.appendNewBehavior({name: behavior.name, behavior: behavior});

    //expose behavior name as a property
    this[behavior.name] = {
      name: behavior.name
    };

    var self = this;
    this[behavior.name] = {};

    this[behavior.name]['name'] = behavior.name;

    var props = Object.keys(Behavior.prototype).concat(Object.keys(this));

    props.forEach(function (trait) {
      if (Behavior.prototype[trait]) {
        self[behavior.name][trait] = Behavior.prototype[trait];        
      }
      if (self[trait]) {
        self[behavior.name][trait] = self[trait];        
      }
    });

    return this;
  },
  update: function (newBehavior) {
    this.behaviorStore.updateBehavior(newBehavior);
  },
  map: function (callback) {
    this.behaviorStore.wrapBehavior(callback);
  },
  delete: function () {
    this.behaviorStore.deleteBehavior(this.name);
  },
  before: function (behavior, name) {
    if (!behavior.name) {
      if (name) {
        behavior.name = name;
      }

      if (!name) {
        throw 'Name Error : Please pass the name of behavior in explicitly in first argument or implicitly within Function or Behavior object';
      }
    }
    insertBehaviorBefore(this.name, behavior);
  },
  after: function (behavior, name) {
    if (!behavior.name) {
      if (name) {
        behavior.name = name;
      }

      if (!name) {
        throw 'Name Error : Please pass the name of behavior in explicitly in first argument or implicitly within Function or Behavior object';
      }
    }
    insertBehaviorAfter(this.name, behavior);
  },
  inherit: function() {
    var child = new Behavior(this.behaviorStore.getAllBehavior());
    //insert current traits to child
    child.behaviors = this.behaviors;
    return child;
  },
  assign: function (traitsObject) {
    behaviorStore.applyTraitsToBehavior(traitsObject);
  }
}

module.exports = Behavior;