import { invoiceData } from './invoice-data';

// Script to find the min, max, and mean of the invoice data
let min = Infinity;
let minCustomer = null;

let max = 0;
let maxCustomer = null;

let sum = 0;

for (const invoice of invoiceData) {
  if (invoice.amount < min) {
    min = invoice.amount;
    minCustomer = invoice.customer;
  }

  if (invoice.amount > max) {
    max = invoice.amount;
    maxCustomer = invoice.customer;
  }

  sum = invoice.amount + sum;
}

console.log('Min invoice amount:', min, 'customer:', minCustomer);
console.log('Max invoice amount:', max, 'customer:', maxCustomer);
console.log('Avg invoice amount:', sum / invoiceData.length);
