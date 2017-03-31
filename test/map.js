var Behavior = require('..');

var Formula = new Behavior();

Formula.add(function a (n) {
  return n + 1;
});

Formula.add(function b (n) {
  return n + 100;
});

Formula.b.map(function (proc) {
  return function b (n) {
    n = proc(n);
    n = proc(n);
    n = proc(n);
    return n;
  };
});

var assert = require('assert');

describe('Behavior', function () {
  describe('#map()', function () {
    it('correctness : should be return 301 as a result of formula', function () {
      return Formula.exec(0).then(function (result) {
        assert.equal(301, result);
      }).catch(assert.ifError);
    });
  });
});