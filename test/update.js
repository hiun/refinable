var Behavior = require('..');

var Formula = new Behavior();

Formula.add(function a (n) {
  return n + 1;
});

Formula.add(function b (n) {
  return n + 2;
});


Formula.add(function c (n) {
  return n + 3;
});


var FormulaA = Formula.inherit();

FormulaA.c.update(function c (n) {
  return n + 10;
});

//console.log(FormulaA.behaviorStore.behaviors[2].behavior.toString());



FormulaA.exec(1, console.log);

/*
var assert = require('assert');

describe('Behavior', function() {
  describe('#add()', function() {
    it('correctness : should be return 7 as a result of formula', function() {
      Formula.exec(1, function (result) {
        assert.equal(7, result);
      });
    });
  });
});
*/