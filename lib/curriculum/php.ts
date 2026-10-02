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
      "The PHP code is using the syntax incorrectly or working with the wrong data type, condition, function, or database operation.",
    hint:
      input.hint ??
      "Check the PHP syntax carefully and compare the variable, condition, function, or operation with the expected form.",
    labCode: input.labCode ?? input.example,
    output: input.output ?? "Example output appears here.",
  };
}

export const phpModules: LocalModuleSeed[] = [
  {
    slug: "php-foundations",
    title: "PHP foundations",
    description:
      "Learn what PHP is, how it works, its basic syntax, variables, constants, data types, and operators.",
    topics: [
      {
        slug: "php-introduction",
        title: "Introduction to PHP",
        description:
          "Understand PHP, server-side scripting, its history, features, and basic syntax.",
        lessons: [
          lesson({
            slug: "what-is-php",
            title: "What is PHP?",
            summary:
              "Understand PHP and why it is used for web development.",
            what:
              "PHP stands for PHP: Hypertext Preprocessor. It is an open-source general-purpose scripting language especially suited for web development and can be embedded into HTML.",
            why:
              "PHP is commonly used to create dynamic web pages and server-side applications. It can process data on the server before sending the result to the browser.",
            example:
              "<?php\n$name = \"Bhaskara\";\necho \"Hello $name\";\n?>",
            output: "Hello Bhaskara",
            mistake:
              "<?php\nname = \"Bhaskara\";\necho \"Hello $name\";\n?>",
            mistakeExplanation:
              "PHP variables must begin with the $ symbol. Without it, PHP does not recognize name as a variable.",
            correction:
              "<?php\n$name = \"Bhaskara\";\necho \"Hello $name\";\n?>",
            labPrompt:
              "Create a PHP program that stores your name in a variable and prints a greeting.",
            question: "What does PHP stand for?",
            answer: "PHP stands for PHP: Hypertext Preprocessor.",
            distractors: [
              "Personal Home Page only",
              "Programming Hypertext Processor",
            ],
          }),

          lesson({
            slug: "php-history",
            title: "History of PHP",
            summary:
              "Learn the basic history and evolution of PHP.",
            what:
              "PHP was originally created by Rasmus Lerdorf in 1993 and released in 1995. It was originally associated with the name Personal Home Page and later became the recursive acronym PHP: Hypertext Preprocessor.",
            why:
              "Knowing the history gives context for why PHP became widely used for server-side web development.",
            example:
              "<?php\n\necho \"PHP: Hypertext Preprocessor\";\n\n?>",
            output: "PHP: Hypertext Preprocessor",
            mistake:
              "<?\necho \"PHP\";\n?>",
            mistakeExplanation:
              "The source material introduces PHP code using the standard <?php opening tag. Using an incomplete opening tag can cause the code not to be interpreted as PHP.",
            correction:
              "<?php\necho \"PHP\";\n?>",
            labPrompt:
              "Write a PHP program that prints the full meaning of PHP.",
            question:
              "Who originally created PHP?",
            answer: "Rasmus Lerdorf.",
            distractors: [
              "James Gosling",
              "Dennis Ritchie",
            ],
          }),

          lesson({
            slug: "php-features",
            title: "Features of PHP",
            summary:
              "Explore the major features that make PHP useful for web development.",
            what:
              "The source describes PHP as simple, flexible, object-oriented, interpreted, efficient, fast, free and open-source, partially case-sensitive, platform independent, loosely typed, and supported by an active community.",
            why:
              "Understanding these features helps explain why PHP has been widely used for web applications.",
            example:
              "<?php\n$name = \"PHP\";\n$version = 8;\necho $name;\necho $version;\n?>",
            output: "PHP8",
            mistake:
              "<?php\nstring $name = \"PHP\";\n?>",
            mistakeExplanation:
              "PHP variables do not require an explicit data type declaration before the variable name.",
            correction:
              "<?php\n$name = \"PHP\";\n?>",
            labPrompt:
              "Create two PHP variables without declaring their data types and print them.",
            question:
              "Is PHP loosely typed?",
            answer:
              "Yes. PHP allows variables to be declared without explicitly specifying their data type.",
            distractors: [
              "No, every variable must have a declared type",
              "Only arrays can be loosely typed",
            ],
          }),

          lesson({
            slug: "php-basic-syntax",
            title: "Basic PHP syntax",
            summary:
              "Learn PHP tags, statements, semicolons, and embedding PHP in HTML.",
            what:
              "PHP code is placed between the <?php and ?> tags. PHP statements normally end with a semicolon.",
            why:
              "Correct syntax is necessary for PHP code to be recognized and executed by the server.",
            example:
              "<?php\n$message = \"Hello PHP\";\necho $message;\n?>",
            output: "Hello PHP",
            mistake:
              "<?php\n$message = \"Hello PHP\"\necho $message;\n?>",
            mistakeExplanation:
              "The assignment statement is missing its semicolon.",
            correction:
              "<?php\n$message = \"Hello PHP\";\necho $message;\n?>",
            labPrompt:
              "Write a PHP program that creates a message variable and prints it.",
            question:
              "Which symbol normally ends a PHP statement?",
            answer: "A semicolon (;).",
            distractors: [
              "A colon (:)",
              "A comma (,)",
            ],
          }),
        ],
      },

      {
        slug: "php-variables-data-types",
        title: "Variables and data types",
        description:
          "Learn PHP variables, constants, scalar types, compound types, and special types.",
        lessons: [
          lesson({
            slug: "php-variables-and-constants",
            title: "Variables and constants",
            summary:
              "Store values using PHP variables and understand constants.",
            what:
              "PHP variables store values and are written with a $ prefix. The syllabus also includes variables and constants as fundamental PHP concepts.",
            why:
              "Variables allow a program to store information and use it later in calculations, conditions, output, and database operations.",
            example:
              "<?php\n$name = \"Maya\";\nage = 18;\necho $name;\n?>",
            output: "Maya",
            mistake:
              "<?php\n$name = \"Maya\";\nage = 18;\necho $name;\n?>",
            mistakeExplanation:
              "The variable age is missing the $ prefix.",
            correction:
              "<?php\n$name = \"Maya\";\n$age = 18;\necho $name;\n?>",
            labPrompt:
              "Create variables for your name and age and print both values.",
            question:
              "What symbol is used before a PHP variable name?",
            answer: "$",
            distractors: [
              "#",
              "@",
            ],
          }),

          lesson({
            slug: "php-data-types",
            title: "PHP data types",
            summary:
              "Understand boolean, integer, float, string, array, object, resource, and NULL.",
            what:
              "The source groups PHP data types into scalar types, compound types, and special types. Scalar types include boolean, integer, float, and string. Compound types include array and object. Special types include resource and NULL.",
            why:
              "Different values require different kinds of data representation. Understanding data types helps you choose and manipulate values correctly.",
            example:
              "<?php\n$active = true;\n$count = 10;\n$price = 19.34;\n$name = \"PHP\";\n?>",
            output: "Variables contain boolean, integer, float, and string values.",
            mistake:
              "<?php\n$count = \"10\";\n$count = $count + \"PHP\";\n?>",
            mistakeExplanation:
              "The operation mixes incompatible values. The value should be appropriate for the operation being performed.",
            correction:
              "<?php\n$count = 10;\n$count = $count + 5;\n?>",
            labPrompt:
              "Create one variable for each of a boolean, integer, float, and string value.",
            question:
              "Which PHP data type stores whole numbers?",
            answer: "Integer.",
            distractors: [
              "Float",
              "String",
            ],
          }),

          lesson({
            slug: "php-boolean-integer-float",
            title: "Boolean, integer, and float",
            summary:
              "Work with true/false values, whole numbers, and decimal numbers.",
            what:
              "Boolean values represent TRUE or FALSE. Integers represent whole numbers, while floating-point values represent numbers with decimal points.",
            why:
              "These types are frequently used in conditions, calculations, counters, prices, and other program logic.",
            example:
              "<?php\n$isStudent = true;\n$age = 18;\n$percentage = 82.5;\necho $age;\necho $percentage;\n?>",
            output: "1882.5",
            mistake:
              "<?php\n$age = 18.5;\n?>",
            mistakeExplanation:
              "A value containing a decimal point is a floating-point value rather than a whole-number integer.",
            correction:
              "<?php\n$age = 18;\n?>",
            labPrompt:
              "Create variables for your age and percentage and print them.",
            question:
              "Which type is normally used for a number containing a decimal point?",
            answer: "Float.",
            distractors: [
              "Integer",
              "Boolean",
            ],
          }),

          lesson({
            slug: "php-string-array-object-null",
            title: "String, array, object, resource, and NULL",
            summary:
              "Understand PHP's remaining basic data types.",
            what:
              "Strings hold text. Arrays hold multiple values. Objects are instances of classes. Resources represent references to external resources such as database connections. NULL represents a variable with no value.",
            why:
              "These types appear throughout PHP programs, especially when handling collections, objects, files, and databases.",
            example:
              "<?php\n$name = \"PHP\";\n$items = array(\"A\", \"B\");\n$value = NULL;\necho $name;\n?>",
            output: "PHP",
            mistake:
              "<?php\n$value = null;\necho $value;\n?>",
            mistakeExplanation:
              "NULL represents the absence of a value, so echoing it does not produce normal text output.",
            correction:
              "<?php\n$value = \"PHP\";\necho $value;\n?>",
            labPrompt:
              "Create a string, an array, and a NULL variable in PHP.",
            question:
              "What does NULL represent in PHP?",
            answer: "A variable with no value.",
            distractors: [
              "A boolean TRUE value",
              "A decimal number",
            ],
          }),
        ],
      },

      {
        slug: "php-operators",
        title: "Operators and expressions",
        description:
          "Learn arithmetic, assignment, comparison, logical, string, bitwise, and other PHP operators.",
        lessons: [
          lesson({
            slug: "php-arithmetic-operators",
            title: "Arithmetic operators",
            summary:
              "Perform mathematical calculations in PHP.",
            what:
              "PHP arithmetic operators include +, -, *, /, %, and ** for addition, subtraction, multiplication, division, modulus, and exponentiation.",
            why:
              "Arithmetic operations are required for calculations such as totals, averages, prices, scores, and counters.",
            example:
              "<?php\n$a = 10;\n$b = 3;\necho $a + $b;\necho $a % $b;\n?>",
            output: "113",
            mistake:
              "<?php\n$a = 10;\n$b = 3;\necho $a % $b;\n?>",
            mistakeExplanation:
              "The modulus operator returns the remainder, not the quotient.",
            correction:
              "<?php\n$a = 10;\n$b = 3;\necho $a / $b;\n?>",
            labPrompt:
              "Calculate the sum, difference, product, and remainder of two numbers.",
            question:
              "Which operator returns the remainder?",
            answer: "%",
            distractors: [
              "/",
              "**",
            ],
          }),

          lesson({
            slug: "php-assignment-operators",
            title: "Assignment operators",
            summary:
              "Assign and update values using PHP assignment operators.",
            what:
              "The assignment operator = assigns a value. Compound operators such as +=, -=, *=, /=, and %= perform an operation and assign the result back to the variable.",
            why:
              "Assignment operators make it easier to update counters, totals, and other changing values.",
            example:
              "<?php\n$total = 10;\n$total += 5;\necho $total;\n?>",
            output: "15",
            mistake:
              "<?php\n$total = 10;\n$total + 5;\necho $total;\n?>",
            mistakeExplanation:
              "The + operator calculates a value but does not assign it back to $total.",
            correction:
              "<?php\n$total = 10;\n$total += 5;\necho $total;\n?>",
            labPrompt:
              "Create a variable with value 20 and increase it by 10 using a compound assignment operator.",
            question:
              "What does += do?",
            answer:
              "It adds a value to a variable and assigns the result back to that variable.",
            distractors: [
              "It compares two values",
              "It divides a variable without changing it",
            ],
          }),

          lesson({
            slug: "php-comparison-operators",
            title: "Comparison operators",
            summary:
              "Compare PHP values using operators such as ==, ===, !=, <, and >.",
            what:
              "Comparison operators compare values and produce TRUE or FALSE. PHP includes ==, ===, !=, !==, <, >, <=, >=, and the spaceship operator.",
            why:
              "Comparisons are the foundation of conditions and decision-making in PHP.",
            example:
              "<?php\n$age = 20;\nif ($age >= 18) {\n    echo \"Adult\";\n}\n?>",
            output: "Adult",
            mistake:
              "<?php\n$age = 20;\nif ($age = 18) {\n    echo \"Adult\";\n}\n?>",
            mistakeExplanation:
              "The single = operator assigns a value. A comparison requires a comparison operator such as == or >=.",
            correction:
              "<?php\n$age = 20;\nif ($age >= 18) {\n    echo \"Adult\";\n}\n?>",
            labPrompt:
              "Check whether a number is greater than or equal to 18.",
            question:
              "Which operator checks whether values are equal and of the same type?",
            answer: "===",
            distractors: [
              "=",
              "!=",
            ],
          }),

          lesson({
            slug: "php-logical-operators",
            title: "Logical operators",
            summary:
              "Combine multiple conditions using logical operators.",
            what:
              "PHP provides logical operators such as and, or, xor, !, &&, and || for combining or reversing conditions.",
            why:
              "Real decisions often depend on more than one condition, such as checking both age and status.",
            example:
              "<?php\n$age = 20;\n$active = true;\nif ($age >= 18 && $active) {\n    echo \"Allowed\";\n}\n?>",
            output: "Allowed",
            mistake:
              "<?php\n$age = 20;\n$active = true;\nif ($age >= 18 & $active) {\n    echo \"Allowed\";\n}\n?>",
            mistakeExplanation:
              "The single & operator is a bitwise operator. The logical AND operator used here is &&.",
            correction:
              "<?php\n$age = 20;\n$active = true;\nif ($age >= 18 && $active) {\n    echo \"Allowed\";\n}\n?>",
            labPrompt:
              "Write a condition that is true only when a user is at least 18 and active.",
            question:
              "Which operator represents logical AND?",
            answer: "&&",
            distractors: [
              "||",
              "!",
            ],
          }),

          lesson({
            slug: "php-string-operators",
            title: "String operators",
            summary:
              "Join strings using PHP's concatenation operators.",
            what:
              "PHP uses the dot operator . for string concatenation and .= for concatenation followed by assignment.",
            why:
              "Applications frequently need to combine names, messages, labels, and other pieces of text.",
            example:
              "<?php\n$first = \"Hello\";\n$second = \" PHP\";\necho $first . $second;\n?>",
            output: "Hello PHP",
            mistake:
              "<?php\n$first = \"Hello\";\n$second = \" PHP\";\necho $first + $second;\n?>",
            mistakeExplanation:
              "The + operator is used for arithmetic. PHP uses . for string concatenation.",
            correction:
              "<?php\n$first = \"Hello\";\n$second = \" PHP\";\necho $first . $second;\n?>",
            labPrompt:
              "Create two strings and concatenate them into one sentence.",
            question:
              "Which operator concatenates strings in PHP?",
            answer: ".",
            distractors: [
              "+",
              "&",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "php-decision-making",
    title: "Decision making and arrays",
    description:
      "Control program flow with conditions, loops, jumping statements, and arrays.",
    topics: [
      {
        slug: "php-conditionals",
        title: "Conditional statements",
        description:
          "Use if, if-else, elseif, switch, and conditional operators.",
        lessons: [
          lesson({
            slug: "php-if-statement",
            title: "if statement",
            summary:
              "Execute code only when a condition is true.",
            what:
              "The if statement evaluates a condition. If the condition is TRUE, the code inside the if block is executed.",
            why:
              "Programs need to make decisions based on values and conditions.",
            example:
              "<?php\n$x = 12;\nif ($x > 0) {\n    echo \"The number is positive\";\n}\n?>",
            output: "The number is positive",
            mistake:
              "<?php\n$x = 12;\nif $x > 0 {\n    echo \"Positive\";\n}\n?>",
            mistakeExplanation:
              "The condition of an if statement must be enclosed in parentheses.",
            correction:
              "<?php\n$x = 12;\nif ($x > 0) {\n    echo \"Positive\";\n}\n?>",
            labPrompt:
              "Write an if statement that prints 'Adult' when age is 18 or greater.",
            question:
              "When does the code inside an if block execute?",
            answer: "When its condition evaluates to TRUE.",
            distractors: [
              "Always",
              "Only when the condition is FALSE",
            ],
          }),

          lesson({
            slug: "php-if-else",
            title: "if...else statement",
            summary:
              "Choose between two possible blocks of code.",
            what:
              "The if...else statement executes one block when the condition is TRUE and another block when it is FALSE.",
            why:
              "Many real decisions have two possible outcomes, such as pass or fail.",
            example:
              "<?php\n$marks = 45;\nif ($marks >= 40) {\n    echo \"Pass\";\n} else {\n    echo \"Fail\";\n}\n?>",
            output: "Pass",
            mistake:
              "<?php\n$marks = 45;\nif ($marks >= 40) {\n    echo \"Pass\";\n}\nelse ($marks < 40) {\n    echo \"Fail\";\n}\n?>",
            mistakeExplanation:
              "else does not take a condition. If another condition is required, use elseif.",
            correction:
              "<?php\n$marks = 45;\nif ($marks >= 40) {\n    echo \"Pass\";\n} else {\n    echo \"Fail\";\n}\n?>",
            labPrompt:
              "Create a program that prints Pass or Fail based on marks.",
            question:
              "What happens when the if condition is FALSE?",
            answer: "The else block executes.",
            distractors: [
              "Both blocks execute",
              "The program always stops",
            ],
          }),

          lesson({
            slug: "php-elseif",
            title: "Multiple conditions with elseif",
            summary:
              "Handle more than two possible conditions.",
            what:
              "The elseif statement allows PHP to check additional conditions when the previous if condition is false.",
            why:
              "Programs often need to handle several ranges or categories instead of only two outcomes.",
            example:
              "<?php\n$marks = 75;\nif ($marks >= 90) {\n    echo \"A\";\n} elseif ($marks >= 60) {\n    echo \"B\";\n} else {\n    echo \"C\";\n}\n?>",
            output: "B",
            mistake:
              "<?php\n$marks = 75;\nif ($marks >= 90) {\n    echo \"A\";\n} else if ($marks >= 60) {\n    echo \"B\";\n}\n?>",
            mistakeExplanation:
              "The source curriculum specifically presents elseif as part of PHP decision making. Use the PHP elseif form when following this structure.",
            correction:
              "<?php\n$marks = 75;\nif ($marks >= 90) {\n    echo \"A\";\n} elseif ($marks >= 60) {\n    echo \"B\";\n} else {\n    echo \"C\";\n}\n?>",
            labPrompt:
              "Create a grade program using if, elseif, and else.",
            question:
              "When is an elseif condition checked?",
            answer:
              "When the preceding if or elseif condition was false.",
            distractors: [
              "Before the first if condition",
              "Only after the else block",
            ],
          }),

          lesson({
            slug: "php-switch",
            title: "switch statement",
            summary:
              "Select one case from several possible values.",
            what:
              "The switch statement evaluates an expression and compares it with case values. break prevents execution from continuing into later cases, while default handles unmatched values.",
            why:
              "Switch is useful when one value needs to be compared against several possible cases.",
            example:
              "<?php\n$month = \"February\";\nswitch ($month) {\n    case \"January\":\n        echo \"Its January\";\n        break;\n    case \"February\":\n        echo \"Its February\";\n        break;\n    default:\n        echo \"Doesn't exist\";\n}\n?>",
            output: "Its February",
            mistake:
              "<?php\n$month = \"February\";\nswitch ($month) {\n    case \"February\":\n        echo \"Its February\";\n    case \"March\":\n        echo \"Its March\";\n}\n?>",
            mistakeExplanation:
              "Without break, execution can continue into the following case.",
            correction:
              "<?php\n$month = \"February\";\nswitch ($month) {\n    case \"February\":\n        echo \"Its February\";\n        break;\n    case \"March\":\n        echo \"Its March\";\n        break;\n}\n?>",
            labPrompt:
              "Create a switch statement that prints a message for three different days.",
            question:
              "What is the purpose of break in a switch statement?",
            answer:
              "It stops control from continuing into the next case.",
            distractors: [
              "It repeats the case",
              "It creates a new case",
            ],
          }),
        ],
      },

      {
        slug: "php-loops",
        title: "Loops and jumping statements",
        description:
          "Repeat code with while, do-while, for, foreach, and control flow statements.",
        lessons: [
          lesson({
            slug: "php-while-loop",
            title: "while loop",
            summary:
              "Repeat a block while a condition remains true.",
            what:
              "A while loop repeatedly executes its block as long as its condition evaluates to TRUE.",
            why:
              "Loops avoid writing the same code repeatedly when an operation needs to happen multiple times.",
            example:
              "<?php\n$i = 1;\nwhile ($i <= 3) {\n    echo $i;\n    $i++;\n}\n?>",
            output: "123",
            mistake:
              "<?php\n$i = 1;\nwhile ($i <= 3) {\n    echo $i;\n}\n?>",
            mistakeExplanation:
              "The loop variable never changes, so the condition remains true and the loop does not progress.",
            correction:
              "<?php\n$i = 1;\nwhile ($i <= 3) {\n    echo $i;\n    $i++;\n}\n?>",
            labPrompt:
              "Print the numbers 1 to 5 using a while loop.",
            question:
              "When does a while loop stop?",
            answer:
              "When its condition becomes FALSE.",
            distractors: [
              "After exactly one iteration",
              "Only when break is used",
            ],
          }),

          lesson({
            slug: "php-do-while-loop",
            title: "do...while loop",
            summary:
              "Execute a loop body at least once before checking the condition.",
            what:
              "A do...while loop executes its block first and checks the condition afterward.",
            why:
              "It is useful when the code must execute at least once before the condition is evaluated.",
            example:
              "<?php\n$i = 1;\ndo {\n    echo $i;\n    $i++;\n} while ($i <= 3);\n?>",
            output: "123",
            mistake:
              "<?php\n$i = 1;\nwhile ($i <= 0) {\n    echo $i;\n}\n?>",
            mistakeExplanation:
              "A while loop checks the condition before entering the body. A do...while loop is used when the body must execute once first.",
            correction:
              "<?php\n$i = 1;\ndo {\n    echo $i;\n    $i++;\n} while ($i <= 0);\n?>",
            labPrompt:
              "Use a do...while loop to print a value at least once.",
            question:
              "When is the condition of a do...while loop checked?",
            answer: "After the loop body executes.",
            distractors: [
              "Before the loop body",
              "Only after the program ends",
            ],
          }),

          lesson({
            slug: "php-for-loop",
            title: "for loop",
            summary:
              "Repeat code using initialization, condition, and update expressions.",
            what:
              "A for loop combines initialization, a condition, and an update expression in one loop structure.",
            why:
              "For loops are convenient when the number of repetitions is controlled by a counter.",
            example:
              "<?php\nfor ($i = 1; $i <= 5; $i++) {\n    echo $i;\n}\n?>",
            output: "12345",
            mistake:
              "<?php\nfor ($i = 1; $i <= 5; ) {\n    echo $i;\n}\n?>",
            mistakeExplanation:
              "The counter is never updated, so the loop does not progress.",
            correction:
              "<?php\nfor ($i = 1; $i <= 5; $i++) {\n    echo $i;\n}\n?>",
            labPrompt:
              "Print numbers from 1 to 10 using a for loop.",
            question:
              "Which part of a for loop changes the counter after each iteration?",
            answer: "The update expression.",
            distractors: [
              "The condition",
              "The initialization only",
            ],
          }),

          lesson({
            slug: "php-foreach-loop",
            title: "foreach loop",
            summary:
              "Iterate directly over the values of an array.",
            what:
              "The foreach loop is designed to iterate through array elements without manually managing an index.",
            why:
              "It makes array traversal simple and readable.",
            example:
              "<?php\n$colors = array(\"Red\", \"Blue\", \"Green\");\nforeach ($colors as $color) {\n    echo $color;\n}\n?>",
            output: "RedBlueGreen",
            mistake:
              "<?php\n$colors = array(\"Red\", \"Blue\", \"Green\");\nforeach ($colors) {\n    echo $colors;\n}\n?>",
            mistakeExplanation:
              "foreach requires the array and a variable that receives each element.",
            correction:
              "<?php\n$colors = array(\"Red\", \"Blue\", \"Green\");\nforeach ($colors as $color) {\n    echo $color;\n}\n?>",
            labPrompt:
              "Create an array of three subjects and print each subject using foreach.",
            question:
              "What is foreach mainly used for?",
            answer: "Iterating through array elements.",
            distractors: [
              "Creating a database",
              "Declaring a function",
            ],
          }),

          lesson({
            slug: "php-break-continue-return",
            title: "Jumping statements",
            summary:
              "Control loop and function execution using break, continue, exit, die, and return.",
            what:
              "PHP provides jumping statements such as break, continue, exit, die, and return to change the normal flow of execution.",
            why:
              "These statements allow programs to stop, skip, or return from parts of execution when required.",
            example:
              "<?php\nfor ($i = 1; $i <= 5; $i++) {\n    if ($i == 3) {\n        continue;\n    }\n    echo $i;\n}\n?>",
            output: "1245",
            mistake:
              "<?php\nfor ($i = 1; $i <= 5; $i++) {\n    if ($i == 3) {\n        break;\n    }\n    echo $i;\n}\n?>",
            mistakeExplanation:
              "break stops the loop completely, while continue skips the current iteration and continues with the next one.",
            correction:
              "<?php\nfor ($i = 1; $i <= 5; $i++) {\n    if ($i == 3) {\n        continue;\n    }\n    echo $i;\n}\n?>",
            labPrompt:
              "Print numbers 1 to 5 but skip number 3 using continue.",
            question:
              "What does continue do inside a loop?",
            answer:
              "It skips the current iteration and continues with the next iteration.",
            distractors: [
              "It permanently stops the loop",
              "It exits the PHP program",
            ],
          }),
        ],
      },

      {
        slug: "php-arrays",
        title: "Arrays",
        description:
          "Store and access collections using indexed, associative, and multidimensional arrays.",
        lessons: [
          lesson({
            slug: "php-indexed-arrays",
            title: "Indexed arrays",
            summary:
              "Store multiple values using numeric indexes.",
            what:
              "Indexed or numeric arrays store values using numeric indexes. By default, the index starts at zero.",
            why:
              "Arrays allow many related values to be stored in a single variable instead of creating separate variables.",
            example:
              "<?php\n$names = array(\"Zack\", \"Anthony\", \"Ram\");\necho $names[0];\necho $names[2];\n?>",
            output: "ZackRam",
            mistake:
              "<?php\n$names = array(\"Zack\", \"Anthony\", \"Ram\");\necho $names[3];\n?>",
            mistakeExplanation:
              "The array has indexes 0, 1, and 2. Index 3 does not exist.",
            correction:
              "<?php\n$names = array(\"Zack\", \"Anthony\", \"Ram\");\necho $names[2];\n?>",
            labPrompt:
              "Create an indexed array containing three names and print the first and third names.",
            question:
              "What is the default starting index of a PHP indexed array?",
            answer: "0",
            distractors: [
              "1",
              "-1",
            ],
          }),

          lesson({
            slug: "php-associative-arrays",
            title: "Associative arrays",
            summary:
              "Store values using meaningful string keys.",
            what:
              "Associative arrays use user-defined string keys instead of numeric indexes.",
            why:
              "Named keys make data easier to understand and access when numeric indexes do not describe the meaning of the data.",
            example:
              "<?php\n$student = array(\n    \"name\" => \"Maya\",\n    \"grade\" => \"A\"\n);\necho $student[\"name\"];\n?>",
            output: "Maya",
            mistake:
              "<?php\n$student = array(\n    \"name\" => \"Maya\",\n    \"grade\" => \"A\"\n);\necho $student[0];\n?>",
            mistakeExplanation:
              "This array uses string keys, so the value should be accessed using the key name.",
            correction:
              "<?php\n$student = array(\n    \"name\" => \"Maya\",\n    \"grade\" => \"A\"\n);\necho $student[\"name\"];\n?>",
            labPrompt:
              "Create an associative array containing a student's name, age, and grade.",
            question:
              "What is used as the key in an associative array?",
            answer: "A user-defined key, commonly a string.",
            distractors: [
              "Only floating-point numbers",
              "Only boolean values",
            ],
          }),

          lesson({
            slug: "php-multidimensional-arrays",
            title: "Multidimensional arrays",
            summary:
              "Store arrays inside arrays.",
            what:
              "A multidimensional array is an array of arrays. Each element can contain another array and can be accessed through multiple indexes or keys.",
            why:
              "Multidimensional arrays are useful for representing structured data such as students with multiple properties.",
            example:
              "<?php\n$student = array(\n    \"name\" => \"Maya\",\n    \"contact\" => array(\n        \"email\" => \"maya@example.com\"\n    )\n);\necho $student[\"contact\"][\"email\"];\n?>",
            output: "maya@example.com",
            mistake:
              "<?php\n$student = array(\n    \"contact\" => array(\n        \"email\" => \"maya@example.com\"\n    )\n);\necho $student[\"email\"];\n?>",
            mistakeExplanation:
              "The email key is inside the contact array, so both levels must be accessed.",
            correction:
              "<?php\n$student = array(\n    \"contact\" => array(\n        \"email\" => \"maya@example.com\"\n    )\n);\necho $student[\"contact\"][\"email\"];\n?>",
            labPrompt:
              "Create a multidimensional array containing a student's name and contact details.",
            question:
              "What is a multidimensional array?",
            answer: "An array that contains other arrays.",
            distractors: [
              "An array that contains only one value",
              "A database table",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "php-strings-and-regex",
    title: "Strings and regular expressions",
    description:
      "Create, search, format, replace, split, and validate strings using PHP string functions and regular expressions.",
    topics: [
      {
        slug: "php-strings",
        title: "String handling",
        description:
          "Work with strings and common PHP string library functions.",
        lessons: [
          lesson({
            slug: "php-string-basics",
            title: "Creating and accessing strings",
            summary:
              "Create PHP strings using single quotes, double quotes, and heredoc syntax.",
            what:
              "PHP strings can be created using single quotes, double quotes, or heredoc syntax.",
            why:
              "Text processing is a major part of web applications, including names, messages, forms, and page content.",
            example:
              "<?php\n$name = \"John\";\necho \"Hello $name\";\necho 'Hello $name';\n?>",
            output:
              "Hello John\nHello $name",
            mistake:
              "<?php\n$name = John;\necho $name;\n?>",
            mistakeExplanation:
              "Text values must be enclosed in quotes.",
            correction:
              "<?php\n$name = \"John\";\necho $name;\n?>",
            labPrompt:
              "Create a string containing your name and print it using double quotes.",
            question:
              "What happens to a variable inside a double-quoted PHP string?",
            answer:
              "Its value can be interpreted and inserted into the string.",
            distractors: [
              "It is always printed literally",
              "It becomes an array",
            ],
          }),

          lesson({
            slug: "php-string-functions",
            title: "String library functions",
            summary:
              "Use strlen, strrev, strtolower, strtoupper, substr, strpos, and related functions.",
            what:
              "PHP provides string functions for measuring, reversing, changing case, extracting, searching, replacing, trimming, splitting, and joining strings.",
            why:
              "String functions simplify common text-processing tasks.",
            example:
              "<?php\n$str = \"Hello, World!\";\necho strlen($str);\necho strtolower($str);\n?>",
            output:
              "13\nhello, world!",
            mistake:
              "<?php\n$str = \"Hello\";\necho stringlen($str);\n?>",
            mistakeExplanation:
              "The correct PHP function name is strlen().",
            correction:
              "<?php\n$str = \"Hello\";\necho strlen($str);\n?>",
            labPrompt:
              "Use strlen, strtoupper, strtolower, and strrev on a string.",
            question:
              "Which function returns the length of a string?",
            answer: "strlen()",
            distractors: [
              "strlength()",
              "length()",
            ],
          }),

          lesson({
            slug: "php-search-replace-split",
            title: "Searching, replacing, splitting, and joining",
            summary:
              "Search and transform strings using strpos, str_replace, explode, and implode.",
            what:
              "strpos() searches for a substring, str_replace() replaces text, explode() splits a string into an array, and implode() joins array elements into a string.",
            why:
              "These functions are useful when processing user input, CSV-style data, and text content.",
            example:
              "<?php\n$str = \"apple,orange,banana\";\n$fruits = explode(\",\", $str);\necho implode(\" - \", $fruits);\n?>",
            output: "apple - orange - banana",
            mistake:
              "<?php\n$str = \"apple,orange,banana\";\n$fruits = implode(\",\", $str);\n?>",
            mistakeExplanation:
              "implode() joins array elements. A string should first be split into an array with explode() when that is the intended operation.",
            correction:
              "<?php\n$str = \"apple,orange,banana\";\n$fruits = explode(\",\", $str);\necho implode(\" - \", $fruits);\n?>",
            labPrompt:
              "Split a comma-separated list into an array and then join it using a hyphen.",
            question:
              "What does explode() do?",
            answer:
              "It splits a string into an array using a delimiter.",
            distractors: [
              "It joins an array",
              "It reverses a string",
            ],
          }),

          lesson({
            slug: "php-string-formatting",
            title: "String formatting",
            summary:
              "Format values using printf and sprintf.",
            what:
              "PHP formatting functions such as printf() and sprintf() use format specifiers such as %s, %d, %f, %c, %b, and %x.",
            why:
              "Formatted strings allow values of different types to be inserted into readable messages.",
            example:
              "<?php\n$name = \"John\";\n$age = 25;\nprintf(\"My name is %s and I am %d years old.\", $name, $age);\n?>",
            output:
              "My name is John and I am 25 years old.",
            mistake:
              "<?php\n$name = \"John\";\nprintf(\"My name is %d\", $name);\n?>",
            mistakeExplanation:
              "%d is used for decimal integers. A string value should use %s.",
            correction:
              "<?php\n$name = \"John\";\nprintf(\"My name is %s\", $name);\n?>",
            labPrompt:
              "Use printf to print your name and age in one formatted sentence.",
            question:
              "Which format specifier represents a string?",
            answer: "%s",
            distractors: [
              "%d",
              "%f",
            ],
          }),
        ],
      },

      {
        slug: "php-regular-expressions",
        title: "Regular expressions",
        description:
          "Match, search, replace, validate, extract, and tokenize text with regex.",
        lessons: [
          lesson({
            slug: "php-regex-basics",
            title: "Regular expressions",
            summary:
              "Understand regex patterns and their use in PHP.",
            what:
              "Regular expressions are sequences of characters that define search patterns. PHP provides regex functions through the PCRE library.",
            why:
              "Regex makes it possible to search, validate, extract, and replace text based on patterns.",
            example:
              "<?php\n$str = \"Hello, World!\";\nif (preg_match(\"/World/\", $str)) {\n    echo \"Pattern found!\";\n}\n?>",
            output: "Pattern found!",
            mistake:
              "<?php\n$str = \"Hello, World!\";\nif (preg_match(\"World\", $str)) {\n    echo \"Pattern found!\";\n}\n?>",
            mistakeExplanation:
              "The source uses regex delimiters around the pattern, such as /World/.",
            correction:
              "<?php\n$str = \"Hello, World!\";\nif (preg_match(\"/World/\", $str)) {\n    echo \"Pattern found!\";\n}\n?>",
            labPrompt:
              "Use preg_match() to check whether the word 'PHP' exists in a string.",
            question:
              "What is regex mainly used for?",
            answer:
              "Pattern matching and text processing.",
            distractors: [
              "Creating database tables",
              "Declaring PHP variables",
            ],
          }),

          lesson({
            slug: "php-preg-match",
            title: "preg_match and preg_match_all",
            summary:
              "Find one or multiple occurrences of a regex pattern.",
            what:
              "preg_match() checks whether a pattern exists, while preg_match_all() finds all occurrences of a pattern.",
            why:
              "Different applications need either a simple match check or all matching values.",
            example:
              "<?php\n$str = \"apple, orange, banana\";\npreg_match_all(\"/\\\\w+/\", $str, $matches);\nprint_r($matches);\n?>",
            output:
              "An array containing the matched words.",
            mistake:
              "<?php\n$str = \"apple, orange, banana\";\npreg_match_all(\"\\\\w+\", $str, $matches);\n?>",
            mistakeExplanation:
              "The regular expression pattern should be written with its delimiters.",
            correction:
              "<?php\n$str = \"apple, orange, banana\";\npreg_match_all(\"/\\\\w+/\", $str, $matches);\n?>",
            labPrompt:
              "Find all words in a sentence using preg_match_all().",
            question:
              "Which function finds all occurrences of a pattern?",
            answer: "preg_match_all()",
            distractors: [
              "preg_match()",
              "preg_find_all()",
            ],
          }),

          lesson({
            slug: "php-preg-replace",
            title: "Replacing text with preg_replace",
            summary:
              "Replace text that matches a regular expression.",
            what:
              "preg_replace() replaces portions of a string that match a specified regular expression pattern.",
            why:
              "Pattern-based replacement is useful when simple string replacement is not flexible enough.",
            example:
              "<?php\n$str = \"Hello, World!\";\n$newStr = preg_replace(\"/World/\", \"Universe\", $str);\necho $newStr;\n?>",
            output: "Hello, Universe!",
            mistake:
              "<?php\n$str = \"Hello, World!\";\n$newStr = preg_replace(\"World\", \"Universe\", $str);\necho $newStr;\n?>",
            mistakeExplanation:
              "The regex pattern should use its delimiters.",
            correction:
              "<?php\n$str = \"Hello, World!\";\n$newStr = preg_replace(\"/World/\", \"Universe\", $str);\necho $newStr;\n?>",
            labPrompt:
              "Replace every occurrence of 'PHP' with 'Programming' using preg_replace().",
            question:
              "Which function replaces regex matches?",
            answer: "preg_replace()",
            distractors: [
              "preg_match()",
              "str_replace_all()",
            ],
          }),

          lesson({
            slug: "php-regex-validation",
            title: "Regex validation and extraction",
            summary:
              "Use regular expressions to validate and extract structured text.",
            what:
              "Regular expressions can validate formats such as email addresses and extract structured information such as dates. They can also tokenize text using preg_split().",
            why:
              "Validation and extraction are common when processing form data and other user-provided text.",
            example:
              "<?php\n$email = \"user@example.com\";\nif (preg_match(\"/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/\", $email)) {\n    echo \"Valid email address!\";\n}\n?>",
            output: "Valid email address!",
            mistake:
              "<?php\n$email = \"not-an-email\";\nif (preg_match(\"/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/\", $email)) {\n    echo \"Valid email address!\";\n}\n?>",
            mistakeExplanation:
              "The pattern correctly rejects a value that does not match the expected email structure.",
            correction:
              "<?php\n$email = \"user@example.com\";\nif (preg_match(\"/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/\", $email)) {\n    echo \"Valid email address!\";\n}\n?>",
            labPrompt:
              "Use preg_match() to check whether an email address matches a valid email pattern.",
            question:
              "What is one practical use of regular expressions?",
            answer:
              "Validating input such as email addresses or phone numbers.",
            distractors: [
              "Starting a web server",
              "Creating PHP classes automatically",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "php-functions-and-input",
    title: "Functions and form data",
    description:
      "Create reusable PHP functions and process form data, cookies, and sessions.",
    topics: [
      {
        slug: "php-functions",
        title: "Functions",
        description:
          "Define, call, pass parameters to, return values from, and use different types of PHP functions.",
        lessons: [
          lesson({
            slug: "php-function-basics",
            title: "Defining and calling functions",
            summary:
              "Create reusable blocks of PHP code.",
            what:
              "A PHP function is a reusable block of code that performs a specific task. Functions are defined using the function keyword and called using their name.",
            why:
              "Functions reduce repeated code and make programs more organized and modular.",
            example:
              "<?php\nfunction greet($name) {\n    echo \"Hello, $name!\";\n}\n\ngreet(\"John\");\n?>",
            output: "Hello, John!",
            mistake:
              "<?php\nfunction greet($name) {\n    echo \"Hello, $name!\";\n}\n\ngreet;\n?>",
            mistakeExplanation:
              "A function must be called using parentheses.",
            correction:
              "<?php\nfunction greet($name) {\n    echo \"Hello, $name!\";\n}\n\ngreet(\"John\");\n?>",
            labPrompt:
              "Create a function that accepts a name and prints a greeting.",
            question:
              "Why are functions useful?",
            answer:
              "They organize reusable code and reduce repetition.",
            distractors: [
              "They automatically create databases",
              "They replace all variables",
            ],
          }),

          lesson({
            slug: "php-function-parameters",
            title: "Parameters and arguments",
            summary:
              "Pass values into functions.",
            what:
              "Parameters are variables defined by a function, while arguments are the actual values passed when the function is called.",
            why:
              "Parameters allow the same function to work with different input values.",
            example:
              "<?php\nfunction addNumbers($a, $b) {\n    return $a + $b;\n}\n\n$result = addNumbers(5, 10);\necho $result;\n?>",
            output: "15",
            mistake:
              "<?php\nfunction addNumbers($a, $b) {\n    return $a + $b;\n}\n\n$result = addNumbers(5);\necho $result;\n?>",
            mistakeExplanation:
              "The function expects two parameters, so both arguments should be supplied.",
            correction:
              "<?php\nfunction addNumbers($a, $b) {\n    return $a + $b;\n}\n\n$result = addNumbers(5, 10);\necho $result;\n?>",
            labPrompt:
              "Create a function that accepts two numbers and returns their sum.",
            question:
              "What is an argument?",
            answer:
              "The actual value supplied when a function is called.",
            distractors: [
              "The function name",
              "The return keyword",
            ],
          }),

          lesson({
            slug: "php-return-values",
            title: "Returning values from functions",
            summary:
              "Send a result back from a PHP function.",
            what:
              "The return statement sends a value from a function back to the code that called it.",
            why:
              "Returning values allows functions to calculate results that can be stored, printed, or used in other expressions.",
            example:
              "<?php\nfunction square($n) {\n    return $n * $n;\n}\n\n$result = square(5);\necho $result;\n?>",
            output: "25",
            mistake:
              "<?php\nfunction square($n) {\n    $n * $n;\n}\n\n$result = square(5);\necho $result;\n?>",
            mistakeExplanation:
              "The calculated value is not returned from the function.",
            correction:
              "<?php\nfunction square($n) {\n    return $n * $n;\n}\n\n$result = square(5);\necho $result;\n?>",
            labPrompt:
              "Create a function that returns the cube of a number.",
            question:
              "Which keyword sends a value back from a function?",
            answer: "return",
            distractors: [
              "send",
              "output",
            ],
          }),

          lesson({
            slug: "php-function-types",
            title: "Types of functions",
            summary:
              "Understand built-in, user-defined, anonymous, and recursive functions.",
            what:
              "The source describes built-in functions provided by PHP, user-defined functions created by programmers, anonymous functions without names, and recursive functions that call themselves.",
            why:
              "Different function types support different programming patterns and levels of reuse.",
            example:
              "<?php\n$multiply = function($x, $y) {\n    return $x * $y;\n};\n\necho $multiply(3, 4);\n?>",
            output: "12",
            mistake:
              "<?php\n$multiply = function($x, $y) {\n    return $x * $y;\n}\necho $multiply(3, 4);\n?>",
            mistakeExplanation:
              "The anonymous function assignment needs to be terminated with a semicolon.",
            correction:
              "<?php\n$multiply = function($x, $y) {\n    return $x * $y;\n};\n\necho $multiply(3, 4);\n?>",
            labPrompt:
              "Create an anonymous function that multiplies two numbers.",
            question:
              "What is an anonymous function?",
            answer:
              "A function without a name that can be assigned to a variable.",
            distractors: [
              "A function that cannot return a value",
              "A database function",
            ],
          }),

          lesson({
            slug: "php-recursive-functions",
            title: "Recursive functions",
            summary:
              "Create functions that call themselves.",
            what:
              "A recursive function calls itself to solve a problem by breaking it into smaller similar subproblems.",
            why:
              "Recursion can be useful for problems such as factorial calculations and other naturally recursive tasks.",
            example:
              "<?php\nfunction factorial($n) {\n    if ($n <= 1) {\n        return 1;\n    }\n    return $n * factorial($n - 1);\n}\n\necho factorial(5);\n?>",
            output: "120",
            mistake:
              "<?php\nfunction factorial($n) {\n    return $n * factorial($n - 1);\n}\n?>",
            mistakeExplanation:
              "A recursive function needs a base condition to stop further recursive calls.",
            correction:
              "<?php\nfunction factorial($n) {\n    if ($n <= 1) {\n        return 1;\n    }\n    return $n * factorial($n - 1);\n}\n?>",
            labPrompt:
              "Write a recursive function to calculate the factorial of 5.",
            question:
              "What prevents a recursive function from calling itself forever?",
            answer:
              "A base condition.",
            distractors: [
              "A foreach loop",
              "An array index",
            ],
          }),
        ],
      },

      {
        slug: "php-form-data",
        title: "Form data handling",
        description:
          "Work with GET, POST, REQUEST, cookies, and sessions.",
        lessons: [
          lesson({
            slug: "php-get",
            title: "$_GET",
            summary:
              "Read values submitted through URL query parameters.",
            what:
              "$_GET is a PHP superglobal used to access data sent through URL parameters.",
            why:
              "GET data is useful for requests where values are included in the URL, such as search parameters.",
            example:
              "<?php\n$name = $_GET[\"name\"];\necho $name;\n?>",
            output:
              "The value supplied through the name URL parameter.",
            mistake:
              "<?php\n$name = GET[\"name\"];\necho $name;\n?>",
            mistakeExplanation:
              "PHP superglobals begin with the $ symbol and use the exact $_GET name.",
            correction:
              "<?php\n$name = $_GET[\"name\"];\necho $name;\n?>",
            labPrompt:
              "Read a name from a GET parameter and display it.",
            question:
              "Which superglobal reads GET data?",
            answer: "$_GET",
            distractors: [
              "$GET",
              "$_URL",
            ],
          }),

          lesson({
            slug: "php-post",
            title: "$_POST",
            summary:
              "Read form data submitted using POST.",
            what:
              "$_POST is a PHP superglobal used to access data submitted through an HTTP POST request.",
            why:
              "POST is commonly used for sending form data to a server.",
            example:
              "<?php\n$name = $_POST[\"name\"];\necho $name;\n?>",
            output:
              "The submitted name.",
            mistake:
              "<?php\n$name = $_POST[\"username\"];\necho $name;\n?>",
            mistakeExplanation:
              "The key used in $_POST must match the name of the submitted form field.",
            correction:
              "<?php\n$name = $_POST[\"name\"];\necho $name;\n?>",
            labPrompt:
              "Create PHP code that reads a submitted name using $_POST.",
            question:
              "Which superglobal is used to access POST data?",
            answer: "$_POST",
            distractors: [
              "$_GET",
              "$_FORM",
            ],
          }),

          lesson({
            slug: "php-request",
            title: "$_REQUEST",
            summary:
              "Access request data through PHP's request superglobal.",
            what:
              "$_REQUEST is a PHP superglobal that can contain request data from sources such as GET and POST.",
            why:
              "It provides a combined way to access request values when the source does not need to be handled separately.",
            example:
              "<?php\n$name = $_REQUEST[\"name\"];\necho $name;\n?>",
            output:
              "The supplied name value.",
            mistake:
              "<?php\n$name = REQUEST[\"name\"];\necho $name;\n?>",
            mistakeExplanation:
              "The PHP superglobal is named $_REQUEST.",
            correction:
              "<?php\n$name = $_REQUEST[\"name\"];\necho $name;\n?>",
            labPrompt:
              "Read a name using $_REQUEST and print it.",
            question:
              "What does $_REQUEST provide?",
            answer:
              "Access to request data from supported request sources such as GET and POST.",
            distractors: [
              "Only database rows",
              "Only session IDs",
            ],
          }),

          lesson({
            slug: "php-cookies",
            title: "Cookies",
            summary:
              "Understand how PHP handles browser cookies.",
            what:
              "Cookies allow web applications to store state-related information on the user's machine and can be used to remember information between requests.",
            why:
              "Cookies are useful for remembering certain user preferences and session-related information.",
            example:
              "<?php\nsetcookie(\"user\", \"Bhaskara\");\necho \"Cookie created\";\n?>",
            output: "Cookie created",
            mistake:
              "<?php\nsetcookie(\"user\", \"Bhaskara\");\necho $_COOKIE[\"user\"];\n?>",
            mistakeExplanation:
              "A cookie is sent through the response and is normally available in a subsequent request rather than immediately as though it were a normal local variable.",
            correction:
              "<?php\nsetcookie(\"user\", \"Bhaskara\");\necho \"Cookie created\";\n?>",
            labPrompt:
              "Create a cookie containing a user's name.",
            question:
              "What do cookies allow web applications to do?",
            answer:
              "Store state-related information on the user's machine.",
            distractors: [
              "Create PHP functions",
              "Compile PHP code",
            ],
          }),

          lesson({
            slug: "php-sessions",
            title: "Session management",
            summary:
              "Understand PHP sessions for maintaining user state.",
            what:
              "Session management allows PHP applications to maintain information associated with a user across multiple requests.",
            why:
              "Web applications need a way to maintain user-related state while the user navigates between pages.",
            example:
              "<?php\nsession_start();\n$_SESSION[\"username\"] = \"Bhaskara\";\necho $_SESSION[\"username\"];\n?>",
            output: "Bhaskara",
            mistake:
              "<?php\n$_SESSION[\"username\"] = \"Bhaskara\";\necho $_SESSION[\"username\"];\n?>",
            mistakeExplanation:
              "A PHP session should be started before accessing session data.",
            correction:
              "<?php\nsession_start();\n$_SESSION[\"username\"] = \"Bhaskara\";\necho $_SESSION[\"username\"];\n?>",
            labPrompt:
              "Start a session, store a username, and display it.",
            question:
              "Which function starts a PHP session?",
            answer: "session_start()",
            distractors: [
              "start_session()",
              "session_begin()",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "php-exceptions-and-files",
    title: "Exception and file handling",
    description:
      "Handle exceptions and work with files using PHP's file functions.",
    topics: [
      {
        slug: "php-exception-handling",
        title: "Exception handling",
        description:
          "Understand exceptions and use try, catch, throw, and finally.",
        lessons: [
          lesson({
            slug: "php-exceptions",
            title: "Understanding exceptions",
            summary:
              "Understand events that disrupt normal program execution.",
            what:
              "An exception is an event that occurs during program execution and disrupts the normal flow of instructions. PHP represents exceptions using exception objects.",
            why:
              "Exception handling allows programs to respond to exceptional situations in a controlled way.",
            example:
              "<?php\ntry {\n    throw new Exception(\"Something went wrong\");\n} catch (Exception $e) {\n    echo $e->getMessage();\n}\n?>",
            output: "Something went wrong",
            mistake:
              "<?php\nthrow \"Something went wrong\";\n?>",
            mistakeExplanation:
              "The source material uses Exception objects with throw. A string alone is not the intended exception pattern.",
            correction:
              "<?php\nthrow new Exception(\"Something went wrong\");\n?>",
            labPrompt:
              "Create a try-catch block that catches an Exception and prints its message.",
            question:
              "What is an exception?",
            answer:
              "An event during execution that disrupts the normal flow of a program.",
            distractors: [
              "A normal variable declaration",
              "A type of loop",
            ],
          }),

          lesson({
            slug: "php-try-catch",
            title: "try and catch",
            summary:
              "Catch exceptions and handle errors gracefully.",
            what:
              "Code that may generate an exception is placed inside a try block. A catch block handles an exception of the specified type.",
            why:
              "try-catch prevents exceptional situations from being handled as uncontrolled program failures.",
            example:
              "<?php\ntry {\n    throw new Exception(\"Error occurred\");\n} catch (Exception $e) {\n    echo \"Error: \" . $e->getMessage();\n}\n?>",
            output: "Error: Error occurred",
            mistake:
              "<?php\ntry {\n    throw new Exception(\"Error occurred\");\n}\n?>",
            mistakeExplanation:
              "The thrown exception has no catch block to handle it.",
            correction:
              "<?php\ntry {\n    throw new Exception(\"Error occurred\");\n} catch (Exception $e) {\n    echo \"Error: \" . $e->getMessage();\n}\n?>",
            labPrompt:
              "Throw an exception and catch it using a catch block.",
            question:
              "What does catch do?",
            answer:
              "It handles an exception thrown from the try block.",
            distractors: [
              "It starts a loop",
              "It creates a database connection",
            ],
          }),

          lesson({
            slug: "php-throw",
            title: "throw statement",
            summary:
              "Create and throw your own exceptions.",
            what:
              "The throw statement is used to explicitly generate an exception.",
            why:
              "A program can use throw when a condition is invalid and needs to be handled by exception logic.",
            example:
              "<?php\nfunction divide($a, $b) {\n    if ($b == 0) {\n        throw new Exception(\"Cannot divide by zero!\");\n    }\n    return $a / $b;\n}\n?>",
            output:
              "The exception is generated when the denominator is zero.",
            mistake:
              "<?php\nfunction divide($a, $b) {\n    if ($b == 0) {\n        return 0;\n    }\n    return $a / $b;\n}\n?>",
            mistakeExplanation:
              "Returning zero hides the exceptional condition. The source demonstrates throwing an Exception for division by zero.",
            correction:
              "<?php\nfunction divide($a, $b) {\n    if ($b == 0) {\n        throw new Exception(\"Cannot divide by zero!\");\n    }\n    return $a / $b;\n}\n?>",
            labPrompt:
              "Create a function that throws an exception when the denominator is zero.",
            question:
              "Which keyword is used to explicitly generate an exception?",
            answer: "throw",
            distractors: [
              "catch",
              "finally",
            ],
          }),

          lesson({
            slug: "php-finally",
            title: "finally block",
            summary:
              "Run cleanup code regardless of whether an exception occurs.",
            what:
              "The finally block is executed regardless of whether an exception is thrown or caught.",
            why:
              "It provides a place for code that must run after exception handling.",
            example:
              "<?php\ntry {\n    echo \"Try\";\n} catch (Exception $e) {\n    echo \"Catch\";\n} finally {\n    echo \"Finally\";\n}\n?>",
            output: "TryFinally",
            mistake:
              "<?php\ntry {\n    echo \"Try\";\n} finally {\n    echo \"Finally\";\n?>",
            mistakeExplanation:
              "The finally block must have its closing brace and complete PHP structure.",
            correction:
              "<?php\ntry {\n    echo \"Try\";\n} finally {\n    echo \"Finally\";\n}\n?>",
            labPrompt:
              "Write a try-catch-finally structure that prints a final message.",
            question:
              "When does finally execute?",
            answer:
              "It executes regardless of whether an exception is thrown.",
            distractors: [
              "Only when no exception exists",
              "Only when catch fails",
            ],
          }),
        ],
      },

      {
        slug: "php-file-handling",
        title: "File handling",
        description:
          "Open, read, write, close, copy, rename, and delete files in PHP.",
        lessons: [
          lesson({
            slug: "php-fopen-fclose",
            title: "Opening and closing files",
            summary:
              "Use fopen and fclose to manage PHP file handles.",
            what:
              "The fopen() function opens a file and returns a file resource. fclose() closes an open file handle.",
            why:
              "Files must be opened before reading or writing and closed after use.",
            example:
              "<?php\n$handle = fopen(\"data.txt\", \"r\");\nfclose($handle);\n?>",
            output: "File opened and then closed.",
            mistake:
              "<?php\n$handle = fopen(\"data.txt\", \"r\");\n?>",
            mistakeExplanation:
              "The file remains open because the handle is not closed.",
            correction:
              "<?php\n$handle = fopen(\"data.txt\", \"r\");\nfclose($handle);\n?>",
            labPrompt:
              "Open a file in read mode and then close it.",
            question:
              "Which function opens a file?",
            answer: "fopen()",
            distractors: [
              "open()",
              "file_open()",
            ],
          }),

          lesson({
            slug: "php-read-file",
            title: "Reading files",
            summary:
              "Read file contents using fread.",
            what:
              "The fread() function reads a specified amount of content from an open file handle.",
            why:
              "Reading files allows PHP programs to process stored text and other file data.",
            example:
              "<?php\n$filename = \"myfile.txt\";\n$handle = fopen($filename, \"r\");\n$contents = fread($handle, filesize($filename));\necho $contents;\nfclose($handle);\n?>",
            output: "The contents of myfile.txt",
            mistake:
              "<?php\n$filename = \"myfile.txt\";\n$handle = fopen($filename, \"r\");\n$contents = fread($handle);\necho $contents;\n?>",
            mistakeExplanation:
              "fread() requires the file handle and the amount of data to read.",
            correction:
              "<?php\n$filename = \"myfile.txt\";\n$handle = fopen($filename, \"r\");\n$contents = fread($handle, filesize($filename));\necho $contents;\nfclose($handle);\n?>",
            labPrompt:
              "Open a text file, read its contents, print them, and close the file.",
            question:
              "What does fread() do?",
            answer:
              "It reads content from an open file.",
            distractors: [
              "Deletes a file",
              "Renames a file",
            ],
          }),

          lesson({
            slug: "php-write-file",
            title: "Writing files",
            summary:
              "Write text to a file using fwrite.",
            what:
              "The fwrite() function writes string content into an open file.",
            why:
              "Applications may need to save text, logs, or generated data into files.",
            example:
              "<?php\n$fp = fopen(\"data.txt\", \"w\");\nfwrite($fp, \"hello php file\");\nfclose($fp);\necho \"File written successfully\";\n?>",
            output: "File written successfully",
            mistake:
              "<?php\n$fp = fopen(\"data.txt\", \"r\");\nfwrite($fp, \"hello php file\");\nfclose($fp);\n?>",
            mistakeExplanation:
              "The file was opened in read mode instead of a mode that allows writing.",
            correction:
              "<?php\n$fp = fopen(\"data.txt\", \"w\");\nfwrite($fp, \"hello php file\");\nfclose($fp);\n?>",
            labPrompt:
              "Create a file and write a short message into it.",
            question:
              "Which function writes data into an open file?",
            answer: "fwrite()",
            distractors: [
              "fread()",
              "filewrite()",
            ],
          }),

          lesson({
            slug: "php-delete-file",
            title: "Deleting files",
            summary:
              "Remove a file using unlink.",
            what:
              "The unlink() function is used to delete a file.",
            why:
              "Applications sometimes need to remove obsolete or unwanted files.",
            example:
              "<?php\nunlink(\"data.txt\");\necho \"File deleted successfully\";\n?>",
            output: "File deleted successfully",
            mistake:
              "<?php\nunlink();\necho \"File deleted successfully\";\n?>",
            mistakeExplanation:
              "unlink() needs the filename of the file to delete.",
            correction:
              "<?php\nunlink(\"data.txt\");\necho \"File deleted successfully\";\n?>",
            labPrompt:
              "Write PHP code that deletes a file named data.txt.",
            question:
              "Which function deletes a file in PHP?",
            answer: "unlink()",
            distractors: [
              "delete()",
              "removeFile()",
            ],
          }),

          lesson({
            slug: "php-copy-rename-files",
            title: "Copying and renaming files",
            summary:
              "Manage file names and duplicate files.",
            what:
              "PHP file handling includes operations for copying and renaming files in addition to opening, reading, writing, and deleting them.",
            why:
              "File management is needed when applications create backups, move uploaded files, or organize stored content.",
            example:
              "<?php\ncopy(\"source.txt\", \"backup.txt\");\nrename(\"backup.txt\", \"archive.txt\");\n?>",
            output: "The file is copied and then renamed.",
            mistake:
              "<?php\ncopy(\"source.txt\");\nrename(\"backup.txt\");\n?>",
            mistakeExplanation:
              "Copying and renaming require the source and destination filenames.",
            correction:
              "<?php\ncopy(\"source.txt\", \"backup.txt\");\nrename(\"backup.txt\", \"archive.txt\");\n?>",
            labPrompt:
              "Copy a file to a backup filename and then rename the backup.",
            question:
              "What is the purpose of copying a file?",
            answer:
              "To create another copy of the file under a different destination.",
            distractors: [
              "To read a file",
              "To execute PHP code",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "php-database-handling",
    title: "Database handling",
    description:
      "Connect PHP applications to MySQL and perform common database operations.",
    topics: [
      {
        slug: "php-mysql-connection",
        title: "MySQL connection",
        description:
          "Connect PHP to a MySQL database using the source's XAMPP and mysqli approach.",
        lessons: [
          lesson({
            slug: "php-xampp-mysql",
            title: "PHP, XAMPP, and MySQL",
            summary:
              "Understand the basic environment used for PHP database development.",
            what:
              "The source describes XAMPP as a local server environment containing Apache, MySQL, PHP, and Perl. Apache and MySQL can be started through XAMPP for local PHP database development.",
            why:
              "A local server environment allows PHP applications to communicate with a database during development.",
            example:
              "<?php\n$servername = \"localhost\";\n$username = \"root\";\n$password = \"\";\n\n$conn = new mysqli($servername, $username, $password);\n?>",
            output:
              "A mysqli connection object is created for the local server.",
            mistake:
              "<?php\n$conn = new mysqli();\n?>",
            mistakeExplanation:
              "The source's connection example supplies the server name, username, and password.",
            correction:
              "<?php\n$servername = \"localhost\";\n$username = \"root\";\n$password = \"\";\n$conn = new mysqli($servername, $username, $password);\n?>",
            labPrompt:
              "Create a mysqli connection to a local MySQL server using localhost.",
            question:
              "What local tool does the source use for PHP and MySQL development?",
            answer: "XAMPP",
            distractors: [
              "Node.js",
              "Git",
            ],
          }),

          lesson({
            slug: "php-database-connection",
            title: "Connecting PHP to MySQL",
            summary:
              "Establish and check a MySQL connection from PHP.",
            what:
              "PHP can establish a MySQL connection using mysqli and check the connection for errors before performing database operations.",
            why:
              "Database operations cannot be performed until the PHP application has a working connection.",
            example:
              "<?php\n$servername = \"localhost\";\n$username = \"root\";\n$password = \"\";\n$dbname = \"college\";\n\n$conn = new mysqli($servername, $username, $password, $dbname);\n\nif ($conn->connect_error) {\n    die(\"Connection failure: \" . $conn->connect_error);\n}\n\necho \"Connected successfully\";\n?>",
            output: "Connected successfully",
            mistake:
              "<?php\n$conn = new mysqli(\"localhost\", \"root\", \"\", \"college\");\necho \"Connected successfully\";\n?>",
            mistakeExplanation:
              "The program should check whether the connection failed before assuming the database connection succeeded.",
            correction:
              "<?php\n$conn = new mysqli(\"localhost\", \"root\", \"\", \"college\");\n\nif ($conn->connect_error) {\n    die(\"Connection failure: \" . $conn->connect_error);\n}\n\necho \"Connected successfully\";\n?>",
            labPrompt:
              "Connect to a local MySQL database and print a success message when the connection works.",
            question:
              "Which PHP class is used in the source to connect to MySQL?",
            answer: "mysqli",
            distractors: [
              "mysqlConnection",
              "PDOOnly",
            ],
          }),
        ],
      },

      {
        slug: "php-sql-operations",
        title: "SQL operations",
        description:
          "Insert, select, update, delete, truncate, sort, and rename database data.",
        lessons: [
          lesson({
            slug: "php-insert-data",
            title: "INSERT data",
            summary:
              "Add new rows to a MySQL table from PHP.",
            what:
              "The INSERT INTO statement adds new rows to a database table.",
            why:
              "Applications need to store new information such as users, students, products, and orders.",
            example:
              "<?php\n$sql = \"INSERT INTO students (name, age, grade)\nVALUES ('Maya', 18, 'A')\";\n$conn->query($sql);\n?>",
            output: "New row inserted.",
            mistake:
              "<?php\n$sql = \"INSERT students (name, age, grade)\nVALUES ('Maya', 18, 'A')\";\n$conn->query($sql);\n?>",
            mistakeExplanation:
              "The INSERT statement requires the INTO keyword before the table name.",
            correction:
              "<?php\n$sql = \"INSERT INTO students (name, age, grade)\nVALUES ('Maya', 18, 'A')\";\n$conn->query($sql);\n?>",
            labPrompt:
              "Insert a student named Lucas, age 19, and grade B into a students table.",
            question:
              "Which SQL statement inserts a new row?",
            answer: "INSERT INTO",
            distractors: [
              "ADD ROW",
              "CREATE ROW",
            ],
          }),

          lesson({
            slug: "php-select-data",
            title: "SELECT data",
            summary:
              "Retrieve rows from a MySQL table.",
            what:
              "The SELECT statement retrieves data from a database table.",
            why:
              "Applications need to read stored information to display lists, reports, profiles, and search results.",
            example:
              "<?php\n$sql = \"SELECT name, age FROM students\";\n$result = $conn->query($sql);\n?>",
            output:
              "The query result contains the selected student names and ages.",
            mistake:
              "<?php\n$sql = \"SELECT FROM students\";\n$result = $conn->query($sql);\n?>",
            mistakeExplanation:
              "SELECT needs the columns to retrieve or * for all columns.",
            correction:
              "<?php\n$sql = \"SELECT name, age FROM students\";\n$result = $conn->query($sql);\n?>",
            labPrompt:
              "Write a SELECT query that retrieves student names and grades.",
            question:
              "Which SQL statement retrieves data?",
            answer: "SELECT",
            distractors: [
              "FETCHROW",
              "GETDATA",
            ],
          }),

          lesson({
            slug: "php-update-data",
            title: "UPDATE data",
            summary:
              "Modify existing database rows.",
            what:
              "UPDATE changes existing values in rows that match a condition.",
            why:
              "Applications frequently need to change stored information such as names, statuses, grades, or prices.",
            example:
              "<?php\n$sql = \"UPDATE students\nSET grade = 'A'\nWHERE id = 9\";\n$conn->query($sql);\n?>",
            output: "The matching row is updated.",
            mistake:
              "<?php\n$sql = \"UPDATE students\nSET grade = 'A'\";\n$conn->query($sql);\n?>",
            mistakeExplanation:
              "Without a WHERE clause, the update can affect every row in the table.",
            correction:
              "<?php\n$sql = \"UPDATE students\nSET grade = 'A'\nWHERE id = 9\";\n$conn->query($sql);\n?>",
            labPrompt:
              "Update the grade of the student whose id is 5.",
            question:
              "Why is WHERE important in an UPDATE query?",
            answer:
              "It restricts the update to the intended rows.",
            distractors: [
              "It creates a new table",
              "It sorts the rows",
            ],
          }),

          lesson({
            slug: "php-delete-data",
            title: "DELETE data",
            summary:
              "Remove selected rows from a database table.",
            what:
              "The DELETE statement removes rows from a table, usually based on a WHERE condition.",
            why:
              "Applications may need to remove outdated, cancelled, or unwanted records.",
            example:
              "<?php\n$sql = \"DELETE FROM students WHERE id = 9\";\n$conn->query($sql);\n?>",
            output: "The matching row is deleted.",
            mistake:
              "<?php\n$sql = \"DELETE FROM students\";\n$conn->query($sql);\n?>",
            mistakeExplanation:
              "A DELETE without WHERE can remove every row from the table.",
            correction:
              "<?php\n$sql = \"DELETE FROM students WHERE id = 9\";\n$conn->query($sql);\n?>",
            labPrompt:
              "Delete the student whose id is 10.",
            question:
              "What happens if DELETE is used without WHERE?",
            answer:
              "All rows in the table can be deleted.",
            distractors: [
              "Only the first row is deleted",
              "The table structure is automatically renamed",
            ],
          }),

          lesson({
            slug: "php-truncate-order-by",
            title: "TRUNCATE and ORDER BY",
            summary:
              "Clear table data and control the order of query results.",
            what:
              "The source syllabus includes TRUNCATE and ORDER BY as database operations. TRUNCATE removes table rows, while ORDER BY sorts query results.",
            why:
              "These operations are useful when managing table contents and presenting query results in a meaningful order.",
            example:
              "SELECT name, grade\nFROM students\nORDER BY grade ASC;",
            output:
              "Student rows sorted by grade in ascending order.",
            mistake:
              "SELECT name, grade\nFROM students\nORDER grade ASC;",
            mistakeExplanation:
              "The sorting clause is ORDER BY, not ORDER alone.",
            correction:
              "SELECT name, grade\nFROM students\nORDER BY grade ASC;",
            labPrompt:
              "Write a query that lists students ordered by their grade.",
            question:
              "Which clause sorts query results?",
            answer: "ORDER BY",
            distractors: [
              "SORT BY",
              "GROUP ORDER",
            ],
          }),

          lesson({
            slug: "php-sql-alias",
            title: "SQL aliases",
            summary:
              "Give temporary names to columns or tables in queries.",
            what:
              "An alias provides another name for a selected column or table within a query.",
            why:
              "Aliases can make query output easier to read and can make complex queries shorter.",
            example:
              "SELECT name AS student_name\nFROM students;",
            output:
              "The result column is displayed as student_name.",
            mistake:
              "SELECT name ALIAS student_name\nFROM students;",
            mistakeExplanation:
              "The source's SQL operation list refers to Alias. In standard SQL syntax, AS is used to assign a column alias.",
            correction:
              "SELECT name AS student_name\nFROM students;",
            labPrompt:
              "Select a student's name and display the result using the alias student_name.",
            question:
              "What does an SQL alias do?",
            answer:
              "It gives a temporary name to a column or table in a query.",
            distractors: [
              "It permanently renames the database",
              "It deletes a column",
            ],
          }),
        ],
      },
    ],
  },
];