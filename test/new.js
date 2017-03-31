var assert = require('assert');
var Behavior = require('..');

describe('Behavior', function() {
  describe('#new()', function() {
    it('operational correctness - should be return 4 as a result of formula', function () {

      var add10 = new Behavior();

      add10.add(function a (n) {
        return n + 1;
      });

      var add30 = add10.new();

      add30.add(function z (n) {
        return n + 2;
      });

      add30.add(add10, 'add10');

      return add30.exec(0).then(function (result) {
        assert.equal(4, result);
      }).catch(assert.ifError);
    });
    
    it('inheritance correctness - check refinement of elements in super-behavior will not affect elements in sub-behavior : should be return 600 as a result of formula', function () {

      var Formula = new Behavior();

      Formula.add(function a (n) {
        return n + 100;
      });

      Formula.add(function b (n) {
        return n + 200;
      });

      Formula.add(function c (n) {
        return n + 300;
      });

      var Formula2 = Formula.new();

      Formula.add(function z (n) {
        return n + 500;
      });

      return Formula2.exec(0).then(function (result) {
        assert.equal(600, result);
      }).catch(assert.ifError);
    });

    it('inheritance correctness - check refinement of elements in sub-behavior will not affect elements in super-behavior : should be return 600 as a result of formula', function () {

      var Formula = new Behavior();

      Formula.add(function a (n) {
        return n + 100;
      });

      Formula.add(function b (n) {
        return n + 200;
      });

      Formula.add(function c (n) {
        return n + 300;
      });

      var Formula2 = Formula.new();

      Formula2.add(function z (n) {
        return n + 500;
      });

      return Formula.exec(0).then(function (result) {
        assert.equal(600, result);
      }).catch(assert.ifError);
    });
  
  });
});