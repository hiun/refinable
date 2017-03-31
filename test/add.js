var assert = require('assert');

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

describe('Behavior', function() {
  describe('#add(Function)', function() {
    it('correctness : should be return 7 as a result of formula', function () {
      return Formula.exec(1).then(function (result) {
        assert.equal(7, result);
      }).catch(assert.ifError);
    });
  });
});

var Formula2 = new Behavior();


Formula2.add(function a (n) {
  return n + 10;
});

Formula2.add(Formula, 'Formula');

/*
Formula2.Formula.a.update(function () {
  return 1000;
});
*/

Formula2.add(function a (n) {
  return new Promise(function (ful, rej) {
    ful(n + 10);
  });
});

Formula2.add(function b (n) {
  return new Promise(function (ful, rej) {
    ful(n + 10);
  });
});

describe('Behavior', function () {
  describe('#add(Function|Behavior|Promise)', function() {
    it('correctness : should be return 37 as a result of formula', function() {
      return Formula2.exec(1).then(function (result) {
        assert.equal(37, result);
      }).catch(assert.ifError);
    });
  });
});