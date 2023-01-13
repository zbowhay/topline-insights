import { expect } from 'chai';
import { formatTimestamp } from '../src/utils';

describe('utils', () => {
  describe('formatTimestamp', () => {
    it('should return a date formatted in YYYY-MM', () => {
      const yyyyMM = '2077-12';
      const timestamp = new Date(`${yyyyMM}-10`).valueOf();
      expect(formatTimestamp(timestamp)).to.eql(yyyyMM);
    });
  });
});
