const assert = require('assert');
const Rooster = require('../index');

describe('Roster', () => {
  describe('announceDawn', () => {
    it('returns a rooster call', () => {
      const expected = 'cock-a-doodle-doo!';
      
      const actual = Rooster.announceDawn();

      assert.strictEqual(expected, actual);
    });
  });
  describe('timeAtDawn', () => {
    it('returns its argument as a string', () => {
      const timeInNumber = 11;
      const timeInString = "11";

      const actual = Rooster.timeAtDawn(timeInNumber);

      assert.strictEqual(timeInString, actual);
    });
    it('throws an error if passed a number less than 0', () => {
      const lowerBound = -1;
      
      assert.throws(
        () => {
          Rooster.timeAtDawn(lowerBound);
        },
        RangeError
      );
    });
    it('throws an error if passed a number greater than 23', () => {
      const upperBound = 24;
      
      assert.throws(
        () => {
          Rooster.timeAtDawn(upperBound);
        },
        RangeError
      );
    });
  });
});