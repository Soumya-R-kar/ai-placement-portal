const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Problem = require('./models/Problem');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('Connected to DB for seeding...');
  await Problem.deleteMany({});

  const problems = [
    {
      title: "Reverse a String",
      description: "Write a function that takes a string and returns it reversed.\n\nExample:\nInput: 'hello'\nOutput: 'olleh'",
      difficulty: "Easy",
      language: "python",
      starterCode: "def reverse_string(s):\n    # Write your code here\n    pass\n\n# Test\nprint(reverse_string(input()))",
      testCases: [
        { input: "hello", expectedOutput: "olleh" },
        { input: "world", expectedOutput: "dlrow" },
        { input: "abcde", expectedOutput: "edcba" }
      ],
      points: 10
    },
    {
      title: "FizzBuzz",
      description: "Print numbers from 1 to n. For multiples of 3 print 'Fizz', for multiples of 5 print 'Buzz', for multiples of both print 'FizzBuzz'.\n\nInput: A single integer n.\nOutput: The result for n.",
      difficulty: "Easy",
      language: "python",
      starterCode: "def fizzbuzz(n):\n    # Write your code here\n    pass\n\n# Test\nn = int(input())\nprint(fizzbuzz(n))",
      testCases: [
        { input: "3", expectedOutput: "Fizz" },
        { input: "5", expectedOutput: "Buzz" },
        { input: "15", expectedOutput: "FizzBuzz" },
        { input: "7", expectedOutput: "7" }
      ],
      points: 15
    },
    {
      title: "Find Maximum in Array",
      description: "Given a list of integers separated by spaces, find and return the maximum value.\n\nInput: Space-separated integers on one line.\nOutput: The maximum integer.",
      difficulty: "Medium",
      language: "python",
      starterCode: "def find_max(arr):\n    # Write your code here\n    pass\n\n# Test\narr = list(map(int, input().split()))\nprint(find_max(arr))",
      testCases: [
        { input: "1 5 3 9 2", expectedOutput: "9" },
        { input: "-1 -5 -3", expectedOutput: "-1" },
        { input: "42", expectedOutput: "42" }
      ],
      points: 20
    }
  ];

  await Problem.insertMany(problems);
  console.log(`${problems.length} problems seeded successfully!`);
  process.exit();
});