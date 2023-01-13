import { expect } from 'chai';
import { compileEarliestCustomerInvoices } from '../src/customers-by-cohort';
import { Invoice } from '../src/invoice-data';

// I wanted to include a couple more extra tests so I exported a potentially re-usable function from customers-by-cohort as an example.
describe('Customers by Cohort', () => {
  describe('compileEarliestCustomerInvoices', () => {
    const getTimestamp = (date: string): number => new Date(date).valueOf();

    it('should return earliest non-zero customer invoices', () => {
      const invoices: Invoice[] = [
        {
          customer: 1,
          amount: 1,
          timestamp: getTimestamp('2020-01-01 00:00:00'),
        },
        {
          customer: 1,
          amount: 1,
          timestamp: getTimestamp('2020-01-02 00:00:00'),
        },
        {
          customer: 2,
          amount: 1,
          timestamp: getTimestamp('2020-01-03 00:00:00'),
        },
        {
          customer: 2,
          amount: 0,
          timestamp: getTimestamp('2020-01-04 00:00:00'),
        },
      ];

      const expected = {
        1: getTimestamp('2020-01-01 00:00:00'),
        2: getTimestamp('2020-01-03 00:00:00'),
      };

      expect(compileEarliestCustomerInvoices(invoices)).to.eql(expected);
    });
  });
});
