/*!
 * self
 * Copyright(c) 2016-2017 Hiun Kim
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var BehaviorStore = require('./behavior-store.js');

/**
 * Expose Behavior()
 */

module.exports = Behavior;

/**
 * Create new behavior instance optionally given sub-behaviors.
 *
 * @param {Object} initBehaviors
 * @param {Object[]} initBehaviors.data - Array of sub-behaviors.
 * @param {String} initBehaviors.data[].name - Name of sub-behavior.
 * @param {String} initBehaviors.data[].behavior - Function or behavior.
 * @public
 */

function Behavior (initBehaviors) {

  this.behaviorStore = new BehaviorStore();

  var self = this;

  if (initBehaviors) {
    if (initBehaviors.data) {

      initBehaviors.data.forEach(function (behavior) {
        self.behaviorStore.appendNewBehavior(behavior);
      });
    }
  }
}

/**
 * Add new behavior
 *
 * @param {Function|Object} New function or behavior object.
 * @param {String} name of behavior (optional)
 * @public
 */

 Behavior.prototype.add = function (behavior, name) {

   if (!behavior.name) {
     if (name) {
       behavior.name = name;
     }

     if (!name) {
       throw 'Name Error : Please pass the name of behavior in explicitly in first argument or implicitly within Function or Behavior object';
     }
   }
   
   //add behavior to array
   this.behaviorStore.appendNewBehavior({name: behavior.name, behavior: behavior});

   //expose behavior name as a property
   this[behavior.name] = {
     name: behavior.name
   };


   //add method for user manipulation
   var self = this;
   this[behavior.name] = {};

   this[behavior.name]['name'] = behavior.name;

   var props = Object.keys(Behavior.prototype);

   props.forEach(function (trait) {
     if (Behavior.prototype[trait]) {
       self[behavior.name][trait] = Behavior.prototype[trait];        
     }
     if (self[trait]) {
     }
   });

   self[behavior.name]['behaviorStore'] = self['behaviorStore'];        

   return this;
 };

 /**
 * Add new behavior before specified behavior
 *
 * @param {Function|Object} New function or behavior object.
 * @param {String} name of behavior (optional)
 * @public
 */

Behavior.prototype.before = function (behavior, name) {
  if (!behavior.name) {
    if (name) {
      behavior.name = name;
    }

    if (!name) {
      throw 'Name Error : Please pass the name of behavior in explicitly in first argument or implicitly within Function or Behavior object';
    }
  }
  this.behaviorStore.insertBehaviorBefore(this.name, behavior);
  return this;
};

/**
 * Add new behavior after specified behavior
 *
 * @param {Function|Object} New function or behavior object.
 * @param {String} name of behavior (optional)
 * @public
 */

Behavior.prototype.after = function (behavior, name) {
  if (!behavior.name) {
    if (name) {
      behavior.name = name;
    }

    if (!name) {
      throw 'Name Error : Please pass the name of behavior in explicitly in first argument or implicitly within Function or Behavior object';
    }
  }
  this.behaviorStore.insertBehaviorAfter(this.name, behavior);
  return this;
 };

/**
 * Update specified behavior with given behavior
 *
 * @param {Function|Object} New function or behavior object.
 * @public
 */

Behavior.prototype.update = function (newBehavior) {
  this.behaviorStore.updateBehavior(newBehavior);
  return this;
};

/**
 * Wrap specified behavior with given function-returning function
 *
 * @param {Function} A function for manipulating behavior.
 * @return {Function} A wrapped function which contains original behavior
 * @public
 */

Behavior.prototype.map = function (callback) {
  this.behaviorStore.wrapBehavior(this.name, callback);
  return this;
};

/**
 * Delete specified behavior
 *
 * @public
 */

Behavior.prototype.delete = function () {
  this.behaviorStore.deleteBehavior(this.name);
  return this;
};

/**
 * Execute behavior
 *
 * @param {...*} argumenets for execution.
 * @param {Function} handler to callback
 * @public
 */

Behavior.prototype.exec = function () {

  var initArguments = Array.from(arguments).slice(0, -1);
  var callback = Array.from(arguments).slice(-1)[0];

  var result = this.behaviorStore.execBehavior.apply(this.behaviorStore, initArguments);

  callback(result);
};

/**
 * Create inherited behavior
 *
 * @public
 */

Behavior.prototype.inherit = function () {
  var child = new Behavior(this.behaviorStore.getAllBehavior());
  //insert current traits to child
  child.behaviors = this.behaviors;

  var self = this;

  var props = Object.keys(Behavior.prototype).concat(Object.keys(this));

  props.forEach(function (trait) {
    if (Behavior.prototype[trait]) {
      child[trait] = Behavior.prototype[trait];        
    }
    if (self[trait]) {
      child[trait] = self[trait];        
    }
  });

  return child;
};

/**
 * Apply traits to behavior
 *
 * @param {Object} traits object
 * @public
 */

Behavior.prototype.assign = function (traitsObject) {
  this.behaviorStore.applyTraitsToBehavior(traitsObject);
  return this;
};

/**
 * Define new method
 *
 * @param {String} method name
 * @param {Function} method function
 * @public
 */

Behavior.prototype.defineMethod = function (methodName, method) {
  Behavior.prototype[methodName] = method;
}