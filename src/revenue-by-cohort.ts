import { writeFileSync } from 'fs';
import { join } from 'path';
import { cohorts } from './customers-by-cohort';
import { invoiceData } from './invoice-data';
import { formatTimestamp } from './utils';

// Write a script to calculate the revenue from each cohort for each month.
// The output should be a grid with months across the x axis and cohorts along the y axis

/*
For example:

          2020-01, 2020-02,  2020-03, ...
2020-01:   223143,    2142,     9870, ...
2020-02:        0,    1288,     1288, ...
2020-03:        0,       0,    29212, ...
    ...:      ...,     ...       ...  ...
*/

/**
 *  NOTE: this approach re-uses the output from part-2.  This unfortunately means that part-2 is re-run.
 *  To avoid this in reality, we'd likely store the output of part-2 and be able to retrieve it without
 *  processing.
 */

function hash(customer: string, yearMonth: string): string {
  return `${customer}|${yearMonth}`;
}

// begin by building a dictionary that provides us with a quick way to lookup customers' monthly spend
// additionally, grab earliest and last timestamps of the invoices so we can use it to build our x-axis

const monthlyRevenueByCustomer: { [key: string]: number } = {
  // [customer|yyyy-mm]: number;
};
let earliestTimestamp = new Date(9999, 12, 12);
let lastTimestamp = new Date(1, 1, 1);

invoiceData.forEach(invoice => {
  const { customer, amount, timestamp } = invoice;
  const yearMonth = formatTimestamp(timestamp);

  const key = hash(customer.toString(), yearMonth);
  if (typeof monthlyRevenueByCustomer[key] === 'undefined') {
    monthlyRevenueByCustomer[key] = amount;
  } else {
    monthlyRevenueByCustomer[key] += amount;
  }

  // grab timestamps
  earliestTimestamp = earliestTimestamp.valueOf() > timestamp ? new Date(timestamp) : earliestTimestamp;
  lastTimestamp = lastTimestamp.valueOf() < timestamp ? new Date(timestamp) : lastTimestamp;
});

// use the earliest and last timestamps to define our x-axis
const dateRange = [];
for (
  let timestamp = earliestTimestamp;
  timestamp < lastTimestamp;
  timestamp = new Date(timestamp.setMonth(timestamp.getMonth() + 1))
) {
  dateRange.push(formatTimestamp(timestamp.valueOf()));
}

// begin constructing our grid showcasing cohort monthly spend
const grid: string[][] = [[`         `].concat(dateRange) /* header */];
let largestCell = 9; // NOTE: magic number; generally a no-no.  Based off of ' 'yyyy-mm, format for x-axis
for (const cohort in cohorts) {
  const customers = cohorts[cohort];

  const row = [`${cohort}: `];
  for (const yearMonth of dateRange) {
    const cohortSpend = customers
      .reduce((prev, curr) => prev + (monthlyRevenueByCustomer[hash(curr, yearMonth)] || 0), 0)
      .toString();

    row.push(cohortSpend);
    largestCell = largestCell < cohortSpend.length ? cohortSpend.length : largestCell;
  }

  grid.push(row);
}

// generate final output with even spacing
const filename = `./part-3-output-${new Date().valueOf()}.txt`;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    grid[y][x] = grid[y][x].padStart(largestCell, ' ');
  }

  const row = grid[y][0] + grid[y].slice(1).join(', ') + '\n';
  writeFileSync(join(__dirname, filename), row, { flag: 'a' });
}
