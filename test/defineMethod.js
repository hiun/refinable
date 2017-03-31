var Behavior = require('..');
var assert = require('assert');

var Formula = new Behavior();

Formula.defineMethod('deleteAddition', function () {
  this.behaviorStore.behaviors.forEach((behavior) => {
    if (behavior.name.slice(0, 3) === 'add') {
      this.delete.apply({name: behavior.name, behaviorStore: this.behaviorStore});
      // or by using private API
      //this.behaviorStore.deleteBehavior(behavior.name);
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

describe('Behavior', function() {
  describe('#defineMethod()', function() {
    it('correctness : should be return -1000 as a result of formula', function () {
      return Formula.exec(0).then((result) => {
        assert.equal(-1000, result);
      }).catch(assert.ifError);
    });
  });
});