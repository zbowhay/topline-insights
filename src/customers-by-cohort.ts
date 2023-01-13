import { Invoice, invoiceData } from './invoice-data';
import { formatTimestamp } from './utils';

// Write a script to group each customer into their "cohort"
// A customer's cohort is the month they paid their first non-zero invoice.

// The output should look like [cohort]: [customer ids]
// It should be sorted vertically by date (ascending) left to right by customer ID (ascending)
// For example:
// 2020-01: [1, 18, 29]
// 2020-02: [5, 22, 89]
// ...

// invoice data is unordered despite loop suggesting it should be ordered by date ascending.  tricky tricky Elliot

// first, iterate through all invoices to find the earliest non-zero invoice for a customer.
export function compileEarliestCustomerInvoices(invoices: Invoice[]): { [key: string]: number } {
  const customerEarliestInvoice: { [key: string]: number } = {};
  invoices.forEach(invoice => {
    const { customer, timestamp } = invoice;

    if (invoice.amount > 0) {
      let existingTimestamp = customerEarliestInvoice[customer];

      if (typeof existingTimestamp === 'undefined' || existingTimestamp > timestamp) {
        customerEarliestInvoice[customer] = timestamp;
      }
    }
  });

  return customerEarliestInvoice;
}

const customerEarliestInvoice = compileEarliestCustomerInvoices(invoiceData);

/**
 * now that we have every customers earliest invoice with an amount above 0,
 * grab all of the entries and sort by timestamp.
 *
 * Then, convert the timestamps into YYYY-MM format and begin to place all of the customer id's
 * into their cohort.
 */
export const cohorts: { [key: string]: string[] } = {};

Object.entries(customerEarliestInvoice)
  .sort((a, b) => a[1] - b[1]) // sort by timestamp ascending
  .forEach(entry => {
    const customer = entry[0];
    const date = new Date(entry[1]);
    const yearMonth = formatTimestamp(date.valueOf());

    if (typeof cohorts[yearMonth] === 'undefined') {
      cohorts[yearMonth] = [customer];
    } else {
      cohorts[yearMonth].push(customer);
    }
  });

// finally, sort the customer ids for each cohort and log to console.

// This could likely be included in the above forEach to avoid iterating through the cohorts twice.
// combining the sort and log into the above forEach is arguably less legible though.
for (const cohort in cohorts) {
  cohorts[cohort].sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  console.log(`${cohort}: [${cohorts[cohort].join(', ')}]`);
}
