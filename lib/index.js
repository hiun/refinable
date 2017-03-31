/*!
 * self
 * Copyright(c) 2016-2017 Hiun Kim
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var BehaviorStore = require('./behavior-store.js');
const EventEmitter = require('events');

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
 * @param {Function|Object} initBehaviors.data[].behavior - Function or behavior.
 * @public
 */


function Behavior (initBehaviors) {

  this.behaviorStore = new BehaviorStore();

  //var self = this;

  if (initBehaviors) {
    if (initBehaviors.data) {

      initBehaviors.data.forEach((behavior) => {
        this.behaviorStore.appendNewBehavior(behavior);
      });
    }
  }

  //create catchEvent to support .catch
  this.catchEvent = new EventEmitter;
}

/**
 * Add new behavior
 *
 * @param {Function|Object} New function or behavior object.
 * @param {String} name of behavior (if function name does not exist)
 * @public
 */

 Behavior.prototype.add = function (behavior, name) {

  var newBehavior;

  if (typeof behavior === 'function') {

    if (!behavior.name) {
      if (name) {
        Object.defineProperty(behavior, 'name', {value:  name});
      } else {
        throw 'Name Error : Please pass the name of behavior in second argument or pass named function';
      }
    }

    newBehavior = {name: behavior.name, behavior: behavior};

  } 

  else {
    //if object insert copy of entire behavior into newBehavior
    var hardcopiedBehavior = behavior.behaviorStore.behaviors.slice();
    newBehavior = {name: name, behavior: hardcopiedBehavior};
  }

   //add behavior to array
   this.behaviorStore.appendNewBehavior(newBehavior);

   //expose behavior name as a property
  this[newBehavior.name] = {
    name: newBehavior.name
  };

  var props = Object.keys(Behavior.prototype);

  //add method for user manipulation
  props.forEach((trait) => {
    if (Behavior.prototype[trait]) {
      this[newBehavior.name][trait] = Behavior.prototype[trait];        
    }
  });

  //binding behavior store to allow manipulation
  this[newBehavior.name]['behaviorStore'] = this['behaviorStore'];      

  //if new sub-behavior is behavior object,
  //add method for each exposed sub-behavior property in behavior object
  if (behavior instanceof Behavior) {

  //make hardcopy of all sub-behavior
  var arr = behavior.behaviorStore.behaviors.slice();

  //create new cloned behavior store for storing
  //to support independent further refinement
  var clonedBehaviorStore = new BehaviorStore(arr);

  //expose newly created sub-behavior into mathod property
  //to support user-level manipulation
  Object.keys(behavior).forEach((subBehavior) => {

    this[newBehavior.name][subBehavior] = {};

    props.forEach((method) => {

     if (Behavior.prototype[method]) {

        //binding 'this' scope of inserted behavior, to allow consolidated pointing to original behavior store
        this[newBehavior.name][subBehavior][method] = Behavior.prototype[method].bind({behaviorStore: clonedBehaviorStore});
      }
    });

  });

  }

   return this;
 };

 /**
 * Add new behavior before specified behavior
 *
 * @param {Function|Object} New function or behavior object.
 * @param {String} name of behavior (if function name does not exist)
 * @public
 */

Behavior.prototype.before = function (behavior, name) {
  if (!behavior.name) {
    if (name) {
      behavior.name = name;
    } else {
      throw 'Name Error : Please pass the name of behavior in second argument or pass named function';
    }
  }
  this.behaviorStore.insertBehaviorBefore(this.name, behavior);
  return this;
};

/**
 * Add new behavior after specified behavior
 *
 * @param {Function|Object} New function or behavior object.
 * @param {String} name of behavior (if function name does not exist)
 * @return {Behavior} for chaining
 * @public
 */

Behavior.prototype.after = function (behavior, name) {
  if (!behavior.name) {
    if (name) {
      behavior.name = name;
    } else {
      throw 'Name Error : Please pass the name of behavior in second argument or pass named function';
    }
  }
  this.behaviorStore.insertBehaviorAfter(this.name, behavior);
  return this;
 };

/**
 * Update specified behavior with given behavior
 *
 * @param {Function|Object} New function or behavior object.
 * @return {Behavior} for chaining
 * @public
 */

Behavior.prototype.update = function (newBehavior) {

  var proc = () => {
    this.behaviorStore.updateBehavior(newBehavior);
    return this;
  };

  if (typeof newBehavior === 'function') {
    //if behavior is native function 

    proc();
  } else if (newBehavior instanceof Behavior) {
    //if formed as behavior object

    if (typeof newBehavior.behavior === 'function'|| Array.isArray(newBehavior.behavior)) {
      proc();
    }
  } else {
    throw 'Type Error : ';
  }

  return this;
};

/**
 * Wrap specified behavior with given function-returning function
 *
 * @param {Function} A function for manipulating behavior, this function wraps function which contains original behavior
 * @return {Behavior} for chaining
 * @public
 */

Behavior.prototype.map = function (callback) {
  if (typeof callback === 'function') {
    this.behaviorStore.wrapBehavior(this.name, callback);
    return this;
  } else {
    throw 'Type Error : ';
  }
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
 * Serially invoke sub-behavior in array
 *
 * @param {...*} argumenets for execution.
 * @return {Behavior} for chaining
 * @public
 */

Behavior.prototype.exec = async function () {

  var initArguments = Array.prototype.slice.call(arguments);

  return await this.behaviorStore.execBehavior.apply(this.behaviorStore, initArguments).then((result) => {
    return result;
  }).catch((e) => {
    //console.log(e);
    //throw new Error(e);
    //this.catchEvent.emit('error', e);
    return Promise.reject(e);
  });

  //return result;

};

/**
 * Catch errors while invoking promise
 *
 * @param {Function} Function to perform error handling
 * @return {Behavior} for chaining
 *
 * @public
 */

Behavior.prototype.catch = function (errorHdrFn) {
  //receive event
  console.log('catch statement invoked')
  this.catchEvent.on('error', (e) => {
    console.log('error detected : ', e)
    errorHdrFn.call(null, e);    
  });

  return this;
};

/**
 * Create inherited behavior. The inherited behavior is deep clone of parant behavior and does not reference or link any property
 *
 * @return {Behavior} deeply cloned instance of behavior
 * @public
 */

Behavior.prototype.new = function () {

  var child = new Behavior(this.behaviorStore.getAllBehavior());

  //insert current traits to child
  //adding prototype
  //and adds behavior property and behaviorStore
  var props = Object.keys(Behavior.prototype).concat(Object.keys(this));

  props.forEach((trait) => {
    if (Behavior.prototype[trait]) {
      child[trait] = Behavior.prototype[trait];        
    }


    //do not copy behaviorStore & catchEvent instance
    if (this[trait] && trait !== 'behaviorStore' && trait !== 'catchEvent') {
      child[trait] = this[trait];        
    }
    
  });

  return child;
};

/**
 * Apply traits to behavior Traits means set of object-independent, composable behavior
 * Traits override existing sub-behavior with given sub-behavior by name
 *
 * @param {Object} traits object
 * @return {Behavior} for chaining
 * @public
 */

Behavior.prototype.assign = function (traitsObject) {
  if (typeof traitsObject === 'object') {
    this.behaviorStore.applyTraitsToBehavior(traitsObject);
    return this;
  } else {
    throw 'Type Error : ';
  }
  return this;
};

/**
 * Define new method for perform refinement of sub-behavior contained array directly
 *
 * @param {String} method name
 * @param {Function} method function
 * @return {Behavior} for chaining
 * @public
 */

Behavior.prototype.defineMethod = function (methodName, method) {
  Behavior.prototype[methodName] = method.bind(this);
  return this;
};