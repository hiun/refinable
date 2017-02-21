/*!
 * self
 * Copyright(c) 2017 Hiun Kim
 * MIT Licensed
 */

/**
 * Expose Behaviors()
 */

module.exports = Behaviors;

/**
 * Constructor for new behaviorStore instance, stores behaviors array
 *
 * @public
 */

function Behaviors () {
  this.behaviors = [];
};

/**
 * Find and return index of target behavior
 *
 * @param {String} name of target behavior.
 * @param {Function} callback function for custom manipulation.
 * @private
 */

Behaviors.prototype._findAndManipulate = function (name, callback) {
  this.behaviors.forEach(function (behavior, index) {
    if (behavior.name === name) {
      callback(index);
    }
  });
};

/**
 * Update specified behavior
 *
 * @param {Function|Object} New function or behavior object to update.
 * @public
 */

 Behaviors.prototype.updateBehavior = function (newBehavior) {
  var self = this;
  this._findAndManipulate(newBehavior.name, function (index) {
  self.behaviors[index] = {
                            name: newBehavior.name, 
                            behavior: newBehavior
                          };
  });
};

/**
 * Insert behavior before in specified behavior
 *
 * @param {String} name of anchor behavior.
 * @param {Object} behavior object to be inserted.
 * @public
 */

Behaviors.prototype.insertBehaviorBefore = function (anchorBehaviorName, beforeBehavior) {
  var self = this;
  this._findAndManipulate(anchorBehaviorName, function (index) {
    self.behaviors.splice(index, 0, {
                            name: beforeBehavior.name, 
                            behavior: beforeBehavior
                          });
  });
};

/**
 * Insert behavior after in specified behavior
 *
 * @param {String} name of anchor behavior.
 * @param {Object} behavior object to be inserted.
 * @public
 */

Behaviors.prototype.insertBehaviorAfter = function (anchorBehaviorName, afterBehavior) {
  var self = this;
  this._findAndManipulate(anchorBehaviorName, function (index) {
    //plus one for inserting after index
    self.behaviors.splice(index + 1, 0, {
                            name: afterBehavior.name, 
                            behavior: afterBehavior
                          });
  });
};

/**
 * Delete specified behavior
 *
 * @param {String} name of target behavior.
 * @public
 */

Behaviors.prototype.deleteBehavior = function (name) {
  var self = this;
  this._findAndManipulate(name, function (index) {
    self.behaviors.splice(index, 1);
  });
};

/**
 * Wrap a behavior
 *
 * @param {String} name of anchor behavior.
 * @param {Function} a callback function for manipulaiton.
 * @public
 */

Behaviors.prototype.wrapBehavior = function (name, callback) {
    var self = this;
    this._findAndManipulate(name, function (index) {
      var oriBehavior = self.behaviors[index];
      var newBehavior = callback(oriBehavior.behavior);

      newBehavior.name = name;

      self.behaviors[index] = {
        name : name,
        behavior: newBehavior
      };
    });
  };

/**
 * Append new behavior
 *
 * @param {Object} new behavior object
 * @public
 */

Behaviors.prototype.appendNewBehavior = function (newBehaviorObj) {
  this.behaviors.push(newBehaviorObj);
};

/**
 * Get all behavior
 *
 * @return {Object} object
 * @return {Object[]} object.data - Array of behavior object.
 * @public
 */

Behaviors.prototype.getAllBehavior = function () {
  return {
    data: this.behaviors
  };
};

/**
 * Execute all sub-behaviors
 *
 * @param {String} name of anchor behavior.
 * @param {Function} a callback function for manipulaiton.
 * @public
 */

Behaviors.prototype.execBehavior = function () {

 var input = Array.from(arguments);

 this.behaviors.forEach(function (behavior) {

   //run if bebavior is not null by assign method
   if (behavior !== null) {
     input = behavior.behavior.apply(null, input);
   }

   if (!Array.isArray(input)) {
     input = [input];
   }
 });
 
  if (Array.isArray(input) && input.length === 1) {
    return input[0];
  } else {
    return input;
  }
};

/**
 * Apply traits to behavior
 *
 * @param {Object} traits object.
 * @public
 */

Behaviors.prototype.applyTraitsToBehavior = function (traitsObject) {
  var self = this;
  this.behaviors.forEach(function (behavior, index) {
    Object.keys(traitsObject).forEach(function (traits) {
      if (behavior.name === traits) {
        self.behaviors[index] = {
                                  name : traitsObject[traits].name,
                                  behavior: traitsObject[traits]
                                };
      }
    });
  });
};