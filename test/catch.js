var Behavior = require('..');

var Formula = new Behavior();

const assert = require('assert')

Formula.add(function a (n) {
  throw new Error('error occured!');
});


describe('Behavior', function() {
  describe('#inherit()', function() {
    it('operational correctness - should be return 4 as a result of formula', function () {
      return Formula.exec().catch(assert.ok);        
    });
  });
});