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
  export const GenerateChapterContentAI = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Explain the concept in Detail on Topic: Decoration homes, Chapter: Introduction to Home Decor Styles in JSON Format with field as title, description in detail, Code Example(HTML Code format) if applicable"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"title\": \"Introduction to Home Decor Styles\",\n  \"description\": \"Home decoration, or interior design, is the art and science of enhancing the interior of a building to achieve a healthier and more aesthetically pleasing environment for the people using the space.  Different styles offer varied approaches to achieving this, each with distinct characteristics in color palettes, furniture choices, materials, and overall ambiance. Understanding these styles allows homeowners to personalize their living spaces to reflect their individual tastes and lifestyles. This introduction will touch upon several popular styles to illustrate the diversity of options available.  Choosing a style is a personal journey, often involving a blend of influences and preferences, rather than strict adherence to a single, rigid definition. The key is to create a space that is functional, comfortable, and visually appealing to its occupants.  Let's explore some prominent examples:\\n\\n**Key Aspects Considered Across Styles:**\\n\\n* **Color Palette:**  The range of colors used, from warm earth tones to cool blues and greens, significantly impacts the mood and feel of a room.  \\n* **Furniture:**  The type of furniture (e.g., antique, modern, minimalist) determines the style's visual impact. Size, shape, and material all play a role.\\n* **Materials:**  Choices in textiles (fabrics for curtains, upholstery), flooring (hardwood, carpet, tile), and wall coverings (paint, wallpaper) contribute to the texture and aesthetic.\\n* **Lighting:**  Natural light and artificial lighting arrangements greatly affect the ambiance.  The type and placement of lighting fixtures significantly shape the atmosphere.\\n* **Accessories:**  Artwork, decorative items, and other smaller elements add personality and complete the overall look.\\n\\n**Examples of Popular Styles (further detailed in subsequent chapters):**\\n\\n* **Modern:** Clean lines, minimalist aesthetic, functionality over ornamentation.\\n* **Traditional:** Classic elegance, ornate details, rich fabrics, symmetrical layouts.\\n* **Farmhouse:** Rustic charm, natural materials, vintage elements, a sense of warmth and simplicity.\\n* **Bohemian:** Eclectic mix of patterns, textures, and global influences, layered and comfortable.\\n* **Minimalist:** Uncluttered spaces, neutral color palettes, functionality as the core principle.\\n* **Mid-Century Modern:** Simple lines, organic shapes, functionality with a focus on quality materials.\",\n  \"codeExample\": \"<!--  This HTML is a simple example and doesn't represent a specific decor style. It's a placeholder for future, more detailed examples in subsequent chapters. -->\\n<html>\\n<head>\\n<title>Home Decor Example</title>\\n</head>\\n<body>\\n  <h1>My Living Room</h1>\\n  <p>This is a sample description of a living room.  More detailed descriptions will be provided in later sections, showing how different decor styles might be implemented.  For now, imagine your own furnishings and decor here!</p>\\n</body>\\n</html>\"\n}\n```\n"},
        ],
      },
    ],
  });

  // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  // console.log(result.response.text());


  // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  // console.log(result.response.text());
