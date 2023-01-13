// Script used to generate random invoice data
// You won't need to interact with this script, so you can safely ignore it
const jan_1_2020 = new Date(2020, 0, 1);
const now = new Date();

function randNearOneDate() {
  return 1000 * 60 * 60 * (24 - (Math.random() + 0.5));
}

const out = [];

for (
  let time = jan_1_2020;
  time < now;
  time = new Date(time.valueOf() + randNearOneDate())
) {
  out.push({
    customer: Math.ceil(Math.random() * 100),
    amount: Math.ceil(Math.random() * 1000 + 1000),
    timestamp: time.valueOf(),
  });
}

console.log(JSON.stringify(out, null, 2));
