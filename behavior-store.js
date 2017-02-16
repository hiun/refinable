var Behaviors = function () {
  this.behaviors = [];
};

Behaviors.prototype = {
  _findAndManipulate: function (name, callback) {
    this.behaviors.forEach(function (behavior) {
      if (behavior.name === name) {
        callback(arguments);
      }
    });
  },
  updateBehavior: function (newBehavior) {
    this._findAndManipulate(newBehavior.name, function (behavior) {
      behavior.behavior = newBehavior;
    });
  },
  insertBehaviorBefore: function (anchorBehaviorName, beforeBehavior) {
    this._findAndManipulate(anchorBehaviorName, function () {
      this.behaviors.forEach(function (behavior, index) {
        if (behavior.name === anchorBehaviorName) {
          this.behaviors.splice(index - 1, 0, beforeBehavior);
        }
      });
    });
  },
  insertBehaviorAfter: function (anchorBehaviorName, afterBehavior) {
    this._findAndManipulate(anchorBehaviorName, function () {
      this.behaviors.forEach(function (behavior, index) {
        if (behavior.name === anchorBehaviorName) {
          this.behaviors.splice(index - 1, 0, afterBehavior);
        }
      });
    });
  },
  deleteBehavior: function (name) {
    this.behaviors.forEach(function (behavior, index) {
      if (behavior.name === name) {
        behaviors.splice(index, 1);
      }
    });
  },
  wrapBehavior: function () {
    this._findAndManipulate(this.name, function (behavior, index) {
      var oriBehavior = this.behaviors[index];
      var newBehavior = callback(oriBehavior);
      oriBehavior = newBehavior;
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

    console.log(this.behaviorStore.behaviors)

    var input = Array.from(arguments);

    this.behaviorStore.behaviors.forEach(function (behavior) {

      //run if bebavior is not null by assign method
      if (behavior !== null) {
        input = behavior.behavior.apply(this, input);
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
    this.behaviorStore.behaviors.forEach(function (behavior) {
      Object.keys(traitsObject).forEach(function (traits) {
        if (behavior.name === traits) {
          self.behaviorStore.behavior = traitsObject[traits];
        }
      })
    });
  }
};

module.exports = Behaviors;