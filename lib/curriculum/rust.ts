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
      "mistakeExplanation" | "hint" | "labCode" | "hidden"
    >
  >;

function lesson(input: SeedInput): LocalLessonSeed {
  const firstLine =
    input.example
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find((line) => line && !line.startsWith("//")) ?? "Rust code";

  const tokens = firstLine.split(/\s+/);
  const firstToken = tokens[0] ?? "Rust";
  const remaining = tokens.slice(1).join(" ");

  return {
    ...input,
    anatomy: firstLine,
    parts: [
      {
        token: firstToken,
        label: "Keyword / identifier",
        description:
          "The first important part of the Rust statement or expression.",
      },
      {
        token: remaining || firstToken,
        label: "Expression / syntax",
        description:
          "The remaining syntax determines what the Rust code does.",
      },
    ],
    mistakeExplanation:
      input.mistakeExplanation ??
      "This is a common mistake when learning the Rust concept.",
    hint:
      input.hint ??
      "Read the Rust compiler error carefully and check the ownership, type, or syntax involved.",
    labCode:
      input.labCode ??
      `${input.example}\n`,
  };
}

export const rustModules: LocalModuleSeed[] = [
  {
    slug: "rust-and-cargo",
    title: "Rust and Cargo",
    description: "Learn what Rust is and how Cargo is used to build Rust programs.",
    topics: [
      {
        slug: "rust-and-cargo",
        title: "Rust and Cargo",
        description: "Learn what Rust is and how Cargo is used to build Rust programs.",
        lessons: [
          lesson({
            slug: "what-is-rust",
            title: "What Is Rust?",
            summary:
              "Understand Rust as a systems programming language focused on safety, performance, and concurrency.",
            what: "Rust is a programming language designed for safe and efficient systems programming.",
            why: "Understanding Rust's goals helps explain why the language has ownership, borrowing, and strict compiler checks.",
            example: `fn main() {
    println!("Hello, Rust!");
}`,
            mistake: "Thinking Rust is only useful for low-level programming.",
            correction:
              "Rust can be used for systems software, applications, libraries, embedded development, and many other areas.",
            labPrompt: "Write a Rust program that prints a welcome message.",
            question: "Which function is the starting point of a Rust program?",
            answer: "main",
            distractors: ["start", "run", "begin"],
          }),

          lesson({
            slug: "cargo-basics",
            title: "Using Cargo",
            summary: "Learn the basic Cargo workflow for creating and running Rust projects.",
            what: "Cargo is Rust's build system and package manager.",
            why: "Cargo handles project creation, building, running, testing, and dependencies.",
            example: `cargo new my_project`,
            mistake: "Trying to manually compile every Rust file without understanding Cargo.",
            correction:
              "For normal Rust projects, use Cargo to manage the project and its build process.",
            labPrompt: "Create a new Rust project with Cargo and run its default program.",
            question: "Which command creates a new Rust project?",
            answer: "cargo new",
            distractors: ["rust new", "cargo create", "rust project"],
          }),

          lesson({
            slug: "running-with-cargo",
            title: "Run Rust Code with Cargo",
            summary: "Use Cargo to compile and execute a Rust program.",
            what: "The cargo run command builds and runs a Rust binary.",
            why: "It gives you a simple development loop while learning Rust.",
            example: `cargo run`,
            mistake: "Running cargo run from a directory that is not a Cargo project.",
            correction:
              "Run Cargo commands from the project directory containing Cargo.toml.",
            labPrompt: "Create a Cargo project and run it using cargo run.",
            question: "Which Cargo command builds and runs a program?",
            answer: "cargo run",
            distractors: ["cargo execute", "rust run", "cargo start"],
          }),
        ],
      },
    ],
  },

  {
    slug: "rust-fundamentals",
    title: "Rust Fundamentals",
    description:
      "Learn variables, values, types, arithmetic, and type inference.",
    topics: [
      {
        slug: "rust-fundamentals",
        title: "Rust Fundamentals",
        description:
          "Learn variables, values, types, arithmetic, and type inference.",
        lessons: [
          lesson({
            slug: "rust-variables",
            title: "Variables",
            summary: "Create variables and understand Rust's default immutability.",
            what: "Variables store values, and Rust variables are immutable by default.",
            why: "Immutability makes programs easier to reason about and is an important part of Rust's safety model.",
            example: `let age = 20;`,
            mistake: "Trying to change an immutable variable.",
            correction:
              "Use let mut when the variable needs to be changed.",
            labPrompt: "Create an immutable name and a mutable score.",
            question: "Which keyword makes a Rust variable mutable?",
            answer: "mut",
            distractors: ["var", "mutable", "change"],
          }),

          lesson({
            slug: "mutable-variables",
            title: "Mutable Variables",
            summary: "Use mut when a variable needs to change.",
            what: "A variable declared with let mut can be assigned a new value.",
            why: "Rust requires you to explicitly state when mutation is allowed.",
            example: `let mut score = 10;
score = 20;
println!("{score}");`,
            mistake: "Writing let score = 10 and then assigning score = 20.",
            correction:
              "Declare the variable with let mut if it needs to change.",
            labPrompt: "Create a mutable counter and increase it three times.",
            question: "What does mut allow?",
            answer: "It allows a variable to be changed.",
            distractors: [
              "It creates a constant",
              "It creates a reference",
              "It changes the type",
            ],
          }),

          lesson({
            slug: "rust-types",
            title: "Types and Values",
            summary: "Understand common Rust types and the values they contain.",
            what: "Rust values have types such as integers, floating-point numbers, booleans, and characters.",
            why: "Rust's type system helps the compiler detect invalid operations before the program runs.",
            example: `let age: i32 = 20;
let price: f64 = 99.5;
let active: bool = true;
let grade: char = 'A';`,
            mistake: "Assuming every number has the same Rust type.",
            correction:
              "Rust has multiple numeric types, and the compiler can also infer many types from context.",
            labPrompt: "Create variables for an age, price, boolean status, and character.",
            question: "Which Rust type stores true or false?",
            answer: "bool",
            distractors: ["boolean", "bit", "logic"],
          }),

          lesson({
            slug: "type-inference",
            title: "Type Inference",
            summary: "Let Rust determine types when explicit annotations are unnecessary.",
            what: "Rust can often infer the type of a variable from its value and how it is used.",
            why: "Type inference keeps Rust code concise without removing the benefits of static typing.",
            example: `let number = 42;
let name = "Bhaskara";`,
            mistake: "Adding explicit types to every single variable even when they are obvious.",
            correction:
              "Use type annotations when they improve clarity or are required to resolve ambiguity.",
            labPrompt: "Create several variables without writing their types explicitly.",
            question: "What does type inference mean?",
            answer: "The compiler determines a type from context.",
            distractors: [
              "The program changes types at runtime",
              "The programmer never uses types",
              "Rust removes type checking",
            ],
          }),

          lesson({
            slug: "rust-arithmetic",
            title: "Arithmetic",
            summary: "Perform basic arithmetic operations in Rust.",
            what: "Rust supports arithmetic operators such as +, -, *, and /.",
            why: "Arithmetic is the foundation for many programs and exercises.",
            example: `let a = 20;
let b = 5;
let result = a + b;`,
            mistake: "Mixing incompatible numeric types without conversion.",
            correction:
              "Use compatible numeric types or explicitly convert values when necessary.",
            labPrompt: "Calculate the sum, difference, product, and quotient of two numbers.",
            question: "Which operator performs multiplication?",
            answer: "*",
            distractors: ["x", "%", "#"],
          }),
        ],
      },
    ],
  },

  {
    slug: "control-flow-and-functions",
    title: "Control Flow and Functions",
    description:
      "Learn blocks, if expressions, match, loops, break, continue, functions, and macros.",
    topics: [
      {
        slug: "control-flow-and-functions",
        title: "Control Flow and Functions",
        description:
          "Learn blocks, if expressions, match, loops, break, continue, functions, and macros.",
        lessons: [
          lesson({
            slug: "if-expressions",
            title: "if Expressions",
            summary: "Use conditions to choose between different paths.",
            what: "Rust uses if expressions to execute code based on a condition.",
            why: "Conditional logic allows programs to make decisions.",
            example: `let age = 20;

if age >= 18 {
    println!("Adult");
} else {
    println!("Minor");
}`,
            mistake: "Writing if condition without a boolean expression.",
            correction:
              "The condition used by if must evaluate to a boolean.",
            labPrompt: "Write a program that checks whether a number is positive or negative.",
            question: "What type must an if condition produce?",
            answer: "bool",
            distractors: ["i32", "String", "char"],
          }),

          lesson({
            slug: "match-expressions",
            title: "match Expressions",
            summary: "Use pattern matching to handle multiple possible values.",
            what: "match compares a value against patterns and executes the matching branch.",
            why: "match is one of Rust's central control-flow features and works especially well with enums.",
            example: `let number = 2;

match number {
    1 => println!("One"),
    2 => println!("Two"),
    _ => println!("Other"),
}`,
            mistake: "Forgetting to handle all possible cases.",
            correction:
              "Rust generally requires match expressions to be exhaustive.",
            labPrompt: "Use match to print a message for numbers from 1 to 3 and a default message for others.",
            question: "What does _ represent in a match?",
            answer: "A pattern that matches the remaining cases.",
            distractors: ["Only zero", "A comment", "A loop"],
          }),

          lesson({
            slug: "rust-loops",
            title: "Loops",
            summary: "Repeat code using for and loop.",
            what: "Rust provides loop constructs for repeating operations.",
            why: "Loops are useful for processing collections and repeating work.",
            example: `for number in 1..=5 {
    println!("{number}");
}`,
            mistake: "Confusing .. with ..=.",
            correction:
              ".. excludes the ending value, while ..= includes it.",
            labPrompt: "Print the numbers from 1 through 10 using a for loop.",
            question: "Which range includes both endpoints?",
            answer: "..=",
            distractors: ["..", "...", "::"],
          }),

          lesson({
            slug: "break-and-continue",
            title: "break and continue",
            summary: "Control how loops proceed.",
            what: "break exits a loop, while continue skips to the next iteration.",
            why: "They allow loops to stop early or skip specific cases.",
            example: `for number in 1..=10 {
    if number == 5 {
        break;
    }

    println!("{number}");
}`,
            mistake: "Using continue when the intention is to stop the loop.",
            correction:
              "Use break to exit the loop completely and continue to skip an iteration.",
            labPrompt: "Print numbers from 1 to 10 but stop when the number reaches 7.",
            question: "Which keyword exits a loop?",
            answer: "break",
            distractors: ["stop", "exit", "return"],
          }),

          lesson({
            slug: "rust-functions",
            title: "Functions",
            summary: "Create reusable blocks of Rust code.",
            what: "Functions are declared using fn and can accept parameters and return values.",
            why: "Functions divide programs into smaller reusable pieces.",
            example: `fn add(a: i32, b: i32) -> i32 {
    a + b
}`,
            mistake: "Forgetting the return type when one is required.",
            correction:
              "Use -> Type when explicitly specifying the function's return type.",
            labPrompt: "Create a function that returns the square of a number.",
            question: "Which keyword declares a Rust function?",
            answer: "fn",
            distractors: ["function", "def", "func"],
          }),

          lesson({
            slug: "rust-macros",
            title: "Macros",
            summary: "Understand macros such as println! and format!.",
            what: "Rust macros are invoked with ! and can accept patterns of input that ordinary functions cannot.",
            why: "Macros provide capabilities such as variable numbers of arguments and code generation.",
            example: `println!("Hello, {}!", "Rust");`,
            mistake: "Treating every macro as an ordinary function.",
            correction:
              "Macros are expanded by the compiler and are written with ! when invoked.",
            labPrompt: "Use println! and format! to create formatted output.",
            question: "What symbol commonly identifies a Rust macro invocation?",
            answer: "!",
            distractors: ["#", "$", "&"],
          }),
        ],
      },
    ],
  },

  {
    slug: "collections-and-user-defined-types",
    title: "Collections and User-Defined Types",
    description:
      "Learn arrays, tuples, slices, structs, enums, constants, and type aliases.",
    topics: [
      {
        slug: "collections-and-user-defined-types",
        title: "Collections and User-Defined Types",
        description:
          "Learn arrays, tuples, slices, structs, enums, constants, and type aliases.",
        lessons: [
          lesson({
            slug: "rust-arrays",
            title: "Arrays",
            summary: "Store multiple values of the same type in a fixed-size collection.",
            what: "An array contains a fixed number of values of the same type.",
            why: "Arrays are useful when the number of elements is known at compile time.",
            example: `let numbers = [10, 20, 30, 40];`,
            mistake: "Trying to store unrelated types in a normal array.",
            correction:
              "All elements of a Rust array have the same type.",
            labPrompt: "Create an array containing five integers and print each value.",
            question: "Are Rust arrays fixed or dynamically sized?",
            answer: "Fixed-size",
            distractors: ["Always dynamic", "Unlimited", "Random-size"],
          }),

          lesson({
            slug: "rust-tuples",
            title: "Tuples",
            summary: "Group values of different types into one compound value.",
            what: "A tuple can contain values of different types.",
            why: "Tuples are useful for returning or grouping several related values.",
            example: `let person = ("Bhaskara", 20, true);

println!("{}", person.0);`,
            mistake: "Trying to access tuple elements using array-style indexing.",
            correction:
              "Tuple elements are accessed using dot notation such as .0, .1, and .2.",
            labPrompt: "Create a tuple containing a name, age, and boolean value.",
            question: "How are tuple elements accessed?",
            answer: "Using positional fields such as .0 and .1.",
            distractors: ["Using []", "Using {}", "Using ->"],
          }),

          lesson({
            slug: "rust-destructuring",
            title: "Patterns and Destructuring",
            summary: "Break tuples and other values into separate variables.",
            what: "Destructuring allows a pattern to extract multiple values from a compound value.",
            why: "It makes working with tuples and structured data convenient.",
            example: `let point = (10, 20);
let (x, y) = point;

println!("{x} {y}");`,
            mistake: "Changing the number of variables without matching the tuple structure.",
            correction:
              "The destructuring pattern must match the structure being unpacked.",
            labPrompt: "Destructure a tuple containing a student's name and score.",
            question: "What does destructuring do?",
            answer: "It extracts parts of a structured value into variables.",
            distractors: [
              "Deletes the value",
              "Changes the data type",
              "Allocates a thread",
            ],
          }),

          lesson({
            slug: "rust-structs",
            title: "Structs",
            summary: "Create custom types containing named fields.",
            what: "A struct groups related values under named fields.",
            why: "Structs let you model data clearly using your own types.",
            example: `struct User {
    name: String,
    age: u32,
}

let user = User {
    name: String::from("Bhaskara"),
    age: 20,
};`,
            mistake: "Trying to create a struct without providing required fields.",
            correction:
              "When constructing a struct, provide values for all required fields.",
            labPrompt: "Create a Student struct with a name and roll number.",
            question: "What does a struct primarily provide?",
            answer: "A custom type with named fields.",
            distractors: ["A loop", "A package manager", "A compiler"],
          }),

          lesson({
            slug: "rust-enums",
            title: "Enums",
            summary: "Represent a value that can be one of several variants.",
            what: "An enum defines a type with multiple possible variants.",
            why: "Enums are especially useful for representing states and different kinds of data.",
            example: `enum Direction {
    North,
    South,
    East,
    West,
}

let direction = Direction::North;`,
            mistake: "Using an enum variant without its enum path when it is not in scope.",
            correction:
              "Use the appropriate enum path such as Direction::North.",
            labPrompt: "Create an enum for the four directions and match on it.",
            question: "What does an enum represent?",
            answer: "A value that can have one of several variants.",
            distractors: ["Only numbers", "Only strings", "A fixed-size array"],
          }),
        ],
      },
    ],
  },

  {
    slug: "ownership-borrowing-and-lifetimes",
    title: "Ownership, Borrowing, and Lifetimes",
    description:
      "Learn the core Rust memory model through ownership, moves, references, slices, borrowing, and lifetimes.",
    topics: [
      {
        slug: "ownership-borrowing-and-lifetimes",
        title: "Ownership, Borrowing, and Lifetimes",
        description:
          "Learn the core Rust memory model through ownership, moves, references, slices, borrowing, and lifetimes.",
        lessons: [
          lesson({
            slug: "rust-ownership",
            title: "Ownership",
            summary: "Understand how Rust manages memory through ownership.",
            what: "Ownership determines which part of a program is responsible for a value.",
            why: "Rust uses ownership rules to provide memory safety without requiring a garbage collector.",
            example: `let name = String::from("Rust");
let other = name;

println!("{other}");`,
            mistake: "Using name after its String value has been moved.",
            correction:
              "After a move, the original variable can no longer be used for that value.",
            labPrompt: "Create a String, move it to another variable, and print the new owner.",
            question: "What happens during a move?",
            answer: "Ownership of a value is transferred.",
            distractors: ["The value is automatically copied", "The value is deleted", "The type changes"],
          }),

          lesson({
            slug: "move-semantics",
            title: "Move Semantics",
            summary: "See how assigning owned values can transfer ownership.",
            what: "Types such as String are moved when ownership is transferred.",
            why: "Move semantics prevent multiple owners from incorrectly freeing the same memory.",
            example: `let first = String::from("hello");
let second = first;

// first is no longer usable here
println!("{second}");`,
            mistake: "Assuming assignment always creates an independent copy.",
            correction:
              "For owned values such as String, assignment can move ownership instead of copying the data.",
            labPrompt: "Demonstrate a String move and identify which variable owns it afterward.",
            question: "Can the moved-from String variable normally be used again?",
            answer: "No.",
            distractors: ["Always yes", "Only after printing", "Only inside a loop"],
          }),

          lesson({
            slug: "references",
            title: "References",
            summary: "Borrow a value without taking ownership.",
            what: "A reference provides access to a value without transferring ownership.",
            why: "References let functions use data without taking responsibility for it.",
            example: `fn length(text: &String) -> usize {
    text.len()
}

let message = String::from("hello");
let size = length(&message);`,
            mistake: "Passing an owned String when the function only needs to read it.",
            correction:
              "Use a reference when the function does not need ownership.",
            labPrompt: "Write a function that receives a reference to a String and returns its length.",
            question: "What does & create?",
            answer: "A reference to a value.",
            distractors: ["A copy", "A new String", "A thread"],
          }),

          lesson({
            slug: "mutable-references",
            title: "Mutable References",
            summary: "Borrow a value mutably when you need to change it.",
            what: "A mutable reference is written as &mut and allows modification of the borrowed value.",
            why: "Rust controls mutable access to prevent conflicting accesses to data.",
            example: `fn add_text(text: &mut String) {
    text.push_str(" Rust");
}

let mut message = String::from("Hello");
add_text(&mut message);`,
            mistake: "Creating a mutable reference to an immutable variable.",
            correction:
              "The original variable must be mutable before it can be mutably borrowed.",
            labPrompt: "Write a function that modifies a mutable String through a reference.",
            question: "Which syntax creates a mutable reference?",
            answer: "&mut",
            distractors: ["&change", "mut&", "*mut"],
          }),

          lesson({
            slug: "slices",
            title: "Slices",
            summary: "Work with a view into part of a collection.",
            what: "A slice is a dynamically sized view into a contiguous sequence.",
            why: "Slices let functions work with portions of arrays, vectors, and strings without taking ownership.",
            example: `let numbers = [10, 20, 30, 40];
let part = &numbers[1..3];

println!("{:?}", part);`,
            mistake: "Confusing the slice range with the number of elements.",
            correction:
              "The starting index is included and the ending index is excluded for a normal range.",
            labPrompt: "Create a slice containing the middle elements of an array.",
            question: "What is a slice?",
            answer: "A view into part of a contiguous collection.",
            distractors: ["A copied array", "A new thread", "An enum variant"],
          }),

          lesson({
            slug: "borrowing-rules",
            title: "Borrow Checking",
            summary: "Understand Rust's rules for shared and mutable borrowing.",
            what: "Rust checks references to ensure that borrowing rules are respected.",
            why: "The borrow checker prevents many memory and data-race problems at compile time.",
            example: `let mut value = String::from("hello");

let first = &value;
println!("{first}");

let second = &mut value;
second.push_str("!");
`,
            mistake: "Trying to use conflicting mutable and immutable borrows at the same time.",
            correction:
              "Ensure conflicting borrows do not overlap in a way that violates Rust's borrowing rules.",
            labPrompt: "Create shared and mutable references and observe when the compiler accepts them.",
            question: "Can unrestricted mutable and immutable borrows overlap?",
            answer: "No.",
            distractors: ["Always", "Only with String", "Only inside functions"],
          }),

          lesson({
            slug: "lifetimes",
            title: "Lifetimes",
            summary: "Understand how Rust describes the validity of references.",
            what: "Lifetimes describe how long references remain valid.",
            why: "They allow Rust to verify that references never outlive the data they refer to.",
            example: `fn longer<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() > b.len() {
        a
    } else {
        b
    }
}`,
            mistake: "Thinking a lifetime creates or extends the lifetime of a value.",
            correction:
              "Lifetimes describe relationships between existing references; they do not extend the lifetime of data.",
            labPrompt: "Write a function that returns the longer of two string slices.",
            question: "What do lifetime annotations describe?",
            answer: "Relationships between reference lifetimes.",
            distractors: [
              "How much memory is allocated",
              "The speed of a function",
              "The number of threads",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "methods-traits-and-generics",
    title: "Methods, Traits, and Generics",
    description:
      "Build reusable Rust abstractions with methods, traits, trait bounds, and generics.",
    topics: [
      {
        slug: "methods-traits-and-generics",
        title: "Methods, Traits, and Generics",
        description:
          "Build reusable Rust abstractions with methods, traits, trait bounds, and generics.",
        lessons: [
          lesson({
            slug: "rust-methods",
            title: "Methods",
            summary: "Define functions associated with a type.",
            what: "Methods are functions defined in an impl block and commonly operate on a type's instance.",
            why: "Methods organize behavior together with the data they operate on.",
            example: `struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}`,
            mistake: "Forgetting the self parameter when defining an instance method.",
            correction:
              "Instance methods normally receive self, &self, or &mut self depending on ownership needs.",
            labPrompt: "Create a Rectangle type with an area method.",
            question: "What does &self mean?",
            answer: "The method borrows the instance immutably.",
            distractors: ["It moves the instance", "It deletes the instance", "It creates a new instance"],
          }),

          lesson({
            slug: "rust-traits",
            title: "Traits",
            summary: "Define shared behavior that different types can implement.",
            what: "A trait describes behavior that a type can implement.",
            why: "Traits provide a way to express shared behavior and polymorphism.",
            example: `trait Summary {
    fn summarize(&self) -> String;
}

struct Article {
    title: String,
}

impl Summary for Article {
    fn summarize(&self) -> String {
        self.title.clone()
    }
}`,
            mistake: "Confusing a trait with a concrete struct.",
            correction:
              "A trait describes behavior; a struct defines a concrete data type.",
            labPrompt: "Create a trait with one method and implement it for a custom struct.",
            question: "What does a trait primarily describe?",
            answer: "Shared behavior.",
            distractors: ["Memory size", "A package", "A loop"],
          }),

          lesson({
            slug: "generic-functions",
            title: "Generic Functions",
            summary: "Write functions that can work with multiple types.",
            what: "Generics allow code to work with different types while preserving compile-time type checking.",
            why: "Generics reduce duplication and make reusable abstractions possible.",
            example: `fn identity<T>(value: T) -> T {
    value
}`,
            mistake: "Thinking generic code removes type checking.",
            correction:
              "Rust still checks generic code at compile time.",
            labPrompt: "Write a generic identity function that returns the value it receives.",
            question: "What does T commonly represent in generic Rust code?",
            answer: "A type parameter.",
            distractors: ["A thread", "A lifetime only", "A constant"],
          }),

          lesson({
            slug: "trait-bounds",
            title: "Trait Bounds",
            summary: "Restrict generic types to those supporting required behavior.",
            what: "Trait bounds specify which traits a generic type must implement.",
            why: "A generic function can only perform operations guaranteed by its bounds.",
            example: `fn print_value<T: std::fmt::Display>(value: T) {
    println!("{value}");
}`,
            mistake: "Calling trait-specific behavior without requiring the trait.",
            correction:
              "Add the appropriate trait bound to the generic parameter.",
            labPrompt: "Create a generic function that accepts values implementing Display.",
            question: "Why are trait bounds used?",
            answer: "To require generic types to provide specific behavior.",
            distractors: [
              "To allocate memory",
              "To create threads",
              "To make variables mutable",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "standard-library-iterators-and-modules",
    title: "Standard Library, Iterators, Modules, and Testing",
    description:
      "Use common standard-library types, iterators, modules, visibility, and Rust's testing support.",
    topics: [
      {
        slug: "standard-library-iterators-and-modules",
        title: "Standard Library, Iterators, Modules, and Testing",
        description:
          "Use common standard-library types, iterators, modules, visibility, and Rust's testing support.",
        lessons: [
          lesson({
            slug: "option",
            title: "Option",
            summary: "Represent a value that may or may not exist.",
            what: "Option represents either Some(value) or None.",
            why: "It provides an explicit way to represent missing values without using null.",
            example: `let number: Option<i32> = Some(10);

match number {
    Some(value) => println!("{value}"),
    None => println!("No value"),
}`,
            mistake: "Trying to use an Option value as if it were automatically the contained value.",
            correction:
              "Handle the Some and None cases or otherwise explicitly extract the value.",
            labPrompt: "Create an Option containing an integer and handle both cases.",
            question: "Which variant represents no value?",
            answer: "None",
            distractors: ["Empty", "Null", "Missing"],
          }),

          lesson({
            slug: "result",
            title: "Result",
            summary: "Represent successful and failed operations.",
            what: "Result contains either Ok(value) or Err(error).",
            why: "Result is central to explicit error handling in Rust.",
            example: `fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err(String::from("division by zero"))
    } else {
        Ok(a / b)
    }
}`,
            mistake: "Ignoring the Err case.",
            correction:
              "Handle or propagate the possible error.",
            labPrompt: "Write a division function returning Result.",
            question: "Which Result variant represents success?",
            answer: "Ok",
            distractors: ["Success", "Value", "Pass"],
          }),

          lesson({
            slug: "vectors",
            title: "Vec",
            summary: "Store a dynamically sized collection of values.",
            what: "Vec<T> is Rust's growable vector type.",
            why: "Vectors are commonly used when the number of elements can change at runtime.",
            example: `let mut numbers = Vec::new();

numbers.push(10);
numbers.push(20);
numbers.push(30);

println!("{numbers:?}");`,
            mistake: "Trying to insert values of unrelated types into a Vec.",
            correction:
              "A Vec has one element type.",
            labPrompt: "Create a vector of integers and add five values to it.",
            question: "What does Vec provide?",
            answer: "A growable collection.",
            distractors: ["A fixed-size tuple", "A thread", "A lifetime"],
          }),

          lesson({
            slug: "iterators",
            title: "Iterators",
            summary: "Process collections through iterator operations.",
            what: "Iterators provide a way to process sequences of values.",
            why: "Iterator methods can express collection processing clearly and efficiently.",
            example: `let numbers = vec![1, 2, 3, 4, 5];

for number in numbers.iter() {
    println!("{number}");
}`,
            mistake: "Assuming creating an iterator automatically consumes every value immediately.",
            correction:
              "Many iterator operations are lazy and execute as the iterator is consumed.",
            labPrompt: "Create a vector and iterate over its values.",
            question: "What does an iterator provide?",
            answer: "A way to process a sequence of values.",
            distractors: ["A compiler", "A struct definition", "A package"],
          }),

          lesson({
            slug: "iterator-map",
            title: "Iterator map",
            summary: "Transform values using map.",
            what: "map creates an iterator that transforms each input item.",
            why: "It is useful for converting one collection into another form.",
            example: `let numbers = vec![1, 2, 3];

let doubled: Vec<i32> =
    numbers.iter().map(|x| x * 2).collect();`,
            mistake: "Forgetting to consume the iterator when a collection is required.",
            correction:
              "Use collect when you need to turn the iterator into a collection.",
            labPrompt: "Use map to create a vector containing the squares of several numbers.",
            question: "What does map do?",
            answer: "Transforms each iterator item.",
            distractors: ["Deletes every item", "Sorts automatically", "Stops the program"],
          }),

          lesson({
            slug: "rust-modules",
            title: "Modules",
            summary: "Organize Rust code into namespaces and modules.",
            what: "Modules group related definitions and control visibility.",
            why: "Modules help organize larger Rust programs and libraries.",
            example: `mod math {
    pub fn add(a: i32, b: i32) -> i32 {
        a + b
    }
}

fn main() {
    println!("{}", math::add(2, 3));
}`,
            mistake: "Trying to access a private item from outside its module.",
            correction:
              "Use pub when an item needs to be visible outside its module.",
            labPrompt: "Create a math module containing a public add function.",
            question: "Which keyword makes an item public?",
            answer: "pub",
            distractors: ["public", "export", "open"],
          }),

          lesson({
            slug: "rust-unit-tests",
            title: "Unit Tests",
            summary: "Write tests using Rust's built-in testing support.",
            what: "Rust provides built-in support for unit tests using #[test].",
            why: "Tests help verify that functions behave as expected.",
            example: `#[test]
fn test_addition() {
    assert_eq!(2 + 3, 5);
}`,
            mistake: "Writing a test without an assertion that checks the expected behavior.",
            correction:
              "Use assertions such as assert_eq! to verify results.",
            labPrompt: "Write a unit test for a function that adds two numbers.",
            question: "Which attribute marks a function as a test?",
            answer: "#[test]",
            distractors: ["#[check]", "#[unit]", "#[verify]"],
          }),
        ],
      },
    ],
  },

  {
    slug: "error-handling-and-unsafe-rust",
    title: "Error Handling and Unsafe Rust",
    description:
      "Learn panics, Result-based errors, the ? operator, and the purpose of unsafe Rust.",
    topics: [
      {
        slug: "error-handling-and-unsafe-rust",
        title: "Error Handling and Unsafe Rust",
        description:
          "Learn panics, Result-based errors, the ? operator, and the purpose of unsafe Rust.",
        lessons: [
          lesson({
            slug: "rust-panics",
            title: "Panics",
            summary: "Understand unrecoverable error conditions in Rust.",
            what: "A panic represents an unrecoverable error condition that stops normal execution.",
            why: "Understanding panics helps distinguish unrecoverable failures from Result-based errors.",
            example: `fn main() {
    panic!("Something went wrong");
}`,
            mistake: "Using panic for every error that could be handled normally.",
            correction:
              "Use Result for operations where the caller can reasonably handle failure.",
            labPrompt: "Create a small program that intentionally panics.",
            question: "What happens when Rust panics?",
            answer: "Normal execution is terminated.",
            distractors: ["The error is always ignored", "The value is automatically fixed", "The program retries forever"],
          }),

          lesson({
            slug: "question-mark-operator",
            title: "The ? Operator",
            summary: "Propagate errors from Result-returning operations.",
            what: "The ? operator returns an error early when an operation produces Err.",
            why: "It makes Result-based error propagation concise.",
            example: `fn read_value() -> Result<i32, String> {
    let value = get_value()?;
    Ok(value)
}`,
            mistake: "Using ? inside a function that cannot return a compatible Result or Option.",
            correction:
              "The surrounding function must support the type being propagated.",
            labPrompt: "Write a Result-returning function that propagates an error using ?.",
            question: "What happens when ? receives an Err?",
            answer: "The error is returned from the current function.",
            distractors: ["The error is ignored", "The program always panics", "The value becomes zero"],
          }),

          lesson({
            slug: "unsafe-rust",
            title: "Unsafe Rust",
            summary: "Understand what unsafe Rust permits and why it requires extra care.",
            what: "Unsafe Rust allows operations that the compiler cannot fully verify for memory safety.",
            why: "Some low-level operations require capabilities outside safe Rust's guarantees.",
            example: `let mut value = 10;
let pointer: *mut i32 = &mut value;

unsafe {
    *pointer = 20;
}

println!("{value}");`,
            mistake: "Assuming unsafe means the entire Rust program is automatically unsafe.",
            correction:
              "Unsafe marks specific operations where the programmer must uphold additional safety requirements.",
            labPrompt: "Study a small raw-pointer example and identify why the operation requires unsafe.",
            question: "What does unsafe allow?",
            answer: "Certain operations that require the programmer to uphold additional safety requirements.",
            distractors: [
              "It disables all compiler checks",
              "It makes every operation unsafe",
              "It removes Rust's type system",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "concurrency-and-async",
    title: "Concurrency and Async Rust",
    description:
      "Learn threads, channels, shared state, async/await, futures, and tasks.",
    topics: [
      {
        slug: "concurrency-and-async",
        title: "Concurrency and Async Rust",
        description:
          "Learn threads, channels, shared state, async/await, futures, and tasks.",
        lessons: [
          lesson({
            slug: "rust-threads",
            title: "Threads",
            summary: "Run work concurrently using threads.",
            what: "Threads provide separate sequences of execution that can run concurrently.",
            why: "Concurrency allows programs to perform independent work at the same time.",
            example: `use std::thread;

thread::spawn(|| {
    println!("Hello from a thread");
});`,
            mistake: "Assuming spawned work must always finish before the main program exits.",
            correction:
              "Use appropriate synchronization such as joining a thread when its completion is required.",
            labPrompt: "Create a thread that prints a message and join it from the main thread.",
            question: "What does a thread provide?",
            answer: "A separate sequence of execution.",
            distractors: ["A new variable type", "A compiler", "A module"],
          }),

          lesson({
            slug: "channels",
            title: "Channels",
            summary: "Send values between concurrent tasks or threads.",
            what: "Channels provide communication through senders and receivers.",
            why: "They allow concurrent parts of a program to communicate without directly sharing every value.",
            example: `use std::sync::mpsc;
use std::thread;

let (tx, rx) = mpsc::channel();

thread::spawn(move || {
    tx.send("hello").unwrap();
});

println!("{}", rx.recv().unwrap());`,
            mistake: "Trying to use the receiver before a value has been sent.",
            correction:
              "Use the channel's receiving operations appropriately to wait for or check incoming values.",
            labPrompt: "Create a channel and send a message from one thread to another.",
            question: "What are the two main sides of a channel?",
            answer: "Sender and receiver.",
            distractors: ["Reader and writer", "Producer and compiler", "Input and output"],
          }),

          lesson({
            slug: "arc-and-mutex",
            title: "Arc and Mutex",
            summary: "Share mutable state safely between threads.",
            what: "Arc provides shared ownership across threads, while Mutex provides synchronized mutable access.",
            why: "Together they are commonly used when multiple threads need access to shared state.",
            example: `use std::sync::{Arc, Mutex};

let counter = Arc::new(Mutex::new(0));`,
            mistake: "Accessing shared mutable data without synchronization.",
            correction:
              "Use appropriate synchronization primitives when multiple threads access shared mutable state.",
            labPrompt: "Create an Arc<Mutex<i32>> counter and explain what each type provides.",
            question: "What does Mutex provide?",
            answer: "Synchronized access to mutable data.",
            distractors: ["A compiler", "A package", "A lifetime"],
          }),

          lesson({
            slug: "async-await",
            title: "async and await",
            summary: "Understand Rust's asynchronous programming model.",
            what: "async functions produce futures, and await waits for asynchronous work to make progress.",
            why: "Async programming is useful for tasks involving waiting, such as network or I/O operations.",
            example: `async fn fetch_data() -> String {
    String::from("data")
}`,
            mistake: "Thinking an async function immediately performs all of its work just because it was called.",
            correction:
              "An async function creates a future that must be driven by an executor or runtime.",
            labPrompt: "Write a simple async function and identify the future it produces.",
            question: "What does an async function produce?",
            answer: "A future.",
            distractors: ["A thread", "A struct automatically", "A process"],
          }),
        ],
      },
    ],
  },

  {
    slug: "idiomatic-rust",
    title: "Idiomatic Rust",
    description:
      "Use Rust's type system and APIs to write clear, predictable, maintainable code.",
    topics: [
      {
        slug: "idiomatic-rust",
        title: "Idiomatic Rust",
        description:
          "Use Rust's type system and APIs to write clear, predictable, maintainable code.",
        lessons: [
          lesson({
            slug: "meaningful-doc-comments",
            title: "Documentation Comments",
            summary: "Write useful documentation for Rust APIs.",
            what: "Documentation comments explain what an API does and how it should be used.",
            why: "Good documentation makes libraries easier for other developers to understand and use.",
            example: `/// Adds two numbers together.
fn add(a: i32, b: i32) -> i32 {
    a + b
}`,
            mistake: "Documenting implementation details instead of explaining what users need to know.",
            correction:
              "Focus documentation on the purpose, behavior, inputs, outputs, and important constraints of the API.",
            labPrompt: "Add a documentation comment to a simple Rust function.",
            question: "What is the purpose of API documentation?",
            answer: "To explain the behavior and use of an API.",
            distractors: [
              "To replace the compiler",
              "To make variables mutable",
              "To allocate memory",
            ],
          }),

          lesson({
            slug: "newtype-pattern",
            title: "Newtype Pattern",
            summary: "Use a small wrapper type to create stronger type distinctions.",
            what: "The newtype pattern wraps an existing type inside a new type.",
            why: "It can prevent semantic confusion and help enforce invariants.",
            example: `struct UserId(u64);

let id = UserId(42);`,
            mistake: "Treating two different concepts as interchangeable just because they use the same underlying type.",
            correction:
              "Use meaningful wrapper types when different values have different semantic meanings.",
            labPrompt: "Create a newtype for a StudentId using u64 internally.",
            question: "What does a newtype provide?",
            answer: "A distinct type around an existing type.",
            distractors: ["A thread", "A macro", "A package manager"],
          }),

          lesson({
            slug: "drop-and-raii",
            title: "Drop and Resource Management",
            summary: "Understand how Rust cleans up owned resources.",
            what: "The Drop trait lets a type define behavior that occurs when its value is dropped.",
            why: "It supports automatic cleanup of resources when ownership ends.",
            example: `struct Logger;

impl Drop for Logger {
    fn drop(&mut self) {
        println!("Logger dropped");
    }
}`,
            mistake: "Assuming Drop must be called manually for every value.",
            correction:
              "Rust automatically drops owned values when they leave their appropriate scope.",
            labPrompt: "Create a type implementing Drop and observe when its drop method runs.",
            question: "When is Drop commonly used?",
            answer: "For cleanup when an owned value is dropped.",
            distractors: ["For creating loops", "For changing types", "For compiling code"],
          }),
        ],
      },
    ],
  },
];