import type { LocalLessonSeed, LocalModuleSeed } from "../curriculum";

type SeedInput = Pick<
  LocalLessonSeed,
  | "slug"
  | "title"
  | "summary"
  | "what"
  | "why"
  | "example"
  | "mistake"
  | "correction"
  | "labPrompt"
  | "question"
  | "answer"
  | "distractors"
> &
  Partial<
    Pick<
      LocalLessonSeed,
      "mistakeExplanation" | "hint" | "labCode" | "hidden" | "related"
    >
  >;

function lesson(input: SeedInput): LocalLessonSeed {
  const codeLine =
    input.example
      .split(/\r?\n/)
      .find((line) => {
        const trimmed = line.trim();
        return (
          trimmed.startsWith("ruby ") ||
          trimmed.startsWith("puts ") ||
          trimmed.startsWith("print ") ||
          trimmed.startsWith("require ") ||
          trimmed.startsWith("class ") ||
          trimmed.startsWith("def ") ||
          trimmed.startsWith("irb")
        );
      })
      ?.trim() ?? "Ruby code";

  return {
    ...input,
    anatomy: codeLine,
    parts: [
      {
        token: codeLine.split(/\s+/)[0],
        label: "Ruby construct",
        description:
          "The Ruby keyword, command, or expression that starts the example.",
      },
      {
        token: codeLine.split(/\s+/).slice(1).join(" ") || codeLine,
        label: "Expression or arguments",
        description: input.summary,
      },
    ],
    mistakeExplanation:
      input.mistakeExplanation ??
      "This code does not match the intended Ruby operation. Check the syntax, object, method, and value being used.",
    hint:
      input.hint ??
      "Read the Ruby code from left to right and identify what object or value each expression works with.",
    labCode: input.labCode ?? input.example,
  };
}

export const rubyModules: LocalModuleSeed[] = [
  {
    slug: "ruby-fundamentals",
    title: "Ruby fundamentals",
    description:
      "Learn how Ruby programs run, explore Ruby interactively, and understand basic syntax and values.",
    topics: [
      {
        slug: "running-ruby",
        title: "Running Ruby",
        description:
          "Install Ruby, run scripts, and experiment with Interactive Ruby.",
        lessons: [
          lesson({
            slug: "ruby-version",
            title: "Check your Ruby version",
            summary:
              "Use the Ruby interpreter from a terminal and check which version is installed.",
            what:
              "Ruby programs can be executed through the Ruby interpreter. Running ruby with the -v option displays the installed Ruby version.",
            why:
              "Knowing your Ruby version helps you understand which language features and libraries are available in your environment.",
            example:
              "ruby -v\n\n# Example output\nruby 3.3.0",
            mistake:
              "ruby version",
            mistakeExplanation:
              "Ruby does not use the word version as a standalone command. The -v option asks the interpreter to display its version.",
            correction:
              "ruby -v",
            labPrompt:
              "Write the terminal command that displays the installed Ruby version.",
            question:
              "Which command displays the installed Ruby version?",
            answer:
              "ruby -v",
            distractors: [
              "ruby --install",
              "ruby version --show",
            ],
          }),

          lesson({
            slug: "ruby-script",
            title: "Run a Ruby program file",
            summary:
              "Create a .rb file and execute it with the Ruby interpreter.",
            what:
              "Ruby source code can be saved in a file with the .rb extension and executed by passing that file to the ruby command.",
            why:
              "Ruby files let you save programs and run them repeatedly instead of entering every statement manually.",
            example:
              "hello.rb\n\nputs \"Hello, Ruby!\"\n\nruby hello.rb",
            mistake:
              "ruby hello",
            mistakeExplanation:
              "If the Ruby source file is named hello.rb, the filename should normally be supplied exactly as hello.rb.",
            correction:
              "ruby hello.rb",
            labPrompt:
              "Create a file named hello.rb containing puts \"Hello, Ruby!\" and write the command used to run it.",
            question:
              "What command runs a Ruby file named hello.rb?",
            answer:
              "ruby hello.rb",
            distractors: [
              "run hello.rb",
              "ruby install hello.rb",
            ],
          }),

          lesson({
            slug: "interactive-ruby",
            title: "Experiment with IRB",
            summary:
              "Use Interactive Ruby to try Ruby expressions immediately.",
            what:
              "IRB stands for Interactive Ruby. It provides a shell-like environment where Ruby expressions can be entered and evaluated immediately.",
            why:
              "IRB is useful for learning Ruby and testing small ideas without creating a complete program file.",
            example:
              "irb\n\nirb(main):001:0> 2 + 3\n=> 5\nirb(main):002:0> puts \"Hello\"\nHello\n=> nil",
            mistake:
              "irb run hello.rb",
            mistakeExplanation:
              "IRB is an interactive Ruby environment, not the normal command used to execute a Ruby source file.",
            correction:
              "irb\n\n# Then enter Ruby expressions interactively.",
            labPrompt:
              "Start IRB and experiment with 10 + 20 and puts \"Ruby\".",
            question:
              "What is IRB mainly used for?",
            answer:
              "Experimenting with Ruby code interactively.",
            distractors: [
              "Installing Ruby libraries only.",
              "Hosting a Ruby website automatically.",
            ],
          }),

          lesson({
            slug: "puts-and-print",
            title: "Display output with puts and print",
            summary:
              "Use puts and print to display values from a Ruby program.",
            what:
              "puts displays values and normally adds a newline after each value. print displays values without automatically adding a newline.",
            why:
              "Output is one of the simplest ways to see what a Ruby program is doing.",
            example:
              "puts \"Hello\"\nputs \"Ruby\"\n\nprint \"Hello \"\nprint \"Ruby\"",
            mistake:
              "puts(\"Hello\", \"Ruby\")\n# expecting everything on one line",
            mistakeExplanation:
              "puts adds a newline after each supplied value, so multiple arguments can appear on separate lines.",
            correction:
              "print \"Hello \"\nprint \"Ruby\"",
            labPrompt:
              "Write Ruby code that prints Hello and Ruby on the same line.",
            question:
              "What is one key difference between puts and print?",
            answer:
              "puts normally adds a newline; print does not.",
            distractors: [
              "print only works with numbers.",
              "puts can only display strings.",
            ],
          }),
        ],
      },

      {
        slug: "variables-and-values",
        title: "Variables and values",
        description:
          "Store values and understand Ruby's object-based model.",
        lessons: [
          lesson({
            slug: "ruby-variables",
            title: "Create variables",
            summary:
              "Assign values to local variables and use them in expressions.",
            what:
              "Ruby variables refer to objects. A local variable can be created by assigning a value to a name.",
            why:
              "Variables let programs store information and reuse it later.",
            example:
              "name = \"Alex\"\nage = 20\n\nputs name\nputs age",
            mistake:
              "String name = \"Alex\"",
            mistakeExplanation:
              "Ruby does not require Java-style type declarations for ordinary local variables. The assignment itself creates the local variable.",
            correction:
              "name = \"Alex\"",
            labPrompt:
              "Create variables for a student's name and age, then print both values.",
            question:
              "How do you normally create a local variable in Ruby?",
            answer:
              "Assign a value to a name.",
            distractors: [
              "Declare its type before assigning it.",
              "Use the var keyword.",
            ],
          }),

          lesson({
            slug: "ruby-object-model",
            title: "Everything is an object",
            summary:
              "Understand that Ruby values are objects with methods.",
            what:
              "Ruby treats values such as numbers, strings, arrays, and classes as objects. Objects can respond to methods.",
            why:
              "Thinking in terms of objects and methods makes Ruby syntax easier to understand.",
            example:
              "name = \"Ruby\"\n\nputs name.length\nputs 5.class\nputs name.class",
            mistake:
              "name.length() = 4",
            mistakeExplanation:
              "A method call reads or performs an operation; it is not an assignment target. Use assignment to change a variable or call an appropriate mutating method.",
            correction:
              "name = \"Ruby\"\nputs name.length",
            labPrompt:
              "Create a string and use a method to find its length and class.",
            question:
              "What does \"Ruby\".length return?",
            answer:
              "The number of characters in the string.",
            distractors: [
              "The Ruby version.",
              "The memory address only.",
            ],
          }),

          lesson({
            slug: "ruby-strings",
            title: "Work with strings",
            summary:
              "Create strings, interpolate values, and call common string methods.",
            what:
              "Ruby strings hold text. Double-quoted strings support interpolation using #{...}, allowing expressions to be inserted into text.",
            why:
              "Strings are used for names, messages, input, files, URLs, and many other forms of text.",
            example:
              "name = \"Alex\"\nage = 20\n\nputs \"My name is #{name}\"\nputs \"I am #{age} years old\"",
            mistake:
              "name = \"Alex\"\nputs 'My name is #{name}'",
            mistakeExplanation:
              "Single-quoted strings do not perform normal Ruby interpolation. Use double quotes when you want #{...} to be evaluated.",
            correction:
              "name = \"Alex\"\nputs \"My name is #{name}\"",
            labPrompt:
              "Create name and age variables and print one sentence using string interpolation.",
            question:
              "Which syntax performs string interpolation in a double-quoted Ruby string?",
            answer:
              "#{expression}",
            distractors: [
              "${expression}",
              "{{expression}}",
            ],
          }),

          lesson({
            slug: "ruby-numbers",
            title: "Numbers and arithmetic",
            summary:
              "Perform arithmetic with Ruby integers and other numeric values.",
            what:
              "Ruby provides numeric objects such as integers and floating-point numbers. Standard arithmetic operators can be used directly with them.",
            why:
              "Calculations are fundamental to programs involving scores, prices, measurements, counters, and algorithms.",
            example:
              "a = 10\nb = 3\n\nputs a + b\nputs a - b\nputs a * b\nputs a / b",
            mistake:
              "puts \"10\" + 3",
            mistakeExplanation:
              "A string and an integer are different objects and cannot be combined with + in this way.",
            correction:
              "puts 10 + 3",
            labPrompt:
              "Create two numbers and calculate their sum, difference, product, and quotient.",
            question:
              "What type of value is 10 in Ruby?",
            answer:
              "An integer object.",
            distractors: [
              "A string.",
              "A Boolean.",
            ],
          }),
        ],
      },

      {
        slug: "conditions-and-loops",
        title: "Conditions and loops",
        description:
          "Control program flow using if statements and iteration.",
        lessons: [
          lesson({
            slug: "ruby-if",
            title: "Make decisions with if",
            summary:
              "Run code conditionally using if, elsif, and else.",
            what:
              "Ruby's if expression chooses which code to evaluate based on whether a condition is truthy.",
            why:
              "Conditional logic allows a program to react differently to different input or states.",
            example:
              "age = 20\n\nif age >= 18\n  puts \"Adult\"\nelse\n  puts \"Minor\"\nend",
            mistake:
              "if age >= 18\nputs \"Adult\"\nelse\nputs \"Minor\"",
            mistakeExplanation:
              "The code may still parse in some Ruby styles, but consistent indentation makes Ruby's block structure much easier to read and maintain.",
            correction:
              "if age >= 18\n  puts \"Adult\"\nelse\n  puts \"Minor\"\nend",
            labPrompt:
              "Write an if/else expression that prints whether a number is positive or not.",
            question:
              "Which keyword ends a Ruby if block?",
            answer:
              "end",
            distractors: [
              "endif",
              "stop",
            ],
          }),

          lesson({
            slug: "ruby-each",
            title: "Iterate with each",
            summary:
              "Run a block once for each item in a collection.",
            what:
              "The each method iterates through a collection and passes each element to a block.",
            why:
              "Iteration lets you process every item in arrays and other enumerable objects without manually managing an index.",
            example:
              "names = [\"Alex\", \"Sam\", \"Riya\"]\n\nnames.each do |name|\n  puts name\nend",
            mistake:
              "names.each do\n  puts name\nend",
            mistakeExplanation:
              "The block needs a block parameter if you want to refer to the current element by name.",
            correction:
              "names.each do |name|\n  puts name\nend",
            labPrompt:
              "Create an array of three names and print each name using each.",
            question:
              "What does the block variable name represent in names.each do |name|?",
            answer:
              "The current element being processed.",
            distractors: [
              "The entire array.",
              "The array length.",
            ],
          }),

          lesson({
            slug: "ruby-times",
            title: "Repeat code with times",
            summary:
              "Use times when an operation should repeat a known number of times.",
            what:
              "The times method invokes a block repeatedly for an integer number of times.",
            why:
              "times provides a simple Ruby way to repeat an operation without writing a traditional counter loop.",
            example:
              "3.times do |i|\n  puts \"Iteration #{i}\"\nend",
            mistake:
              "3.time do\n  puts \"Hello\"\nend",
            mistakeExplanation:
              "The Ruby method is named times, not time.",
            correction:
              "3.times do\n  puts \"Hello\"\nend",
            labPrompt:
              "Print Hello five times using Ruby's times method.",
            question:
              "How many times does 5.times execute its block?",
            answer:
              "Five times.",
            distractors: [
              "Four times.",
              "Six times.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "ruby-methods-and-collections",
    title: "Methods and collections",
    description:
      "Create reusable methods and work with Ruby's common collection types.",
    topics: [
      {
        slug: "methods",
        title: "Methods",
        description:
          "Define methods, pass arguments, and return values.",
        lessons: [
          lesson({
            slug: "ruby-def",
            title: "Define a method",
            summary:
              "Create reusable behavior with def and end.",
            what:
              "Ruby methods are defined with def followed by a method name and optional parameters. The method body ends with end.",
            why:
              "Methods prevent repeated code and give programs reusable pieces of behavior.",
            example:
              "def greet(name)\n  puts \"Hello #{name}\"\nend\n\ngreet(\"Alex\")",
            mistake:
              "def greet name\n  puts \"Hello\"\n",
            mistakeExplanation:
              "The method definition must have a closing end.",
            correction:
              "def greet(name)\n  puts \"Hello #{name}\"\nend",
            labPrompt:
              "Define a method named square that accepts a number and returns its square.",
            question:
              "Which keyword starts a Ruby method definition?",
            answer:
              "def",
            distractors: [
              "function",
              "method",
            ],
          }),

          lesson({
            slug: "ruby-return",
            title: "Return values from methods",
            summary:
              "Understand Ruby's implicit return and explicit return.",
            what:
              "Ruby methods return the value of their last evaluated expression automatically. The return keyword can also be used when an early return is needed.",
            why:
              "Understanding return values is essential when methods are used as building blocks inside larger expressions.",
            example:
              "def add(a, b)\n  a + b\nend\n\nresult = add(3, 4)\nputs result",
            mistake:
              "def add(a, b)\n  a + b\n  return a - b\nend",
            mistakeExplanation:
              "The explicit return changes which value leaves the method. In Ruby, the final expression is normally returned automatically.",
            correction:
              "def add(a, b)\n  a + b\nend",
            labPrompt:
              "Create a multiply method that returns the product of two numbers.",
            question:
              "What does a Ruby method normally return if no return keyword is used?",
            answer:
              "The value of its last evaluated expression.",
            distractors: [
              "Always nil.",
              "Always the first argument.",
            ],
          }),
        ],
      },

      {
        slug: "arrays-and-hashes",
        title: "Arrays and hashes",
        description:
          "Store ordered values and key-value pairs.",
        lessons: [
          lesson({
            slug: "ruby-arrays",
            title: "Create and access arrays",
            summary:
              "Store multiple values in an ordered Ruby Array.",
            what:
              "An Array stores an ordered collection of objects. Elements can be accessed using indexes, starting from zero.",
            why:
              "Arrays are useful when a program needs to process a sequence of related values.",
            example:
              "numbers = [10, 20, 30]\n\nputs numbers[0]\nputs numbers[2]",
            mistake:
              "numbers = [10, 20, 30]\nputs numbers[3]",
            mistakeExplanation:
              "The array has indexes 0, 1, and 2. Index 3 is outside this three-element array.",
            correction:
              "numbers = [10, 20, 30]\nputs numbers[2]",
            labPrompt:
              "Create an array containing three programming languages and print the second item.",
            question:
              "What is the index of the first element in a Ruby array?",
            answer:
              "0",
            distractors: [
              "1",
              "-1",
            ],
          }),

          lesson({
            slug: "ruby-hashes",
            title: "Create and access hashes",
            summary:
              "Store values using keys in a Ruby Hash.",
            what:
              "A Hash stores key-value pairs. A key is used to retrieve its associated value.",
            why:
              "Hashes are useful for representing structured information such as user details, settings, and lookup tables.",
            example:
              "user = {\n  name: \"Alex\",\n  age: 20\n}\n\nputs user[:name]\nputs user[:age]",
            mistake:
              "puts user[name]",
            mistakeExplanation:
              "The hash uses the symbol :name as its key. The key must be referenced consistently.",
            correction:
              "puts user[:name]",
            labPrompt:
              "Create a hash containing a student's name, branch, and age, then print the branch.",
            question:
              "What does a Ruby Hash store?",
            answer:
              "Key-value pairs.",
            distractors: [
              "Only numbers.",
              "Only ordered indexes.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "ruby-object-oriented-programming",
    title: "Ruby object-oriented programming",
    description:
      "Create classes and objects and organize behavior using Ruby's object model.",
    topics: [
      {
        slug: "classes-and-objects",
        title: "Classes and objects",
        description:
          "Define classes, initialize objects, and create instance methods.",
        lessons: [
          lesson({
            slug: "ruby-class",
            title: "Define a class",
            summary:
              "Create a Ruby class that describes the behavior of objects.",
            what:
              "A class defines the structure and behavior that objects created from it can use.",
            why:
              "Classes help organize related data and behavior into reusable objects.",
            example:
              "class Student\n  def initialize(name)\n    @name = name\n  end\nend\n\nstudent = Student.new(\"Alex\")",
            mistake:
              "class Student\n  def initialize(name)\n    name = name\n  end\nend",
            mistakeExplanation:
              "Assigning name to itself does not store the value as an instance variable. @name creates state belonging to the object.",
            correction:
              "class Student\n  def initialize(name)\n    @name = name\n  end\nend",
            labPrompt:
              "Create a Student class with an initialize method that stores a student's name in @name.",
            question:
              "Which method is commonly used to initialize a newly created Ruby object?",
            answer:
              "initialize",
            distractors: [
              "constructor",
              "start",
            ],
          }),

          lesson({
            slug: "ruby-instance-variable",
            title: "Use instance variables",
            summary:
              "Store data that belongs to an individual object.",
            what:
              "Instance variables begin with @ and hold state belonging to an object.",
            why:
              "Instance variables allow different objects created from the same class to maintain different values.",
            example:
              "class Student\n  def initialize(name)\n    @name = name\n  end\n\n  def name\n    @name\n  end\nend\n\nstudent = Student.new(\"Alex\")\nputs student.name",
            mistake:
              "class Student\n  def initialize(name)\n    name = name\n  end\nend",
            mistakeExplanation:
              "A local variable exists only within the method. An instance variable such as @name remains associated with the object.",
            correction:
              "@name = name",
            labPrompt:
              "Create a Student class that stores and returns a student's name using an instance variable.",
            question:
              "What does @name represent inside a Ruby object?",
            answer:
              "An instance variable belonging to that object.",
            distractors: [
              "A global variable.",
              "A class name.",
            ],
          }),

          lesson({
            slug: "ruby-new",
            title: "Create objects with new",
            summary:
              "Use Class#new to create instances and initialize them.",
            what:
              "Calling new on a class creates an object and invokes its initialize method when one is defined.",
            why:
              "Object creation is the point where a class definition becomes a usable object in a program.",
            example:
              "class Car\n  def initialize(brand)\n    @brand = brand\n  end\nend\n\ncar = Car.new(\"Toyota\")",
            mistake:
              "car = new Car(\"Toyota\")",
            mistakeExplanation:
              "Ruby calls new as a method on the class. The Ruby syntax is ClassName.new(arguments).",
            correction:
              "car = Car.new(\"Toyota\")",
            labPrompt:
              "Create an object from a Student class using Student.new and pass a name.",
            question:
              "How do you normally create an object from a Ruby class named Car?",
            answer:
              "Car.new(...)",
            distractors: [
              "new Car(...)",
              "create Car(...)",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "ruby-blocks-and-enumerables",
    title: "Blocks and enumerables",
    description:
      "Use Ruby blocks and collection methods to write concise data-processing code.",
    topics: [
      {
        slug: "blocks",
        title: "Blocks",
        description:
          "Understand do/end blocks and block parameters.",
        lessons: [
          lesson({
            slug: "ruby-block",
            title: "Work with blocks",
            summary:
              "Pass a block of code to a Ruby method.",
            what:
              "A Ruby block is a chunk of code passed to a method. Blocks can be written with do/end or braces.",
            why:
              "Blocks are a central Ruby feature used for iteration, resource handling, callbacks, and many library APIs.",
            example:
              "[1, 2, 3].each do |number|\n  puts number\nend",
            mistake:
              "[1, 2, 3].each\n  puts number\nend",
            mistakeExplanation:
              "The code needs to be enclosed in a block using do/end or braces.",
            correction:
              "[1, 2, 3].each do |number|\n  puts number\nend",
            labPrompt:
              "Use each with a block to print every value in an array.",
            question:
              "What does a Ruby block represent?",
            answer:
              "A piece of code passed to a method.",
            distractors: [
              "A special type of variable.",
              "A Ruby installation package.",
            ],
          }),

          lesson({
            slug: "ruby-map",
            title: "Transform values with map",
            summary:
              "Create a new collection by transforming each element.",
            what:
              "map runs a block for each element and returns a new collection containing the block's results.",
            why:
              "map is useful when every item needs to be transformed into another value.",
            example:
              "numbers = [1, 2, 3]\n\nsquares = numbers.map do |number|\n  number * number\nend\n\nputs squares.inspect",
            mistake:
              "numbers.map do |number|\n  puts number * number\nend",
            mistakeExplanation:
              "puts returns nil, so using puts as the block's result does not create an array of squared numbers.",
            correction:
              "squares = numbers.map do |number|\n  number * number\nend",
            labPrompt:
              "Use map to create a new array containing the squares of 1, 2, and 3.",
            question:
              "What does map return?",
            answer:
              "A new collection containing the result of the block for each element.",
            distractors: [
              "Always the original array unchanged.",
              "Only the last element.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "ruby-files-and-errors",
    title: "Files, exceptions, and debugging",
    description:
      "Read files, handle errors, and inspect Ruby programs while debugging.",
    topics: [
      {
        slug: "file-handling",
        title: "File handling",
        description:
          "Read and write files using Ruby's File APIs.",
        lessons: [
          lesson({
            slug: "ruby-file-read",
            title: "Read a file",
            summary:
              "Open a text file and read its contents.",
            what:
              "Ruby's File class provides methods for reading and writing files. File.read can return the contents of a file as a string.",
            why:
              "Programs often need to process configuration, text, logs, or other stored data.",
            example:
              "content = File.read(\"notes.txt\")\nputs content",
            mistake:
              "content = File.read(notes.txt)",
            mistakeExplanation:
              "The filename must be represented as a string unless it is stored in a variable.",
            correction:
              "content = File.read(\"notes.txt\")",
            labPrompt:
              "Write Ruby code that reads notes.txt and prints its contents.",
            question:
              "Which Ruby class provides common file operations?",
            answer:
              "File",
            distractors: [
              "Folder",
              "Document",
            ],
          }),

          lesson({
            slug: "ruby-file-write",
            title: "Write to a file",
            summary:
              "Create or replace file contents using File.write.",
            what:
              "File.write writes a string to a file. If the file does not exist, Ruby can create it.",
            why:
              "Writing files lets programs save generated information and results.",
            example:
              "File.write(\"output.txt\", \"Hello from Ruby\")\nputs \"File saved\"",
            mistake:
              "File.write(\"output.txt\")",
            mistakeExplanation:
              "File.write needs the path and the content that should be written.",
            correction:
              "File.write(\"output.txt\", \"Hello from Ruby\")",
            labPrompt:
              "Write the text Ruby is useful to output.txt using File.write.",
            question:
              "What does File.write require in its basic form?",
            answer:
              "A file path and the content to write.",
            distractors: [
              "Only a file extension.",
              "A Git repository URL.",
            ],
          }),
        ],
      },

      {
        slug: "exceptions",
        title: "Exceptions",
        description:
          "Handle runtime problems using begin, rescue, and ensure.",
        lessons: [
          lesson({
            slug: "ruby-rescue",
            title: "Handle errors with rescue",
            summary:
              "Catch an exception and respond without immediately terminating the program.",
            what:
              "Ruby uses begin and rescue to handle exceptions raised while executing a protected section of code.",
            why:
              "Exception handling lets programs respond to expected failures such as invalid input or unavailable files.",
            example:
              "begin\n  number = Integer(\"abc\")\nrescue ArgumentError\n  puts \"Invalid number\"\nend",
            mistake:
              "begin\n  Integer(\"abc\")\ncatch ArgumentError\n  puts \"Invalid number\"\nend",
            mistakeExplanation:
              "Ruby exception handling uses rescue rather than catch for this purpose.",
            correction:
              "begin\n  Integer(\"abc\")\nrescue ArgumentError\n  puts \"Invalid number\"\nend",
            labPrompt:
              "Handle an invalid Integer conversion using rescue.",
            question:
              "Which keyword handles an exception in Ruby?",
            answer:
              "rescue",
            distractors: [
              "catch",
              "except",
            ],
          }),

          lesson({
            slug: "ruby-ensure",
            title: "Always run cleanup with ensure",
            summary:
              "Use ensure for code that should execute whether an error occurs or not.",
            what:
              "The ensure section of an exception-handling block runs regardless of whether an exception was raised.",
            why:
              "Cleanup operations such as closing resources may need to happen even when the main operation fails.",
            example:
              "begin\n  puts \"Working\"\nrescue StandardError\n  puts \"Something went wrong\"\nensure\n  puts \"Cleanup complete\"\nend",
            mistake:
              "begin\n  puts \"Working\"\nfinally\n  puts \"Cleanup\"\nend",
            mistakeExplanation:
              "Ruby uses ensure for unconditional cleanup in exception handling.",
            correction:
              "begin\n  puts \"Working\"\nensure\n  puts \"Cleanup\"\nend",
            labPrompt:
              "Write a begin/ensure block that always prints Cleanup complete.",
            question:
              "When does ensure execute?",
            answer:
              "It executes whether or not an exception occurs.",
            distractors: [
              "Only when an exception occurs.",
              "Only when the program exits normally.",
            ],
          }),
        ],
      },

      {
        slug: "debugging",
        title: "Debugging Ruby",
        description:
          "Use interactive tools and debugging techniques to understand program behavior.",
        lessons: [
          lesson({
            slug: "ruby-debugging-basics",
            title: "Debug a Ruby program",
            summary:
              "Inspect program state and execution while finding bugs.",
            what:
              "Ruby debugging tools can pause execution, inspect variables, step through code, and help locate where program behavior differs from expectations.",
            why:
              "Debugging turns an unclear failure into a sequence of observable program states.",
            example:
              "def add(a, b)\n  result = a + b\n  puts result\nend\n\nadd(2, 3)\n\n# Use a debugger when you need to inspect execution step by step.",
            mistake:
              "Change random lines until the program works.",
            mistakeExplanation:
              "Random changes can hide the real cause of a bug. Inspect inputs, intermediate values, and the exact line where behavior changes.",
            correction:
              "Inspect the failing line, check variable values, reproduce the issue, and then make a targeted change.",
            labPrompt:
              "Given a Ruby method that produces the wrong result, identify which variable you would inspect first and why.",
            question:
              "What is the purpose of a debugger?",
            answer:
              "To inspect and control program execution while finding bugs.",
            distractors: [
              "To install Ruby automatically.",
              "To upload source code to GitHub.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "ruby-gems-and-libraries",
    title: "Ruby gems and libraries",
    description:
      "Understand Ruby libraries, require, and the RubyGems package system.",
    topics: [
      {
        slug: "libraries",
        title: "Libraries and require",
        description:
          "Load Ruby libraries into a program.",
        lessons: [
          lesson({
            slug: "ruby-require",
            title: "Load a library with require",
            summary:
              "Make functionality from a Ruby library available to your program.",
            what:
              "The require method loads a Ruby file or library so that its definitions can be used by the current program.",
            why:
              "Libraries let you reuse tested functionality instead of implementing everything yourself.",
            example:
              "require \"date\"\n\ntoday = Date.today\nputs today",
            mistake:
              "include \"date\"",
            mistakeExplanation:
              "include is primarily used with modules. Loading a library is normally done with require.",
            correction:
              "require \"date\"",
            labPrompt:
              "Load Ruby's date library and print today's date.",
            question:
              "Which method loads a Ruby library?",
            answer:
              "require",
            distractors: [
              "loadlib",
              "import",
            ],
          }),
        ],
      },

      {
        slug: "ruby-gems",
        title: "RubyGems",
        description:
          "Install and manage third-party Ruby packages.",
        lessons: [
          lesson({
            slug: "gem-install",
            title: "Install a gem",
            summary:
              "Use RubyGems to install reusable Ruby packages.",
            what:
              "RubyGems is Ruby's package management system. The gem install command installs a gem and its required dependencies.",
            why:
              "Gems provide reusable libraries and tools that can extend what Ruby programs can do.",
            example:
              "gem install json\n\n# Then a Ruby program can load the library when appropriate.",
            mistake:
              "ruby install json",
            mistakeExplanation:
              "The gem command manages Ruby packages. ruby is the interpreter used to execute Ruby programs.",
            correction:
              "gem install json",
            labPrompt:
              "Write the command that installs a Ruby gem named example_gem.",
            question:
              "Which command installs a Ruby gem?",
            answer:
              "gem install gem_name",
            distractors: [
              "ruby install gem_name",
              "install ruby-gem_name",
            ],
          }),

          lesson({
            slug: "gem-list",
            title: "Find installed gems",
            summary:
              "Inspect gems available in the current Ruby environment.",
            what:
              "RubyGems provides commands for listing and querying installed packages.",
            why:
              "Knowing which libraries are installed helps diagnose dependency problems and understand the environment.",
            example:
              "gem list\n\n# Search remote gems\n gem search -r json",
            mistake:
              "gem show everything",
            mistakeExplanation:
              "RubyGems uses specific commands such as gem list and gem search.",
            correction:
              "gem list\ngem search -r json",
            labPrompt:
              "Write commands that list locally installed gems and search remote gems for json.",
            question:
              "Which command lists installed gems?",
            answer:
              "gem list",
            distractors: [
              "gem installed",
              "ruby gems",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "ruby-web-programming",
    title: "Ruby and the web",
    description:
      "Understand basic CGI/web concepts and Ruby HTTP server libraries from the supplied material.",
    topics: [
      {
        slug: "cgi-and-http",
        title: "CGI and HTTP basics",
        description:
          "Generate web responses and understand basic request handling.",
        lessons: [
          lesson({
            slug: "ruby-cgi",
            title: "Generate HTML from Ruby",
            summary:
              "Use Ruby to produce an HTML response.",
            what:
              "Ruby can generate HTML as part of a web application. CGI provides tools for working with requests, forms, cookies, and sessions.",
            why:
              "Understanding how Ruby can produce HTTP responses provides a foundation for understanding Ruby web frameworks.",
            example:
              "#!/usr/bin/ruby\n\nprint \"Content-type: text/html\\r\\n\\r\\n\"\nprint \"<html><body>Hello from Ruby</body></html>\\r\\n\"",
            mistake:
              "print \"<html><body>Hello</body></html>\"",
            mistakeExplanation:
              "A CGI response historically needs an appropriate Content-Type header before the HTML body.",
            correction:
              "print \"Content-type: text/html\\r\\n\\r\\n\"\nprint \"<html><body>Hello from Ruby</body></html>\\r\\n\"",
            labPrompt:
              "Write a simple Ruby CGI response containing a Content-Type header and an HTML body.",
            question:
              "What does the Content-Type header tell a client?",
            answer:
              "The type of content being returned.",
            distractors: [
              "The Ruby version installed.",
              "The server's password.",
            ],
          }),
        ],
      },

      {
        slug: "webrick",
        title: "WEBrick",
        description:
          "Understand the basic structure of a Ruby HTTP server.",
        lessons: [
          lesson({
            slug: "ruby-webrick",
            title: "Create a basic Ruby HTTP server",
            summary:
              "Use a Ruby HTTP server library to serve content locally.",
            what:
              "The supplied material introduces WEBrick as a Ruby framework for implementing HTTP-based servers and serving documents or handling requests.",
            why:
              "A local HTTP server helps demonstrate the connection between Ruby code and browser requests.",
            example:
              "require \"webrick\"\n\nserver = WEBrick::HTTPServer.new(\n  Port: 2000\n)\n\ntrap(\"INT\") { server.shutdown }\nserver.start",
            mistake:
              "require \"webrick\"\nserver.start",
            mistakeExplanation:
              "A WEBrick server needs to be configured before it can start listening for requests.",
            correction:
              "require \"webrick\"\n\nserver = WEBrick::HTTPServer.new(\n  Port: 2000\n)\n\nserver.start",
            labPrompt:
              "Study the simulated server setup and identify the port on which the server listens.",
            question:
              "What does the Port option specify in a WEBrick HTTP server?",
            answer:
              "The network port on which the server listens.",
            distractors: [
              "The Ruby file extension.",
              "The HTTP response body.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "ruby-networking-and-processes",
    title: "Ruby networking and processes",
    description:
      "Explore standard-library capabilities for URLs, subprocesses, and network communication.",
    topics: [
      {
        slug: "open-uri",
        title: "Working with URLs",
        description:
          "Use Ruby libraries to access resources identified by URLs.",
        lessons: [
          lesson({
            slug: "ruby-open-uri",
            title: "Open a URL with open-uri",
            summary:
              "Use Ruby's open-uri library to access URL resources.",
            what:
              "The open-uri library extends Ruby's IO-style interface so a URL can be opened and its response information inspected.",
            why:
              "Programs often need to retrieve information from HTTP or other network resources.",
            example:
              "require \"open-uri\"\n\nURI.open(\"https://example.com\") do |response|\n  puts response.status.inspect\nend",
            mistake:
              "require \"url\"\nopen_url(\"https://example.com\")",
            mistakeExplanation:
              "The supplied Ruby material uses the open-uri library and URI.open for URL access.",
            correction:
              "require \"open-uri\"\nURI.open(\"https://example.com\") do |response|\n  puts response.status.inspect\nend",
            labPrompt:
              "Write Ruby code that loads open-uri and opens a sample URL.",
            question:
              "Which library is used for opening URL resources in the supplied material?",
            answer:
              "open-uri",
            distractors: [
              "web-uri",
              "http-open",
            ],
          }),
        ],
      },

      {
        slug: "open3",
        title: "Run subprocesses with Open3",
        description:
          "Understand how Ruby can communicate with external processes.",
        lessons: [
          lesson({
            slug: "ruby-open3",
            title: "Communicate with a subprocess",
            summary:
              "Use Open3 when Ruby needs access to process input, output, and errors.",
            what:
              "Ruby's Open3 library can run a subprocess while providing streams for standard input, standard output, and standard error.",
            why:
              "Some programs need to communicate with command-line tools or other processes while separately handling their output and errors.",
            example:
              "require \"open3\"\n\nOpen3.popen3(\"ruby -e 'puts 3 * 4'\") do |stdin, stdout, stderr, wait_thread|\n  puts stdout.read\nend",
            mistake:
              "Open3.run(\"ruby\")",
            mistakeExplanation:
              "Open3 provides specific methods such as popen3 for working with subprocess streams.",
            correction:
              "Open3.popen3(\"ruby -e 'puts 3 * 4'\") do |stdin, stdout, stderr, wait_thread|\n  puts stdout.read\nend",
            labPrompt:
              "Identify which Open3 stream contains normal process output and which contains error output.",
            question:
              "What is one purpose of Open3?",
            answer:
              "Communicating with subprocesses and accessing their input/output/error streams.",
            distractors: [
              "Creating Ruby classes automatically.",
              "Installing gems.",
            ],
          }),
        ],
      },
    ],
  },
];