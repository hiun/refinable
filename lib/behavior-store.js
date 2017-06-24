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

function Behaviors (initArr) {
  if (Array.isArray(initArr)) {
    this.behaviors = initArr;
  } else {
    this.behaviors = [];    
  }
};

/**
 * Find and return index of target behavior
 *
 * @param {String} name of target behavior.
 * @param {Function} callback function for custom manipulation.
 * @private
 */

Behaviors.prototype._findAndManipulate = function (name, callback) {
  this.behaviors.forEach((behavior, index) => {
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
  this._findAndManipulate(newBehavior.name, (index) => {
    this.behaviors[index] = {
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
  this._findAndManipulate(anchorBehaviorName, (index) => {
    this.behaviors.splice(index, 0, {
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
  this._findAndManipulate(anchorBehaviorName, (index) => {
    //plus one for inserting after index
    this.behaviors.splice(index + 1, 0, {
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
  this._findAndManipulate(name, (index) => {
    this.behaviors.splice(index, 1);
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
  this._findAndManipulate(name, (index) => {
    var oriBehavior = this.behaviors[index];
    var newBehavior = callback(oriBehavior.behavior);

    newBehavior.name = name;

    this.behaviors[index] = {
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
  return Object.assign({}, {
    data: this.behaviors
  });
};

/**
 * Execute all sub-behaviors
 *
 * @param {String} name of anchor behavior.
 * @param {Function} a callback function for manipulaiton.
 * @public
 */

Behaviors.prototype.execBehavior = async function execBehavior (...input) {

  //for each behavior
  //use for..of to cover use of async await
  for (behavior of this.behaviors) {

      var hostBehavior = behavior.behavior;

      //if single behavior exist (not multiple & not assigned null by .assign)
      if (hostBehavior !== null) {

        //for behavior of promise and native function
        if (typeof hostBehavior === 'function') {

          //exec promise or native function
          result = hostBehavior.apply(null, input);
          
          //if function returns promise
          if (typeof result.then === 'function') {

            input = await hostBehavior.apply(null, input);

          } 

          //if function is not promise
          else {
            //perform assign after computation complete
            input = [result];
          }

        }

        //if behavior has sub behavior
        else if (Array.isArray(hostBehavior)) {

          //setting up context
          var context = this;
          context['behaviors'] = hostBehavior;

          //resursive
          //explicit error handling to prevent error shallow of promise
          try {
            input = await execBehavior.apply(context, input);            
          } catch (e) {
            throw e;
          }

        }


      }

      //formatting to array after finish execution
      if (!Array.isArray(input)) {
        input = [input];
      }
  }

  //return final reult
  return input;
};

/**
 * Apply traits to behavior
 *
 * @param {Object} traits object.
 * @public
 */

Behaviors.prototype.applyTraitsToBehavior = function (traitsObject) {
  this.behaviors.forEach((behavior, index) => {
    Object.keys(traitsObject).forEach((traits) => {
      if (behavior.name === traits) {
        this.behaviors[index] = {
                                  name : traitsObject[traits].name,
                                  behavior: traitsObject[traits]
                                };
      }
    });
  });
};