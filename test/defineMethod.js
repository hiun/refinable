var Behavior = require('..');

var Formula = new Behavior();

Formula.defineMethod('deleteAddition', function () {
  var self = this;
  this.behaviorStore.behaviors.forEach(function (behavior) {
    if (behavior.name.slice(0, 3) === 'add') {
      self.delete.apply({name: behavior.name, behaviorStore: self.behaviorStore});
      // or by using private API
      //self.behaviorStore.deleteBehavior(behavior.name);
    }
  });
});

Formula.add(function add100 (n) {
  return n + 100;
});

Formula.add(function sub1000 (n) {
  return n - 1000;
});

Formula.add(function add200 (n) {
  return n + 200;
});

Formula.deleteAddition();

var assert = require('assert');

describe('Behavior', function() {
  describe('#defineMethod()', function() {
    it('correctness : should be return -1000 as a result of formula', function() {
      Formula.exec(0, function (result) {
        assert.equal(-1000, result);
      });
    });
  });
});