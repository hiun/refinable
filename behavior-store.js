/**
 * Constructor for new behaviorStore instance, stores behaviors array
 *
 * @public
 */

var Behaviors = function () {
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
 * @private
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
 * @private
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
 * @private
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
 * Insert behavior after in specified behavior
 *
 * @param {String} name of anchor behavior.
 * @param {Object} behavior object to be inserted.
 * @private
 */

Behaviors.prototype.deleteBehavior: function (name) {
  var self = this;
  this._findAndManipulate(name, function (index) {
    self.behaviors.splice(index, 1);
  });
};


Behaviors.prototype = {
  wrapBehavior: function (name, callback) {
    var self = this;
    this._findAndManipulate(name, function (index) {
      var oriBehavior = self.behaviors[index];
      //console.log('ori--------------------')
      //console.log(oriBehavior.behavior.toString())
      var newBehavior = callback(oriBehavior.behavior);
      //console.log(newBehavior.toString())
      newBehavior.name = name;

      self.behaviors[index] = {
        name : name,
        behavior: newBehavior
      };

      console.log(index)
      console.log(self.behaviors[1].behavior.toString())
      //console.log(self.behaviors[2].behavior)
      //console.log(self.behaviors)

    });
  },
  appendNewBehavior: function (arg) {
    this.behaviors.push(arg);
  },
  getAllBehavior: function () {
    return {
      data: this.behaviors
    }
  },
  execBehavior: function () {

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
  },
  applyTraitsToBehavior: function (traitsObject) {
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
    console.log(self.behavior);
  }
};

module.exports = Behaviors;