var Behaviors = function () {
  this.behaviors = [];
};

Behaviors.prototype = {
  _findAndManipulate: function (name, callback) {
    this.behaviors.forEach(function (behavior, index) {
      if (behavior.name === name) {
        callback(index);
      }
    });
  },
  updateBehavior: function (newBehavior) {
    var self = this;
    this._findAndManipulate(newBehavior.name, function (index) {
    self.behaviors[index] = {
                              name: newBehavior.name, 
                              behavior: newBehavior
                            };
    });
  },
  insertBehaviorBefore: function (anchorBehaviorName, beforeBehavior) {
    var self = this;
    this._findAndManipulate(anchorBehaviorName, function (index) {
      self.behaviors.splice(index, 0, {
                              name: beforeBehavior.name, 
                              behavior: beforeBehavior
                            });
    });
  },
  insertBehaviorAfter: function (anchorBehaviorName, afterBehavior) {
    var self = this;
    console.log(anchorBehaviorName)
    this._findAndManipulate(anchorBehaviorName, function (index) {
      console.log(self.behaviors)
      console.log(index)
      //plus one for inserting after index
      self.behaviors.splice(index + 1, 0, {
                              name: afterBehavior.name, 
                              behavior: afterBehavior
                            });
      console.log(self.behaviors[2].behavior.toString())
    });
  },
  deleteBehavior: function (name) {
    var self = this;
    this._findAndManipulate(name, function (index) {
      self.behaviors.splice(index, 1);
    });
  },
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