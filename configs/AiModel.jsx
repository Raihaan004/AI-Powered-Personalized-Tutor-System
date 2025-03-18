const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const GenerateCourseLayout_AI = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming' Topic: Python, Level:Basic, Duration: 1 hours, NoOf Chapters:5, in JSON format"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"courseName\": \"Introduction to Python Programming\",\n  \"description\": \"This course provides a foundational understanding of Python programming, covering basic syntax, data structures, and control flow.  Ideal for beginners with little to no prior programming experience.\",\n  \"chapters\": [\n    {\n      \"chapterName\": \"Setting up your Python Environment\",\n      \"about\": \"Learn how to install Python, choose an IDE (or text editor), and run your first Python program. We'll cover different operating systems and common pitfalls.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Variables, Data Types, and Operators\",\n      \"about\": \"Understanding fundamental concepts like variables, integers, floats, strings, booleans, and common arithmetic, comparison, and logical operators.\",\n      \"duration\": \"20 minutes\"\n    },\n    {\n      \"chapterName\": \"Control Flow: Conditional Statements and Loops\",\n      \"about\": \"Mastering `if`, `elif`, `else` statements for decision-making, and `for` and `while` loops for iteration.\",\n      \"duration\": \"20 minutes\"\n    },\n    {\n      \"chapterName\": \"Data Structures: Lists and Dictionaries\",\n      \"about\": \"Working with lists (ordered collections) and dictionaries (key-value pairs), including common operations like adding, removing, and accessing elements.\",\n      \"duration\": \"10 minutes\"\n    },\n    {\n      \"chapterName\": \"Functions and Modules\",\n      \"about\": \"Learn how to define and use functions to organize your code and explore Python's built-in modules.\",\n      \"duration\": \"5 minutes\"\n    }\n  ],\n  \"category\": \"Programming\",\n  \"topic\": \"Python\",\n  \"level\": \"Basic\",\n  \"totalDuration\": \"1 hour\" ,\n  \"noOfChapters\": 5\n}\n```\n"},
        ],
      },
    ],
  });

  // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  // console.log(result.response.text());
