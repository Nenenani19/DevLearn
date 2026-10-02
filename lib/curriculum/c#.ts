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
      "mistakeExplanation" | "hint" | "labCode" | "output" | "related"
    >
  >;

function lesson(input: SeedInput): LocalLessonSeed {
  return {
    ...input,
    mistakeExplanation:
      input.mistakeExplanation ??
      "The C# code is using the language feature incorrectly or placing the syntax in the wrong structure.",
    hint:
      input.hint ??
      "Check the C# syntax, data type, scope, or object-oriented concept involved.",
    labCode: input.labCode ?? input.example,
    output: input.output ?? "Example output appears here.",
  };
}

export const csharpModules: LocalModuleSeed[] = [
  {
    slug: "csharp-overview",
    title: "C# overview",
    description:
      "Understand C# and the .NET environment before writing your first program.",
    topics: [
      {
        slug: "csharp-introduction",
        title: "Introduction to C#",
        description:
          "Learn what C# is, where it comes from, and why it is widely used.",
        lessons: [
          lesson({
            slug: "what-is-csharp",
            title: "What is C#?",
            summary:
              "Understand C# as a modern, general-purpose, object-oriented programming language.",
            what:
              "C# is a programming language developed by Microsoft as part of the .NET initiative. It is designed for general-purpose and object-oriented programming.",
            why:
              "Understanding what C# is gives you the foundation needed to learn its syntax, object-oriented features, libraries, and .NET ecosystem.",
            example:
              'using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Hello C#");\n    }\n}',
            output: "Hello C#",
            mistake:
              'using System\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Hello C#")\n    }\n}',
            mistakeExplanation:
              "C# statements normally end with semicolons. Missing semicolons causes syntax errors.",
            correction:
              'using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Hello C#");\n    }\n}',
            labPrompt:
              "Create a C# program that prints your name.",
            question:
              "What type of programming language is C#?",
            answer:
              "C# is a modern, general-purpose, object-oriented programming language.",
            distractors: [
              "C# is only a database query language.",
              "C# is only a markup language.",
            ],
          }),

          lesson({
            slug: "csharp-features",
            title: "Features of C#",
            summary:
              "Explore important features such as object orientation, garbage collection, generics, and multithreading.",
            what:
              "C# provides features including Boolean conditions, automatic garbage collection, standard libraries, properties, events, delegates, generics, indexers, and multithreading.",
            why:
              "These features make C# suitable for building different kinds of software and help programmers write structured and reusable programs.",
            example:
              "int age = 20;\nbool eligible = age >= 18;\nConsole.WriteLine(eligible);",
            output: "True",
            mistake:
              "bool eligible = age = 18;",
            mistakeExplanation:
              "The assignment operator = assigns a value. The comparison operator >= checks whether age is greater than or equal to 18.",
            correction:
              "bool eligible = age >= 18;",
            labPrompt:
              "Create a Boolean expression that checks whether a number is positive.",
            question:
              "Which C# feature automatically manages unused memory?",
            answer:
              "Automatic garbage collection.",
            distractors: [
              "Manual pointer deletion only.",
              "The using keyword.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-environment",
    title: "C# environment",
    description:
      "Understand .NET, development tools, and the environment used to run C# programs.",
    topics: [
      {
        slug: "dotnet-environment",
        title: ".NET environment",
        description:
          "Learn how C# works with the .NET framework and runtime.",
        lessons: [
          lesson({
            slug: "dotnet-framework",
            title: "The .NET Framework",
            summary:
              "Understand the platform that provides runtime services and libraries for C# applications.",
            what:
              "The .NET Framework provides a runtime environment and libraries used by languages such as C#. It includes components such as the Common Language Runtime and Framework Class Library.",
            why:
              "C# programs rely on the .NET ecosystem for execution, libraries, memory management, and many application features.",
            example:
              'using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Running on .NET");\n    }\n}',
            output: "Running on .NET",
            mistake:
              'Console.WriteLine("Running on .NET")',
            mistakeExplanation:
              "The statement needs a semicolon at the end.",
            correction:
              'Console.WriteLine("Running on .NET");',
            labPrompt:
              "Write a C# console program that prints a message about the .NET environment.",
            question:
              "What runtime environment is used by C# programs in the .NET ecosystem?",
            answer:
              "The .NET runtime environment.",
            distractors: [
              "The SQL runtime.",
              "The HTML runtime.",
            ],
          }),

          lesson({
            slug: "csharp-ide",
            title: "C# development environment",
            summary:
              "Understand the tools used to write, compile, and execute C# programs.",
            what:
              "C# programs can be written using development environments and text editors and then compiled and executed using appropriate C# tools.",
            why:
              "Knowing the development environment helps you move from writing source code to actually running a C# program.",
            example:
              "Program.cs\n\nclass Program\n{\n    static void Main()\n    {\n        System.Console.WriteLine(\"Hello\");\n    }\n}",
            output: "Hello",
            mistake:
              "Write C# code but never compile or execute the program.",
            correction:
              "Save the source file, compile it using the appropriate C# tooling, and execute the resulting program.",
            labPrompt:
              "Create a simple C# console project and run a program that prints Hello.",
            question:
              "What is the purpose of an IDE?",
            answer:
              "It provides tools for writing, managing, compiling, and running programs.",
            distractors: [
              "It is only used to store databases.",
              "It replaces the C# language.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-program-structure",
    title: "Program structure",
    description:
      "Learn the basic structure of a C# program, namespaces, classes, Main, comments, and identifiers.",
    topics: [
      {
        slug: "hello-world",
        title: "Hello World",
        description:
          "Understand the basic pieces of a C# console program.",
        lessons: [
          lesson({
            slug: "hello-world-program",
            title: "Creating a Hello World program",
            summary:
              "Write the smallest useful C# program and understand its structure.",
            what:
              "A basic C# program can contain a namespace, class, Main method, statements, expressions, and comments.",
            why:
              "The basic program structure becomes the foundation for almost every C# program you write.",
            example:
              'using System;\n\nclass Program\n{\n    static void Main(string[] args)\n    {\n        Console.WriteLine("Hello World");\n    }\n}',
            output: "Hello World",
            mistake:
              'class Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Hello World")\n    }\n}',
            mistakeExplanation:
              "The Console.WriteLine statement is missing its semicolon.",
            correction:
              'class Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Hello World");\n    }\n}',
            labPrompt:
              "Create a C# program that prints Hello World.",
            question:
              "Where does execution begin in a traditional C# console program?",
            answer:
              "Execution begins at the Main method.",
            distractors: [
              "Execution begins at the class declaration.",
              "Execution begins at the using statement.",
            ],
          }),

          lesson({
            slug: "using-and-namespace",
            title: "using and namespace",
            summary:
              "Understand how namespaces organize code and how using makes namespace members easier to access.",
            what:
              "The using keyword allows code to use members of a namespace without repeatedly writing the full namespace name. A namespace groups related classes and other types.",
            why:
              "Namespaces keep larger programs organized and help avoid naming conflicts.",
            example:
              'using System;\n\nnamespace SchoolApp\n{\n    class Program\n    {\n        static void Main()\n        {\n            Console.WriteLine("School");\n        }\n    }\n}',
            output: "School",
            mistake:
              "using System\nnamespace SchoolApp",
            mistakeExplanation:
              "The using statement must end with a semicolon.",
            correction:
              "using System;\nnamespace SchoolApp",
            labPrompt:
              "Create a namespace named CollegeApp containing a Program class.",
            question:
              "What does a namespace provide?",
            answer:
              "It organizes related types such as classes and helps avoid naming conflicts.",
            distractors: [
              "It stores only numeric variables.",
              "It replaces the Main method.",
            ],
          }),
        ],
      },

      {
        slug: "identifiers-and-comments",
        title: "Identifiers and comments",
        description:
          "Learn naming rules and how comments are written in C#.",
        lessons: [
          lesson({
            slug: "csharp-comments",
            title: "Comments in C#",
            summary:
              "Add explanations to code without affecting program execution.",
            what:
              "C# supports single-line comments using // and multiline comments using /* and */.",
            why:
              "Comments help explain code and make programs easier for people to understand and maintain.",
            example:
              'class Program\n{\n    static void Main()\n    {\n        // Print a greeting\n        System.Console.WriteLine("Hello");\n    }\n}',
            output: "Hello",
            mistake:
              'class Program\n{\n    static void Main()\n    {\n        / Print a greeting\n        System.Console.WriteLine("Hello");\n    }\n}',
            mistakeExplanation:
              "A single-line comment must begin with //, not a single /.",
            correction:
              '// Print a greeting\nSystem.Console.WriteLine("Hello");',
            labPrompt:
              "Write a program containing both a single-line and multiline comment.",
            question:
              "Which symbol starts a single-line comment in C#?",
            answer: "//",
            distractors: ["#", "<!--"],
          }),

          lesson({
            slug: "csharp-identifiers",
            title: "Identifiers",
            summary:
              "Learn the rules for naming variables, classes, methods, and other program elements.",
            what:
              "Identifiers are names used for classes, variables, methods, and other user-defined items. They cannot begin with a digit or contain spaces.",
            why:
              "Correct identifiers make code readable and prevent syntax errors.",
            example:
              "int studentAge = 20;\nstring studentName = \"Maya\";",
            output:
              "studentAge = 20\nstudentName = Maya",
            mistake:
              "int 2age = 20;",
            mistakeExplanation:
              "An identifier cannot begin with a digit.",
            correction:
              "int age2 = 20;",
            labPrompt:
              "Create valid identifiers for a student's name, age, and grade.",
            question:
              "Can a C# identifier begin with a number?",
            answer: "No.",
            distractors: ["Yes, always.", "Only if it is a class name."],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-basic-syntax",
    title: "Basic syntax",
    description:
      "Learn classes, member variables, member methods, object creation, and basic C# syntax.",
    topics: [
      {
        slug: "classes-and-members",
        title: "Classes and members",
        description:
          "Understand the basic building blocks of object-oriented C# code.",
        lessons: [
          lesson({
            slug: "class-keyword",
            title: "The class keyword",
            summary:
              "Create a class that groups data and behavior together.",
            what:
              "The class keyword declares a class. A class can contain fields, methods, constructors, properties, and other members.",
            why:
              "Classes are central to object-oriented programming and allow related data and behavior to be organized together.",
            example:
              "class Student\n{\n    string name;\n\n    void Display()\n    {\n        System.Console.WriteLine(name);\n    }\n}",
            output: "A Student class containing data and behavior.",
            mistake:
              "Student\n{\n    string name;\n}",
            mistakeExplanation:
              "A class declaration requires the class keyword.",
            correction:
              "class Student\n{\n    string name;\n}",
            labPrompt:
              "Create a Book class with a title field and a Display method.",
            question:
              "Which keyword declares a class in C#?",
            answer: "class",
            distractors: ["object", "type"],
          }),

          lesson({
            slug: "instantiating-class",
            title: "Instantiating a class",
            summary:
              "Create an object from a C# class.",
            what:
              "An object is created from a class using the new keyword. The object can then access the members allowed by its access level.",
            why:
              "Creating objects allows the class definition to be used with actual data during program execution.",
            example:
              "class Student\n{\n    public string name;\n}\n\nStudent s = new Student();\ns.name = \"Maya\";",
            output: 's.name = "Maya"',
            mistake:
              "Student s;\ns.name = \"Maya\";",
            mistakeExplanation:
              "The variable is declared but no Student object has been created.",
            correction:
              "Student s = new Student();\ns.name = \"Maya\";",
            labPrompt:
              "Create a Car class and instantiate an object from it.",
            question:
              "Which keyword is commonly used to create an object?",
            answer: "new",
            distractors: ["make", "create"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-data-types",
    title: "Data types",
    description:
      "Understand value types, reference types, object, dynamic, string, and pointer types.",
    topics: [
      {
        slug: "value-and-reference-types",
        title: "Value and reference types",
        description:
          "Learn how C# stores and refers to different kinds of data.",
        lessons: [
          lesson({
            slug: "value-types",
            title: "Value types",
            summary:
              "Understand types that directly contain their values.",
            what:
              "Value types directly contain data. Examples include int, char, float, double, bool, decimal, and other numeric types.",
            why:
              "Choosing the correct value type helps you represent data appropriately and understand how values behave when assigned or copied.",
            example:
              "int age = 20;\nchar grade = 'A';\nbool active = true;",
            output:
              "age = 20\ngrade = A\nactive = True",
            mistake:
              "int age = \"20\";",
            mistakeExplanation:
              "The value 20 is written as a string because it is surrounded by quotes.",
            correction:
              "int age = 20;",
            labPrompt:
              "Declare an int, double, char, and bool variable.",
            question:
              "Which type is commonly used for whole numbers?",
            answer: "int",
            distractors: ["char", "bool"],
          }),

          lesson({
            slug: "reference-types",
            title: "Reference types",
            summary:
              "Understand variables that refer to objects or data stored elsewhere.",
            what:
              "Reference type variables contain a reference to an object rather than directly containing the object's data. Examples include class, object, dynamic, and string.",
            why:
              "Understanding references is important when working with objects and understanding how multiple variables can refer to the same object.",
            example:
              "Student a = new Student();\nStudent b = a;",
            output:
              "a and b refer to the same Student object.",
            mistake:
              "Student a;\na.name = \"Maya\";",
            mistakeExplanation:
              "The variable does not refer to a created Student object.",
            correction:
              "Student a = new Student();\na.name = \"Maya\";",
            labPrompt:
              "Create one object and make a second reference point to it.",
            question:
              "What does a reference type variable contain?",
            answer:
              "A reference to an object or memory location.",
            distractors: [
              "Only a primitive numeric value.",
              "Only a Boolean value.",
            ],
          }),
        ],
      },

      {
        slug: "object-dynamic-string",
        title: "Object, dynamic, and string",
        description:
          "Explore flexible and commonly used C# reference types.",
        lessons: [
          lesson({
            slug: "object-type",
            title: "Object type",
            summary:
              "Use object as the base type for values of different types.",
            what:
              "object is an alias for System.Object and can hold values of different types. Converting a value type to object is called boxing.",
            why:
              "The object type is useful when code needs to work with values without knowing their specific type ahead of time.",
            example:
              "object value = 100;\nConsole.WriteLine(value);",
            output: "100",
            mistake:
              "object value;\nConsole.WriteLine(value);",
            mistakeExplanation:
              "The variable has been declared but no value has been assigned.",
            correction:
              "object value = 100;\nConsole.WriteLine(value);",
            labPrompt:
              "Store an integer and then a string using object variables.",
            question:
              "What is boxing?",
            answer:
              "Converting a value type into an object.",
            distractors: [
              "Converting a string into a namespace.",
              "Converting a class into a method.",
            ],
          }),

          lesson({
            slug: "dynamic-type",
            title: "Dynamic type",
            summary:
              "Use dynamic when type checking needs to happen at runtime.",
            what:
              "A dynamic variable can store different types of values and its type checking occurs at runtime.",
            why:
              "Dynamic can be useful when the type of a value cannot be determined until runtime.",
            example:
              "dynamic value = 20;\nConsole.WriteLine(value);\nvalue = \"Hello\";\nConsole.WriteLine(value);",
            output: "20\nHello",
            mistake:
              "dynamic value = 20;\nint x = value;",
            mistakeExplanation:
              "A dynamic value may not safely match the target type at runtime.",
            correction:
              "dynamic value = 20;\nint x = (int)value;",
            labPrompt:
              "Create a dynamic variable and assign it both a number and a string.",
            question:
              "When is type checking performed for dynamic variables?",
            answer: "At runtime.",
            distractors: [
              "Only during editing.",
              "Before the program is written.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-type-conversion",
    title: "Type conversion",
    description:
      "Learn how values are converted between compatible C# types.",
    topics: [
      {
        slug: "conversion-basics",
        title: "Type conversion methods",
        description:
          "Convert values from one data type to another.",
        lessons: [
          lesson({
            slug: "implicit-conversion",
            title: "Implicit conversion",
            summary:
              "Understand conversions that C# can perform automatically.",
            what:
              "An implicit conversion occurs when a value can be converted to another compatible type without an explicit cast.",
            why:
              "Implicit conversion makes common numeric conversions simpler while preserving compatible values.",
            example:
              "int number = 100;\ndouble value = number;\nConsole.WriteLine(value);",
            output: "100",
            mistake:
              "double value = \"100\";",
            mistakeExplanation:
              "A string is not automatically converted to a double in this context.",
            correction:
              "double value = 100;",
            labPrompt:
              "Convert an int value to a double using an implicit conversion.",
            question:
              "Does an implicit conversion require a cast in normal compatible cases?",
            answer: "No.",
            distractors: ["Yes, always.", "Only with strings."],
          }),

          lesson({
            slug: "explicit-conversion",
            title: "Explicit conversion",
            summary:
              "Use casts when a conversion requires you to state the target type.",
            what:
              "Explicit conversion uses a cast or another conversion method when the source value cannot be safely converted automatically.",
            why:
              "Explicit conversion gives the programmer control when moving between types that may lose information.",
            example:
              "double price = 19.75;\nint whole = (int)price;\nConsole.WriteLine(whole);",
            output: "19",
            mistake:
              "double price = 19.75;\nint whole = price;",
            mistakeExplanation:
              "A double cannot be assigned directly to an int without an explicit conversion.",
            correction:
              "double price = 19.75;\nint whole = (int)price;",
            labPrompt:
              "Convert a double value to an int using explicit casting.",
            question:
              "Which syntax performs an explicit cast to int?",
            answer: "(int)value",
            distractors: ["int(value)", "convert int value"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-variables",
    title: "Variables",
    description:
      "Declare, initialize, and work with variables in C#.",
    topics: [
      {
        slug: "variable-basics",
        title: "Variable basics",
        description:
          "Learn how variables are declared and initialized.",
        lessons: [
          lesson({
            slug: "defining-variables",
            title: "Defining variables",
            summary:
              "Declare variables using a type and identifier.",
            what:
              "A variable declaration specifies the data type and name of a variable.",
            why:
              "Variables provide named storage locations for values that programs need to use and change.",
            example:
              "int age;\ndouble salary;\nstring name;",
            output:
              "Three variables are declared.",
            mistake:
              "age int;",
            mistakeExplanation:
              "In C#, the type comes before the variable name.",
            correction:
              "int age;",
            labPrompt:
              "Declare variables for name, age, and marks.",
            question:
              "What comes before the variable name in a declaration?",
            answer:
              "The data type.",
            distractors: [
              "The value only.",
              "The semicolon only.",
            ],
          }),

          lesson({
            slug: "initializing-variables",
            title: "Initializing variables",
            summary:
              "Give a variable its first value.",
            what:
              "Initialization assigns an initial value to a variable when it is declared or before it is used.",
            why:
              "A variable needs an appropriate value before many operations can be performed on it.",
            example:
              "int age = 20;\nstring name = \"Maya\";",
            output:
              "age = 20\nname = Maya",
            mistake:
              "int age;\nConsole.WriteLine(age);",
            mistakeExplanation:
              "A local variable must be definitely assigned before it is read.",
            correction:
              "int age = 20;\nConsole.WriteLine(age);",
            labPrompt:
              "Declare and initialize variables for a student's name and age.",
            question:
              "What does initialization mean?",
            answer:
              "Giving a variable its initial value.",
            distractors: [
              "Deleting a variable.",
              "Changing a class name.",
            ],
          }),
        ],
      },

      {
        slug: "input-and-expressions",
        title: "Input and expressions",
        description:
          "Read values from users and understand lvalue and rvalue expressions.",
        lessons: [
          lesson({
            slug: "accepting-user-input",
            title: "Accepting values from the user",
            summary:
              "Read text entered by the user using the console.",
            what:
              "Console.ReadLine reads input from the console as a string. The value can then be converted when a numeric type is required.",
            why:
              "User input allows programs to interact with people instead of relying only on hard-coded values.",
            example:
              "Console.Write(\"Enter your age: \");\nint age = int.Parse(Console.ReadLine());\nConsole.WriteLine(age);",
            output:
              "Enter your age: 20\n20",
            mistake:
              "int age = Console.ReadLine();",
            mistakeExplanation:
              "Console.ReadLine returns a string, so it cannot directly be assigned to int.",
            correction:
              "int age = int.Parse(Console.ReadLine());",
            labPrompt:
              "Read a user's age and print it.",
            question:
              "What type does Console.ReadLine return?",
            answer: "string",
            distractors: ["int", "double"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-constants-literals",
    title: "Constants and literals",
    description:
      "Understand numeric, character, string literals and constants.",
    topics: [
      {
        slug: "literals",
        title: "Literals",
        description:
          "Represent fixed values directly in C# source code.",
        lessons: [
          lesson({
            slug: "integer-literals",
            title: "Integer literals",
            summary:
              "Write whole-number values directly in C# code.",
            what:
              "Integer literals represent whole-number values and can be written in different forms depending on the required type.",
            why:
              "Programs constantly work with whole numbers such as counts, ages, indexes, and identifiers.",
            example:
              "int count = 100;\nlong population = 1000000L;",
            output:
              "count = 100\npopulation = 1000000",
            mistake:
              "int count = 10.5;",
            mistakeExplanation:
              "10.5 is a floating-point literal, not an integer literal.",
            correction:
              "int count = 10;",
            labPrompt:
              "Create integer variables for age, count, and year.",
            question:
              "What kind of value does an integer literal represent?",
            answer:
              "A whole number.",
            distractors: ["A string only.", "A Boolean only."],
          }),

          lesson({
            slug: "string-literals",
            title: "String literals",
            summary:
              "Represent text using quoted strings.",
            what:
              "String literals represent text and are normally written inside double quotes. C# also supports verbatim strings using the @ prefix.",
            why:
              "Text is required for names, messages, paths, labels, and many other program values.",
            example:
              "string name = \"Maya\";\nstring path = @\"C:\\Users\\Maya\";",
            output:
              "Maya\nC:\\Users\\Maya",
            mistake:
              "string name = Maya;",
            mistakeExplanation:
              "Maya is text, so it must be enclosed in quotation marks.",
            correction:
              "string name = \"Maya\";",
            labPrompt:
              "Create a string containing your name and another containing a file path.",
            question:
              "How are normal string literals written?",
            answer:
              "Inside double quotation marks.",
            distractors: [
              "Inside square brackets.",
              "Inside single braces.",
            ],
          }),
        ],
      },

      {
        slug: "constants",
        title: "Constants",
        description:
          "Create values that cannot be changed after declaration.",
        lessons: [
          lesson({
            slug: "defining-constants",
            title: "Defining constants",
            summary:
              "Use const for values that should remain unchanged.",
            what:
              "The const keyword declares a compile-time constant whose value cannot be changed after declaration.",
            why:
              "Constants make fixed values clear and prevent accidental reassignment.",
            example:
              "const double PI = 3.14159;\nConsole.WriteLine(PI);",
            output: "3.14159",
            mistake:
              "const int age;\nage = 20;",
            mistakeExplanation:
              "A const variable must be assigned its value when declared.",
            correction:
              "const int age = 20;",
            labPrompt:
              "Create a constant representing the number of days in a week.",
            question:
              "Which keyword creates a constant?",
            answer: "const",
            distractors: ["fixed", "constant"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-operators",
    title: "Operators",
    description:
      "Perform arithmetic, comparison, logical, bitwise, and assignment operations.",
    topics: [
      {
        slug: "operator-basics",
        title: "Arithmetic and relational operators",
        description:
          "Use operators to calculate values and compare expressions.",
        lessons: [
          lesson({
            slug: "arithmetic-operators",
            title: "Arithmetic operators",
            summary:
              "Perform mathematical calculations using C# operators.",
            what:
              "Arithmetic operators include +, -, *, /, and %. They perform addition, subtraction, multiplication, division, and remainder operations.",
            why:
              "Calculations are fundamental to programs involving prices, scores, measurements, counters, and formulas.",
            example:
              "int a = 10;\nint b = 3;\nConsole.WriteLine(a + b);\nConsole.WriteLine(a % b);",
            output:
              "13\n1",
            mistake:
              "int result = 10 / 0;",
            mistakeExplanation:
              "Integer division by zero causes a runtime error.",
            correction:
              "int result = 10 / 2;",
            labPrompt:
              "Calculate the sum, difference, product, and remainder of two integers.",
            question:
              "What does % return?",
            answer:
              "The remainder after division.",
            distractors: [
              "The quotient only.",
              "The larger value.",
            ],
          }),

          lesson({
            slug: "relational-operators",
            title: "Relational operators",
            summary:
              "Compare values using operators such as >, <, ==, and !=",
            what:
              "Relational operators compare two values and produce a Boolean result.",
            why:
              "Comparisons are required for decisions, loops, validation, and searching.",
            example:
              "int age = 20;\nConsole.WriteLine(age >= 18);",
            output: "True",
            mistake:
              "if (age = 18)",
            mistakeExplanation:
              "The = operator assigns a value. Comparison uses operators such as ==, >=, or <=.",
            correction:
              "if (age >= 18)",
            labPrompt:
              "Check whether a number is greater than 50.",
            question:
              "What does == test?",
            answer:
              "Whether two values are equal.",
            distractors: [
              "Whether one value is assigned to another.",
              "Whether values are added.",
            ],
          }),
        ],
      },

      {
        slug: "logical-and-assignment",
        title: "Logical and assignment operators",
        description:
          "Combine conditions and assign or update values.",
        lessons: [
          lesson({
            slug: "logical-operators",
            title: "Logical operators",
            summary:
              "Combine Boolean expressions using &&, ||, and !.",
            what:
              "Logical operators combine or invert Boolean conditions. && represents AND, || represents OR, and ! represents NOT.",
            why:
              "Real decisions often depend on multiple conditions being true or at least one condition being true.",
            example:
              "int age = 20;\nbool student = true;\nConsole.WriteLine(age >= 18 && student);",
            output: "True",
            mistake:
              "age >= 18 && student = true",
            mistakeExplanation:
              "The expression should compare or use the Boolean variable correctly.",
            correction:
              "age >= 18 && student == true",
            labPrompt:
              "Check whether a person is at least 18 and is a student.",
            question:
              "What does && mean?",
            answer: "Logical AND.",
            distractors: ["Logical OR.", "Logical NOT."],
          }),

          lesson({
            slug: "assignment-operators",
            title: "Assignment operators",
            summary:
              "Store and update values using assignment operators.",
            what:
              "The = operator assigns a value, while compound operators such as += and -= update a variable using its current value.",
            why:
              "Programs frequently need to update counters, totals, balances, and other changing values.",
            example:
              "int score = 10;\nscore += 5;\nConsole.WriteLine(score);",
            output: "15",
            mistake:
              "int score = 10;\nscore + 5;",
            mistakeExplanation:
              "The expression calculates a value but does not store the result back into score.",
            correction:
              "int score = 10;\nscore += 5;",
            labPrompt:
              "Start a variable at 100 and subtract 25 using a compound assignment operator.",
            question:
              "What does += do?",
            answer:
              "It adds a value to a variable and stores the result back.",
            distractors: [
              "It compares two values.",
              "It creates a new class.",
            ],
          }),
        ],
      },

      {
        slug: "precedence",
        title: "Operator precedence",
        description:
          "Understand the order in which operators are evaluated.",
        lessons: [
          lesson({
            slug: "operator-precedence",
            title: "Operator precedence",
            summary:
              "Control the order of operations in expressions.",
            what:
              "Operator precedence determines which operators are evaluated first. Parentheses can be used to make the intended order explicit.",
            why:
              "Correct precedence prevents unexpected calculation results.",
            example:
              "int result = 2 + 3 * 4;\nConsole.WriteLine(result);",
            output: "14",
            mistake:
              "int result = 2 + 3 * 4;\n// expecting 20",
            mistakeExplanation:
              "Multiplication has higher precedence than addition.",
            correction:
              "int result = (2 + 3) * 4;",
            labPrompt:
              "Write an expression that adds two numbers before multiplying by a third number.",
            question:
              "What can you use to explicitly control evaluation order?",
            answer: "Parentheses.",
            distractors: ["Comments.", "Namespaces."],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-decision-making",
    title: "Decision making",
    description:
      "Control program execution using if, else, switch, and conditional expressions.",
    topics: [
      {
        slug: "if-statements",
        title: "if and else",
        description:
          "Run different code depending on conditions.",
        lessons: [
          lesson({
            slug: "if-statement",
            title: "if statement",
            summary:
              "Execute a block only when a condition is true.",
            what:
              "An if statement evaluates a Boolean condition and executes its block when that condition is true.",
            why:
              "Programs need to make decisions based on input and current data.",
            example:
              "int age = 20;\n\nif (age >= 18)\n{\n    Console.WriteLine(\"Adult\");\n}",
            output: "Adult",
            mistake:
              "if age >= 18\n{\n    Console.WriteLine(\"Adult\");\n}",
            mistakeExplanation:
              "C# requires the condition to be enclosed in parentheses.",
            correction:
              "if (age >= 18)\n{\n    Console.WriteLine(\"Adult\");\n}",
            labPrompt:
              "Write an if statement that prints Positive when a number is greater than zero.",
            question:
              "When does the body of an if statement execute?",
            answer:
              "When its condition evaluates to true.",
            distractors: [
              "Always.",
              "Only when the program ends.",
            ],
          }),

          lesson({
            slug: "if-else",
            title: "if...else",
            summary:
              "Choose between two possible execution paths.",
            what:
              "An if...else statement executes one block when the condition is true and another block when it is false.",
            why:
              "Many decisions have two possible outcomes, such as pass/fail or valid/invalid.",
            example:
              "int marks = 75;\n\nif (marks >= 40)\n{\n    Console.WriteLine(\"Pass\");\n}\nelse\n{\n    Console.WriteLine(\"Fail\");\n}",
            output: "Pass",
            mistake:
              "if (marks >= 40)\n    Console.WriteLine(\"Pass\");\n    Console.WriteLine(\"Fail\");",
            mistakeExplanation:
              "Without braces or an else block, the second statement is not controlled by the if condition.",
            correction:
              "if (marks >= 40)\n{\n    Console.WriteLine(\"Pass\");\n}\nelse\n{\n    Console.WriteLine(\"Fail\");\n}",
            labPrompt:
              "Check whether a number is even or odd using if...else.",
            question:
              "How many alternative blocks does a basic if...else provide?",
            answer: "Two.",
            distractors: ["One only.", "Unlimited automatically."],
          }),
        ],
      },

      {
        slug: "switch-and-conditional",
        title: "switch and conditional operator",
        description:
          "Handle multiple fixed choices and compact conditions.",
        lessons: [
          lesson({
            slug: "switch-statement",
            title: "switch statement",
            summary:
              "Select one block of code from multiple possible cases.",
            what:
              "A switch statement compares an expression against multiple cases and executes the matching case.",
            why:
              "Switch is useful when a value can correspond to several known choices.",
            example:
              "int day = 2;\n\nswitch (day)\n{\n    case 1:\n        Console.WriteLine(\"Monday\");\n        break;\n    case 2:\n        Console.WriteLine(\"Tuesday\");\n        break;\n}",
            output: "Tuesday",
            mistake:
              "switch (day)\n{\n    case 1:\n        Console.WriteLine(\"Monday\");\n}",
            mistakeExplanation:
              "Traditional switch cases need appropriate termination such as break.",
            correction:
              "switch (day)\n{\n    case 1:\n        Console.WriteLine(\"Monday\");\n        break;\n}",
            labPrompt:
              "Create a switch statement for numbers 1 to 3 representing three menu choices.",
            question:
              "What does a switch case represent?",
            answer:
              "One possible matching value for the switch expression.",
            distractors: [
              "A loop condition.",
              "A class constructor.",
            ],
          }),

          lesson({
            slug: "conditional-operator",
            title: "The ? : operator",
            summary:
              "Choose between two values using a compact conditional expression.",
            what:
              "The conditional operator uses a condition followed by ? and two expressions separated by :.",
            why:
              "It is useful for simple two-way value selection when a full if...else statement would be unnecessary.",
            example:
              "int age = 20;\nstring result = age >= 18 ? \"Adult\" : \"Minor\";\nConsole.WriteLine(result);",
            output: "Adult",
            mistake:
              "string result = age >= 18 ? \"Adult\";",
            mistakeExplanation:
              "The conditional operator requires both the true and false expressions.",
            correction:
              "string result = age >= 18 ? \"Adult\" : \"Minor\";",
            labPrompt:
              "Use the conditional operator to assign Pass or Fail based on marks.",
            question:
              "What does the : part of the conditional operator separate?",
            answer:
              "The expression used when the condition is false.",
            distractors: [
              "A class from a namespace.",
              "A loop from a method.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-loops",
    title: "Loops",
    description:
      "Repeat code using while, for, do-while, nested loops, and loop control statements.",
    topics: [
      {
        slug: "loop-basics",
        title: "Loop basics",
        description:
          "Repeat statements while conditions are satisfied.",
        lessons: [
          lesson({
            slug: "while-loop",
            title: "while loop",
            summary:
              "Repeat a block while a condition remains true.",
            what:
              "A while loop evaluates its condition before each iteration and executes the loop body while the condition is true.",
            why:
              "While loops are useful when the number of repetitions depends on a condition.",
            example:
              "int i = 1;\n\nwhile (i <= 3)\n{\n    Console.WriteLine(i);\n    i++;\n}",
            output: "1\n2\n3",
            mistake:
              "int i = 1;\nwhile (i <= 3)\n{\n    Console.WriteLine(i);\n}",
            mistakeExplanation:
              "The loop variable is never changed, so the condition remains true.",
            correction:
              "int i = 1;\nwhile (i <= 3)\n{\n    Console.WriteLine(i);\n    i++;\n}",
            labPrompt:
              "Print numbers from 1 to 10 using a while loop.",
            question:
              "When is the while condition checked?",
            answer:
              "Before each iteration.",
            distractors: [
              "Only after the loop ends.",
              "Only once when the program starts.",
            ],
          }),

          lesson({
            slug: "for-loop",
            title: "for loop",
            summary:
              "Repeat code using initialization, condition, and update expressions.",
            what:
              "A for loop combines initialization, a condition, and an update expression in one loop structure.",
            why:
              "For loops are convenient when a loop has a known counter or predictable number of iterations.",
            example:
              "for (int i = 1; i <= 5; i++)\n{\n    Console.WriteLine(i);\n}",
            output: "1\n2\n3\n4\n5",
            mistake:
              "for (int i = 1; i <= 5; )\n{\n    Console.WriteLine(i);\n}",
            mistakeExplanation:
              "The update expression is missing, so the counter does not change.",
            correction:
              "for (int i = 1; i <= 5; i++)\n{\n    Console.WriteLine(i);\n}",
            labPrompt:
              "Print the first 10 even numbers using a for loop.",
            question:
              "Which part of a for loop changes the counter?",
            answer:
              "The iteration/update expression.",
            distractors: [
              "The namespace declaration.",
              "The class name.",
            ],
          }),
        ],
      },

      {
        slug: "do-while-and-control",
        title: "do-while and loop control",
        description:
          "Use post-test loops and control iteration with break and continue.",
        lessons: [
          lesson({
            slug: "do-while-loop",
            title: "do...while loop",
            summary:
              "Execute a loop body at least once before checking the condition.",
            what:
              "A do...while loop executes its body first and checks the condition afterward.",
            why:
              "It is useful when the body must run at least once, such as displaying a menu before asking whether to continue.",
            example:
              "int i = 1;\n\ndo\n{\n    Console.WriteLine(i);\n    i++;\n}\nwhile (i <= 3);",
            output: "1\n2\n3",
            mistake:
              "do\n{\n    Console.WriteLine(\"Hello\");\n}\nwhile;",
            mistakeExplanation:
              "The do...while statement requires a Boolean condition.",
            correction:
              "do\n{\n    Console.WriteLine(\"Hello\");\n}\nwhile (true);",
            labPrompt:
              "Print a number at least once using do...while.",
            question:
              "When is the condition checked in do...while?",
            answer:
              "After the loop body executes.",
            distractors: [
              "Before the loop body executes.",
              "Never.",
            ],
          }),

          lesson({
            slug: "break-and-continue",
            title: "Loop control statements",
            summary:
              "Control loop execution using break and continue.",
            what:
              "break exits a loop completely, while continue skips the remaining statements in the current iteration and proceeds to the next iteration.",
            why:
              "Loop control is useful when a program needs to stop early or skip particular values.",
            example:
              "for (int i = 1; i <= 5; i++)\n{\n    if (i == 3)\n        continue;\n\n    Console.WriteLine(i);\n}",
            output: "1\n2\n4\n5",
            mistake:
              "if (i == 3)\n    break;",
            mistakeExplanation:
              "break stops the entire loop, while continue only skips the current iteration.",
            correction:
              "if (i == 3)\n    continue;",
            labPrompt:
              "Print numbers from 1 to 10 but skip number 5.",
            question:
              "What does break do?",
            answer:
              "It exits the loop.",
            distractors: [
              "It restarts the loop.",
              "It skips only one statement.",
            ],
          }),
        ],
      },

      {
        slug: "nested-and-infinite-loops",
        title: "Nested and infinite loops",
        description:
          "Use loops inside loops and understand how infinite loops occur.",
        lessons: [
          lesson({
            slug: "nested-loops",
            title: "Nested loops",
            summary:
              "Place one loop inside another loop.",
            what:
              "A nested loop is a loop whose body contains another loop.",
            why:
              "Nested loops are commonly used for tables, matrices, patterns, and multidimensional data.",
            example:
              "for (int i = 1; i <= 2; i++)\n{\n    for (int j = 1; j <= 3; j++)\n    {\n        Console.WriteLine(i + \" \" + j);\n    }\n}",
            output:
              "1 1\n1 2\n1 3\n2 1\n2 2\n2 3",
            mistake:
              "for (int i = 1; i <= 2; i++)\n{\n    for (int j = 1; j <= 3; )\n    {\n        Console.WriteLine(j);\n    }\n}",
            mistakeExplanation:
              "The inner loop counter never changes, so the inner loop does not terminate.",
            correction:
              "for (int i = 1; i <= 2; i++)\n{\n    for (int j = 1; j <= 3; j++)\n    {\n        Console.WriteLine(j);\n    }\n}",
            labPrompt:
              "Print a 3 by 3 number grid using nested loops.",
            question:
              "What is a nested loop?",
            answer:
              "A loop placed inside another loop.",
            distractors: [
              "A loop without a condition.",
              "A method inside a namespace.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-encapsulation",
    title: "Encapsulation",
    description:
      "Control access to C# members using public, private, protected, and internal access levels.",
    topics: [
      {
        slug: "access-specifiers",
        title: "Access specifiers",
        description:
          "Control where classes and members can be accessed.",
        lessons: [
          lesson({
            slug: "public-access",
            title: "public access",
            summary:
              "Make a member accessible from code that can access its containing type.",
            what:
              "The public access modifier allows a member or type to be accessed wherever the containing type is accessible.",
            why:
              "Public members form the visible interface that other parts of a program can use.",
            example:
              "class Student\n{\n    public string name = \"Maya\";\n}\n\nStudent s = new Student();\nConsole.WriteLine(s.name);",
            output: "Maya",
            mistake:
              "class Student\n{\n    public string name;\n}\n\nConsole.WriteLine(name);",
            mistakeExplanation:
              "The member must be accessed through an instance when it is an instance field.",
            correction:
              "Student s = new Student();\nConsole.WriteLine(s.name);",
            labPrompt:
              "Create a public field and access it through an object.",
            question:
              "Which modifier makes a member broadly accessible?",
            answer: "public",
            distractors: ["private", "protected"],
          }),

          lesson({
            slug: "private-access",
            title: "private access",
            summary:
              "Restrict a member so it can be accessed only within its containing type.",
            what:
              "A private member is accessible only within the class or type where it is declared.",
            why:
              "Private members help hide implementation details and protect internal state.",
            example:
              "class BankAccount\n{\n    private double balance;\n\n    public void Deposit(double amount)\n    {\n        balance += amount;\n    }\n}",
            output:
              "balance is protected from direct outside access.",
            mistake:
              "BankAccount account = new BankAccount();\naccount.balance = 1000;",
            mistakeExplanation:
              "balance is private and cannot be accessed directly from outside the class.",
            correction:
              "BankAccount account = new BankAccount();\naccount.Deposit(1000);",
            labPrompt:
              "Create a private balance field and a public method that changes it.",
            question:
              "Where can a private member be accessed?",
            answer:
              "Inside its containing type.",
            distractors: [
              "Anywhere in the application.",
              "Only inside Main.",
            ],
          }),
        ],
      },

      {
        slug: "protected-internal",
        title: "protected and internal",
        description:
          "Understand additional access levels provided by C#.",
        lessons: [
          lesson({
            slug: "protected-access",
            title: "protected access",
            summary:
              "Allow access within a class and its derived classes.",
            what:
              "A protected member can be accessed within its declaring class and by derived classes.",
            why:
              "Protected members are useful when a base class needs to expose selected implementation details to subclasses.",
            example:
              "class Animal\n{\n    protected string name = \"Animal\";\n}\n\nclass Dog : Animal\n{\n    public void Show()\n    {\n        Console.WriteLine(name);\n    }\n}",
            output: "Animal",
            mistake:
              "class Dog : Animal\n{\n    public void Show()\n    {\n        Console.WriteLine(Animal.name);\n    }\n}",
            mistakeExplanation:
              "A protected instance member is accessed through the derived class's inherited context.",
            correction:
              "class Dog : Animal\n{\n    public void Show()\n    {\n        Console.WriteLine(name);\n    }\n}",
            labPrompt:
              "Create a base class with a protected field and access it from a derived class.",
            question:
              "Who can access a protected member?",
            answer:
              "The declaring class and its derived classes.",
            distractors: [
              "Only unrelated classes.",
              "Only static methods.",
            ],
          }),

          lesson({
            slug: "internal-access",
            title: "internal access",
            summary:
              "Allow access to a type or member within the same assembly.",
            what:
              "The internal modifier limits access to the current assembly.",
            why:
              "Internal access is useful for exposing implementation details to code inside the same compiled application or library while keeping them hidden externally.",
            example:
              "internal class Helper\n{\n    internal static void Show()\n    {\n        Console.WriteLine(\"Helper\");\n    }\n}",
            output: "Helper",
            mistake:
              "private class Helper\n{\n    internal static void Show() { }\n}",
            mistakeExplanation:
              "The example is demonstrating assembly-level accessibility, which is provided by internal.",
            correction:
              "internal class Helper\n{\n    internal static void Show() { }\n}",
            labPrompt:
              "Create an internal helper class containing an internal method.",
            question:
              "What does internal primarily control?",
            answer:
              "Access within the same assembly.",
            distractors: [
              "Access only inside one method.",
              "Access only from derived classes.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-methods",
    title: "Methods",
    description:
      "Create reusable methods, pass parameters, return values, and use recursion.",
    topics: [
      {
        slug: "method-basics",
        title: "Method basics",
        description:
          "Define and call reusable blocks of C# code.",
        lessons: [
          lesson({
            slug: "defining-methods",
            title: "Defining methods",
            summary:
              "Create a method that performs a specific task.",
            what:
              "A method contains statements that perform a task and can optionally accept parameters and return a value.",
            why:
              "Methods break large programs into smaller reusable pieces.",
            example:
              "static void Greet()\n{\n    Console.WriteLine(\"Hello\");\n}",
            output: "A method named Greet is defined.",
            mistake:
              "static Greet()\n{\n    Console.WriteLine(\"Hello\");\n}",
            mistakeExplanation:
              "A method declaration needs a return type such as void.",
            correction:
              "static void Greet()\n{\n    Console.WriteLine(\"Hello\");\n}",
            labPrompt:
              "Define a method named ShowMessage that prints a message.",
            question:
              "What does void indicate?",
            answer:
              "The method does not return a value.",
            distractors: [
              "The method returns a string.",
              "The method is private.",
            ],
          }),

          lesson({
            slug: "calling-methods",
            title: "Calling methods",
            summary:
              "Execute a method by invoking its name.",
            what:
              "A method is called by writing its name followed by parentheses and supplying required arguments.",
            why:
              "Defining a method does not execute it. Calling it tells the program to run its statements.",
            example:
              "static void Greet()\n{\n    Console.WriteLine(\"Hello\");\n}\n\nstatic void Main()\n{\n    Greet();\n}",
            output: "Hello",
            mistake:
              "Greet;",
            mistakeExplanation:
              "A method call requires parentheses.",
            correction:
              "Greet();",
            labPrompt:
              "Create and call a method that prints your name.",
            question:
              "How do you call a method with no arguments?",
            answer:
              "Write its name followed by ().",
            distractors: [
              "Write only its name.",
              "Use the class keyword.",
            ],
          }),
        ],
      },

      {
        slug: "parameters-and-recursion",
        title: "Parameters and recursion",
        description:
          "Pass information into methods and call methods recursively.",
        lessons: [
          lesson({
            slug: "method-parameters",
            title: "Passing parameters",
            summary:
              "Send values into methods so they can work with different data.",
            what:
              "Parameters are variables declared in a method definition. Arguments are the values supplied when the method is called.",
            why:
              "Parameters make methods reusable instead of forcing them to work with one fixed value.",
            example:
              "static void Greet(string name)\n{\n    Console.WriteLine(\"Hello \" + name);\n}\n\nGreet(\"Maya\");",
            output: "Hello Maya",
            mistake:
              "static void Greet()\n{\n    Console.WriteLine(name);\n}\nGreet(\"Maya\");",
            mistakeExplanation:
              "The method must declare a parameter if it expects an argument.",
            correction:
              "static void Greet(string name)\n{\n    Console.WriteLine(\"Hello \" + name);\n}",
            labPrompt:
              "Create a method that accepts two integers and prints their sum.",
            question:
              "What is a parameter?",
            answer:
              "A variable declared in a method definition that receives an argument.",
            distractors: [
              "A class name.",
              "A namespace declaration.",
            ],
          }),

          lesson({
            slug: "recursive-method",
            title: "Recursive method call",
            summary:
              "Understand a method that calls itself.",
            what:
              "A recursive method calls itself to solve a problem through smaller versions of the same problem. It needs a stopping condition.",
            why:
              "Recursion is useful for problems that naturally break into smaller similar problems.",
            example:
              "static int Factorial(int n)\n{\n    if (n <= 1)\n        return 1;\n\n    return n * Factorial(n - 1);\n}",
            output: "Factorial(4) = 24",
            mistake:
              "static int Count(int n)\n{\n    return Count(n - 1);\n}",
            mistakeExplanation:
              "The recursive method has no base condition, so it keeps calling itself.",
            correction:
              "static int Count(int n)\n{\n    if (n == 0)\n        return 0;\n\n    return Count(n - 1);\n}",
            labPrompt:
              "Create a recursive method that calculates factorial.",
            question:
              "What must recursion normally contain to stop?",
            answer:
              "A base condition.",
            distractors: [
              "A namespace.",
              "A constructor only.",
            ],
          }),
        ],
      },

      {
        slug: "ref-and-out",
        title: "ref and out parameters",
        description:
          "Pass arguments by reference or return values through output parameters.",
        lessons: [
          lesson({
            slug: "ref-parameter",
            title: "Passing parameters by reference",
            summary:
              "Allow a method to modify the caller's variable using ref.",
            what:
              "The ref keyword passes an argument by reference, allowing the called method to modify the original variable.",
            why:
              "Reference parameters are useful when a method needs to change an existing variable directly.",
            example:
              "static void AddTen(ref int value)\n{\n    value += 10;\n}\n\nint x = 5;\nAddTen(ref x);\nConsole.WriteLine(x);",
            output: "15",
            mistake:
              "AddTen(x);",
            mistakeExplanation:
              "A ref parameter requires ref at both the method declaration and method call.",
            correction:
              "AddTen(ref x);",
            labPrompt:
              "Create a method that doubles an integer using ref.",
            question:
              "What does ref allow?",
            answer:
              "A method to work with the caller's variable by reference.",
            distractors: [
              "It makes the variable constant.",
              "It creates a new namespace.",
            ],
          }),

          lesson({
            slug: "out-parameter",
            title: "Passing parameters by output",
            summary:
              "Return additional values through an out parameter.",
            what:
              "The out keyword allows a method to assign a value to an argument and return it through that parameter.",
            why:
              "out is useful when a method needs to produce multiple outputs.",
            example:
              "static void GetValues(out int a, out int b)\n{\n    a = 10;\n    b = 20;\n}\n\nGetValues(out int x, out int y);\nConsole.WriteLine(x + y);",
            output: "30",
            mistake:
              "static void GetValue(out int x)\n{\n    Console.WriteLine(x);\n}",
            mistakeExplanation:
              "An out parameter must be assigned before the method returns.",
            correction:
              "static void GetValue(out int x)\n{\n    x = 10;\n}",
            labPrompt:
              "Create a method that returns two numbers using out parameters.",
            question:
              "What must a method do with an out parameter?",
            answer:
              "Assign it before returning.",
            distractors: [
              "Make it const.",
              "Never use it.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-nullables",
    title: "Nullables",
    description:
      "Represent missing values and use the null coalescing operator.",
    topics: [
      {
        slug: "nullable-values",
        title: "Nullable values",
        description:
          "Allow value types to represent null.",
        lessons: [
          lesson({
            slug: "nullable-types",
            title: "Nullable types",
            summary:
              "Allow value types such as int to contain null.",
            what:
              "Nullable value types can represent either a normal value or null.",
            why:
              "Nullable values are useful when data may be missing or not yet provided.",
            example:
              "int? age = null;\nConsole.WriteLine(age);",
            output: "null",
            mistake:
              "int age = null;",
            mistakeExplanation:
              "A normal int cannot represent null.",
            correction:
              "int? age = null;",
            labPrompt:
              "Create a nullable integer representing an optional age.",
            question:
              "How do you declare a nullable int?",
            answer: "int?",
            distractors: ["nullable int", "null int"],
          }),

          lesson({
            slug: "null-coalescing",
            title: "Null coalescing operator",
            summary:
              "Provide a fallback value when an expression is null.",
            what:
              "The ?? operator returns its left operand when it is not null; otherwise it returns the right operand.",
            why:
              "It provides a concise way to handle missing values with a default.",
            example:
              "string name = null;\nstring displayName = name ?? \"Guest\";\nConsole.WriteLine(displayName);",
            output: "Guest",
            mistake:
              "string displayName = name ? \"Guest\";",
            mistakeExplanation:
              "The null coalescing operator uses ??, not the conditional operator syntax.",
            correction:
              "string displayName = name ?? \"Guest\";",
            labPrompt:
              "Use ?? to provide a default city when a nullable string is null.",
            question:
              "When is the right side of ?? used?",
            answer:
              "When the left side is null.",
            distractors: [
              "When the left side is always true.",
              "When the program starts.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-arrays",
    title: "Arrays",
    description:
      "Store multiple values using one-dimensional, multidimensional, and jagged arrays.",
    topics: [
      {
        slug: "array-basics",
        title: "Array basics",
        description:
          "Create, initialize, access, and iterate through arrays.",
        lessons: [
          lesson({
            slug: "declaring-arrays",
            title: "Declaring arrays",
            summary:
              "Create a fixed-size collection of values of the same type.",
            what:
              "An array stores multiple values of the same type and uses an index to access individual elements.",
            why:
              "Arrays are useful when a program needs to store a group of related values such as marks or prices.",
            example:
              "int[] marks = new int[3];\nmarks[0] = 80;\nmarks[1] = 90;\nmarks[2] = 75;",
            output: "80, 90, 75",
            mistake:
              "int marks = new int[3];",
            mistakeExplanation:
              "The variable needs array syntax [] when storing an array.",
            correction:
              "int[] marks = new int[3];",
            labPrompt:
              "Create an integer array containing five marks.",
            question:
              "What does the [] indicate?",
            answer:
              "An array type or array indexing operation.",
            distractors: [
              "A method.",
              "A namespace.",
            ],
          }),

          lesson({
            slug: "array-indexing",
            title: "Accessing array elements",
            summary:
              "Read and change individual array elements using indexes.",
            what:
              "Array indexes begin at 0. The first element is at index 0, the second at index 1, and so on.",
            why:
              "Indexing allows programs to work with individual elements inside an array.",
            example:
              "int[] numbers = { 10, 20, 30 };\nConsole.WriteLine(numbers[0]);",
            output: "10",
            mistake:
              "Console.WriteLine(numbers[3]);",
            mistakeExplanation:
              "An array with three elements has indexes 0, 1, and 2.",
            correction:
              "Console.WriteLine(numbers[2]);",
            labPrompt:
              "Create an array of five numbers and print its first and last elements.",
            question:
              "What is the index of the first array element?",
            answer: "0",
            distractors: ["1", "-1"],
          }),
        ],
      },

      {
        slug: "array-iteration",
        title: "Array iteration",
        description:
          "Use foreach and other techniques to process array elements.",
        lessons: [
          lesson({
            slug: "foreach-array",
            title: "foreach loop",
            summary:
              "Process every element of an array without manually managing an index.",
            what:
              "The foreach loop iterates through each element in a collection such as an array.",
            why:
              "foreach makes simple collection traversal readable and reduces index-related mistakes.",
            example:
              "int[] numbers = { 10, 20, 30 };\n\nforeach (int number in numbers)\n{\n    Console.WriteLine(number);\n}",
            output: "10\n20\n30",
            mistake:
              "foreach (int number in 10)\n{\n    Console.WriteLine(number);\n}",
            mistakeExplanation:
              "foreach requires a collection that can be enumerated.",
            correction:
              "foreach (int number in numbers)\n{\n    Console.WriteLine(number);\n}",
            labPrompt:
              "Use foreach to print every element of an integer array.",
            question:
              "What does foreach iterate over?",
            answer:
              "Each element of a collection.",
            distractors: [
              "Only the first element.",
              "Only the array length.",
            ],
          }),
        ],
      },

      {
        slug: "multidimensional-jagged-arrays",
        title: "Multidimensional and jagged arrays",
        description:
          "Store data in multiple dimensions and arrays of arrays.",
        lessons: [
          lesson({
            slug: "two-dimensional-array",
            title: "Two-dimensional arrays",
            summary:
              "Store values using rows and columns.",
            what:
              "A two-dimensional array stores data using two indexes, commonly representing rows and columns.",
            why:
              "Two-dimensional arrays are useful for tables, grids, matrices, and structured numerical data.",
            example:
              "int[,] matrix = {\n    { 1, 2 },\n    { 3, 4 }\n};\n\nConsole.WriteLine(matrix[1, 0]);",
            output: "3",
            mistake:
              "Console.WriteLine(matrix[2, 0]);",
            mistakeExplanation:
              "The row indexes are 0 and 1 in a two-row array.",
            correction:
              "Console.WriteLine(matrix[1, 0]);",
            labPrompt:
              "Create a 2 by 2 integer matrix and print all values.",
            question:
              "How many indexes does a two-dimensional array use?",
            answer: "Two.",
            distractors: ["One.", "Three."],
          }),

          lesson({
            slug: "jagged-array",
            title: "Jagged arrays",
            summary:
              "Create an array whose elements are themselves arrays.",
            what:
              "A jagged array is an array of arrays, and each inner array can have a different length.",
            why:
              "Jagged arrays are useful when each row or group may contain a different number of elements.",
            example:
              "int[][] values = new int[2][];\nvalues[0] = new int[] { 1, 2 };\nvalues[1] = new int[] { 3, 4, 5 };",
            output:
              "Row 1: 1, 2\nRow 2: 3, 4, 5",
            mistake:
              "int[][] values = new int[2, 3];",
            mistakeExplanation:
              "That syntax creates a rectangular multidimensional array concept rather than a jagged array.",
            correction:
              "int[][] values = new int[2][];",
            labPrompt:
              "Create a jagged array containing rows of different lengths.",
            question:
              "What is a jagged array?",
            answer:
              "An array whose elements are arrays.",
            distractors: [
              "An array that can only store strings.",
              "A two-dimensional rectangular array only.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-strings",
    title: "Strings",
    description:
      "Create and manipulate string values using the String class.",
    topics: [
      {
        slug: "string-basics",
        title: "String basics",
        description:
          "Create strings and use common string properties and methods.",
        lessons: [
          lesson({
            slug: "creating-string-object",
            title: "Creating a string",
            summary:
              "Store text in a C# string.",
            what:
              "The string type is an alias for System.String and stores sequences of characters.",
            why:
              "Strings are essential for names, messages, user input, paths, and textual data.",
            example:
              "string message = \"Hello C#\";\nConsole.WriteLine(message);",
            output: "Hello C#",
            mistake:
              "string message = Hello C#;",
            mistakeExplanation:
              "Text literals must be enclosed in quotation marks.",
            correction:
              "string message = \"Hello C#\";",
            labPrompt:
              "Create a string containing your full name and print it.",
            question:
              "What .NET type does string alias?",
            answer:
              "System.String.",
            distractors: [
              "System.Int32.",
              "System.CharArray.",
            ],
          }),

          lesson({
            slug: "string-methods",
            title: "String methods",
            summary:
              "Use methods to inspect and manipulate text.",
            what:
              "The String class provides properties and methods for working with text, such as Length and methods for searching or changing strings.",
            why:
              "Real programs frequently need to search, compare, format, or transform text.",
            example:
              "string name = \"Maya\";\nConsole.WriteLine(name.Length);",
            output: "4",
            mistake:
              "Console.WriteLine(name.length);",
            mistakeExplanation:
              "C# is case-sensitive, so the String property is Length with a capital L.",
            correction:
              "Console.WriteLine(name.Length);",
            labPrompt:
              "Print the length of a string entered by the user.",
            question:
              "What does Length provide?",
            answer:
              "The number of characters in the string.",
            distractors: [
              "The first character only.",
              "The memory address.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-structures",
    title: "Structures",
    description:
      "Create value types using structs and understand how structs differ from classes.",
    topics: [
      {
        slug: "struct-basics",
        title: "Structures",
        description:
          "Define and use custom value types.",
        lessons: [
          lesson({
            slug: "defining-structure",
            title: "Defining a structure",
            summary:
              "Create a custom value type using struct.",
            what:
              "A structure is a value type that can contain fields, methods, and other members.",
            why:
              "Structures are useful for small data types where value semantics are appropriate.",
            example:
              "struct Point\n{\n    public int X;\n    public int Y;\n}\n\nPoint p;\np.X = 10;\np.Y = 20;",
            output: "X = 10, Y = 20",
            mistake:
              "structure Point\n{\n    public int X;\n}",
            mistakeExplanation:
              "C# uses the struct keyword, not structure.",
            correction:
              "struct Point\n{\n    public int X;\n}",
            labPrompt:
              "Create a struct named Point with X and Y fields.",
            question:
              "Which keyword declares a structure?",
            answer: "struct",
            distractors: ["structure", "record"],
          }),

          lesson({
            slug: "class-vs-structure",
            title: "Class versus structure",
            summary:
              "Understand the basic difference between reference-type classes and value-type structs.",
            what:
              "Classes are reference types while structs are value types. This affects how assignments and copies behave.",
            why:
              "Choosing between a class and struct affects memory behavior, copying, and how objects are represented.",
            example:
              "struct Point\n{\n    public int X;\n}\n\nPoint a = new Point();\na.X = 10;\nPoint b = a;\nb.X = 20;\nConsole.WriteLine(a.X);",
            output: "10",
            mistake:
              "Assuming every struct variable points to the same object after assignment.",
            correction:
              "Remember that assigning a struct normally copies its value.",
            labPrompt:
              "Create a struct, copy it to another variable, and change the copy.",
            question:
              "Is a struct a value type or reference type?",
            answer: "Value type.",
            distractors: ["Reference type.", "Pointer type only."],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-enums",
    title: "Enums",
    description:
      "Represent a fixed set of named constants using enumeration types.",
    topics: [
      {
        slug: "enum-basics",
        title: "Enumeration",
        description:
          "Declare and use enum values.",
        lessons: [
          lesson({
            slug: "declaring-enum",
            title: "Declaring enum variables",
            summary:
              "Create named values representing a fixed set of choices.",
            what:
              "An enum defines a set of named integral constants.",
            why:
              "Enums make code clearer when a variable should represent one value from a known set of choices.",
            example:
              "enum Day\n{\n    Monday,\n    Tuesday,\n    Wednesday\n}\n\nDay today = Day.Tuesday;\nConsole.WriteLine(today);",
            output: "Tuesday",
            mistake:
              "enum Day = Monday, Tuesday;",
            mistakeExplanation:
              "Enum members must be declared inside braces.",
            correction:
              "enum Day\n{\n    Monday,\n    Tuesday\n}",
            labPrompt:
              "Create an enum for three traffic-light states.",
            question:
              "What does an enum represent?",
            answer:
              "A set of named constants.",
            distractors: [
              "A collection of methods.",
              "A file system.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-classes",
    title: "Classes",
    description:
      "Build classes with fields, methods, constructors, destructors, and static members.",
    topics: [
      {
        slug: "class-members",
        title: "Class members",
        description:
          "Define fields and methods inside classes.",
        lessons: [
          lesson({
            slug: "class-members-and-encapsulation",
            title: "Member functions and encapsulation",
            summary:
              "Combine data and behavior inside a class.",
            what:
              "Class members can include fields and methods. Encapsulation controls how those members are accessed.",
            why:
              "Keeping related data and behavior together makes object-oriented programs easier to organize and maintain.",
            example:
              "class Rectangle\n{\n    private double length = 4;\n\n    public double GetArea()\n    {\n        return length * length;\n    }\n}",
            output: "Area = 16",
            mistake:
              "class Rectangle\n{\n    private double length;\n}\n\nConsole.WriteLine(length);",
            mistakeExplanation:
              "A private field cannot be accessed directly from outside its class.",
            correction:
              "class Rectangle\n{\n    private double length;\n\n    public double GetLength()\n    {\n        return length;\n    }\n}",
            labPrompt:
              "Create a class with one private field and one public method that returns it.",
            question:
              "Why is encapsulation useful?",
            answer:
              "It controls access to internal data and implementation.",
            distractors: [
              "It removes all classes.",
              "It prevents methods from running.",
            ],
          }),

          lesson({
            slug: "constructors",
            title: "Constructors",
            summary:
              "Initialize objects when they are created.",
            what:
              "A constructor is a special class member that runs when an object is created.",
            why:
              "Constructors allow objects to start with valid and meaningful initial state.",
            example:
              "class Student\n{\n    public string name;\n\n    public Student(string name)\n    {\n        this.name = name;\n    }\n}\n\nStudent s = new Student(\"Maya\");",
            output: "Student name = Maya",
            mistake:
              "public void Student(string name)\n{\n    this.name = name;\n}",
            mistakeExplanation:
              "A constructor does not have a return type, including void.",
            correction:
              "public Student(string name)\n{\n    this.name = name;\n}",
            labPrompt:
              "Create a Student class with a constructor that accepts a name.",
            question:
              "Does a constructor have a return type?",
            answer: "No.",
            distractors: ["void", "int"],
          }),
        ],
      },

      {
        slug: "static-members",
        title: "Static members",
        description:
          "Use members that belong to the class rather than individual objects.",
        lessons: [
          lesson({
            slug: "static-members",
            title: "Static members",
            summary:
              "Create fields and methods shared at the class level.",
            what:
              "A static member belongs to the type itself rather than to a particular object instance.",
            why:
              "Static members are useful for shared counters, utility methods, and data that belongs to the class as a whole.",
            example:
              "class Counter\n{\n    public static int count = 0;\n}\n\nCounter.count++;\nConsole.WriteLine(Counter.count);",
            output: "1",
            mistake:
              "Counter c = new Counter();\nc.count++;",
            mistakeExplanation:
              "A static member is accessed through the type rather than an instance.",
            correction:
              "Counter.count++;",
            labPrompt:
              "Create a static counter shared by all objects of a class.",
            question:
              "What does a static member belong to?",
            answer:
              "The class/type rather than a specific instance.",
            distractors: [
              "Only the first object.",
              "Only Main.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-inheritance",
    title: "Inheritance",
    description:
      "Reuse and extend class behavior using base and derived classes.",
    topics: [
      {
        slug: "base-and-derived",
        title: "Base and derived classes",
        description:
          "Create relationships between classes.",
        lessons: [
          lesson({
            slug: "base-derived-classes",
            title: "Base and derived classes",
            summary:
              "Create a derived class that inherits accessible members from a base class.",
            what:
              "Inheritance allows a derived class to reuse and extend members of a base class.",
            why:
              "Inheritance can model relationships where one type is a specialized version of another.",
            example:
              "class Animal\n{\n    public void Eat()\n    {\n        Console.WriteLine(\"Eating\");\n    }\n}\n\nclass Dog : Animal\n{\n}\n\nDog d = new Dog();\nd.Eat();",
            output: "Eating",
            mistake:
              "class Dog Animal\n{\n}",
            mistakeExplanation:
              "C# uses : to specify the base class.",
            correction:
              "class Dog : Animal\n{\n}",
            labPrompt:
              "Create an Animal base class and a Dog derived class.",
            question:
              "Which symbol specifies inheritance in a class declaration?",
            answer: ":",
            distractors: ["->", "extends"],
          }),

          lesson({
            slug: "base-constructor",
            title: "Initializing the base class",
            summary:
              "Initialize inherited state using a base constructor.",
            what:
              "A derived class can call a base-class constructor using the base keyword.",
            why:
              "Base constructors allow inherited state to be initialized correctly.",
            example:
              "class Animal\n{\n    public Animal(string name)\n    {\n        Console.WriteLine(name);\n    }\n}\n\nclass Dog : Animal\n{\n    public Dog() : base(\"Dog\")\n    {\n    }\n}",
            output: "Dog",
            mistake:
              "public Dog() : Animal(\"Dog\")",
            mistakeExplanation:
              "The base constructor is invoked using the base keyword.",
            correction:
              "public Dog() : base(\"Dog\")",
            labPrompt:
              "Create a base class with a constructor and call it from a derived class.",
            question:
              "Which keyword calls a base-class constructor?",
            answer: "base",
            distractors: ["super", "parent"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-polymorphism",
    title: "Polymorphism",
    description:
      "Understand static and dynamic polymorphism in C#.",
    topics: [
      {
        slug: "static-polymorphism",
        title: "Static polymorphism",
        description:
          "Use method overloading to provide multiple versions of a method.",
        lessons: [
          lesson({
            slug: "method-overloading",
            title: "Method overloading",
            summary:
              "Define multiple methods with the same name but different parameter lists.",
            what:
              "Method overloading allows methods to share a name while differing in their parameters.",
            why:
              "Overloading provides a convenient interface for performing similar operations with different inputs.",
            example:
              "class Calculator\n{\n    public int Add(int a, int b)\n    {\n        return a + b;\n    }\n\n    public int Add(int a, int b, int c)\n    {\n        return a + b + c;\n    }\n}",
            output:
              "The compiler selects the matching Add overload.",
            mistake:
              "public int Add(int a, int b)\n{\n    return a + b;\n}\n\npublic double Add(int a, int b)\n{\n    return a + b;\n}",
            mistakeExplanation:
              "Changing only the return type does not create a valid overload.",
            correction:
              "Use a different parameter list for an overload.",
            labPrompt:
              "Create overloaded Add methods for two and three integers.",
            question:
              "What must differ between overloaded methods?",
            answer:
              "Their parameter lists.",
            distractors: [
              "Only their return type.",
              "Only their comments.",
            ],
          }),
        ],
      },

      {
        slug: "dynamic-polymorphism",
        title: "Dynamic polymorphism",
        description:
          "Override inherited behavior at runtime.",
        lessons: [
          lesson({
            slug: "method-overriding",
            title: "Method overriding",
            summary:
              "Allow a derived class to provide its own implementation of an inherited virtual method.",
            what:
              "Dynamic polymorphism allows a derived class to override a base class method so the appropriate implementation can be selected at runtime.",
            why:
              "Overriding allows different derived types to provide their own behavior through a common base interface.",
            example:
              "class Animal\n{\n    public virtual void Speak()\n    {\n        Console.WriteLine(\"Animal\");\n    }\n}\n\nclass Dog : Animal\n{\n    public override void Speak()\n    {\n        Console.WriteLine(\"Dog\");\n    }\n}",
            output: "Dog",
            mistake:
              "public override void Speak()",
            mistakeExplanation:
              "The base method must normally be virtual, abstract, or otherwise overridable for override to be valid.",
            correction:
              "public virtual void Speak() { }\n\npublic override void Speak() { }",
            labPrompt:
              "Create an Animal class with a virtual method and override it in Dog.",
            question:
              "Which keyword is commonly used on a derived implementation?",
            answer: "override",
            distractors: ["overload", "replace"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-operator-overloading",
    title: "Operator overloading",
    description:
      "Define how operators behave for user-defined types.",
    topics: [
      {
        slug: "operator-overloading",
        title: "Operator overloading",
        description:
          "Customize operators for classes and structs.",
        lessons: [
          lesson({
            slug: "implementing-operator-overloading",
            title: "Implementing operator overloading",
            summary:
              "Define custom behavior for supported operators.",
            what:
              "Operator overloading allows a user-defined type to specify what an operator such as + means for that type.",
            why:
              "It can make operations on custom types more natural and readable.",
            example:
              "class Number\n{\n    public int Value;\n\n    public static Number operator +(Number a, Number b)\n    {\n        return new Number { Value = a.Value + b.Value };\n    }\n}",
            output:
              "Two Number objects can be combined using +.",
            mistake:
              "public Number operator +(Number a, Number b)",
            mistakeExplanation:
              "Operator overloads are declared using the static keyword.",
            correction:
              "public static Number operator +(Number a, Number b)",
            labPrompt:
              "Create a simple custom Number type that supports +.",
            question:
              "What feature allows operators to work with user-defined types?",
            answer: "Operator overloading.",
            distractors: [
              "Method recursion.",
              "Namespaces.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-interfaces",
    title: "Interfaces",
    description:
      "Define contracts that classes can implement.",
    topics: [
      {
        slug: "interface-basics",
        title: "Interfaces",
        description:
          "Declare and implement interfaces.",
        lessons: [
          lesson({
            slug: "declaring-interface",
            title: "Declaring interfaces",
            summary:
              "Define a contract that implementing classes must follow.",
            what:
              "An interface defines members that implementing types are expected to provide.",
            why:
              "Interfaces separate what a type must do from how it performs that behavior and allow different types to share a common contract.",
            example:
              "interface IAnimal\n{\n    void Speak();\n}\n\nclass Dog : IAnimal\n{\n    public void Speak()\n    {\n        Console.WriteLine(\"Bark\");\n    }\n}",
            output: "Bark",
            mistake:
              "class Dog implements IAnimal",
            mistakeExplanation:
              "C# uses the colon syntax to implement an interface.",
            correction:
              "class Dog : IAnimal",
            labPrompt:
              "Create an interface named IPrintable with a Print method and implement it.",
            question:
              "What does an interface primarily define?",
            answer:
              "A contract that implementing types follow.",
            distractors: [
              "A database table.",
              "A loop structure.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-namespaces",
    title: "Namespaces",
    description:
      "Organize types using namespaces and nested namespaces.",
    topics: [
      {
        slug: "namespace-basics",
        title: "Namespaces",
        description:
          "Create and access organized groups of types.",
        lessons: [
          lesson({
            slug: "defining-namespace",
            title: "Defining a namespace",
            summary:
              "Group related classes and other types under a namespace.",
            what:
              "A namespace groups related types and helps organize code and avoid naming conflicts.",
            why:
              "Large applications contain many classes, so namespaces provide a clear organizational structure.",
            example:
              "namespace CollegeApp\n{\n    class Student\n    {\n    }\n}",
            output:
              "Student belongs to the CollegeApp namespace.",
            mistake:
              "namespace CollegeApp;",
            mistakeExplanation:
              "The traditional block namespace syntax places declarations inside braces.",
            correction:
              "namespace CollegeApp\n{\n    class Student\n    {\n    }\n}",
            labPrompt:
              "Create a namespace named BankingApp containing an Account class.",
            question:
              "Why are namespaces used?",
            answer:
              "To organize related types and reduce naming conflicts.",
            distractors: [
              "To repeat loops.",
              "To store only constants.",
            ],
          }),

          lesson({
            slug: "using-namespace",
            title: "The using keyword with namespaces",
            summary:
              "Access namespace members without repeatedly writing their full names.",
            what:
              "The using directive allows types in a namespace to be referenced more conveniently.",
            why:
              "It reduces repetitive fully qualified names and improves readability.",
            example:
              "using System;\n\nConsole.WriteLine(\"Hello\");",
            output: "Hello",
            mistake:
              "using System",
            mistakeExplanation:
              "The using directive is a C# statement and needs a semicolon.",
            correction:
              "using System;",
            labPrompt:
              "Use the System namespace and call Console.WriteLine.",
            question:
              "What does using commonly allow?",
            answer:
              "Convenient access to members of a namespace.",
            distractors: [
              "Creation of loops.",
              "Automatic object construction.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-preprocessor-directives",
    title: "Preprocessor directives",
    description:
      "Use directives that influence compilation and conditional code.",
    topics: [
      {
        slug: "preprocessor",
        title: "Preprocessor directives",
        description:
          "Understand directives such as define and conditional compilation.",
        lessons: [
          lesson({
            slug: "define-directive",
            title: "#define",
            summary:
              "Define a compilation symbol for conditional compilation.",
            what:
              "The #define directive defines a symbolic name that can be tested by conditional compilation directives.",
            why:
              "Compilation symbols can help include or exclude code for different build configurations.",
            example:
              "#define DEBUGMODE\n\n#if DEBUGMODE\nConsole.WriteLine(\"Debug mode\");\n#endif",
            output: "Debug mode",
            mistake:
              "#define DEBUGMODE;\n",
            mistakeExplanation:
              "Preprocessor directives do not use a semicolon after the directive name.",
            correction:
              "#define DEBUGMODE",
            labPrompt:
              "Create a compilation symbol and conditionally print a message.",
            question:
              "What does #define create?",
            answer:
              "A symbolic compilation constant.",
            distractors: [
              "A runtime variable.",
              "A class instance.",
            ],
          }),

          lesson({
            slug: "conditional-directives",
            title: "Conditional compilation",
            summary:
              "Compile selected sections of code based on symbols.",
            what:
              "Directives such as #if and #endif conditionally include code during compilation.",
            why:
              "Conditional compilation can support different build configurations without changing the source manually.",
            example:
              "#define TEST\n\n#if TEST\nConsole.WriteLine(\"Testing\");\n#endif",
            output: "Testing",
            mistake:
              "#if TEST\nConsole.WriteLine(\"Testing\");",
            mistakeExplanation:
              "The conditional block needs a closing #endif.",
            correction:
              "#if TEST\nConsole.WriteLine(\"Testing\");\n#endif",
            labPrompt:
              "Conditionally compile a message when a TEST symbol is defined.",
            question:
              "Which directive closes an #if block?",
            answer: "#endif",
            distractors: ["#end", "#close"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-regular-expressions",
    title: "Regular expressions",
    description:
      "Use regular expressions to search, match, and manipulate text patterns.",
    topics: [
      {
        slug: "regex-basics",
        title: "Regular expression basics",
        description:
          "Understand patterns, character classes, quantifiers, and Regex.",
        lessons: [
          lesson({
            slug: "regex-patterns",
            title: "Regex patterns",
            summary:
              "Describe text patterns using regular expressions.",
            what:
              "Regular expressions define patterns used to find or validate text.",
            why:
              "Pattern matching is useful for validation, searching, extraction, and text processing.",
            example:
              "using System.Text.RegularExpressions;\n\nbool match = Regex.IsMatch(\"abc123\", \"^[a-z]+[0-9]+$\");\nConsole.WriteLine(match);",
            output: "True",
            mistake:
              "Regex.IsMatch(\"abc123\", \"[a-z]\");",
            mistakeExplanation:
              "This pattern only checks for a lowercase letter somewhere rather than validating the complete intended structure.",
            correction:
              "Regex.IsMatch(\"abc123\", \"^[a-z]+[0-9]+$\");",
            labPrompt:
              "Create a regex that checks whether text contains letters followed by numbers.",
            question:
              "What is a regular expression used for?",
            answer:
              "Matching and processing text patterns.",
            distractors: [
              "Creating classes.",
              "Managing threads only.",
            ],
          }),

          lesson({
            slug: "regex-class",
            title: "The Regex class",
            summary:
              "Use System.Text.RegularExpressions.Regex to work with patterns.",
            what:
              "The Regex class provides methods for matching and manipulating text using regular expressions.",
            why:
              "It provides a programmatic way to apply patterns to real input.",
            example:
              "using System.Text.RegularExpressions;\n\nMatch match = Regex.Match(\"Order 123\", \"\\\\d+\");\nConsole.WriteLine(match.Value);",
            output: "123",
            mistake:
              "Regex.Match(\"Order 123\", \"d+\");",
            mistakeExplanation:
              "The digit character class is represented by \\d in a regular expression.",
            correction:
              "Regex.Match(\"Order 123\", \"\\\\d+\");",
            labPrompt:
              "Extract a number from a string using Regex.Match.",
            question:
              "Which namespace contains Regex?",
            answer:
              "System.Text.RegularExpressions.",
            distractors: [
              "System.Collections.",
              "System.IO.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-exception-handling",
    title: "Exception handling",
    description:
      "Detect and handle runtime errors using try, catch, finally, and throw.",
    topics: [
      {
        slug: "exceptions",
        title: "Exceptions",
        description:
          "Handle errors without allowing unexpected failures to terminate normal program flow.",
        lessons: [
          lesson({
            slug: "try-catch",
            title: "Handling exceptions",
            summary:
              "Catch exceptions using try and catch blocks.",
            what:
              "The try block contains code that may cause an exception, while catch handles a matching exception.",
            why:
              "Exception handling allows programs to respond to runtime errors in a controlled way.",
            example:
              "try\n{\n    int value = int.Parse(\"abc\");\n}\ncatch (FormatException)\n{\n    Console.WriteLine(\"Invalid number\");\n}",
            output: "Invalid number",
            mistake:
              "try\n{\n    int value = int.Parse(\"abc\");\n}",
            mistakeExplanation:
              "An operation that may throw an exception should be handled when the program needs controlled error behavior.",
            correction:
              "try\n{\n    int value = int.Parse(\"abc\");\n}\ncatch (FormatException)\n{\n    Console.WriteLine(\"Invalid number\");\n}",
            labPrompt:
              "Handle invalid numeric input using try and catch.",
            question:
              "What does catch do?",
            answer:
              "It handles an exception thrown by code in the try block.",
            distractors: [
              "It creates an exception.",
              "It always stops compilation.",
            ],
          }),

          lesson({
            slug: "throw-exception",
            title: "Throwing exceptions",
            summary:
              "Explicitly signal an error using throw.",
            what:
              "The throw statement creates or rethrows an exception to indicate that an error condition has occurred.",
            why:
              "Throwing exceptions allows methods to report invalid states or inputs to their callers.",
            example:
              "static void CheckAge(int age)\n{\n    if (age < 0)\n        throw new ArgumentException(\"Age cannot be negative\");\n}",
            output:
              "An ArgumentException is thrown for invalid input.",
            mistake:
              "throw \"Invalid age\";",
            mistakeExplanation:
              "C# throws Exception objects rather than arbitrary strings.",
            correction:
              "throw new ArgumentException(\"Invalid age\");",
            labPrompt:
              "Throw an exception when a supplied number is negative.",
            question:
              "What does throw do?",
            answer:
              "It explicitly throws an exception.",
            distractors: [
              "It catches every exception.",
              "It creates a loop.",
            ],
          }),
        ],
      },

      {
        slug: "custom-exceptions",
        title: "User-defined exceptions",
        description:
          "Create exception types specific to an application's domain.",
        lessons: [
          lesson({
            slug: "custom-exception",
            title: "Creating user-defined exceptions",
            summary:
              "Create a custom exception by deriving from an exception type.",
            what:
              "A user-defined exception provides a specialized exception type for application-specific errors.",
            why:
              "Custom exceptions make domain-specific failures easier to identify and handle.",
            example:
              "class InvalidAgeException : Exception\n{\n    public InvalidAgeException(string message)\n        : base(message)\n    {\n    }\n}",
            output:
              "A custom InvalidAgeException type is defined.",
            mistake:
              "class InvalidAgeException\n{\n}",
            mistakeExplanation:
              "A custom exception should derive from an appropriate exception class.",
            correction:
              "class InvalidAgeException : Exception\n{\n}",
            labPrompt:
              "Create a custom exception named InvalidMarksException.",
            question:
              "What should a custom exception normally derive from?",
            answer:
              "An exception type such as Exception.",
            distractors: [
              "Console.",
              "Array.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-file-io",
    title: "File I/O",
    description:
      "Read, write, and manage files and directories using C# I/O classes.",
    topics: [
      {
        slug: "file-streams",
        title: "File streams",
        description:
          "Work with files using streams.",
        lessons: [
          lesson({
            slug: "filestream",
            title: "FileStream",
            summary:
              "Read and write file data using a stream.",
            what:
              "FileStream provides a stream for reading from and writing to files.",
            why:
              "Streams allow programs to work with persistent data stored in files.",
            example:
              "using System.IO;\n\nusing (FileStream fs = new FileStream(\"data.txt\", FileMode.Create))\n{\n}\n\nConsole.WriteLine(\"File created\");",
            output: "File created",
            mistake:
              "FileStream fs = new FileStream(\"data.txt\", FileMode.Create);\nfs = null;",
            mistakeExplanation:
              "A file stream should be properly disposed after use.",
            correction:
              "using (FileStream fs = new FileStream(\"data.txt\", FileMode.Create))\n{\n}",
            labPrompt:
              "Create a file using FileStream.",
            question:
              "What does FileStream provide?",
            answer:
              "A stream for reading and writing file data.",
            distractors: [
              "A database connection.",
              "A network socket only.",
            ],
          }),

          lesson({
            slug: "streamreader-streamwriter",
            title: "StreamReader and StreamWriter",
            summary:
              "Read and write text files conveniently.",
            what:
              "StreamReader reads text from a stream, while StreamWriter writes text to a stream.",
            why:
              "These classes simplify common text-file operations.",
            example:
              "using (StreamWriter writer = new StreamWriter(\"notes.txt\"))\n{\n    writer.WriteLine(\"Hello\");\n}",
            output: "Hello is written to notes.txt",
            mistake:
              "StreamWriter writer = new StreamWriter(\"notes.txt\");\nwriter.WriteLine(\"Hello\");",
            mistakeExplanation:
              "The writer should be disposed properly after use.",
            correction:
              "using (StreamWriter writer = new StreamWriter(\"notes.txt\"))\n{\n    writer.WriteLine(\"Hello\");\n}",
            labPrompt:
              "Write two lines of text to a file using StreamWriter.",
            question:
              "Which class is used for reading text?",
            answer: "StreamReader",
            distractors: ["StreamWriter", "BinaryWriter"],
          }),
        ],
      },

      {
        slug: "file-and-directory-info",
        title: "Files and directories",
        description:
          "Inspect and manage files and directories.",
        lessons: [
          lesson({
            slug: "fileinfo",
            title: "FileInfo",
            summary:
              "Work with information and operations related to a file.",
            what:
              "FileInfo provides instance-based operations and information about files.",
            why:
              "File metadata and operations are common in applications that manage documents and stored data.",
            example:
              "using System.IO;\n\nFileInfo file = new FileInfo(\"data.txt\");\nConsole.WriteLine(file.Name);",
            output: "data.txt",
            mistake:
              "FileInfo file = new FileInfo();",
            mistakeExplanation:
              "FileInfo needs a path identifying the file.",
            correction:
              "FileInfo file = new FileInfo(\"data.txt\");",
            labPrompt:
              "Create a FileInfo object for a file and print its name.",
            question:
              "What does FileInfo represent?",
            answer:
              "Information and operations for a file.",
            distractors: [
              "A thread.",
              "A database table.",
            ],
          }),

          lesson({
            slug: "directoryinfo",
            title: "DirectoryInfo",
            summary:
              "Work with directories and their information.",
            what:
              "DirectoryInfo provides information and operations for directories.",
            why:
              "Applications often need to inspect, create, or manage folders.",
            example:
              "using System.IO;\n\nDirectoryInfo directory = new DirectoryInfo(\"Documents\");\nConsole.WriteLine(directory.Name);",
            output: "Documents",
            mistake:
              "DirectoryInfo directory = new DirectoryInfo();",
            mistakeExplanation:
              "DirectoryInfo requires a directory path.",
            correction:
              "DirectoryInfo directory = new DirectoryInfo(\"Documents\");",
            labPrompt:
              "Create a DirectoryInfo object and print the directory name.",
            question:
              "What does DirectoryInfo represent?",
            answer:
              "Information and operations for a directory.",
            distractors: [
              "A string only.",
              "A thread.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-attributes",
    title: "Attributes",
    description:
      "Attach metadata to C# program elements using attributes.",
    topics: [
      {
        slug: "attribute-basics",
        title: "Attributes",
        description:
          "Apply predefined and custom metadata to code.",
        lessons: [
          lesson({
            slug: "predefined-attributes",
            title: "Predefined attributes",
            summary:
              "Use built-in attributes to provide metadata or compiler information.",
            what:
              "Attributes provide metadata that can be attached to program elements. C# provides predefined attributes such as Obsolete and Conditional.",
            why:
              "Attributes allow tools, compilers, and runtime code to receive additional information about program elements.",
            example:
              "[Obsolete(\"Use NewMethod instead\")]\nstatic void OldMethod()\n{\n}",
            output:
              "The compiler can warn when OldMethod is used.",
            mistake:
              "Obsolete(\"Use NewMethod instead\")",
            mistakeExplanation:
              "Attributes are normally written inside square brackets.",
            correction:
              "[Obsolete(\"Use NewMethod instead\")]\nstatic void OldMethod()\n{\n}",
            labPrompt:
              "Mark a method as obsolete using the Obsolete attribute.",
            question:
              "What do attributes provide?",
            answer:
              "Metadata about program elements.",
            distractors: [
              "Loop execution.",
              "Automatic database tables.",
            ],
          }),

          lesson({
            slug: "custom-attributes",
            title: "Custom attributes",
            summary:
              "Create your own metadata attributes.",
            what:
              "A custom attribute is a class derived from Attribute that can be applied to program elements.",
            why:
              "Custom attributes allow applications and frameworks to attach domain-specific metadata.",
            example:
              "class AuthorAttribute : Attribute\n{\n    public string Name { get; }\n\n    public AuthorAttribute(string name)\n    {\n        Name = name;\n    }\n}",
            output:
              "An AuthorAttribute type is defined.",
            mistake:
              "class AuthorAttribute\n{\n}",
            mistakeExplanation:
              "A custom attribute normally derives from System.Attribute.",
            correction:
              "class AuthorAttribute : Attribute\n{\n}",
            labPrompt:
              "Create a custom attribute that stores an author's name.",
            question:
              "What base type is used for custom attributes?",
            answer: "Attribute",
            distractors: ["ObjectOnly", "Metadata"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-reflection",
    title: "Reflection",
    description:
      "Inspect types, metadata, and members at runtime.",
    topics: [
      {
        slug: "reflection-basics",
        title: "Reflection",
        description:
          "Examine program metadata dynamically.",
        lessons: [
          lesson({
            slug: "reflection-type",
            title: "Viewing type metadata",
            summary:
              "Inspect information about a type at runtime.",
            what:
              "Reflection allows a program to inspect metadata about assemblies, types, methods, properties, and other members.",
            why:
              "Reflection is useful for frameworks, serializers, dependency injection, testing tools, and dynamic programming.",
            example:
              "Type type = typeof(string);\nConsole.WriteLine(type.Name);",
            output: "String",
            mistake:
              "Type type = string;",
            mistakeExplanation:
              "typeof is used to obtain a Type object for a type.",
            correction:
              "Type type = typeof(string);",
            labPrompt:
              "Use typeof to print the name of the int type.",
            question:
              "What does reflection allow you to inspect?",
            answer:
              "Metadata and members of types at runtime.",
            distractors: [
              "Only source comments.",
              "Only file names.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-properties",
    title: "Properties",
    description:
      "Control access to class data using properties and accessors.",
    topics: [
      {
        slug: "property-basics",
        title: "Properties",
        description:
          "Create getters and setters for controlled data access.",
        lessons: [
          lesson({
            slug: "property-accessors",
            title: "Accessors",
            summary:
              "Use get and set accessors to control property access.",
            what:
              "Properties provide a controlled way to read and write values using accessors such as get and set.",
            why:
              "Properties support encapsulation while giving code a convenient way to access object data.",
            example:
              "class Student\n{\n    public string Name { get; set; }\n}\n\nStudent s = new Student();\ns.Name = \"Maya\";\nConsole.WriteLine(s.Name);",
            output: "Maya",
            mistake:
              "public string Name;\n// expecting property accessors",
            mistakeExplanation:
              "A field and a property are different. Property syntax uses get and set accessors.",
            correction:
              "public string Name { get; set; }",
            labPrompt:
              "Create a Student class with Name and Age properties.",
            question:
              "What do get and set represent?",
            answer:
              "Property accessors used to read and assign a value.",
            distractors: [
              "Loop conditions.",
              "Namespace aliases.",
            ],
          }),

          lesson({
            slug: "abstract-properties",
            title: "Abstract properties",
            summary:
              "Declare properties that derived classes must implement.",
            what:
              "An abstract property declares a property contract in an abstract class without providing its implementation.",
            why:
              "Abstract properties allow a base class to require derived classes to provide specific data behavior.",
            example:
              "abstract class Shape\n{\n    public abstract double Area { get; }\n}",
            output:
              "Shape requires derived classes to provide Area.",
            mistake:
              "abstract class Shape\n{\n    public abstract double Area { get; }\n    {\n    }\n}",
            mistakeExplanation:
              "An abstract property declaration does not contain an implementation body.",
            correction:
              "public abstract double Area { get; }",
            labPrompt:
              "Create an abstract Shape class with an abstract Area property.",
            question:
              "Can an abstract property contain a normal implementation body?",
            answer: "No.",
            distractors: ["Always.", "Only in Main."],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-indexers",
    title: "Indexers",
    description:
      "Allow objects to be accessed using array-like indexing syntax.",
    topics: [
      {
        slug: "indexer-basics",
        title: "Indexers",
        description:
          "Define indexed access for custom types.",
        lessons: [
          lesson({
            slug: "use-of-indexers",
            title: "Using indexers",
            summary:
              "Access object data using square-bracket syntax.",
            what:
              "An indexer allows an object to be accessed using an index in a similar way to an array.",
            why:
              "Indexers make custom collection-like types easier and more natural to use.",
            example:
              "class Names\n{\n    private string[] values = { \"Ava\", \"Luca\" };\n\n    public string this[int index]\n    {\n        get { return values[index]; }\n    }\n}\n\nNames names = new Names();\nConsole.WriteLine(names[0]);",
            output: "Ava",
            mistake:
              "Console.WriteLine(names.0);",
            mistakeExplanation:
              "Indexers use square brackets rather than dot notation.",
            correction:
              "Console.WriteLine(names[0]);",
            labPrompt:
              "Create a class with an indexer that returns values from an internal array.",
            question:
              "What syntax is used to access an indexer?",
            answer: "Square brackets.",
            distractors: ["Parentheses only.", "Curly braces."],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-delegates",
    title: "Delegates",
    description:
      "Store references to methods and use them for flexible method invocation.",
    topics: [
      {
        slug: "delegate-basics",
        title: "Delegates",
        description:
          "Declare, instantiate, and invoke delegates.",
        lessons: [
          lesson({
            slug: "declaring-delegates",
            title: "Declaring delegates",
            summary:
              "Define a type that represents a method signature.",
            what:
              "A delegate is a type-safe reference to a method with a compatible signature.",
            why:
              "Delegates allow methods to be passed around as values and are fundamental to events and callback patterns.",
            example:
              "delegate void MessageHandler(string message);\n\nstatic void Show(string message)\n{\n    Console.WriteLine(message);\n}\n\nMessageHandler handler = Show;\nhandler(\"Hello\");",
            output: "Hello",
            mistake:
              "delegate MessageHandler(string message);",
            mistakeExplanation:
              "A delegate declaration needs a return type and a delegate name.",
            correction:
              "delegate void MessageHandler(string message);",
            labPrompt:
              "Create a delegate that represents a method accepting one string.",
            question:
              "What does a delegate represent?",
            answer:
              "A reference to a method with a compatible signature.",
            distractors: [
              "A database connection.",
              "A namespace.",
            ],
          }),

          lesson({
            slug: "multicast-delegate",
            title: "Multicasting delegates",
            summary:
              "Invoke multiple methods through one delegate.",
            what:
              "A multicast delegate can reference multiple methods and invoke them in sequence.",
            why:
              "Multicast delegates are useful when one action needs to notify multiple handlers.",
            example:
              "delegate void MessageHandler();\n\nstatic void First() => Console.WriteLine(\"First\");\nstatic void Second() => Console.WriteLine(\"Second\");\n\nMessageHandler handler = First;\nhandler += Second;\nhandler();",
            output: "First\nSecond",
            mistake:
              "handler = Second;",
            mistakeExplanation:
              "Assignment replaces the delegate target. += adds another method to the invocation list.",
            correction:
              "handler += Second;",
            labPrompt:
              "Create a delegate that invokes two methods.",
            question:
              "Which operator adds another method to a multicast delegate?",
            answer: "+=",
            distractors: ["==", "-"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-events",
    title: "Events",
    description:
      "Build event-driven behavior using delegates and event declarations.",
    topics: [
      {
        slug: "event-basics",
        title: "Events",
        description:
          "Declare and respond to events.",
        lessons: [
          lesson({
            slug: "declaring-events",
            title: "Declaring events",
            summary:
              "Create an event that allows other code to subscribe to notifications.",
            what:
              "An event provides a controlled way for a class to notify subscribers when something happens.",
            why:
              "Events are useful for user interfaces, notifications, state changes, and other event-driven programs.",
            example:
              "class Button\n{\n    public event Action Clicked;\n\n    public void Click()\n    {\n        Clicked?.Invoke();\n    }\n}",
            output:
              "Subscribers can respond when Clicked is raised.",
            mistake:
              "public Action Clicked;",
            mistakeExplanation:
              "An event is declared with the event keyword when exposing a controlled notification mechanism.",
            correction:
              "public event Action Clicked;",
            labPrompt:
              "Create a class with an event that fires when a method is called.",
            question:
              "What is an event used for?",
            answer:
              "Notifying subscribed code that something happened.",
            distractors: [
              "Declaring an array.",
              "Creating a namespace.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-collections",
    title: "Collections",
    description:
      "Work with collection classes such as ArrayList, Hashtable, Stack, Queue, and SortedList.",
    topics: [
      {
        slug: "collection-types",
        title: "Collection classes",
        description:
          "Store and organize groups of values using collection types.",
        lessons: [
          lesson({
            slug: "arraylist",
            title: "ArrayList",
            summary:
              "Store a dynamically sized collection of objects.",
            what:
              "ArrayList is a collection that can grow or shrink and stores elements as objects.",
            why:
              "It demonstrates dynamic collection behavior, although generic collections are generally preferred in modern C#.",
            example:
              "ArrayList values = new ArrayList();\nvalues.Add(10);\nvalues.Add(20);\nConsole.WriteLine(values.Count);",
            output: "2",
            mistake:
              "ArrayList values;\nvalues.Add(10);",
            mistakeExplanation:
              "The ArrayList must be instantiated before elements can be added.",
            correction:
              "ArrayList values = new ArrayList();\nvalues.Add(10);",
            labPrompt:
              "Create an ArrayList and add three values.",
            question:
              "What does ArrayList provide?",
            answer:
              "A dynamically sized collection.",
            distractors: [
              "A fixed single value.",
              "A namespace.",
            ],
          }),

          lesson({
            slug: "hashtable",
            title: "Hashtable",
            summary:
              "Store key-value pairs using a Hashtable.",
            what:
              "Hashtable stores data as key-value pairs and uses keys to retrieve values.",
            why:
              "Key-value storage is useful when a value needs to be found using an associated identifier.",
            example:
              "Hashtable table = new Hashtable();\ntable[\"name\"] = \"Maya\";\nConsole.WriteLine(table[\"name\"]);",
            output: "Maya",
            mistake:
              "table[\"name\"] == \"Maya\";",
            mistakeExplanation:
              "== compares values; assignment to the Hashtable indexer uses =.",
            correction:
              "table[\"name\"] = \"Maya\";",
            labPrompt:
              "Store a person's name and age in a Hashtable.",
            question:
              "What does a Hashtable store?",
            answer:
              "Key-value pairs.",
            distractors: [
              "Only sequential integers.",
              "Only methods.",
            ],
          }),
        ],
      },

      {
        slug: "stack-and-queue",
        title: "Stack and Queue",
        description:
          "Use LIFO and FIFO collection behavior.",
        lessons: [
          lesson({
            slug: "stack",
            title: "Stack",
            summary:
              "Store values using last-in-first-out behavior.",
            what:
              "A stack follows LIFO: the last value added is the first value removed.",
            why:
              "Stacks are useful for undo operations, nested processing, and algorithms that need last-in-first-out behavior.",
            example:
              "Stack stack = new Stack();\nstack.Push(10);\nstack.Push(20);\nConsole.WriteLine(stack.Pop());",
            output: "20",
            mistake:
              "stack.Push(10);\nConsole.WriteLine(stack.Pop());\nConsole.WriteLine(stack.Pop());",
            mistakeExplanation:
              "Only one value was pushed, so a second Pop has no item to return.",
            correction:
              "stack.Push(10);\nstack.Push(20);\nConsole.WriteLine(stack.Pop());",
            labPrompt:
              "Push three values into a Stack and pop them in order.",
            question:
              "What does LIFO mean?",
            answer:
              "Last In, First Out.",
            distractors: [
              "Last In, Last Out.",
              "First In, First Out.",
            ],
          }),

          lesson({
            slug: "queue",
            title: "Queue",
            summary:
              "Store values using first-in-first-out behavior.",
            what:
              "A queue follows FIFO: the first value added is the first value removed.",
            why:
              "Queues are useful for waiting lines, task processing, and scheduling.",
            example:
              "Queue queue = new Queue();\nqueue.Enqueue(\"A\");\nqueue.Enqueue(\"B\");\nConsole.WriteLine(queue.Dequeue());",
            output: "A",
            mistake:
              "Console.WriteLine(queue.Pop());",
            mistakeExplanation:
              "Queue uses Enqueue and Dequeue rather than stack's Push and Pop methods.",
            correction:
              "Console.WriteLine(queue.Dequeue());",
            labPrompt:
              "Create a Queue of three names and remove them in FIFO order.",
            question:
              "What does FIFO mean?",
            answer:
              "First In, First Out.",
            distractors: [
              "First In, Last Out.",
              "Last In, First Out.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-generics",
    title: "Generics",
    description:
      "Write reusable type-safe code using generic methods and delegates.",
    topics: [
      {
        slug: "generic-basics",
        title: "Generics",
        description:
          "Create reusable code that works with different types.",
        lessons: [
          lesson({
            slug: "generic-method",
            title: "Generic methods",
            summary:
              "Write methods that operate on a type parameter.",
            what:
              "A generic method uses a type parameter so the same method can work with different data types while preserving type safety.",
            why:
              "Generics reduce duplication and avoid unnecessary conversions between object and specific types.",
            example:
              "static void Print<T>(T value)\n{\n    Console.WriteLine(value);\n}\n\nPrint<int>(10);\nPrint<string>(\"Hello\");",
            output: "10\nHello",
            mistake:
              "static void Print(T value)\n{\n    Console.WriteLine(value);\n}",
            mistakeExplanation:
              "T must be declared as a generic type parameter.",
            correction:
              "static void Print<T>(T value)\n{\n    Console.WriteLine(value);\n}",
            labPrompt:
              "Create a generic method that prints any supplied value.",
            question:
              "What does T commonly represent?",
            answer:
              "A generic type parameter.",
            distractors: [
              "A thread.",
              "A namespace.",
            ],
          }),

          lesson({
            slug: "generic-delegate",
            title: "Generic delegates",
            summary:
              "Create delegates that work with type parameters.",
            what:
              "Generic delegates define delegate signatures that can work with different types.",
            why:
              "Generic delegates allow reusable callback patterns while maintaining type safety.",
            example:
              "delegate T Transformer<T>(T value);\n\nstatic int Double(int value)\n{\n    return value * 2;\n}",
            output:
              "A delegate can represent a transformation for a chosen type.",
            mistake:
              "delegate T Transformer(T value);",
            mistakeExplanation:
              "The delegate needs its generic type parameter declared.",
            correction:
              "delegate T Transformer<T>(T value);",
            labPrompt:
              "Create a generic delegate that accepts and returns the same type.",
            question:
              "Why use generic delegates?",
            answer:
              "To create reusable type-safe delegate definitions.",
            distractors: [
              "To avoid all methods.",
              "To create namespaces.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-anonymous-methods",
    title: "Anonymous methods",
    description:
      "Create unnamed methods inline using delegate syntax.",
    topics: [
      {
        slug: "anonymous-method-basics",
        title: "Anonymous methods",
        description:
          "Assign unnamed blocks of code to delegates.",
        lessons: [
          lesson({
            slug: "writing-anonymous-method",
            title: "Writing an anonymous method",
            summary:
              "Create a method without explicitly giving it a name.",
            what:
              "An anonymous method is a block of code assigned to a delegate without declaring a separate named method.",
            why:
              "Anonymous methods are useful for short callback behavior when creating a separate named method would add unnecessary structure.",
            example:
              "delegate void Message();\n\nMessage message = delegate\n{\n    Console.WriteLine(\"Hello\");\n};\n\nmessage();",
            output: "Hello",
            mistake:
              "Message message = delegate;",
            mistakeExplanation:
              "The anonymous method requires a block containing the statements to execute.",
            correction:
              "Message message = delegate\n{\n    Console.WriteLine(\"Hello\");\n};",
            labPrompt:
              "Create a delegate and assign an anonymous method that prints a message.",
            question:
              "What is an anonymous method?",
            answer:
              "A method body without a separately declared method name.",
            distractors: [
              "A method that cannot execute.",
              "A class without a namespace.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-unsafe-code",
    title: "Unsafe code",
    description:
      "Understand pointers and explicitly compile code that uses unsafe operations.",
    topics: [
      {
        slug: "pointers",
        title: "Pointers",
        description:
          "Work directly with memory addresses in unsafe C# code.",
        lessons: [
          lesson({
            slug: "pointer-basics",
            title: "Pointers",
            summary:
              "Understand pointer variables that store memory addresses.",
            what:
              "Pointer variables can store memory addresses and are available in unsafe C# code.",
            why:
              "Pointers provide low-level memory access for specialized scenarios that require direct memory manipulation.",
            example:
              "unsafe\n{\n    int value = 10;\n    int* ptr = &value;\n    Console.WriteLine(*ptr);\n}",
            output: "10",
            mistake:
              "int* ptr = &value;",
            mistakeExplanation:
              "Pointer operations require an unsafe context.",
            correction:
              "unsafe\n{\n    int* ptr = &value;\n}",
            labPrompt:
              "Write a small unsafe example that reads an integer through a pointer.",
            question:
              "What does a pointer store?",
            answer:
              "A memory address.",
            distractors: [
              "Only a string.",
              "A namespace name.",
            ],
          }),

          lesson({
            slug: "unsafe-compilation",
            title: "Compiling unsafe code",
            summary:
              "Understand that unsafe code requires appropriate compiler support.",
            what:
              "C# unsafe code must be explicitly enabled when compiling the program.",
            why:
              "Explicitly enabling unsafe code makes the use of low-level memory operations intentional.",
            example:
              "unsafe\n{\n    int value = 10;\n    int* pointer = &value;\n    Console.WriteLine(*pointer);\n}",
            output: "10",
            mistake:
              "Write pointer code without enabling unsafe compilation.",
            mistakeExplanation:
              "The compiler needs unsafe code to be enabled for pointer operations.",
            correction:
              "Enable unsafe compilation in the project settings or compiler configuration before using pointer code.",
            labPrompt:
              "Create an unsafe pointer example and configure the project to allow unsafe code.",
            question:
              "Does ordinary C# code automatically allow pointer operations?",
            answer: "No.",
            distractors: ["Yes, always.", "Only inside strings."],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-multithreading",
    title: "Multithreading",
    description:
      "Understand threads, their lifecycle, and basic thread management.",
    topics: [
      {
        slug: "thread-basics",
        title: "Thread basics",
        description:
          "Create and manage independent execution paths.",
        lessons: [
          lesson({
            slug: "creating-threads",
            title: "Creating threads",
            summary:
              "Start a separate thread to execute work.",
            what:
              "A thread represents an execution path that can run independently from other threads in a process.",
            why:
              "Multithreading can allow multiple tasks to make progress concurrently.",
            example:
              "using System.Threading;\n\nThread thread = new Thread(() =>\n{\n    Console.WriteLine(\"Worker thread\");\n});\n\nthread.Start();",
            output: "Worker thread",
            mistake:
              "Thread thread = new Thread();",
            mistakeExplanation:
              "A Thread normally needs a delegate or method describing the work it should execute.",
            correction:
              "Thread thread = new Thread(() =>\n{\n    Console.WriteLine(\"Worker thread\");\n});",
            labPrompt:
              "Create a thread that prints a message.",
            question:
              "What does Thread represent?",
            answer:
              "An independent path of execution.",
            distractors: [
              "A data type for arrays only.",
              "A namespace.",
            ],
          }),

          lesson({
            slug: "thread-start",
            title: "Starting and managing threads",
            summary:
              "Start a thread and coordinate with it using thread methods.",
            what:
              "Thread provides methods and properties for starting and managing thread execution.",
            why:
              "Thread management is necessary when coordinating work performed on separate execution paths.",
            example:
              "Thread thread = new Thread(() =>\n{\n    Console.WriteLine(\"Running\");\n});\n\nthread.Start();\nthread.Join();",
            output: "Running",
            mistake:
              "thread.Join();\nthread.Start();",
            mistakeExplanation:
              "Joining before starting the thread does not represent the intended lifecycle.",
            correction:
              "thread.Start();\nthread.Join();",
            labPrompt:
              "Create a thread, start it, and wait for it to finish.",
            question:
              "What does Join commonly do?",
            answer:
              "Waits for the thread to finish.",
            distractors: [
              "Creates a new class.",
              "Deletes the thread immediately.",
            ],
          }),
        ],
      },

      {
        slug: "thread-lifecycle",
        title: "Thread lifecycle",
        description:
          "Understand the basic states and management of threads.",
        lessons: [
          lesson({
            slug: "thread-lifecycle",
            title: "Thread lifecycle",
            summary:
              "Understand how a thread moves through execution states.",
            what:
              "A thread is created, started, executes its work, and eventually finishes. Thread APIs expose information about its current state.",
            why:
              "Understanding the lifecycle helps you reason about when work starts, runs, waits, and completes.",
            example:
              "Thread thread = new Thread(() =>\n{\n    Console.WriteLine(\"Work\");\n});\n\nConsole.WriteLine(thread.ThreadState);\nthread.Start();\nthread.Join();",
            output:
              "Thread state information followed by Work.",
            mistake:
              "Assume a thread is running immediately after construction.",
            mistakeExplanation:
              "Creating a Thread object does not start its execution.",
            correction:
              "Call thread.Start() when the work should begin.",
            labPrompt:
              "Create a thread and inspect its state before and after starting it.",
            question:
              "Does creating a Thread object automatically start it?",
            answer: "No.",
            distractors: ["Yes.", "Only after Join."],
          }),
        ],
      },
    ],
  },
];