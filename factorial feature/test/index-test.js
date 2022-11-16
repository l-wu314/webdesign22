var assert = require("assert");
var Calculate =  require('../index.js')

describe('Calculate', () => {
  describe('.factorial', () => {
    it('will calculate 5!', () => {
      const expected = 120;
      const input = 5;

      const actual = Calculate.factorial(input);

      assert.strictEqual(actual, expected)
    });
    it('will calculate 3!', () => {
      const expected = 6;
      const input = 3;

      const actual = Calculate.factorial(input);

      assert.strictEqual(actual, expected)
    });
    it('deals with edge case n=0', () => {
      const expected = 1;
      const input = 0;

      const actual = Calculate.factorial(input);

      assert.strictEqual(actual, expected)
    });
  });
});