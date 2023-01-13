# Topline integration interview project

Thanks for taking the time to interview! We really appreciate it, and we hope to see the best of your work.

## Rules

Please do this interview project on your own, without the help of anyone else.
With that being said, you are more than welcome to use the internet.
Google and Stack Overflow are invaluable tools in our daily lives, and we wouldn't expect you to do your best work without them.

We'd really like to see every part of your development process, so please _record your screen while you work_.

In addition to writing the code required by the instructions, write down your answers to the questions in the instructions directly in this README file.
Most of the questions are open ended, and you don't need to make your code handle the questions below each prompt, but please make sure your code works before moving on to the next question.
Clear writing and expressing your ideas is just as valuable as writing great code.

## Getting started

Make a fork of this repo on your own GitHub account and then clone it down to your personal computer.

- Read through the files in the `/src` directory.
- Install dependencies for the project with `yarn install`.
- Run `yarn part-0` to run the `/src/min-max-mean-invoice.ts` script.
  Read over the script to get a sense of how we're importing the data from a file.
  We're cutting some corners to make things easier for this interview.
  Use this script as a rough guide when writing your own scripts.

## Instructions

1. Implement the `top-ten-customers.ts` script. Use `yarn part-1` to run the script, and paste your output and the answers to the questions below.

- How does your solution scale with the number of invoices? How about the number of customers?

2. Implement the `customers-by-cohort.ts` script. Use `yarn part-2` to run the script, and paste your output and the answers to the questions below.

- How does your solution scale with the number of invoices? How about the number of customers?
- Does your solution depend on whether the invoice data is sorted?

3. Implement the `revenue-by-cohort.ts` script. Use `yarn part-3` to run the script, and paste your output and the answers to the questions below.

- How does your solution scale with the number of invoices? How about the number of customers?
- Does your solution depend on whether the invoice data is sorted?

## Tips

- All of the questions have a desired output format that can require a lot of string mangling.
  If you're stuck on the formatting part, move on to the next question and get back to formatting later.
- Git is your friend. Commit often and use descriptive commit messages. Push your work to GitHub so you don't lose it.
- Get it working and then make it look good. Don't get lost in the perfect solution before you have a working solution.
- Write down your responses to all the questions in the prompt before moving on to the next prompt.
- Include more comments than you would in normal code. This will help us understand your thought process.
- Take breaks when you need them.
- You don't have to finish all of the prompts. We prefer thorough, well thought out responses over a complete solution without written responses.

## Responses

Please write your responses to the questions in the instructions here. Please indicate any tradeoffs you made.

1. Output:

```
65: 30846
21: 29686
100: 28979
64: 26915
41: 26807
99: 26778
47: 26326
72: 24977
98: 24595
73: 24422
```

Answers:

- How does your solution scale with the number of invoices?
  - It scales at `O(n)` with invoices. This could be optimized in the future to pull off of a queue so you could scale out workers to process the incoming invoice data.
- How about the number of customers?
  - It should scale fairly well with customers. It's unlikely there would be more customers than invoices. Therefore, after the `O(n)` pass at invoices to group invoice amount by customer in the dictionary, you'll generally have a significantly smaller set of data to iterate through for the final output.
  - Let's say you did have a massive amount of customers in the future, it would be interesting to do some benchmark testing to evaluate a different sorting algorithm prior to the final `slice()`. Perhaps merge sort for `O(n log n)`. I'd also be curious as to what sort is used under-the-hood for `Array.sort()`

2. Output:

```
2020-1: [10, 11, 13, 14, 15, 20, 21, 23, 27, 28, 30, 34, 39, 40, 42, 44, 51, 65, 70, 72, 73, 78, 80, 83, 84, 89, 92, 96, 98, 99]
2020-2: [3, 8, 24, 32, 33, 37, 41, 45, 50, 56, 59, 61, 67, 81, 82, 86, 100]
2020-3: [4, 5, 12, 19, 25, 47, 48, 55, 77, 90, 93, 94]
2020-4: [1, 6, 9, 16, 26, 52, 57, 63, 64, 66, 87, 88, 97]
2020-5: [18, 22, 36, 38, 49, 53, 74, 79, 85, 95]
2020-6: [17, 35, 46, 60, 62, 71, 75, 76]
2020-7: [29, 58]
2020-8: [68, 69]
2020-9: [43]
2020-10: [54, 91]
2020-11: [2, 7]
2021-2: [31]
```

Answers:

- How does your solution scale with the number of invoices? How about the number of customers?
  - It's fairly similar to the Top Ten in regards to invoices. We iterate through each invoice `O(n)` and are left with a dictionary that contains all customers with a non-zero invoice as the key and their earliest invoice timestamp as value. At this point, we have a much smaller dataset to iterate over for the final formatting and sorting. I would like to optimize this further though since we do loop through the smaller dataset a handful of times.
  - Regarding customers, again, I believe it would be unlikely that the number of customers would approach the number of invoices. Therefore it's more important to optimize for how we'd handle the number of invoices.
- Does your solution depend on whether the invoice data is sorted?
  - No, it iterates through the invoices and will check to see if the current non-zero invoice has a timestamp lower than the previously kept timestamp.

3. Output:
   NOTE: This is pretty terrible to view in Markdown. See `part-3-output.txt` for a nicer view.

```
            2020-1,    2020-2,    2020-3,    2020-4,    2020-5,    2020-6,    2020-7,    2020-8,    2020-9,   2020-10,   2020-11,   2020-12,    2021-1,    2021-2,    2021-3,    2021-4,    2021-5,    2021-6,    2021-7,    2021-8,    2021-9,   2021-10,   2021-11,   2021-12,    2022-1,    2022-2,    2022-3,    2022-4,    2022-5,    2022-6,    2022-7,    2022-8,    2022-9,   2022-10,   2022-11,   2022-12
 2020-1:     50100,     14299,     16225,     24260,     21391,     11810,     17445,     13638,     12017,     13070,     12937,     11984,     16808,     14121,     11048,     11662,     22799,     13339,     18320,     18581,     14662,     18579,     19921,     15751,     13461,     13986,     17059,     13616,     14594,      9188,     16554,     14546,     22829,     22654,     15167,      4882
 2020-2:         0,     31149,     10013,      4522,      3215,      5735,      3877,      6307,     15256,      5950,      5504,      8861,      8510,      7206,     12929,      9933,      7279,      4861,     11418,      6724,     18475,      7772,      4625,     10961,     12134,      6396,     15866,      9480,     12503,      3576,      4845,      7328,      5862,     12533,      8010,      3812
 2020-3:         0,         0,     24190,         0,      4974,      8545,      4731,      8372,      2841,      5846,      6246,      1756,      1007,      1328,      2928,      9392,      5037,      9378,      4121,     10891,      1580,      4535,      5954,      3062,      1080,      8205,      8145,      5254,      6403,      9348,      5433,      3039,      4443,      1526,      2984,      3281
 2020-4:         0,         0,         0,     18900,      4921,         0,      4965,      8789,      1590,      7237,      9226,     10338,      2735,     10423,      4335,      5364,      2821,      7591,      2441,      3410,      6904,      5897,      6687,      6558,      9158,      5904,      4945,      7202,      6733,      7242,      8924,     12559,      8630,      2577,     10871,      1597
 2020-5:         0,         0,         0,         0,     19012,      6074,      4457,      5082,      5781,      6138,      2026,      4041,      4532,      1430,      7661,      4735,      4679,         0,      6809,      8307,      3100,      5346,      1211,      1935,      4406,      4933,      1215,      2992,      1357,      7850,      7231,      3151,      5231,      3202,      4017,      3014
 2020-6:         0,         0,         0,         0,         0,     13484,      7532,      2887,      6210,      2728,      3001,      4816,      7119,      1610,      5367,      7566,      1403,      5738,      2842,         0,         0,      2518,      3732,      7936,      1396,      1687,      1041,      6024,      2987,      1496,      1901,      1883,         0,      3561,      1284,      1305
 2020-7:         0,         0,         0,         0,         0,         0,      3541,      1690,         0,      3178,         0,         0,      2851,      1946,      1321,         0,         0,      1663,         0,         0,         0,      1027,         0,         0,         0,         0,         0,         0,         0,      1345,         0,         0,         0,      1536,      1957,         0
 2020-8:         0,         0,         0,         0,         0,         0,         0,      4057,         0,         0,      2621,      1420,      2316,      4388,      1724,         0,      5413,         0,         0,         0,      1987,         0,         0,         0,      3274,      1441,         0,         0,         0,         0,      3253,         0,         0,         0,      1535,      2538
 2020-9:         0,         0,         0,         0,         0,         0,         0,         0,      2350,         0,         0,      1602,         0,      1756,         0,         0,         0,         0,         0,         0,         0,         0,         0,         0,         0,         0,      1437,         0,         0,         0,         0,         0,         0,      1199,         0,         0
2020-10:         0,         0,         0,         0,         0,         0,         0,         0,         0,      3002,      1266,         0,      1302,         0,         0,         0,         0,      1743,         0,         0,      2471,         0,         0,      1799,         0,         0,         0,         0,         0,         0,         0,      3716,         0,         0,         0,      1467
2020-11:         0,         0,         0,         0,         0,         0,         0,         0,         0,         0,      2516,      1895,         0,         0,      1978,      1551,         0,      1028,      3641,         0,         0,         0,         0,      1989,         0,      1441,         0,      1345,      1519,      4977,         0,      1026,         0,         0,      2550,      1083
 2021-2:         0,         0,         0,         0,         0,         0,         0,         0,         0,         0,         0,         0,         0,      1913,         0,         0,         0,      1512,         0,         0,         0,         0,      1040,         0,         0,      1111,         0,         0,         0,         0,         0,      1936,         0,         0,         0,         0

```

Answers:

- How does your solution scale with the number of invoices? How about the number of customers?
  - We process the bulk of the data in the beginning at `O(n)` when building out the `monthlyRevenueByCustomer`. At that point we have a significantly more performant data structure we can use in further processing that can perform updates/gets at `O(1)`. Where things become less ideal is at the end when we build the grid and also output the grid at `O(n^2)` respectively. This could be improved if, depending on the desired use-case, we passed in `daterange` & `cohorts` as a parameter so that a user could drill into the data they want to see specifically.
- Does your solution depend on whether the invoice data is sorted?
  - No, it does not depend on the data being sorted. Similar to the other solutions, we iterate through the invoices at `O(n)` to build out our initial dictionary. With the dictionary approach we can avoid the need to have sorted data as an input.

## Submitting

To submit your code, send us a link to your repo.
Once we confirm that we've downloaded your work, please delete the repo you created so future candidates don't accidentally find your solution.

To submit your screen recording, upload the video to YouTube as "Private" in the "Visibility" section and use the "Share Privately" button to share it with elliot@growtopline.com.
If you'd prefer not to upload the video to YouTube, email elliot@growtopline.com and we can figure out an alternative.
