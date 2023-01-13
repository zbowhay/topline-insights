import { invoiceData } from './invoice-data';

// Write a script to find the ten customers who have spent the most overall
// The output should be sorted by the amount spent and include the customer ID.
// For example:
// 77: 123433
// 32: 22421
// 17: 2234
// 98: 18421
// ...

// create a dictionary we can use to group invoice amount by customer id
const customerDict: { [key: number]: number } = {};

// O(n)
invoiceData.forEach((invoice) => {
  const { customer } = invoice;

  if (typeof customerDict[customer] !== 'undefined') {
    customerDict[customer] += invoice.amount;
  } else {
    customerDict[customer] = invoice.amount;
  }
});

// convert to an array for sorting [[customerId, amount], ...]
// O(n) (smaller dict) most, O(n log n) for large... not in this case since there are 100 customers
const customerInvoiceTotals = Object.entries(customerDict);

// sort descending
// O(n) (smaller dict)
customerInvoiceTotals.sort((a, b) => b[1] - a[1]);

// print top 10
// O(10)
customerInvoiceTotals.slice(0, 10).forEach((kvp) => {
  console.log(`${kvp[0]}: ${kvp[1]}`);
});
