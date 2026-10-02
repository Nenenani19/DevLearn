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
      "The C# code is using the feature incorrectly or the syntax does not match the expected C# structure.",
    hint:
      input.hint ??
      "Check the C# syntax, data type, method, or language feature involved and compare it with the expected structure.",
    labCode: input.labCode ?? input.example,
    output: input.output ?? "Example output appears here.",
  };
}

export const csharpModules = [
  {
    slug: "csharp-foundations",
    title: "C# Foundations",
    description:
      "Learn what C# is, how the .NET environment works, and how a basic C# program is structured.",
    topics: [
      {
        slug: "overview",
        title: "Overview",
        lessons: [
          lesson({
            slug: "what-is-csharp",
            title: "What is C#?",
            summary: "Understand C# and what it is used for.",
            what: "C# is a modern, general-purpose, object-oriented programming language developed by Microsoft.",
            why: "C# is widely used for applications, web development, games, desktop software, and .NET development.",
            example: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, C#");
    }
}`,
            mistake: "Thinking C# and C are the same language.",
            correction: "C# is a separate language designed for the .NET platform.",
            labPrompt: "Write a C# program that prints your name.",
            question: "What is C#?",
            answer: "C# is a modern object-oriented programming language developed by Microsoft.",
            distractors: [
              "A database language",
              "A markup language",
              "An operating system"
            ],
          }),
          lesson({
            slug: "features-of-csharp",
            title: "Features of C#",
            summary: "Learn the important characteristics of C#.",
            what: "C# supports object-oriented, component-oriented, type-safe, and modern programming features.",
            why: "Knowing its features helps you understand why C# is used for different types of software.",
            example: `class Student
{
    public string Name;

    public void Display()
    {
        Console.WriteLine(Name);
    }
}`,
            mistake: "Thinking C# is only useful for console programs.",
            correction: "C# is used for many application types through the .NET ecosystem.",
            labPrompt: "Create a simple class with one property and one method.",
            question: "Which platform is strongly associated with C#?",
            answer: ".NET",
            distractors: ["JVM", "Node.js", "Django"],
          }),
        ],
      },
      {
        slug: "environment",
        title: "Environment",
        lessons: [
          lesson({
            slug: "dotnet-framework",
            title: "The .NET Framework",
            summary: "Understand the role of the .NET platform.",
            what: ".NET provides the runtime, libraries, tools, and frameworks used to build and run C# applications.",
            why: "C# programs commonly depend on .NET libraries and runtime features.",
            example: `using System;

Console.WriteLine("Running on .NET");`,
            mistake: "Treating .NET as a programming language.",
            correction: ".NET is a development platform and runtime ecosystem; C# is a programming language.",
            labPrompt: "Create a simple C# console application.",
            question: "What is .NET?",
            answer: "A platform and ecosystem for building and running applications.",
            distractors: ["Only a compiler", "A database", "A programming language"],
          }),
          lesson({
            slug: "csharp-ide",
            title: "C# Development Environment",
            summary: "Understand tools used to write and run C# programs.",
            what: "C# programs can be written using IDEs and editors such as Visual Studio and VS Code with the required .NET SDK.",
            why: "A development environment provides tools for writing, compiling, debugging, and running programs.",
            example: `dotnet new console
dotnet run`,
            mistake: "Running C# code without installing a suitable .NET environment.",
            correction: "Install the appropriate .NET SDK and configure your development environment.",
            labPrompt: "Create and run a new C# console project.",
            question: "Which command runs a .NET project?",
            answer: "dotnet run",
            distractors: ["java run", "npm start", "python execute"],
          }),
        ],
      },
      {
        slug: "program-structure",
        title: "Program Structure",
        lessons: [
          lesson({
            slug: "hello-world",
            title: "Hello World Program",
            summary: "Create your first C# program.",
            what: "A basic C# program contains executable statements that can print information to the console.",
            why: "Hello World introduces the basic structure of a C# application.",
            example: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello World");
    }
}`,
            mistake: "Forgetting the parentheses after Main.",
            correction: "Main is a method, so it requires parentheses.",
            labPrompt: "Print Hello World and your name on separate lines.",
            question: "Which method is commonly used as the entry point of a traditional C# console program?",
            answer: "Main",
            distractors: ["Start", "Run", "Begin"],
          }),
          lesson({
            slug: "compiling-and-executing",
            title: "Compiling and Executing",
            summary: "Understand how C# source code becomes a running program.",
            what: "C# source code is compiled and then executed through the .NET runtime.",
            why: "Understanding this flow makes compilation and runtime errors easier to understand.",
            example: `dotnet build
dotnet run`,
            mistake: "Confusing compilation errors with runtime errors.",
            correction: "Compilation errors happen before execution; runtime errors happen while the program runs.",
            labPrompt: "Build and run a console application using the .NET CLI.",
            question: "What does dotnet build do?",
            answer: "It builds the .NET project.",
            distractors: ["Deletes the project", "Creates a database", "Opens a browser"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-syntax-and-types",
    title: "C# Syntax and Types",
    description:
      "Learn C# syntax, keywords, data types, conversion, variables, constants, and operators.",
    topics: [
      {
        slug: "basic-syntax",
        title: "Basic Syntax",
        lessons: [
          lesson({
            slug: "using-keyword",
            title: "The using Keyword",
            summary: "Learn how using brings namespaces into scope.",
            what: "The using directive allows code to access types from a namespace without repeatedly writing the full namespace.",
            why: "It makes C# code shorter and easier to read.",
            example: `using System;

Console.WriteLine("Hello");`,
            mistake: "Thinking using imports every external package automatically.",
            correction: "using makes names from a namespace available; the referenced assembly or library must still exist.",
            labPrompt: "Use the System namespace to print a message.",
            question: "What is the purpose of using?",
            answer: "It brings namespace members into scope.",
            distractors: ["Creates a class", "Starts a loop", "Declares a variable"],
          }),
          lesson({
            slug: "comments",
            title: "Comments in C#",
            summary: "Learn single-line and multi-line comments.",
            what: "Comments are ignored by the compiler and are used to explain code.",
            why: "Comments can make code easier to understand and maintain.",
            example: `// This is a comment

/*
   This is
   a multi-line comment
*/`,
            mistake: "Expecting comments to execute.",
            correction: "Comments are ignored during program execution.",
            labPrompt: "Add comments explaining three lines of a C# program.",
            question: "Which symbol starts a single-line comment?",
            answer: "//",
            distractors: ["##", "<!--", "--"],
          }),
        ],
      },
      {
        slug: "data-types",
        title: "Data Types",
        lessons: [
          lesson({
            slug: "value-types",
            title: "Value Types",
            summary: "Understand C# value types.",
            what: "Value types directly contain their data, such as int, double, char, and bool.",
            why: "Choosing the correct value type helps represent data correctly.",
            example: `int age = 20;
double price = 99.5;
bool active = true;
char grade = 'A';`,
            mistake: "Using quotes incorrectly around numeric values.",
            correction: "Numeric values normally do not need quotes; quotes create strings or character literals.",
            labPrompt: "Declare an integer, double, boolean, and character variable.",
            question: "Which is a value type?",
            answer: "int",
            distractors: ["string", "object", "array"],
          }),
          lesson({
            slug: "reference-types",
            title: "Reference Types",
            summary: "Understand reference types in C#.",
            what: "Reference types store references to objects rather than directly storing the object data in the variable.",
            why: "Reference types are important when working with classes, arrays, strings, and objects.",
            example: `string name = "Bhaskara";
int[] numbers = { 1, 2, 3 };`,
            mistake: "Assuming every C# type behaves exactly like an int.",
            correction: "Reference types and value types have different storage and assignment behavior.",
            labPrompt: "Create a string and an integer array.",
            question: "Which is a reference type?",
            answer: "string",
            distractors: ["int", "double", "bool"],
          }),
          lesson({
            slug: "object-and-dynamic-types",
            title: "Object and Dynamic Types",
            summary: "Learn object and dynamic types.",
            what: "object can hold values of different types, while dynamic postpones some type checking until runtime.",
            why: "These types are useful in specific situations where flexible typing is required.",
            example: `object value = 10;
dynamic number = 20;

Console.WriteLine(value);
Console.WriteLine(number);`,
            mistake: "Using dynamic everywhere.",
            correction: "Use dynamic only when runtime binding is actually required.",
            labPrompt: "Store different values using object and dynamic.",
            question: "When is dynamic type checking largely performed?",
            answer: "At runtime.",
            distractors: ["Only at compile time", "During installation", "During shutdown"],
          }),
        ],
      },
      {
        slug: "type-conversion",
        title: "Type Conversion",
        lessons: [
          lesson({
            slug: "implicit-conversion",
            title: "Implicit Conversion",
            summary: "Learn automatic conversion between compatible types.",
            what: "Implicit conversion happens automatically when a value can safely be converted to another compatible type.",
            why: "It allows compatible values to be used without explicit conversion syntax.",
            example: `int number = 10;
double value = number;

Console.WriteLine(value);`,
            mistake: "Expecting every conversion to be implicit.",
            correction: "Only compatible conversions that do not risk data loss can normally happen implicitly.",
            labPrompt: "Convert an int to a double implicitly.",
            question: "Can int be implicitly converted to double?",
            answer: "Yes.",
            distractors: ["No", "Only with Parse", "Only with TryParse"],
          }),
          lesson({
            slug: "explicit-conversion",
            title: "Explicit Conversion",
            summary: "Learn casting and explicit conversions.",
            what: "Explicit conversion tells C# to convert a value to another type.",
            why: "Explicit conversion is needed when the conversion may lose information.",
            example: `double price = 25.8;
int value = (int)price;

Console.WriteLine(value);`,
            mistake: "Expecting the decimal part to remain after casting to int.",
            correction: "Casting a double to int removes the fractional part.",
            labPrompt: "Cast a double value to an integer.",
            question: "What syntax performs an explicit cast to int?",
            answer: "(int)value",
            distractors: ["int(value)", "cast<int>(value)", "toInt(value)"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-variables-and-operators",
    title: "Variables and Operators",
    description:
      "Learn variables, constants, literals, arithmetic, relational, logical, bitwise, and assignment operators.",
    topics: [
      {
        slug: "variables",
        title: "Variables",
        lessons: [
          lesson({
            slug: "defining-variables",
            title: "Defining Variables",
            summary: "Learn how to declare variables in C#.",
            what: "A variable stores a value and has a specific data type.",
            why: "Variables allow programs to store and manipulate information.",
            example: `int age;
age = 20;

Console.WriteLine(age);`,
            mistake: "Using a variable before assigning a value.",
            correction: "Give a local variable a value before reading it.",
            labPrompt: "Declare and initialize variables for name, age, and marks.",
            question: "What does a variable store?",
            answer: "A value of a particular type.",
            distractors: ["Only methods", "Only classes", "Only files"],
          }),
          lesson({
            slug: "user-input",
            title: "Accepting Values from User",
            summary: "Read input from the console.",
            what: "Console.ReadLine() reads text entered by the user.",
            why: "User input makes programs interactive.",
            example: `Console.Write("Enter your name: ");
string name = Console.ReadLine();

Console.WriteLine("Hello " + name);`,
            mistake: "Assuming ReadLine returns an integer.",
            correction: "Console.ReadLine returns a string, so numeric input must be converted.",
            labPrompt: "Ask the user for their age and display it.",
            question: "What does Console.ReadLine return?",
            answer: "A string.",
            distractors: ["int", "double", "bool"],
          }),
        ],
      },
      {
        slug: "constants-and-literals",
        title: "Constants and Literals",
        lessons: [
          lesson({
            slug: "integer-literals",
            title: "Integer Literals",
            summary: "Understand integer values written directly in code.",
            what: "Integer literals represent whole-number values directly in C# source code.",
            why: "They are used whenever a fixed whole-number value is needed.",
            example: `int a = 10;
int b = 500;
int c = -25;`,
            mistake: "Putting integer literals inside quotes.",
            correction: "Use quotes only when the value is intended to be text or a character.",
            labPrompt: "Create three integer variables using literals.",
            question: "What is 25 in int x = 25?",
            answer: "An integer literal.",
            distractors: ["A method", "A class", "A namespace"],
          }),
          lesson({
            slug: "constants",
            title: "Defining Constants",
            summary: "Create values that cannot be changed.",
            what: "The const keyword declares a compile-time constant.",
            why: "Constants prevent values that should remain fixed from being accidentally changed.",
            example: `const double PI = 3.14159;

Console.WriteLine(PI);`,
            mistake: "Trying to assign a new value to a const variable.",
            correction: "A const variable cannot be reassigned.",
            labPrompt: "Create a constant for the number of days in a week.",
            question: "Which keyword declares a constant?",
            answer: "const",
            distractors: ["fixed", "constant", "static"],
          }),
        ],
      },
      {
        slug: "operators",
        title: "Operators",
        lessons: [
          lesson({
            slug: "arithmetic-operators",
            title: "Arithmetic Operators",
            summary: "Perform mathematical calculations.",
            what: "Arithmetic operators include +, -, *, /, and %.",
            why: "They are used for calculations in programs.",
            example: `int a = 10;
int b = 3;

Console.WriteLine(a + b);
Console.WriteLine(a - b);
Console.WriteLine(a * b);
Console.WriteLine(a / b);
Console.WriteLine(a % b);`,
            mistake: "Expecting integer division to produce a decimal.",
            correction: "Integer division produces an integer result.",
            labPrompt: "Perform all basic arithmetic operations on two numbers.",
            question: "What does % return?",
            answer: "The remainder.",
            distractors: ["The quotient only", "The percentage automatically", "The square"],
          }),
          lesson({
            slug: "logical-operators",
            title: "Logical Operators",
            summary: "Combine boolean conditions.",
            what: "The logical operators &&, ||, and ! work with boolean expressions.",
            why: "They allow programs to make decisions using multiple conditions.",
            example: `int age = 20;
bool student = true;

Console.WriteLine(age >= 18 && student);`,
            mistake: "Using & when logical AND is required.",
            correction: "Use && for short-circuit logical AND.",
            labPrompt: "Create two boolean conditions and combine them using && and ||.",
            question: "Which operator represents logical AND?",
            answer: "&&",
            distractors: ["||", "!", "&"],
          }),
          lesson({
            slug: "relational-operators",
            title: "Relational Operators",
            summary: "Compare values.",
            what: "Relational operators compare values and produce a boolean result.",
            why: "Comparisons are essential for decisions and loops.",
            example: `int a = 10;
int b = 20;

Console.WriteLine(a < b);
Console.WriteLine(a == b);`,
            mistake: "Using = instead of == for comparison.",
            correction: "Use = for assignment and == for equality comparison.",
            labPrompt: "Compare two numbers using relational operators.",
            question: "Which operator checks equality?",
            answer: "==",
            distractors: ["=", "!=", "=>"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-control-flow",
    title: "Control Flow",
    description:
      "Learn decision making, switch statements, loops, nested loops, and loop control.",
    topics: [
      {
        slug: "decision-making",
        title: "Decision Making",
        lessons: [
          lesson({
            slug: "if-statement",
            title: "if Statement",
            summary: "Execute code only when a condition is true.",
            what: "The if statement executes a block when its condition evaluates to true.",
            why: "It allows programs to make decisions.",
            example: `int age = 20;

if (age >= 18)
{
    Console.WriteLine("Adult");
}`,
            mistake: "Writing if without a boolean condition.",
            correction: "The condition must produce a true or false result.",
            labPrompt: "Check whether a number is positive.",
            question: "When does an if block execute?",
            answer: "When its condition is true.",
            distractors: ["Always", "Only when false", "Only after a loop"],
          }),
          lesson({
            slug: "if-else",
            title: "if else Statement",
            summary: "Choose between two possible paths.",
            what: "if executes one block when a condition is true and else executes another block when it is false.",
            why: "It handles two-way decisions.",
            example: `int number = 7;

if (number % 2 == 0)
{
    Console.WriteLine("Even");
}
else
{
    Console.WriteLine("Odd");
}`,
            mistake: "Putting the else before the if.",
            correction: "else must directly follow its corresponding if block.",
            labPrompt: "Check whether a number is even or odd.",
            question: "When does else execute?",
            answer: "When the if condition is false.",
            distractors: ["When it is true", "Before if", "Only inside loops"],
          }),
          lesson({
            slug: "switch-statement",
            title: "Switch Statement",
            summary: "Select code based on a value.",
            what: "A switch statement selects a matching case based on an expression.",
            why: "It is useful when one value can lead to several possible cases.",
            example: `int day = 2;

switch (day)
{
    case 1:
        Console.WriteLine("Monday");
        break;
    case 2:
        Console.WriteLine("Tuesday");
        break;
    default:
        Console.WriteLine("Invalid");
        break;
}`,
            mistake: "Forgetting break in traditional switch cases.",
            correction: "Use the appropriate control flow to finish each case.",
            labPrompt: "Create a switch for numbers 1 to 3.",
            question: "What keyword defines a switch branch?",
            answer: "case",
            distractors: ["branch", "option", "when"],
          }),
        ],
      },
      {
        slug: "loops",
        title: "Loops",
        lessons: [
          lesson({
            slug: "while-loop",
            title: "while Loop",
            summary: "Repeat code while a condition remains true.",
            what: "A while loop checks its condition before every iteration.",
            why: "It is useful when the number of iterations is not known in advance.",
            example: `int i = 1;

while (i <= 5)
{
    Console.WriteLine(i);
    i++;
}`,
            mistake: "Forgetting to update the loop variable.",
            correction: "Make sure the loop condition eventually becomes false.",
            labPrompt: "Print numbers from 1 to 10 using while.",
            question: "When is the while condition checked?",
            answer: "Before each iteration.",
            distractors: ["Only after the loop", "Only once at the end", "Never"],
          }),
          lesson({
            slug: "for-loop",
            title: "for Loop",
            summary: "Repeat code using initialization, condition, and update.",
            what: "A for loop combines initialization, condition, and iteration update in one structure.",
            why: "It is convenient when the number of iterations is known.",
            example: `for (int i = 1; i <= 5; i++)
{
    Console.WriteLine(i);
}`,
            mistake: "Putting the update outside the loop accidentally.",
            correction: "Keep the initialization, condition, and update in the correct positions.",
            labPrompt: "Print numbers from 1 to 20 using a for loop.",
            question: "Which part updates the loop variable?",
            answer: "The iteration expression.",
            distractors: ["Condition", "Initialization", "Class"],
          }),
          lesson({
            slug: "do-while-loop",
            title: "do while Loop",
            summary: "Run a block at least once before checking the condition.",
            what: "A do while loop executes its body before checking its condition.",
            why: "It is useful when the body must execute at least once.",
            example: `int i = 1;

do
{
    Console.WriteLine(i);
    i++;
}
while (i <= 5);`,
            mistake: "Assuming the condition is checked before the first iteration.",
            correction: "do while always executes its body once before checking.",
            labPrompt: "Use do while to print numbers from 1 to 5.",
            question: "How many times can a do while execute at minimum?",
            answer: "Once.",
            distractors: ["Zero", "Two", "Ten"],
          }),
        ],
      },
      {
        slug: "loop-control",
        title: "Loop Control",
        lessons: [
          lesson({
            slug: "break",
            title: "break Statement",
            summary: "Stop a loop or switch.",
            what: "break immediately exits the nearest loop or switch.",
            why: "It is useful when the required result has already been found.",
            example: `for (int i = 1; i <= 10; i++)
{
    if (i == 5)
        break;

    Console.WriteLine(i);
}`,
            mistake: "Expecting break to skip only one iteration.",
            correction: "break exits the loop completely.",
            labPrompt: "Stop printing numbers when the value reaches 5.",
            question: "What does break do?",
            answer: "It exits the nearest loop or switch.",
            distractors: ["Skips one iteration", "Restarts the loop", "Creates a loop"],
          }),
          lesson({
            slug: "continue",
            title: "continue Statement",
            summary: "Skip the current iteration.",
            what: "continue skips the remaining statements in the current loop iteration and proceeds to the next iteration.",
            why: "It is useful when certain values should be ignored.",
            example: `for (int i = 1; i <= 5; i++)
{
    if (i == 3)
        continue;

    Console.WriteLine(i);
}`,
            mistake: "Thinking continue exits the loop.",
            correction: "continue skips the current iteration but keeps the loop running.",
            labPrompt: "Print numbers from 1 to 10 except 5.",
            question: "What does continue do?",
            answer: "Skips the current iteration.",
            distractors: ["Ends the program", "Ends the loop", "Restarts the application"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-object-oriented-programming",
    title: "Object-Oriented Programming",
    description:
      "Learn encapsulation, methods, nullable types, arrays, strings, structures, enums, classes, inheritance, and polymorphism.",
    topics: [
      {
        slug: "encapsulation",
        title: "Encapsulation",
        lessons: [
          lesson({
            slug: "public-access",
            title: "public Access",
            summary: "Understand public members.",
            what: "A public member can be accessed from code that can access its containing type.",
            why: "Public members provide functionality intended to be accessible from outside the type.",
            example: `class Student
{
    public string Name;
}`,
            mistake: "Making every field public.",
            correction: "Expose only the members that should be accessible externally.",
            labPrompt: "Create a class with one public field.",
            question: "Which access modifier allows broad access?",
            answer: "public",
            distractors: ["private", "protected", "internal"],
          }),
          lesson({
            slug: "private-access",
            title: "private Access",
            summary: "Protect implementation details.",
            what: "A private member is accessible only within its containing type.",
            why: "Private members help hide internal implementation details.",
            example: `class BankAccount
{
    private double balance;

    public void Deposit(double amount)
    {
        balance += amount;
    }
}`,
            mistake: "Trying to access a private field directly from outside the class.",
            correction: "Use a public method or property when external access is required.",
            labPrompt: "Create a private balance field and a public deposit method.",
            question: "Where can a private member be accessed?",
            answer: "Inside its containing type.",
            distractors: ["Everywhere", "Only another namespace", "Only another class"],
          }),
        ],
      },
      {
        slug: "methods",
        title: "Methods",
        lessons: [
          lesson({
            slug: "defining-methods",
            title: "Defining Methods",
            summary: "Create reusable blocks of code.",
            what: "A method contains statements that perform a particular operation.",
            why: "Methods improve reuse, organization, and readability.",
            example: `static int Add(int a, int b)
{
    return a + b;
}

int result = Add(10, 20);`,
            mistake: "Forgetting to return a value from a non-void method.",
            correction: "A method with a non-void return type must return a compatible value.",
            labPrompt: "Create a method that returns the square of a number.",
            question: "What does a method return type describe?",
            answer: "The type of value the method returns.",
            distractors: ["The class name", "The variable name", "The loop count"],
          }),
          lesson({
            slug: "recursive-method",
            title: "Recursive Methods",
            summary: "Understand methods that call themselves.",
            what: "A recursive method calls itself to solve smaller versions of a problem.",
            why: "Recursion is useful for problems that naturally divide into smaller similar problems.",
            example: `static int Factorial(int n)
{
    if (n <= 1)
        return 1;

    return n * Factorial(n - 1);
}`,
            mistake: "Writing recursion without a base case.",
            correction: "A recursive method needs a condition that stops further recursive calls.",
            labPrompt: "Write a recursive factorial method.",
            question: "What stops recursion?",
            answer: "The base case.",
            distractors: ["Namespace", "Constructor", "Property"],
          }),
        ],
      },
      {
        slug: "nullables",
        title: "Nullable Types",
        lessons: [
          lesson({
            slug: "nullable-value-type",
            title: "Nullable Value Types",
            summary: "Allow value types to represent null.",
            what: "Nullable value types allow a value type such as int to also represent null.",
            why: "They are useful when a value may be missing.",
            example: `int? age = null;

Console.WriteLine(age);`,
            mistake: "Assuming int itself can store null.",
            correction: "Use a nullable value type such as int? when null is required.",
            labPrompt: "Create a nullable integer and assign null.",
            question: "What does int? represent?",
            answer: "A nullable integer.",
            distractors: ["A string", "A pointer only", "A constant"],
          }),
          lesson({
            slug: "null-coalescing",
            title: "Null Coalescing Operator",
            summary: "Provide a fallback value for null.",
            what: "The ?? operator returns the left value when it is not null, otherwise it returns the right value.",
            why: "It provides a concise way to handle missing values.",
            example: `string name = null;

string result = name ?? "Unknown";

Console.WriteLine(result);`,
            mistake: "Using ?? with unrelated incompatible types.",
            correction: "The operands should provide compatible possible results.",
            labPrompt: "Use ?? to provide a default username.",
            question: "What does ?? do?",
            answer: "It provides a fallback when the left operand is null.",
            distractors: ["Compares numbers", "Creates a loop", "Casts a type"],
          }),
        ],
      },
      {
        slug: "arrays-and-strings",
        title: "Arrays and Strings",
        lessons: [
          lesson({
            slug: "one-dimensional-array",
            title: "One-Dimensional Arrays",
            summary: "Store multiple values of the same type.",
            what: "An array stores a fixed number of values of the same type.",
            why: "Arrays are useful when related values need to be stored together.",
            example: `int[] numbers = { 10, 20, 30 };

Console.WriteLine(numbers[0]);`,
            mistake: "Using an index outside the array bounds.",
            correction: "Array indexes start at 0 and end at Length - 1.",
            labPrompt: "Create an integer array and print every element.",
            question: "What is the first index of an array?",
            answer: "0",
            distractors: ["1", "-1", "Length"],
          }),
          lesson({
            slug: "multidimensional-array",
            title: "Multidimensional Arrays",
            summary: "Store data in multiple dimensions.",
            what: "Multidimensional arrays can represent structures such as tables and matrices.",
            why: "They are useful when data naturally has rows and columns.",
            example: `int[,] matrix =
{
    { 1, 2 },
    { 3, 4 }
};

Console.WriteLine(matrix[0, 1]);`,
            mistake: "Using the wrong number of indexes.",
            correction: "A two-dimensional array requires row and column indexes.",
            labPrompt: "Create and print a 2x2 matrix.",
            question: "How many indexes does a two-dimensional array use?",
            answer: "Two.",
            distractors: ["One", "Three", "Zero"],
          }),
          lesson({
            slug: "string-basics",
            title: "Strings",
            summary: "Work with text in C#.",
            what: "The string type represents a sequence of characters.",
            why: "Text processing is common in almost every application.",
            example: `string firstName = "Bhaskara";
string message = "Hello " + firstName;

Console.WriteLine(message);`,
            mistake: "Using single quotes for a string.",
            correction: "Use double quotes for strings and single quotes for character literals.",
            labPrompt: "Create a string containing your full name.",
            question: "Which quotes are normally used for strings?",
            answer: "Double quotes.",
            distractors: ["Single quotes", "Backticks only", "Square brackets"],
          }),
        ],
      },
      {
        slug: "structures-and-enums",
        title: "Structures and Enums",
        lessons: [
          lesson({
            slug: "struct",
            title: "Structures",
            summary: "Create value-type structures.",
            what: "A struct is a value type that can group related data and behavior.",
            why: "Structures are useful for small data-focused types.",
            example: `struct Point
{
    public int X;
    public int Y;
}

Point p = new Point();
p.X = 10;
p.Y = 20;`,
            mistake: "Treating a struct exactly like a class in every situation.",
            correction: "Structs are value types while classes are reference types.",
            labPrompt: "Create a Point struct with X and Y fields.",
            question: "Is a struct a value type or reference type?",
            answer: "Value type.",
            distractors: ["Reference type", "Namespace", "Interface"],
          }),
          lesson({
            slug: "enum",
            title: "Enums",
            summary: "Represent named constant values.",
            what: "An enum defines a set of named integral constants.",
            why: "Enums make fixed choices easier to read and maintain.",
            example: `enum Day
{
    Monday,
    Tuesday,
    Wednesday
}

Day today = Day.Monday;`,
            mistake: "Treating enum names as arbitrary strings.",
            correction: "Enum members represent named constant values of the enum type.",
            labPrompt: "Create an enum for three traffic-light states.",
            question: "What does an enum provide?",
            answer: "Named constants.",
            distractors: ["Methods only", "Objects only", "Files"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-inheritance-polymorphism",
    title: "Inheritance and Polymorphism",
    description:
      "Learn classes, constructors, inheritance, polymorphism, operator overloading, and interfaces.",
    topics: [
      {
        slug: "classes",
        title: "Classes",
        lessons: [
          lesson({
            slug: "defining-class",
            title: "Defining a Class",
            summary: "Create your own reference type.",
            what: "A class defines the data and behavior that objects created from it can have.",
            why: "Classes are a foundation of object-oriented programming.",
            example: `class Student
{
    public string Name;

    public void Display()
    {
        Console.WriteLine(Name);
    }
}`,
            mistake: "Trying to access instance members without an object.",
            correction: "Create an instance when using non-static members.",
            labPrompt: "Create a Student class with a name and display method.",
            question: "What does a class define?",
            answer: "Data and behavior for objects.",
            distractors: ["Only loops", "Only namespaces", "Only constants"],
          }),
          lesson({
            slug: "constructors",
            title: "Constructors",
            summary: "Initialize objects when they are created.",
            what: "A constructor is called when an object is created and is commonly used to initialize its state.",
            why: "Constructors provide a controlled way to initialize objects.",
            example: `class Student
{
    public string Name;

    public Student(string name)
    {
        Name = name;
    }
}

Student s = new Student("Bhaskara");`,
            mistake: "Giving a constructor a return type.",
            correction: "Constructors have the same name as the class and do not have a return type.",
            labPrompt: "Create a class with a constructor that initializes a name.",
            question: "When is a constructor normally called?",
            answer: "When an object is created.",
            distractors: ["When the namespace loads", "Only after destruction", "Every loop"],
          }),
        ],
      },
      {
        slug: "inheritance",
        title: "Inheritance",
        lessons: [
          lesson({
            slug: "base-and-derived-class",
            title: "Base and Derived Classes",
            summary: "Reuse and extend class behavior.",
            what: "Inheritance allows a derived class to reuse accessible members of a base class.",
            why: "It can model relationships and reduce repeated code.",
            example: `class Animal
{
    public void Eat()
    {
        Console.WriteLine("Eating");
    }
}

class Dog : Animal
{
    public void Bark()
    {
        Console.WriteLine("Barking");
    }
}`,
            mistake: "Assuming C# supports multiple class inheritance.",
            correction: "A C# class can inherit from one base class but can implement multiple interfaces.",
            labPrompt: "Create an Animal base class and Dog derived class.",
            question: "Which symbol specifies inheritance?",
            answer: ":",
            distractors: ["extends", "inherits", "->"],
          }),
          lesson({
            slug: "base-constructor",
            title: "Initializing the Base Class",
            summary: "Call a base class constructor.",
            what: "The base keyword can be used to call a base class constructor or access base members.",
            why: "Derived objects sometimes need to initialize inherited state.",
            example: `class Animal
{
    public Animal(string name)
    {
        Console.WriteLine(name);
    }
}

class Dog : Animal
{
    public Dog() : base("Dog")
    {
    }
}`,
            mistake: "Trying to initialize a base constructor without calling it correctly.",
            correction: "Use the base constructor initializer when required.",
            labPrompt: "Create a derived class that calls a base constructor.",
            question: "What keyword refers to the base class?",
            answer: "base",
            distractors: ["super", "parent", "root"],
          }),
        ],
      },
      {
        slug: "polymorphism",
        title: "Polymorphism",
        lessons: [
          lesson({
            slug: "method-overloading",
            title: "Method Overloading",
            summary: "Use the same method name with different parameters.",
            what: "Method overloading provides multiple methods with the same name but different parameter lists.",
            why: "It allows related operations to share a meaningful method name.",
            example: `class Calculator
{
    public int Add(int a, int b)
    {
        return a + b;
    }

    public int Add(int a, int b, int c)
    {
        return a + b + c;
    }
}`,
            mistake: "Changing only the return type to overload a method.",
            correction: "Overloaded methods must differ in their parameter lists.",
            labPrompt: "Overload an Add method for two and three numbers.",
            question: "What must differ for method overloading?",
            answer: "The parameter list.",
            distractors: ["Only return type", "Only class name", "Only access modifier"],
          }),
          lesson({
            slug: "method-overriding",
            title: "Method Overriding",
            summary: "Change inherited virtual behavior.",
            what: "A derived class can override a virtual or abstract base method to provide specialized behavior.",
            why: "Overriding enables runtime polymorphism.",
            example: `class Animal
{
    public virtual void Sound()
    {
        Console.WriteLine("Animal sound");
    }
}

class Dog : Animal
{
    public override void Sound()
    {
        Console.WriteLine("Bark");
    }
}`,
            mistake: "Using override without a suitable virtual or abstract base member.",
            correction: "The base member must support overriding.",
            labPrompt: "Override a virtual method in a derived class.",
            question: "Which keyword marks a method for overriding?",
            answer: "virtual",
            distractors: ["static", "private", "const"],
          }),
        ],
      },
      {
        slug: "operator-overloading",
        title: "Operator Overloading",
        lessons: [
          lesson({
            slug: "overload-operator",
            title: "Implementing Operator Overloading",
            summary: "Define custom behavior for supported operators.",
            what: "Operator overloading allows user-defined types to define how supported operators work.",
            why: "It can make operations on custom types more natural.",
            example: `class Number
{
    public int Value;

    public static Number operator +(Number a, Number b)
    {
        return new Number { Value = a.Value + b.Value };
    }
}`,
            mistake: "Trying to overload every C# operator.",
            correction: "Only operators supported by C# can be overloaded, with required rules.",
            labPrompt: "Overload + for a simple custom number class.",
            question: "What kind of method implements an overloaded operator?",
            answer: "A static operator method.",
            distractors: ["Constructor only", "Destructor only", "Namespace method"],
          }),
        ],
      },
      {
        slug: "interfaces",
        title: "Interfaces",
        lessons: [
          lesson({
            slug: "declaring-interface",
            title: "Declaring Interfaces",
            summary: "Define a contract for classes.",
            what: "An interface defines members that implementing types agree to provide.",
            why: "Interfaces support abstraction and flexible designs.",
            example: `interface IAnimal
{
    void Sound();
}

class Dog : IAnimal
{
    public void Sound()
    {
        Console.WriteLine("Bark");
    }
}`,
            mistake: "Creating an interface instance directly.",
            correction: "An interface defines a contract; a concrete implementing type supplies the implementation.",
            labPrompt: "Create an interface with one method and implement it.",
            question: "What does an interface mainly define?",
            answer: "A contract.",
            distractors: ["Only variables", "A database", "A namespace"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-organization-and-regex",
    title: "Namespaces, Preprocessor Directives and Regular Expressions",
    description:
      "Organize C# code with namespaces, use preprocessor directives, and work with regular expressions.",
    topics: [
      {
        slug: "namespaces",
        title: "Namespaces",
        lessons: [
          lesson({
            slug: "defining-namespace",
            title: "Defining a Namespace",
            summary: "Organize related C# types.",
            what: "A namespace groups related classes, interfaces, structs, and other types.",
            why: "Namespaces help organize code and avoid naming conflicts.",
            example: `namespace MyApplication
{
    class Student
    {
    }
}`,
            mistake: "Thinking namespaces create objects.",
            correction: "Namespaces organize types; objects are created from types such as classes.",
            labPrompt: "Create a namespace containing a Student class.",
            question: "What is the main purpose of a namespace?",
            answer: "Organizing related types.",
            distractors: ["Creating loops", "Storing variables", "Running threads"],
          }),
          lesson({
            slug: "nested-namespaces",
            title: "Nested Namespaces",
            summary: "Place namespaces inside other namespaces.",
            what: "Namespaces can be nested to create a hierarchical organization.",
            why: "Large projects can use nested namespaces to organize related areas.",
            example: `namespace Company
{
    namespace Products
    {
        class Phone
        {
        }
    }
}`,
            mistake: "Assuming nested namespaces automatically inherit class members.",
            correction: "Namespaces organize names; they do not create inheritance relationships.",
            labPrompt: "Create a nested namespace for a product class.",
            question: "Can namespaces be nested?",
            answer: "Yes.",
            distractors: ["No", "Only in interfaces", "Only in structs"],
          }),
        ],
      },
      {
        slug: "preprocessor",
        title: "Preprocessor Directives",
        lessons: [
          lesson({
            slug: "define-directive",
            title: "#define",
            summary: "Define a preprocessor symbol.",
            what: "#define creates a conditional compilation symbol.",
            why: "Preprocessor symbols can control whether certain code is included during compilation.",
            example: `#define DEBUG_MODE

using System;

class Program
{
    static void Main()
    {
#if DEBUG_MODE
        Console.WriteLine("Debug mode");
#endif
    }
}`,
            mistake: "Using #define like a normal runtime variable declaration.",
            correction: "#define creates a preprocessor symbol used during compilation.",
            labPrompt: "Create a symbol and conditionally compile a message.",
            question: "What does #define create?",
            answer: "A preprocessor symbol.",
            distractors: ["A runtime object", "A class", "A namespace"],
          }),
        ],
      },
      {
        slug: "regular-expressions",
        title: "Regular Expressions",
        lessons: [
          lesson({
            slug: "regex-basics",
            title: "Regular Expression Basics",
            summary: "Use patterns to search text.",
            what: "Regular expressions describe patterns used to search, match, and manipulate text.",
            why: "They are useful for validation and text processing.",
            example: `using System.Text.RegularExpressions;

string text = "Email: test@example.com";

bool found = Regex.IsMatch(
    text,
    @"\\w+@\\w+\\.\\w+"
);

Console.WriteLine(found);`,
            mistake: "Writing a pattern without considering special characters.",
            correction: "Build and test the regular expression carefully, especially escapes and character classes.",
            labPrompt: "Check whether a string contains a simple email-like pattern.",
            question: "What does Regex.IsMatch check?",
            answer: "Whether a string matches a pattern.",
            distractors: ["Whether two numbers are equal", "Whether a file exists", "Whether a class inherits"],
          }),
          lesson({
            slug: "regex-character-classes",
            title: "Character Classes",
            summary: "Match groups of possible characters.",
            what: "Character classes such as [a-z] describe a set or range of characters.",
            why: "They allow patterns to match controlled sets of characters.",
            example: `using System.Text.RegularExpressions;

bool result = Regex.IsMatch("abc", @"[a-z]+");

Console.WriteLine(result);`,
            mistake: "Confusing a character class with a literal string.",
            correction: "Square brackets describe a set of allowed characters.",
            labPrompt: "Create a regex that matches lowercase letters.",
            question: "What does [a-z] represent?",
            answer: "Lowercase letters from a through z.",
            distractors: ["Only the letter a", "Any number", "Whitespace only"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-exceptions-and-files",
    title: "Exception Handling and File I/O",
    description:
      "Handle errors safely and work with files, streams, readers, writers, and directories.",
    topics: [
      {
        slug: "exception-handling",
        title: "Exception Handling",
        lessons: [
          lesson({
            slug: "try-catch",
            title: "try catch",
            summary: "Handle runtime exceptions.",
            what: "try contains code that may throw an exception and catch handles matching exceptions.",
            why: "Exception handling prevents expected failures from crashing the application without control.",
            example: `try
{
    int value = int.Parse("abc");
}
catch (FormatException)
{
    Console.WriteLine("Invalid number");
}`,
            mistake: "Catching every exception without understanding it.",
            correction: "Handle specific exceptions when possible and preserve useful error information.",
            labPrompt: "Safely parse user input using try and catch.",
            question: "What does catch do?",
            answer: "Handles an exception thrown from the associated try block.",
            distractors: ["Creates an exception", "Starts a loop", "Declares a class"],
          }),
          lesson({
            slug: "finally",
            title: "finally Block",
            summary: "Run cleanup code after exception handling.",
            what: "The finally block normally runs after try/catch processing whether or not an exception occurs.",
            why: "It is useful for cleanup operations.",
            example: `try
{
    Console.WriteLine("Work");
}
catch
{
    Console.WriteLine("Error");
}
finally
{
    Console.WriteLine("Cleanup");
}`,
            mistake: "Using finally as if it only runs after errors.",
            correction: "finally is generally used for code that should run after the try/catch process.",
            labPrompt: "Add a finally block to a try/catch example.",
            question: "When is finally useful?",
            answer: "For cleanup code that should run after the try/catch process.",
            distractors: ["Only for loops", "Only for classes", "Only for constructors"],
          }),
        ],
      },
      {
        slug: "file-io",
        title: "File I/O",
        lessons: [
          lesson({
            slug: "write-text-file",
            title: "Writing Text Files",
            summary: "Write text to a file.",
            what: "The File class provides convenient methods for writing text to files.",
            why: "Applications often need to persist information outside memory.",
            example: `using System.IO;

File.WriteAllText(
    "data.txt",
    "Hello from C#"
);`,
            mistake: "Assuming the file operation can never fail.",
            correction: "File operations can fail because of paths, permissions, missing directories, or other I/O problems.",
            labPrompt: "Write a short message to a text file.",
            question: "Which method writes text to a file?",
            answer: "File.WriteAllText",
            distractors: ["File.Print", "File.Output", "File.SaveTextOnly"],
          }),
          lesson({
            slug: "read-text-file",
            title: "Reading Text Files",
            summary: "Read text from a file.",
            what: "File.ReadAllText reads the contents of a text file into a string.",
            why: "Reading files allows programs to process stored information.",
            example: `using System.IO;

string text = File.ReadAllText("data.txt");

Console.WriteLine(text);`,
            mistake: "Reading a file that does not exist without handling the possible exception.",
            correction: "Check the path or handle the relevant file I/O exception.",
            labPrompt: "Read a text file and print its contents.",
            question: "What does File.ReadAllText return?",
            answer: "The file contents as a string.",
            distractors: ["An integer", "A thread", "A namespace"],
          }),
        ],
      },
      {
        slug: "streams",
        title: "Streams",
        lessons: [
          lesson({
            slug: "filestream",
            title: "FileStream",
            summary: "Work with file data through streams.",
            what: "FileStream provides a stream-based way to read from and write to files.",
            why: "Streams are useful for controlled and sequential I/O operations.",
            example: `using System.IO;

using FileStream stream =
    new FileStream(
        "data.txt",
        FileMode.OpenOrCreate
    );`,
            mistake: "Forgetting to release stream resources.",
            correction: "Use using statements or declarations so disposable resources are released.",
            labPrompt: "Open a file using FileStream.",
            question: "What does FileStream represent?",
            answer: "A stream for file input and output.",
            distractors: ["A database", "A namespace", "A thread"],
          }),
          lesson({
            slug: "stream-reader-writer",
            title: "StreamReader and StreamWriter",
            summary: "Read and write text through streams.",
            what: "StreamReader reads text from streams while StreamWriter writes text to streams.",
            why: "They provide convenient text-based stream operations.",
            example: `using StreamWriter writer =
    new StreamWriter("data.txt");

writer.WriteLine("Hello");`,
            mistake: "Leaving the writer open.",
            correction: "Dispose the writer using a using statement or declaration.",
            labPrompt: "Write two lines to a file using StreamWriter.",
            question: "Which class writes text to a stream?",
            answer: "StreamWriter",
            distractors: ["StreamReader", "FileReader", "TextScanner"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-advanced-runtime",
    title: "Attributes, Reflection, Properties and Indexers",
    description:
      "Learn metadata, reflection, properties, accessors, and indexers.",
    topics: [
      {
        slug: "attributes",
        title: "Attributes",
        lessons: [
          lesson({
            slug: "predefined-attributes",
            title: "Predefined Attributes",
            summary: "Use metadata attributes provided by .NET.",
            what: "Attributes add declarative metadata to program elements.",
            why: "They allow frameworks and tools to inspect additional information about code.",
            example: `[Obsolete("Use NewMethod instead")]
static void OldMethod()
{
}`,
            mistake: "Thinking attributes execute like ordinary methods.",
            correction: "Attributes provide metadata that can be inspected or used by tools and runtime features.",
            labPrompt: "Mark a method as obsolete using an attribute.",
            question: "What do attributes provide?",
            answer: "Metadata about program elements.",
            distractors: ["Only loops", "Only variables", "Only constructors"],
          }),
          lesson({
            slug: "custom-attributes",
            title: "Custom Attributes",
            summary: "Create your own attribute types.",
            what: "Custom attributes can be created by deriving from Attribute.",
            why: "Custom metadata can be useful in frameworks and application-specific tooling.",
            example: `class AuthorAttribute : Attribute
{
    public string Name { get; }

    public AuthorAttribute(string name)
    {
        Name = name;
    }
}

[Author("Bhaskara")]
class Student
{
}`,
            mistake: "Forgetting to inherit from Attribute.",
            correction: "Custom attribute classes should derive from System.Attribute.",
            labPrompt: "Create an attribute that stores an author's name.",
            question: "What should a custom attribute derive from?",
            answer: "Attribute",
            distractors: ["Object only", "Thread", "Stream"],
          }),
        ],
      },
      {
        slug: "reflection",
        title: "Reflection",
        lessons: [
          lesson({
            slug: "type-information",
            title: "Viewing Type Information",
            summary: "Inspect types at runtime.",
            what: "Reflection allows programs to inspect metadata about types, members, and assemblies at runtime.",
            why: "Reflection is used by frameworks, serializers, dependency injection systems, and tooling.",
            example: `Type type = typeof(string);

Console.WriteLine(type.Name);
Console.WriteLine(type.FullName);`,
            mistake: "Thinking reflection changes the source code.",
            correction: "Reflection inspects runtime metadata; it does not directly rewrite source code.",
            labPrompt: "Use typeof to display information about a class.",
            question: "When is reflection commonly used?",
            answer: "For inspecting runtime metadata.",
            distractors: ["Only for arithmetic", "Only for loops", "Only for console input"],
          }),
        ],
      },
      {
        slug: "properties",
        title: "Properties",
        lessons: [
          lesson({
            slug: "get-set",
            title: "get and set Accessors",
            summary: "Control access to class data with properties.",
            what: "Properties provide controlled access to values through get and set accessors.",
            why: "Properties are a standard way to expose class state safely.",
            example: `class Student
{
    public string Name { get; set; }
}`,
            mistake: "Thinking a property is exactly the same as a public field.",
            correction: "Properties can contain access logic and provide controlled access.",
            labPrompt: "Create a Student class with Name and Age properties.",
            question: "Which accessors read and write a property?",
            answer: "get and set",
            distractors: ["read and write", "open and close", "input and output"],
          }),
          lesson({
            slug: "read-only-property",
            title: "Read-Only Properties",
            summary: "Create properties that cannot be externally assigned.",
            what: "A property can expose only a getter when its value should be read but not directly assigned by callers.",
            why: "Read-only properties can protect object state.",
            example: `class Product
{
    public string Name { get; }

    public Product(string name)
    {
        Name = name;
    }
}`,
            mistake: "Trying to assign a read-only property from unrelated code.",
            correction: "Initialize it where the property permits assignment, such as a constructor.",
            labPrompt: "Create a read-only Name property initialized in a constructor.",
            question: "What does a property with only get provide?",
            answer: "Read access without a public setter.",
            distractors: ["Only writing", "A loop", "A namespace"],
          }),
        ],
      },
      {
        slug: "indexers",
        title: "Indexers",
        lessons: [
          lesson({
            slug: "indexer-basics",
            title: "Using Indexers",
            summary: "Access objects using array-like syntax.",
            what: "An indexer allows an object to be accessed using bracket syntax.",
            why: "Indexers make collection-like custom types easier to use.",
            example: `class Team
{
    private string[] players = new string[3];

    public string this[int index]
    {
        get { return players[index]; }
        set { players[index] = value; }
    }
}`,
            mistake: "Forgetting that indexers need an index parameter.",
            correction: "An indexer defines the parameter used inside square brackets.",
            labPrompt: "Create a class with a string array and an indexer.",
            question: "Which syntax accesses an indexer?",
            answer: "Square brackets.",
            distractors: ["Parentheses only", "Curly braces", "Angle brackets"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-delegates-events-collections",
    title: "Delegates, Events and Collections",
    description:
      "Learn delegates, events, collection classes, and how C# manages groups of data.",
    topics: [
      {
        slug: "delegates",
        title: "Delegates",
        lessons: [
          lesson({
            slug: "declaring-delegate",
            title: "Declaring Delegates",
            summary: "Create type-safe references to methods.",
            what: "A delegate represents a reference to a method with a compatible signature.",
            why: "Delegates allow methods to be passed as values and support callback-based designs.",
            example: `delegate void MessageHandler(string message);

static void ShowMessage(string message)
{
    Console.WriteLine(message);
}

MessageHandler handler = ShowMessage;
handler("Hello");`,
            mistake: "Assigning a method with an incompatible signature.",
            correction: "The method signature must match the delegate signature.",
            labPrompt: "Create a delegate that accepts a string.",
            question: "What does a delegate reference?",
            answer: "A compatible method.",
            distractors: ["Only a class", "Only a variable", "A namespace"],
          }),
          lesson({
            slug: "multicast-delegate",
            title: "Multicast Delegates",
            summary: "Invoke multiple methods through one delegate.",
            what: "A multicast delegate can contain multiple method references.",
            why: "It allows one invocation to notify multiple compatible methods.",
            example: `delegate void Handler();

static void First()
{
    Console.WriteLine("First");
}

static void Second()
{
    Console.WriteLine("Second");
}

Handler h = First;
h += Second;
h();`,
            mistake: "Using incompatible methods in the invocation list.",
            correction: "All methods in the delegate invocation list must match the delegate signature.",
            labPrompt: "Create a multicast delegate that calls two methods.",
            question: "Which operator adds a method to a delegate invocation list?",
            answer: "+=",
            distractors: ["==", "=>", "++"],
          }),
        ],
      },
      {
        slug: "events",
        title: "Events",
        lessons: [
          lesson({
            slug: "declaring-events",
            title: "Declaring Events",
            summary: "Notify other objects when something happens.",
            what: "Events provide a controlled mechanism for a class to notify subscribers.",
            why: "Events are commonly used for notifications and user-interface interactions.",
            example: `class Alarm
{
    public event Action Triggered;

    public void Start()
    {
        Triggered?.Invoke();
    }
}`,
            mistake: "Calling an event from unrelated external code.",
            correction: "The declaring type controls when the event is raised.",
            labPrompt: "Create an event that fires when a method is called.",
            question: "What are events mainly used for?",
            answer: "Notifications.",
            distractors: ["Arithmetic", "File compression", "Type conversion"],
          }),
        ],
      },
      {
        slug: "collections",
        title: "Collections",
        lessons: [
          lesson({
            slug: "arraylist",
            title: "ArrayList",
            summary: "Understand the legacy non-generic collection.",
            what: "ArrayList is a collection that can store objects of different types.",
            why: "It is part of the older collection APIs, although generic collections are generally preferred in modern C#.",
            example: `using System.Collections;

ArrayList items = new ArrayList();

items.Add(10);
items.Add("Hello");

Console.WriteLine(items.Count);`,
            mistake: "Assuming ArrayList provides the same compile-time type safety as List<T>.",
            correction: "Generic collections such as List<T> provide stronger type safety.",
            labPrompt: "Add several values to an ArrayList.",
            question: "What namespace contains ArrayList?",
            answer: "System.Collections",
            distractors: ["System.Threading", "System.IO", "System.Net"],
          }),
          lesson({
            slug: "stack-and-queue",
            title: "Stack and Queue",
            summary: "Use LIFO and FIFO collection behavior.",
            what: "Stack follows last-in-first-out while Queue follows first-in-first-out.",
            why: "These structures model different processing patterns.",
            example: `Stack<int> stack = new Stack<int>();
stack.Push(10);
stack.Push(20);

Console.WriteLine(stack.Pop());

Queue<int> queue = new Queue<int>();
queue.Enqueue(10);
queue.Enqueue(20);

Console.WriteLine(queue.Dequeue());`,
            mistake: "Confusing Stack and Queue ordering.",
            correction: "Stack removes the newest item first; Queue removes the oldest item first.",
            labPrompt: "Create a stack and queue and add three values to each.",
            question: "Which structure follows FIFO?",
            answer: "Queue",
            distractors: ["Stack", "Array", "Struct"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-generics-and-anonymous-methods",
    title: "Generics and Anonymous Methods",
    description:
      "Learn generic types, generic methods, generic delegates, and anonymous methods.",
    topics: [
      {
        slug: "generics",
        title: "Generics",
        lessons: [
          lesson({
            slug: "generic-class",
            title: "Generic Classes",
            summary: "Create reusable type-safe classes.",
            what: "Generics allow classes and methods to work with type parameters.",
            why: "They provide reuse while preserving compile-time type safety.",
            example: `class Box<T>
{
    public T Value { get; set; }
}

Box<int> box = new Box<int>();
box.Value = 10;`,
            mistake: "Treating T as a concrete type.",
            correction: "T is a type parameter replaced by an actual type when the generic type is used.",
            labPrompt: "Create a generic Box<T> class.",
            question: "What does T represent?",
            answer: "A type parameter.",
            distractors: ["A method", "A namespace", "A constant"],
          }),
          lesson({
            slug: "generic-method",
            title: "Generic Methods",
            summary: "Create methods that work with different types.",
            what: "A generic method defines one or more type parameters that can be inferred or specified when called.",
            why: "Generic methods avoid duplicate implementations for different types.",
            example: `static void Print<T>(T value)
{
    Console.WriteLine(value);
}

Print(10);
Print("Hello");`,
            mistake: "Assuming a generic method accepts every operation for T.",
            correction: "Only operations valid for the type parameter and its constraints can be used.",
            labPrompt: "Write a generic method that prints a value.",
            question: "What is a benefit of generic methods?",
            answer: "Reusable type-safe code.",
            distractors: ["They remove all types", "They only work with strings", "They only work at runtime"],
          }),
        ],
      },
      {
        slug: "generic-delegates",
        title: "Generic Delegates",
        lessons: [
          lesson({
            slug: "func-delegate",
            title: "Func Delegate",
            summary: "Use built-in generic delegates that return values.",
            what: "Func delegates represent methods that return a value.",
            why: "They reduce the need to declare simple custom delegate types.",
            example: `Func<int, int, int> add =
    (a, b) => a + b;

Console.WriteLine(add(2, 3));`,
            mistake: "Forgetting that the last generic type parameter of Func is the return type.",
            correction: "Func<T1, T2, TResult> uses the final type parameter as the return type.",
            labPrompt: "Create a Func delegate that multiplies two integers.",
            question: "What does the final generic parameter of Func represent?",
            answer: "The return type.",
            distractors: ["First parameter", "Class name", "Namespace"],
          }),
        ],
      },
      {
        slug: "anonymous-methods",
        title: "Anonymous Methods",
        lessons: [
          lesson({
            slug: "anonymous-method",
            title: "Anonymous Methods",
            summary: "Create unnamed methods using delegate syntax.",
            what: "An anonymous method is an unnamed block of code assigned to a compatible delegate.",
            why: "It can be useful for short callback logic.",
            example: `Action message = delegate
{
    Console.WriteLine("Hello");
};

message();`,
            mistake: "Giving an anonymous method a normal method name.",
            correction: "Anonymous methods do not have a declared method name.",
            labPrompt: "Create an anonymous method that prints a message.",
            question: "Does an anonymous method have a normal method name?",
            answer: "No.",
            distractors: ["Always", "Only in classes", "Only in interfaces"],
          }),
        ],
      },
    ],
  },

  {
    slug: "csharp-unsafe-and-multithreading",
    title: "Unsafe Code and Multithreading",
    description:
      "Learn pointers, unsafe code, threads, thread lifecycle, and thread management.",
    topics: [
      {
        slug: "unsafe-code",
        title: "Unsafe Code",
        lessons: [
          lesson({
            slug: "unsafe-block",
            title: "unsafe Blocks",
            summary: "Understand code that permits pointer operations.",
            what: "The unsafe keyword allows code containing operations that are not checked by the normal C# safety system.",
            why: "Unsafe code is used in specialized scenarios requiring direct memory access.",
            example: `unsafe
{
    int value = 10;
    int* pointer = &value;

    Console.WriteLine(*pointer);
}`,
            mistake: "Using unsafe code when normal managed code is sufficient.",
            correction: "Prefer safe managed C# unless direct memory access is specifically required.",
            labPrompt: "Create a simple pointer example in an unsafe block.",
            question: "What keyword enables an unsafe context?",
            answer: "unsafe",
            distractors: ["pointer", "raw", "memory"],
          }),
          lesson({
            slug: "pointers",
            title: "Pointers",
            summary: "Understand basic pointer operations.",
            what: "A pointer stores a memory address and can be dereferenced to access the value at that address.",
            why: "Pointers provide low-level memory access for specialized programming tasks.",
            example: `unsafe
{
    int value = 42;
    int* p = &value;

    Console.WriteLine(*p);
}`,
            mistake: "Confusing a pointer with an ordinary reference variable.",
            correction: "Pointers directly work with memory addresses and require an unsafe context.",
            labPrompt: "Experiment with a pointer to an integer.",
            question: "What does *p do in this example?",
            answer: "Dereferences the pointer.",
            distractors: ["Creates a class", "Declares a namespace", "Starts a thread"],
          }),
        ],
      },
      {
        slug: "multithreading",
        title: "Multithreading",
        lessons: [
          lesson({
            slug: "thread-basics",
            title: "Thread Basics",
            summary: "Understand threads and concurrent execution.",
            what: "A thread is an execution path within a process.",
            why: "Multiple threads can allow different work to progress concurrently.",
            example: `using System.Threading;

Thread thread = new Thread(() =>
{
    Console.WriteLine("Worker thread");
});

thread.Start();`,
            mistake: "Assuming starting a thread makes all operations automatically safe.",
            correction: "Shared data may require synchronization when accessed concurrently.",
            labPrompt: "Create and start a worker thread.",
            question: "What does a thread represent?",
            answer: "An execution path.",
            distractors: ["A data type", "A namespace", "A file"],
          }),
          lesson({
            slug: "thread-lifecycle",
            title: "Thread Lifecycle",
            summary: "Understand basic thread states and management.",
            what: "A thread is created, started, executes work, and eventually finishes.",
            why: "Understanding the lifecycle helps when coordinating concurrent tasks.",
            example: `Thread thread = new Thread(() =>
{
    Console.WriteLine("Working...");
});

thread.Start();
thread.Join();`,
            mistake: "Assuming Join starts a thread.",
            correction: "Start begins execution; Join waits for the thread to finish.",
            labPrompt: "Start a thread and wait for it using Join.",
            question: "What does Thread.Join do?",
            answer: "Waits for the thread to finish.",
            distractors: ["Starts the thread", "Deletes the thread", "Creates a class"],
          }),
          lesson({
            slug: "managing-threads",
            title: "Managing Threads",
            summary: "Control and coordinate thread execution.",
            what: "Thread provides methods and properties for starting, waiting, and working with threads.",
            why: "Thread management is important when coordinating concurrent operations.",
            example: `Thread worker = new Thread(() =>
{
    for (int i = 0; i < 3; i++)
        Console.WriteLine(i);
});

worker.Start();
worker.Join();`,
            mistake: "Creating many threads without considering resource usage.",
            correction: "Use threads carefully and consider higher-level concurrency tools such as Task when appropriate.",
            labPrompt: "Create two worker threads and observe their execution.",
            question: "Which method starts a Thread?",
            answer: "Start",
            distractors: ["Run", "Execute", "BeginThread"],
          }),
        ],
      },
    ],
  },
];