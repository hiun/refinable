var Behavior = require('..');

var Formula = new Behavior();

Formula.defineMethod('deleteAddition', function () {
  var self = this;
  this.behaviorStore.forEach(function (behacior) {
    if (behavior.name.slice(0, 4) === 'add') {
      this.delete.apply({name: behavior.name})
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

var assert = require('assert');

describe('Behavior', function() {
  describe('#delete()', function() {
    it('correctness : should be return -700 as a result of formula', function() {
      Formula.exec(0, function (result) {
        console.log(result)
        assert.equal(-700, result);
      });
    });
  });
});