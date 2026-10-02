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
      "The Go code is using a language feature incorrectly or applying the wrong syntax or data type.",
    hint:
      input.hint ??
      "Check the Go syntax, data type, package, error value, or concurrency behavior involved.",
    labCode: input.labCode ?? input.example,
    output: input.output ?? "Example output appears here.",
  };
}

export const goModules: LocalModuleSeed[] = [
  {
    slug: "go-and-operating-system",
    title: "Go and the operating system",
    description:
      "Learn Go fundamentals, program execution, input and output, command-line arguments, logging, and error handling.",
    topics: [
      {
        slug: "go-introduction",
        title: "Introduction to Go",
        description:
          "Understand Go, its advantages, and the basic tools used to write Go programs.",
        lessons: [
          lesson({
            slug: "what-is-go",
            title: "What is Go?",
            summary:
              "Understand Go as a compiled programming language designed for simplicity and efficient software development.",
            what:
              "Go, also called Golang, is a programming language developed at Google. It provides a simple syntax, compiled execution, garbage collection, and built-in support for concurrency.",
            why:
              "Understanding Go's purpose helps you choose suitable tools for command-line applications, servers, network software, and concurrent programs.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, Go!")\n}',
            output: "Hello, Go!",
            mistake:
              'package main\n\nfunc main() {\n    Println("Hello, Go!")\n}',
            correction:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, Go!")\n}',
            labPrompt:
              "Write a Go program that prints your name and your college.",
            question:
              "Which package provides the Println function used in this example?",
            answer: "The fmt package.",
            distractors: ["The os package.", "The net package."],
          }),
          lesson({
            slug: "go-packages-and-tools",
            title: "Go packages and development tools",
            summary:
              "Learn about packages, documentation, formatting, compiling, and running Go programs.",
            what:
              "Go programs are organized into packages. Common tools include go run, go build, go fmt, go doc, and go test.",
            why:
              "These tools help you execute programs, create compiled binaries, maintain consistent formatting, and understand APIs.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Go tools")\n}',
            output: "Go tools",
            mistake:
              "Save a Go program without checking its formatting or whether it compiles.",
            correction:
              "Run gofmt on the source file and use go run or go build to check the program.",
            labPrompt:
              "Create main.go, format it with gofmt, and run it using go run.",
            question: "Which command formats Go source code?",
            answer: "gofmt",
            distractors: ["go install-format", "go execute"],
          }),
        ],
      },
      {
        slug: "input-output-and-errors",
        title: "Input, output, and errors",
        description:
          "Work with console input, output streams, command-line arguments, logs, and errors.",
        lessons: [
          lesson({
            slug: "standard-input-and-output",
            title: "Standard input and output",
            summary:
              "Print messages and read user input using Go's standard library.",
            what:
              "The fmt package provides functions such as Print, Println, Printf, Scan, and Scanln. The os package exposes standard input, output, and error streams.",
            why:
              "Input and output allow command-line programs to communicate with users and other processes.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    var name string\n    fmt.Print("Enter your name: ")\n    fmt.Scan(&name)\n    fmt.Println("Hello,", name)\n}',
            output: "Enter your name: Maya\nHello, Maya",
            mistake:
              'var name string\nfmt.Scan(name)',
            correction:
              'var name string\nfmt.Scan(&name)',
            mistakeExplanation:
              "Scan needs a pointer to the variable so it can store the input in that variable.",
            labPrompt:
              "Read a user's name and age, then print both values.",
            question:
              "Why is &name passed to fmt.Scan?",
            answer:
              "It passes the address of the variable so Scan can store the input.",
            distractors: [
              "It converts the name into an integer.",
              "It prints the variable twice.",
            ],
          }),
          lesson({
            slug: "command-line-arguments-and-logging",
            title: "Command-line arguments and logging",
            summary:
              "Read command-line arguments and record program messages using Go's logging facilities.",
            what:
              "The os.Args slice contains command-line arguments. The log package provides logging functions, including Print, Fatal, and Panic.",
            why:
              "Arguments let users configure programs when starting them, while logs help developers understand program activity and failures.",
            example:
              'package main\n\nimport (\n    "log"\n    "os"\n)\n\nfunc main() {\n    if len(os.Args) > 1 {\n        log.Println("Argument:", os.Args[1])\n    } else {\n        log.Println("No argument supplied")\n    }\n}',
            output:
              "Running go run main.go Maya prints a log message containing Argument: Maya.",
            mistake:
              "fmt.Println(os.Args[1])",
            correction:
              'if len(os.Args) > 1 {\n    log.Println(os.Args[1])\n}',
            mistakeExplanation:
              "Accessing os.Args[1] without checking the slice length can cause an index-out-of-range panic.",
            labPrompt:
              "Write a program that accepts a command-line name and logs it.",
            question:
              "Which Go variable stores command-line arguments?",
            answer: "os.Args",
            distractors: ["fmt.Input", "log.Args"],
          }),
          lesson({
            slug: "error-handling-in-go",
            title: "Error handling",
            summary:
              "Understand Go's error values and how functions report failures.",
            what:
              "Go commonly returns an error as a value. Programs check whether an error is nil before continuing with an operation that might fail.",
            why:
              "Explicit error handling makes failures visible and helps prevent programs from using invalid results.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "strconv"\n)\n\nfunc main() {\n    number, err := strconv.Atoi("42")\n    if err != nil {\n        fmt.Println("Conversion failed:", err)\n        return\n    }\n    fmt.Println(number)\n}',
            output: "42",
            mistake:
              'number, _ := strconv.Atoi("hello")\nfmt.Println(number)',
            correction:
              'number, err := strconv.Atoi("hello")\nif err != nil {\n    fmt.Println("Conversion failed")\n    return\n}\nfmt.Println(number)',
            mistakeExplanation:
              "Ignoring an error can cause the program to continue without knowing whether the operation succeeded.",
            labPrompt:
              "Convert a user-provided string to an integer and handle invalid input.",
            question:
              "What does a nil error usually indicate?",
            answer: "The operation completed without reporting an error.",
            distractors: [
              "The program has automatically terminated.",
              "The returned value is always zero.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "understanding-go-internals",
    title: "Understanding Go internals",
    description:
      "Explore compilation, garbage collection, defer, panic and recover, unsafe operations, and Go's runtime environment.",
    topics: [
      {
        slug: "compiler-and-memory",
        title: "Compiler and memory management",
        description:
          "Understand compilation and the basics of garbage collection.",
        lessons: [
          lesson({
            slug: "go-compiler",
            title: "The Go compiler",
            summary:
              "Understand how Go source code is compiled into an executable program.",
            what:
              "The Go toolchain compiles Go source code and connects the program with required packages. The go build command produces a build artifact.",
            why:
              "Understanding compilation helps you identify syntax errors, build failures, and problems that occur before execution.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Compiled Go program")\n}',
            output: "Compiled Go program",
            mistake: "Assume that saving main.go automatically creates an executable.",
            correction:
              "Use go build to build an executable or go run to compile and execute the program.",
            labPrompt:
              "Build a Go program and run the resulting executable.",
            question: "Which command builds a Go program?",
            answer: "go build",
            distractors: ["go format-build", "go compile-run"],
          }),
          lesson({
            slug: "garbage-collection",
            title: "Garbage collection",
            summary:
              "Understand how Go automatically manages memory used by objects.",
            what:
              "Go uses garbage collection to reclaim memory that is no longer reachable by the program. The runtime manages this process.",
            why:
              "Automatic memory management reduces the need for manual memory deallocation and helps developers focus on program logic.",
            example:
              'package main\n\nimport "fmt"\n\nfunc createValue() *int {\n    value := 42\n    return &value\n}\n\nfunc main() {\n    value := createValue()\n    fmt.Println(*value)\n}',
            output: "42",
            mistake:
              "Assume that a local variable must become invalid immediately when its function returns.",
            correction:
              "Let Go manage the variable's lifetime according to whether its memory remains needed.",
            labPrompt:
              "Write a function that returns a pointer to an integer and print the pointed-to value.",
            question: "What is the purpose of garbage collection?",
            answer:
              "To reclaim memory that is no longer reachable by the program.",
            distractors: [
              "To format source code.",
              "To execute every goroutine simultaneously.",
            ],
          }),
          lesson({
            slug: "defer-keyword",
            title: "The defer keyword",
            summary:
              "Schedule a function call to execute when the surrounding function returns.",
            what:
              "A defer statement postpones a function call until the surrounding function is about to return. Deferred calls execute in last-in, first-out order.",
            why:
              "Defer is useful for cleanup tasks such as closing files and releasing resources.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    defer fmt.Println("Second")\n    fmt.Println("First")\n}',
            output: "First\nSecond",
            mistake:
              'defer fmt.Println("Cleanup")\nfmt.Println("Finished")\n// Expect Cleanup to print first',
            correction:
              'defer fmt.Println("Cleanup")\nfmt.Println("Finished")',
            mistakeExplanation:
              "A deferred call runs when the surrounding function returns, not immediately at the defer statement.",
            labPrompt:
              "Use defer to print a cleanup message after the main operation.",
            question:
              "When does a deferred function call execute?",
            answer:
              "When the surrounding function is about to return.",
            distractors: [
              "Before the next statement always.",
              "Only when the program crashes.",
            ],
          }),
        ],
      },
      {
        slug: "runtime-and-advanced-features",
        title: "Runtime and advanced features",
        description:
          "Learn about panic recovery, unsafe code, interoperability, and runtime tools.",
        lessons: [
          lesson({
            slug: "panic-and-recover",
            title: "Panic and recover",
            summary:
              "Understand how Go panics work and how recover can handle a panic during deferred execution.",
            what:
              "panic stops normal execution of the current goroutine and begins unwinding its call stack. recover can regain control when called from a deferred function during panic unwinding.",
            why:
              "Understanding panic and recover helps distinguish exceptional program failures from ordinary errors that should be returned as values.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    defer func() {\n        if value := recover(); value != nil {\n            fmt.Println("Recovered:", value)\n        }\n    }()\n\n    panic("unexpected condition")\n}',
            output: "Recovered: unexpected condition",
            mistake:
              'func main() {\n    recover()\n    panic("failure")\n}',
            correction:
              'func main() {\n    defer func() {\n        if value := recover(); value != nil {\n            fmt.Println(value)\n        }\n    }()\n    panic("failure")\n}',
            mistakeExplanation:
              "Calling recover directly during normal execution does not recover a later panic. It must be called from a deferred function during panic unwinding.",
            labPrompt:
              "Create a function that panics and recover from the panic in a deferred function.",
            question: "Where must recover be called to recover a panic?",
            answer:
              "Inside a deferred function during panic unwinding.",
            distractors: [
              "Only in an init function.",
              "Only before the panic occurs.",
            ],
          }),
          lesson({
            slug: "unsafe-and-c-interoperability",
            title: "Unsafe code and C interoperability",
            summary:
              "Explore low-level operations and the relationship between Go and C code.",
            what:
              "The unsafe package provides operations that bypass some Go type-safety guarantees. cgo allows Go programs to interact with C code when configured appropriately.",
            why:
              "These capabilities can support low-level integration, but they require careful attention to memory safety, portability, and build requirements.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "unsafe"\n)\n\nfunc main() {\n    value := int32(10)\n    fmt.Println(unsafe.Sizeof(value))\n}',
            output:
              "4 on platforms where int32 occupies four bytes.",
            mistake:
              "Use unsafe pointer conversions without understanding the underlying memory representation.",
            correction:
              "Prefer ordinary Go types and safe conversions. Use unsafe or cgo only when necessary and when their requirements are understood.",
            labPrompt:
              "Use unsafe.Sizeof to inspect the size of an int32 value.",
            question:
              "What is one important risk of using unsafe?",
            answer:
              "It can bypass normal type-safety guarantees and introduce memory-safety problems.",
            distractors: [
              "It automatically formats Go code.",
              "It makes every function asynchronous.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "go-basic-data-types",
    title: "Working with basic Go data types",
    description:
      "Learn loops, arrays, slices, maps, constants, pointers, and date and time operations.",
    topics: [
      {
        slug: "loops-and-collections",
        title: "Loops and collections",
        description:
          "Use loops, arrays, slices, and maps to work with groups of values.",
        lessons: [
          lesson({
            slug: "for-and-range-loops",
            title: "For and range loops",
            summary:
              "Repeat operations using Go's for statement and range keyword.",
            what:
              "Go uses for for repetition. The range keyword iterates over elements of arrays, slices, maps, strings, and channels.",
            why:
              "Loops allow programs to process collections, repeat calculations, and automate repetitive tasks.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    numbers := []int{10, 20, 30}\n    for index, value := range numbers {\n        fmt.Println(index, value)\n    }\n}',
            output: "0 10\n1 20\n2 30",
            mistake:
              "for i := 0; i <= len(numbers); i++",
            correction:
              "for i := 0; i < len(numbers); i++",
            mistakeExplanation:
              "Slice indexes end at len(numbers)-1, so using <= can access an index outside the slice.",
            labPrompt:
              "Use a range loop to print every element in a slice.",
            question: "What does range provide when iterating over a slice?",
            answer:
              "The index and element value, unless one of them is discarded.",
            distractors: [
              "Only a new slice.",
              "A pointer to the Go runtime.",
            ],
          }),
          lesson({
            slug: "arrays-and-slices",
            title: "Arrays and slices",
            summary:
              "Understand fixed-length arrays and flexible slice views over arrays.",
            what:
              "An array has a fixed length as part of its type. A slice describes a segment of an underlying array and can grow through operations such as append.",
            why:
              "Slices are widely used in Go because they provide a convenient way to work with collections of values.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    numbers := []int{1, 2, 3}\n    numbers = append(numbers, 4)\n    fmt.Println(numbers)\n}',
            output: "[1 2 3 4]",
            mistake:
              "numbers := []int{1, 2, 3}\nappend(numbers, 4)",
            correction:
              "numbers := []int{1, 2, 3}\nnumbers = append(numbers, 4)",
            mistakeExplanation:
              "append returns a slice. Assign its result to retain the updated slice.",
            labPrompt:
              "Create a slice of five numbers, append another number, and print the result.",
            question: "Which built-in function can add elements to a slice?",
            answer: "append",
            distractors: ["insertSlice", "pushArray"],
          }),
          lesson({
            slug: "maps-and-nil-maps",
            title: "Maps",
            summary:
              "Store and retrieve values using key-value pairs.",
            what:
              "A Go map associates keys with values. A map must be initialized before new key-value entries can be stored in it.",
            why:
              "Maps provide a convenient way to look up values by meaningful keys rather than numeric positions.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    scores := map[string]int{\n        "Maya": 90,\n        "Ravi": 85,\n    }\n    fmt.Println(scores["Maya"])\n}',
            output: "90",
            mistake:
              'var scores map[string]int\nscores["Maya"] = 90',
            correction:
              'scores := make(map[string]int)\nscores["Maya"] = 90',
            mistakeExplanation:
              "A nil map can be read from, but assigning a new key-value entry to it causes a runtime panic.",
            labPrompt:
              "Create a map of student names and marks, then retrieve one student's marks.",
            question:
              "Which function can initialize an empty map?",
            answer: "make",
            distractors: ["append", "copy"],
          }),
        ],
      },
      {
        slug: "constants-pointers-and-time",
        title: "Constants, pointers, and time",
        description:
          "Work with fixed values, memory references, and date and time operations.",
        lessons: [
          lesson({
            slug: "constants-and-iota",
            title: "Constants and iota",
            summary:
              "Declare fixed values and generate sequences of related constants.",
            what:
              "The const keyword declares constants. The iota identifier generates successive integer values within a constant declaration block.",
            why:
              "Constants make fixed values explicit, while iota can simplify groups of related numeric constants.",
            example:
              'package main\n\nimport "fmt"\n\nconst (\n    First = iota\n    Second\n    Third\n)\n\nfunc main() {\n    fmt.Println(First, Second, Third)\n}',
            output: "0 1 2",
            mistake:
              "const limit = 10\nlimit = 20",
            correction:
              "const limit = 10",
            mistakeExplanation:
              "A constant cannot be reassigned after it is declared.",
            labPrompt:
              "Declare three constants using iota to represent three levels.",
            question: "What does iota commonly generate?",
            answer:
              "Successive integer values in a constant declaration block.",
            distractors: [
              "Random floating-point numbers.",
              "Automatically generated strings.",
            ],
          }),
          lesson({
            slug: "pointers",
            title: "Pointers",
            summary:
              "Understand how pointer values refer to variables.",
            what:
              "A pointer stores the address of a value. The & operator obtains an address, and the * operator can access the value through a pointer.",
            why:
              "Pointers let functions access or modify existing values without copying the value itself.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    number := 10\n    pointer := &number\n    *pointer = 25\n    fmt.Println(number)\n}',
            output: "25",
            mistake:
              "number := 10\nvar pointer *int\n*pointer = 25",
            correction:
              "number := 10\npointer := &number\n*pointer = 25",
            mistakeExplanation:
              "A nil pointer does not point to a valid integer and cannot be dereferenced.",
            labPrompt:
              "Use a pointer to change an integer variable and print the updated value.",
            question: "What does &number return?",
            answer: "The address of number.",
            distractors: [
              "The text representation of number.",
              "The length of number.",
            ],
          }),
          lesson({
            slug: "working-with-time",
            title: "Dates and times",
            summary:
              "Use Go's time package to create, format, and parse time values.",
            what:
              "The time package provides the Time type and functions for obtaining the current time, parsing time strings, and formatting dates and times.",
            why:
              "Date and time operations are essential for timestamps, scheduling, logging, and time-based calculations.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc main() {\n    now := time.Date(2025, time.January, 1, 10, 30, 0, 0, time.UTC)\n    fmt.Println(now.Format("2006-01-02"))\n}',
            output: "2025-01-01",
            mistake:
              'now.Format("YYYY-MM-DD")',
            correction:
              'now.Format("2006-01-02")',
            mistakeExplanation:
              "Go uses a reference time layout rather than conventional YYYY-MM-DD formatting tokens.",
            labPrompt:
              "Create a time value and print its date in year-month-day format.",
            question:
              "Which package provides Go's Time type?",
            answer: "time",
            distractors: ["date", "calendar"],
          }),
        ],
      },
    ],
  },

  {
    slug: "go-composite-types",
    title: "The uses of composite types",
    description:
      "Explore structs, strings, runes, regular expressions, switch statements, and key-value data.",
    topics: [
      {
        slug: "structs-and-strings",
        title: "Structs and strings",
        description:
          "Group related fields and process text in Go.",
        lessons: [
          lesson({
            slug: "structures-and-pointers",
            title: "Structures and pointers to structures",
            summary:
              "Group related values into a struct and access them through a value or pointer.",
            what:
              "A struct is a composite type that groups fields under one type. A pointer to a struct refers to a particular struct value.",
            why:
              "Structs help model related information such as students, products, accounts, and network messages.",
            example:
              'package main\n\nimport "fmt"\n\ntype Student struct {\n    Name string\n    Age  int\n}\n\nfunc main() {\n    student := Student{Name: "Maya", Age: 20}\n    fmt.Println(student.Name, student.Age)\n}',
            output: "Maya 20",
            mistake:
              'type Student struct {\n    Name string\n}\n\nstudent := Student\nfmt.Println(student.Name)',
            correction:
              'type Student struct {\n    Name string\n}\n\nstudent := Student{Name: "Maya"}\nfmt.Println(student.Name)',
            mistakeExplanation:
              "A type declaration defines a struct type; it does not create a populated struct value by itself.",
            labPrompt:
              "Create a Product struct with a name and price, then print both fields.",
            question: "Which keyword declares a struct type?",
            answer: "struct",
            distractors: ["record", "object"],
          }),
          lesson({
            slug: "strings-and-runes",
            title: "Strings, bytes, and runes",
            summary:
              "Understand Go strings and how Unicode characters are represented.",
            what:
              "A Go string is a read-only sequence of bytes. A rune represents a Unicode code point, while a byte represents an 8-bit value.",
            why:
              "Understanding bytes and runes helps prevent mistakes when processing non-ASCII text.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    text := "Go"\n    for _, character := range text {\n        fmt.Printf("%c ", character)\n    }\n}',
            output: "G o",
            mistake:
              'text := "Go"\ntext[0] = \'N\'',
            correction:
              'text := "Go"\ntext = "No"',
            mistakeExplanation:
              "Strings are immutable, so their bytes cannot be modified directly.",
            labPrompt:
              "Iterate over a string containing English letters and print its runes.",
            question:
              "What does a rune represent in Go?",
            answer: "A Unicode code point.",
            distractors: [
              "A complete Go package.",
              "A dynamically growing array only.",
            ],
          }),
          lesson({
            slug: "regular-expressions",
            title: "Regular expressions and pattern matching",
            summary:
              "Find or validate text patterns using the regexp package.",
            what:
              "Go's regexp package supports regular expression matching, searching, and replacement operations.",
            why:
              "Pattern matching is useful for validating input and extracting information from text.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "regexp"\n)\n\nfunc main() {\n    matched, _ := regexp.MatchString(`^[0-9]+$`, "12345")\n    fmt.Println(matched)\n}',
            output: "true",
            mistake:
              'matched, _ := regexp.MatchString(`[0-9]+`, "abc")\nfmt.Println(matched)',
            correction:
              'matched, err := regexp.MatchString(`^[0-9]+$`, "12345")\nif err != nil {\n    panic(err)\n}\nfmt.Println(matched)',
            mistakeExplanation:
              "A pattern without start and end anchors can match a substring rather than requiring the entire input to match.",
            labPrompt:
              "Write a regular expression that checks whether a string contains only digits.",
            question:
              "Which package provides regular expression support in Go?",
            answer: "regexp",
            distractors: ["pattern", "textmatch"],
          }),
        ],
      },
      {
        slug: "switch-and-key-value-store",
        title: "Switch statements and key-value stores",
        description:
          "Control program flow and organize information by keys.",
        lessons: [
          lesson({
            slug: "switch-statement",
            title: "The switch statement",
            summary:
              "Select a branch of code based on a value or condition.",
            what:
              "A switch statement evaluates a value or expression and executes the matching case. Go normally ends a case without automatically falling through.",
            why:
              "Switch statements can make multiple alternative conditions easier to read than long chains of if and else if statements.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    day := 2\n    switch day {\n    case 1:\n        fmt.Println("Monday")\n    case 2:\n        fmt.Println("Tuesday")\n    default:\n        fmt.Println("Other day")\n    }\n}',
            output: "Tuesday",
            mistake:
              "switch day {\ncase 1:\n    fmt.Println(\"Monday\")\ncase 2:\n    fmt.Println(\"Tuesday\")\n}",
            correction:
              "switch day {\ncase 1:\n    fmt.Println(\"Monday\")\ncase 2:\n    fmt.Println(\"Tuesday\")\ndefault:\n    fmt.Println(\"Other day\")\n}",
            mistakeExplanation:
              "Without a default case, unexpected values may have no matching branch.",
            labPrompt:
              "Use switch to print a message for three menu choices.",
            question:
              "Which switch branch can handle values not matched by other cases?",
            answer: "default",
            distractors: ["otherwise", "elsecase"],
          }),
          lesson({
            slug: "key-value-store",
            title: "Building a key-value store",
            summary:
              "Use a map to store, retrieve, update, and remove values by key.",
            what:
              "A key-value store associates a unique key with a value. A Go map can implement a simple in-memory version of this structure.",
            why:
              "Key-value storage is useful for configuration, caching, lookup tables, and small in-memory data stores.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    store := map[string]string{}\n    store["language"] = "Go"\n    value, exists := store["language"]\n    fmt.Println(value, exists)\n}',
            output: "Go true",
            mistake:
              'value := store["missing"]\nfmt.Println(value)',
            correction:
              'value, exists := store["missing"]\nif exists {\n    fmt.Println(value)\n} else {\n    fmt.Println("Key not found")\n}',
            mistakeExplanation:
              "Reading a missing map key returns the value type's zero value, which alone does not indicate whether the key exists.",
            labPrompt:
              "Create an in-memory key-value store with operations to add, look up, and delete entries.",
            question:
              "How can you check whether a map key exists?",
            answer:
              "Use the comma-ok form: value, exists := store[key].",
            distractors: [
              "Use append(store, key).",
              "Use len(store[key]) for every value type.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "go-data-structures",
    title: "Enhancing Go code with data structures",
    description:
      "Learn algorithm complexity and implement trees, hash tables, linked lists, stacks, queues, and container structures.",
    topics: [
      {
        slug: "trees-and-hash-tables",
        title: "Trees and hash tables",
        description:
          "Understand nodes, algorithm complexity, binary trees, and hash-based lookup.",
        lessons: [
          lesson({
            slug: "algorithm-complexity",
            title: "Algorithm complexity",
            summary:
              "Understand how time and memory requirements change as input size grows.",
            what:
              "Algorithm complexity describes how an algorithm's resource requirements grow with input size. Big O notation commonly expresses an upper bound on growth.",
            why:
              "Complexity analysis helps compare approaches and anticipate performance problems as datasets grow.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    numbers := []int{10, 20, 30, 40}\n    for _, number := range numbers {\n        fmt.Println(number)\n    }\n}',
            output: "10\n20\n30\n40",
            mistake:
              "Assume every algorithm that uses a loop has constant time complexity.",
            correction:
              "Analyze how many times the loop executes relative to the input size.",
            labPrompt:
              "Compare a single loop with a nested loop and describe how their work grows with input size.",
            question:
              "What does O(n) generally describe?",
            answer:
              "An algorithm whose work grows linearly with input size.",
            distractors: [
              "An algorithm that always performs one operation.",
              "An algorithm that cannot terminate.",
            ],
          }),
          lesson({
            slug: "binary-trees",
            title: "Binary trees",
            summary:
              "Understand nodes, children, and basic binary tree traversal.",
            what:
              "A binary tree is a tree structure in which each node has at most two children, often called the left and right child.",
            why:
              "Binary trees can organize hierarchical data and support operations such as searching and traversal.",
            example:
              'package main\n\nimport "fmt"\n\ntype Node struct {\n    Value int\n    Left  *Node\n    Right *Node\n}\n\nfunc main() {\n    root := &Node{Value: 10}\n    root.Left = &Node{Value: 5}\n    root.Right = &Node{Value: 15}\n    fmt.Println(root.Value, root.Left.Value, root.Right.Value)\n}',
            output: "10 5 15",
            mistake:
              "Assume every binary tree is automatically balanced.",
            correction:
              "Choose or implement a balancing strategy when the operations and performance requirements need it.",
            labPrompt:
              "Create a binary tree with a root and two children, then print their values.",
            question:
              "How many children can a node in a binary tree have at most?",
            answer: "Two.",
            distractors: ["One.", "Unlimited."],
          }),
          lesson({
            slug: "hash-tables",
            title: "Hash tables",
            summary:
              "Understand key-based lookup and the role of hashing.",
            what:
              "A hash table uses a hash function to help locate stored values. Collisions occur when multiple keys map to the same location and must be handled.",
            why:
              "Hash tables can provide efficient average-case lookup and are a foundation for many map implementations.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    ages := map[string]int{\n        "Maya": 20,\n        "Ravi": 21,\n    }\n    fmt.Println(ages["Ravi"])\n}',
            output: "21",
            mistake:
              "Assume every hash table lookup is guaranteed to take constant time.",
            correction:
              "Remember that constant-time lookup is an average-case expectation under suitable conditions, not a universal guarantee.",
            labPrompt:
              "Create a map of product codes and quantities and retrieve a quantity by code.",
            question:
              "What is a hash collision?",
            answer:
              "When different keys produce the same hash location or value.",
            distractors: [
              "When a map contains no entries.",
              "When a loop repeats the same value.",
            ],
          }),
        ],
      },
      {
        slug: "lists-stacks-and-queues",
        title: "Lists, stacks, and queues",
        description:
          "Understand linked structures and standard container utilities.",
        lessons: [
          lesson({
            slug: "linked-lists",
            title: "Linked lists",
            summary:
              "Represent a sequence using nodes connected by pointers.",
            what:
              "A linked list contains nodes that reference other nodes. A singly linked list normally connects each node to the next node.",
            why:
              "Linked lists are useful for learning pointer-based structures and understanding trade-offs between sequential access and insertion.",
            example:
              'package main\n\nimport "fmt"\n\ntype Node struct {\n    Value int\n    Next  *Node\n}\n\nfunc main() {\n    third := &Node{Value: 3}\n    second := &Node{Value: 2, Next: third}\n    first := &Node{Value: 1, Next: second}\n\n    for current := first; current != nil; current = current.Next {\n        fmt.Println(current.Value)\n    }\n}',
            output: "1\n2\n3",
            mistake:
              "Advance through a linked list without checking whether the current node is nil.",
            correction:
              "Use a loop condition such as current != nil before accessing current.Value or current.Next.",
            labPrompt:
              "Create a linked list of five nodes and print every value.",
            question:
              "What does the Next field normally contain in a singly linked list?",
            answer:
              "A pointer to the next node, or nil at the end.",
            distractors: [
              "The index of the node in an array.",
              "The complete linked list as a string.",
            ],
          }),
          lesson({
            slug: "stacks-and-queues",
            title: "Stacks and queues",
            summary:
              "Understand last-in-first-out and first-in-first-out data structures.",
            what:
              "A stack uses last-in-first-out behavior, while a queue uses first-in-first-out behavior. Both can be implemented using slices or linked structures.",
            why:
              "Stacks and queues are useful for task processing, parsing, traversal, buffering, and scheduling.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    stack := []int{}\n    stack = append(stack, 10, 20, 30)\n\n    top := stack[len(stack)-1]\n    stack = stack[:len(stack)-1]\n    fmt.Println(top, stack)\n}',
            output: "30 [10 20]",
            mistake:
              "Read stack[len(stack)-1] before checking whether the stack contains any elements.",
            correction:
              "Check len(stack) > 0 before reading or removing the top element.",
            mistakeExplanation:
              "An empty slice has no last element, so indexing it with -1 causes a runtime panic.",
            labPrompt:
              "Implement push and pop operations for a stack using a slice.",
            question:
              "Which principle does a stack follow?",
            answer: "Last in, first out (LIFO).",
            distractors: [
              "First in, first out (FIFO).",
              "Random order only.",
            ],
          }),
          lesson({
            slug: "container-package",
            title: "The container package",
            summary:
              "Explore standard library containers such as lists, rings, and heaps.",
            what:
              "Go's container package includes container/list for doubly linked lists, container/ring for circular lists, and container/heap for heap-based priority structures.",
            why:
              "Standard containers provide reusable structures for cases where ordinary slices and maps do not fit the required operations.",
            example:
              'package main\n\nimport (\n    "container/list"\n    "fmt"\n)\n\nfunc main() {\n    values := list.New()\n    values.PushBack(10)\n    values.PushBack(20)\n\n    for element := values.Front(); element != nil; element = element.Next() {\n        fmt.Println(element.Value)\n    }\n}',
            output: "10\n20",
            mistake:
              'values := list.New()\nvalues.PushBack(10)\nfmt.Println(values.Front().Next().Value)',
            correction:
              'values := list.New()\nvalues.PushBack(10)\nif element := values.Front(); element != nil {\n    fmt.Println(element.Value)\n}',
            mistakeExplanation:
              "A list element's Next method returns nil when there is no next element.",
            labPrompt:
              "Create a doubly linked list using container/list and print its values.",
            question:
              "Which package contains Go's heap interface?",
            answer: "container/heap",
            distractors: ["container/queue", "container/tree"],
          }),
        ],
      },
    ],
  },

  {
    slug: "go-packages-and-functions",
    title: "Go packages and functions",
    description:
      "Explore functions, multiple return values, package organization, initialization, templates, and reusable code.",
    topics: [
      {
        slug: "functions",
        title: "Functions and return values",
        description:
          "Write reusable functions with parameters and return values.",
        lessons: [
          lesson({
            slug: "go-functions",
            title: "Go functions",
            summary:
              "Declare functions that accept parameters and return results.",
            what:
              "A function groups reusable statements. Go functions can accept parameters, return one or multiple values, and use named return values.",
            why:
              "Functions divide programs into smaller, reusable units that are easier to test and maintain.",
            example:
              'package main\n\nimport "fmt"\n\nfunc add(a int, b int) int {\n    return a + b\n}\n\nfunc main() {\n    fmt.Println(add(5, 3))\n}',
            output: "8",
            mistake:
              "func add(a int, b int) {\n    return a + b\n}",
            correction:
              "func add(a int, b int) int {\n    return a + b\n}",
            mistakeExplanation:
              "A function that returns a value must declare a compatible return type.",
            labPrompt:
              "Write a function that accepts two integers and returns their product.",
            question:
              "Where is the return type written in a Go function declaration?",
            answer:
              "After the parameter list and before the function body.",
            distractors: [
              "Before the func keyword.",
              "Inside the function's closing brace.",
            ],
          }),
          lesson({
            slug: "multiple-return-values",
            title: "Multiple return values",
            summary:
              "Return more than one value from a function.",
            what:
              "Go functions can return multiple values. This is often used to return a result together with an error.",
            why:
              "Multiple return values let a function report both useful data and whether an operation succeeded.",
            example:
              'package main\n\nimport "fmt"\n\nfunc divide(a, b int) (int, error) {\n    if b == 0 {\n        return 0, fmt.Errorf("division by zero")\n    }\n    return a / b, nil\n}\n\nfunc main() {\n    result, err := divide(10, 2)\n    if err != nil {\n        fmt.Println(err)\n        return\n    }\n    fmt.Println(result)\n}',
            output: "5",
            mistake:
              "func divide(a, b int) int {\n    return a / b, nil\n}",
            correction:
              "func divide(a, b int) (int, error) {\n    return a / b, nil\n}",
            mistakeExplanation:
              "The function's declared return types must match the values returned.",
            labPrompt:
              "Create a function that returns a number and an error when the input is invalid.",
            question:
              "Why do Go functions often return an error alongside a result?",
            answer:
              "To communicate whether the operation succeeded or failed.",
            distractors: [
              "To automatically retry the function.",
              "To make the result a goroutine.",
            ],
          }),
          lesson({
            slug: "anonymous-and-higher-order-functions",
            title: "Anonymous and higher-order functions",
            summary:
              "Use function values, anonymous functions, and functions that accept other functions.",
            what:
              "Go supports anonymous functions and function values. Functions can be passed as arguments and returned from other functions.",
            why:
              "Function values enable callbacks, reusable operations, and flexible program behavior.",
            example:
              'package main\n\nimport "fmt"\n\nfunc apply(value int, operation func(int) int) int {\n    return operation(value)\n}\n\nfunc main() {\n    result := apply(5, func(n int) int {\n        return n * 2\n    })\n    fmt.Println(result)\n}',
            output: "10",
            mistake:
              "Pass a function's result when the parameter expects a function value.",
            correction:
              "Pass a function value with a matching signature, such as func(n int) int { return n * 2 }.",
            labPrompt:
              "Write a function that accepts another function and applies it to a number.",
            question:
              "What is an anonymous function?",
            answer:
              "A function defined without a name.",
            distractors: [
              "A function that cannot accept parameters.",
              "A function that always runs concurrently.",
            ],
          }),
        ],
      },
      {
        slug: "package-design-and-templates",
        title: "Package design and templates",
        description:
          "Create reusable packages and generate text or HTML output.",
        lessons: [
          lesson({
            slug: "creating-go-packages",
            title: "Creating Go packages",
            summary:
              "Organize code into packages and expose reusable identifiers.",
            what:
              "A Go package groups related source files. Identifiers beginning with an uppercase letter are exported and can be accessed from other packages.",
            why:
              "Well-organized packages make projects easier to reuse, understand, test, and maintain.",
            example:
              'package mathutil\n\nfunc Add(a, b int) int {\n    return a + b\n}',
            output:
              "The mathutil package exports an Add function that returns the sum of two integers.",
            mistake:
              "package mathutil\n\nfunc add(a, b int) int {\n    return a + b\n}\n\n// Attempt to call mathutil.add from another package.",
            correction:
              "package mathutil\n\nfunc Add(a, b int) int {\n    return a + b\n}",
            mistakeExplanation:
              "The lowercase add identifier is unexported and cannot be accessed from another package.",
            labPrompt:
              "Create a mathutil package with exported Add and Multiply functions.",
            question:
              "How does a Go package export a function?",
            answer:
              "The function name begins with an uppercase letter.",
            distractors: [
              "The function name begins with a number.",
              "The function must always be named main.",
            ],
          }),
          lesson({
            slug: "text-and-html-templates",
            title: "Text and HTML templates",
            summary:
              "Generate text and HTML documents using Go templates.",
            what:
              "The text/template package generates text from templates and data. The html/template package provides contextual escaping for HTML output.",
            why:
              "Templates separate presentation from program logic and help generate structured output.",
            example:
              'package main\n\nimport (\n    "html/template"\n    "os"\n)\n\nfunc main() {\n    page := template.Must(template.New("page").Parse("Hello, {{.}}!"))\n    page.Execute(os.Stdout, "Go")\n}',
            output: "Hello, Go!",
            mistake:
              'template.Must(template.New("page").Parse("Hello, {{.}}!"))',
            correction:
              'page := template.Must(template.New("page").Parse("Hello, {{.}}!"))\npage.Execute(os.Stdout, "Go")',
            mistakeExplanation:
              "Parsing a template prepares it, but Execute is needed to render it with data.",
            labPrompt:
              "Create a template that prints a person's name and execute it with sample data.",
            question:
              "Which package is designed for generating HTML safely?",
            answer: "html/template",
            distractors: ["html/unsafe", "text/htmlwriter"],
          }),
        ],
      },
    ],
  },

  {
    slug: "go-interfaces-and-reflection",
    title: "Reflection and interfaces",
    description:
      "Learn methods, interfaces, type assertions, reflection, and object-oriented design in Go.",
    topics: [
      {
        slug: "methods-and-interfaces",
        title: "Methods and interfaces",
        description:
          "Attach behavior to types and write code against interfaces.",
        lessons: [
          lesson({
            slug: "type-methods",
            title: "Methods and receivers",
            summary:
              "Define methods that operate on values of a particular type.",
            what:
              "A Go method is a function with a receiver. The receiver associates the method with a type and can be a value or a pointer.",
            why:
              "Methods organize behavior around the types they operate on and support clear APIs.",
            example:
              'package main\n\nimport "fmt"\n\ntype Rectangle struct {\n    Width  float64\n    Height float64\n}\n\nfunc (r Rectangle) Area() float64 {\n    return r.Width * r.Height\n}\n\nfunc main() {\n    rectangle := Rectangle{Width: 4, Height: 3}\n    fmt.Println(rectangle.Area())\n}',
            output: "12",
            mistake:
              "func Area(r Rectangle) float64 {\n    return r.Width * r.Height\n}\n\n// Call rectangle.Area()",
            correction:
              "func (r Rectangle) Area() float64 {\n    return r.Width * r.Height\n}",
            mistakeExplanation:
              "A standalone function does not become a method unless it has a receiver.",
            labPrompt:
              "Create a Circle type with a method that calculates its area.",
            question:
              "What connects a Go method to a type?",
            answer: "Its receiver.",
            distractors: [
              "A package comment only.",
              "The main function's name.",
            ],
          }),
          lesson({
            slug: "go-interfaces",
            title: "Interfaces",
            summary:
              "Describe behavior through method sets rather than concrete implementation details.",
            what:
              "An interface specifies a set of methods. A type satisfies an interface by implementing its required methods, without an explicit declaration.",
            why:
              "Interfaces make code flexible and help functions work with different concrete types that share behavior.",
            example:
              'package main\n\nimport "fmt"\n\ntype Speaker interface {\n    Speak() string\n}\n\ntype Dog struct{}\n\nfunc (Dog) Speak() string {\n    return "Woof"\n}\n\nfunc greet(s Speaker) {\n    fmt.Println(s.Speak())\n}\n\nfunc main() {\n    greet(Dog{})\n}',
            output: "Woof",
            mistake:
              "Assume a type must explicitly declare that it implements an interface.",
            correction:
              "Implement all required methods with compatible signatures; Go checks interface satisfaction implicitly.",
            labPrompt:
              "Create a Shape interface and implement it for a Rectangle type.",
            question:
              "How does a type satisfy a Go interface?",
            answer:
              "By implementing all methods required by the interface.",
            distractors: [
              "By extending a base class.",
              "By importing the interface's package only.",
            ],
          }),
          lesson({
            slug: "type-assertions",
            title: "Type assertions and type switches",
            summary:
              "Inspect the concrete value stored inside an interface.",
            what:
              "A type assertion checks whether an interface value holds a particular concrete type. A type switch checks multiple possible dynamic types.",
            why:
              "Type assertions help recover concrete values when working with interface values.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    var value any = "Hello"\n    text, ok := value.(string)\n    if ok {\n        fmt.Println(text)\n    }\n}',
            output: "Hello",
            mistake:
              'var value any = 10\ntext := value.(string)',
            correction:
              'var value any = 10\ntext, ok := value.(string)\nif ok {\n    fmt.Println(text)\n} else {\n    fmt.Println("Not a string")\n}',
            mistakeExplanation:
              "A single-result assertion panics if the stored value is not the asserted type.",
            labPrompt:
              "Write a program that checks whether an interface value contains a string or an integer.",
            question:
              "What does the comma-ok form of a type assertion provide?",
            answer:
              "The asserted value and a Boolean indicating whether the assertion succeeded.",
            distractors: [
              "The value and its memory size.",
              "A new interface declaration.",
            ],
          }),
        ],
      },
      {
        slug: "reflection-and-design",
        title: "Reflection and design",
        description:
          "Inspect types at runtime and understand Go's approach to object-oriented programming.",
        lessons: [
          lesson({
            slug: "reflection",
            title: "Reflection",
            summary:
              "Inspect values and types at runtime using the reflect package.",
            what:
              "The reflect package provides facilities for inspecting the type and value of data at runtime and, in permitted cases, accessing or modifying values.",
            why:
              "Reflection supports tools and frameworks that need to examine types dynamically, but it can make code more complex.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "reflect"\n)\n\nfunc main() {\n    value := 42\n    fmt.Println(reflect.TypeOf(value))\n}',
            output: "int",
            mistake:
              "Use reflection for a simple operation that can be performed directly with normal Go code.",
            correction:
              "Prefer ordinary types and interfaces unless runtime inspection is actually needed.",
            labPrompt:
              "Use reflect.TypeOf to print the types of an integer and a string.",
            question:
              "Which package provides reflection in Go?",
            answer: "reflect",
            distractors: ["runtime/typeinfo", "inspect"],
          }),
          lesson({
            slug: "object-oriented-programming-in-go",
            title: "Object-oriented programming in Go",
            summary:
              "Understand how Go combines types, methods, and interfaces without traditional class inheritance.",
            what:
              "Go supports encapsulation through packages, behavior through methods, and polymorphism through interfaces. It does not use traditional class inheritance.",
            why:
              "Understanding Go's design helps developers model reusable behavior using composition and interfaces.",
            example:
              'package main\n\nimport "fmt"\n\ntype Greeter struct {\n    Name string\n}\n\nfunc (g Greeter) Greet() string {\n    return "Hello, " + g.Name\n}\n\nfunc main() {\n    g := Greeter{Name: "Maya"}\n    fmt.Println(g.Greet())\n}',
            output: "Hello, Maya",
            mistake:
              "Try to declare a class using a class keyword in Go.",
            correction:
              "Define a type, use a struct when appropriate, and attach methods using receivers.",
            mistakeExplanation:
              "Go uses type declarations and methods rather than a traditional class declaration syntax.",
            labPrompt:
              "Model a BankAccount using a struct and methods to deposit and inspect its balance.",
            question:
              "How does Go commonly support polymorphism?",
            answer: "Through interfaces.",
            distractors: [
              "Through a required base class.",
              "Through method overloading only.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "go-unix-and-file-programming",
    title: "Telling a Unix system what to do",
    description:
      "Work with command-line flags, files, buffers, signals, pipes, directories, and operating-system facilities.",
    topics: [
      {
        slug: "files-and-command-line",
        title: "Command-line tools and file operations",
        description:
          "Build command-line programs and read and write files.",
        lessons: [
          lesson({
            slug: "flag-package",
            title: "Command-line flags",
            summary:
              "Parse named options passed to a Go program.",
            what:
              "The flag package parses command-line flags and provides typed helpers for options such as strings, integers, and Boolean values.",
            why:
              "Flags make command-line applications easier to configure without changing their source code.",
            example:
              'package main\n\nimport (\n    "flag"\n    "fmt"\n)\n\nfunc main() {\n    name := flag.String("name", "Guest", "name to greet")\n    flag.Parse()\n    fmt.Println("Hello,", *name)\n}',
            output:
              "Running the program with -name=Maya prints Hello, Maya.",
            mistake:
              "Read a flag's value before calling flag.Parse.",
            correction:
              "Declare the flag, call flag.Parse, and then use the value through its pointer.",
            labPrompt:
              "Create a command-line program with a name flag and a greeting message.",
            question: "What does flag.Parse do?",
            answer:
              "It parses the command-line flags provided to the program.",
            distractors: [
              "It compiles every package.",
              "It creates an HTTP server.",
            ],
          }),
          lesson({
            slug: "reading-and-writing-files",
            title: "Reading and writing files",
            summary:
              "Use Go's file APIs to read data and save output.",
            what:
              "Go provides os, io, bufio, and related packages for file operations. Operations that can fail commonly return an error that should be checked.",
            why:
              "File input and output allow applications to persist information, process datasets, and work with system files.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "os"\n)\n\nfunc main() {\n    err := os.WriteFile("message.txt", []byte("Hello, Go"), 0644)\n    if err != nil {\n        fmt.Println(err)\n        return\n    }\n\n    data, err := os.ReadFile("message.txt")\n    if err != nil {\n        fmt.Println(err)\n        return\n    }\n    fmt.Println(string(data))\n}',
            output: "Hello, Go",
            mistake:
              'data, _ := os.ReadFile("missing.txt")\nfmt.Println(string(data))',
            correction:
              'data, err := os.ReadFile("message.txt")\nif err != nil {\n    fmt.Println(err)\n    return\n}\nfmt.Println(string(data))',
            mistakeExplanation:
              "Reading a missing or inaccessible file can fail. Ignoring the returned error hides that failure.",
            labPrompt:
              "Write a text file, read its contents, and print the contents to the console.",
            question:
              "What does os.ReadFile return?",
            answer:
              "The file contents as a byte slice and an error value.",
            distractors: [
              "Only a file path string.",
              "A running goroutine.",
            ],
          }),
          lesson({
            slug: "buffered-io-and-csv",
            title: "Buffered I/O and CSV files",
            summary:
              "Process input efficiently using buffering and structured CSV readers and writers.",
            what:
              "The bufio package provides buffered reading and writing. The encoding/csv package supports reading and writing comma-separated records.",
            why:
              "Buffering and structured file parsing are useful when processing large text files and datasets.",
            example:
              'package main\n\nimport (\n    "encoding/csv"\n    "fmt"\n    "strings"\n)\n\nfunc main() {\n    reader := csv.NewReader(strings.NewReader("name,age\\nMaya,20"))\n    records, err := reader.ReadAll()\n    if err != nil {\n        panic(err)\n    }\n    fmt.Println(records[1][0], records[1][1])\n}',
            output: "Maya 20",
            mistake:
              "Split every CSV line on commas without considering quoted fields.",
            correction:
              "Use encoding/csv to parse CSV records correctly, including quoted fields.",
            labPrompt:
              "Read a small CSV string containing student names and marks, then print each record.",
            question:
              "Which package parses CSV data?",
            answer: "encoding/csv",
            distractors: ["encoding/jsoncsv", "bufio/csvonly"],
          }),
        ],
      },
      {
        slug: "unix-system-features",
        title: "Unix system features",
        description:
          "Understand signals, pipes, directory traversal, and lower-level system interactions.",
        lessons: [
          lesson({
            slug: "signals-and-processes",
            title: "Signals and processes",
            summary:
              "Understand process behavior and respond to operating-system signals.",
            what:
              "Operating systems use signals to notify processes of events. Go provides facilities in os and os/signal for working with process-related information and signal notifications.",
            why:
              "Signal handling helps command-line services and background processes respond to shutdown requests and other system events.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "os"\n    "os/signal"\n    "syscall"\n)\n\nfunc main() {\n    signals := make(chan os.Signal, 1)\n    signal.Notify(signals, os.Interrupt, syscall.SIGTERM)\n    fmt.Println("Waiting for a shutdown signal")\n    received := <-signals\n    fmt.Println("Received:", received)\n}',
            output:
              "The program waits until an interrupt or termination signal is received.",
            mistake:
              "Assume a signal notification channel receives every operating-system signal automatically.",
            correction:
              "Register the signals you want to receive using signal.Notify and design an appropriate shutdown path.",
            labPrompt:
              "Create a small program that waits for an interrupt signal and prints a shutdown message.",
            question:
              "Which package helps receive operating-system signals?",
            answer: "os/signal",
            distractors: ["fmt/signal", "net/signal"],
          }),
          lesson({
            slug: "pipes-and-directory-traversal",
            title: "Pipes and directory traversal",
            summary:
              "Connect program input and output and inspect directory trees.",
            what:
              "Unix pipes connect the output of one process to the input of another. Go's os and path/filepath packages provide tools for working with paths and directory trees.",
            why:
              "These facilities help create command-line utilities, automate file processing, and inspect project directories.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "os"\n    "path/filepath"\n)\n\nfunc main() {\n    root := "."\n    err := filepath.WalkDir(root, func(path string, entry os.DirEntry, err error) error {\n        if err != nil {\n            return err\n        }\n        fmt.Println(path)\n        return nil\n    })\n    if err != nil {\n        fmt.Println(err)\n    }\n}',
            output:
              "Prints paths found under the current directory.",
            mistake:
              "Ignore an error passed to a directory-walking callback.",
            correction:
              "Check the callback error and return it when traversal cannot safely continue.",
            labPrompt:
              "Write a program that lists the paths of files and directories under a chosen folder.",
            question:
              "Which package provides filepath.WalkDir?",
            answer: "path/filepath",
            distractors: ["fmt/path", "os/tree"],
          }),
          lesson({
            slug: "low-level-system-programming",
            title: "Low-level system programming",
            summary:
              "Understand the role of system calls and specialized tracing tools.",
            what:
              "Low-level system programming can involve operating-system interfaces, system calls, process tracing, and specialized tools such as strace. Some facilities are platform-specific.",
            why:
              "These concepts help developers diagnose system behavior and understand how applications interact with the operating system.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "os"\n)\n\nfunc main() {\n    info, err := os.Stat(".")\n    if err != nil {\n        fmt.Println(err)\n        return\n    }\n    fmt.Println("Directory:", info.IsDir())\n}',
            output: "Directory: true",
            mistake:
              "Assume every operating-system facility works identically on Windows, Linux, and macOS.",
            correction:
              "Check platform support and use the appropriate Go APIs for the target operating system.",
            labPrompt:
              "Inspect a file or directory using os.Stat and print whether it is a directory.",
            question:
              "What is one purpose of a system-call tracing tool?",
            answer:
              "To observe system calls made by a process for debugging or analysis.",
            distractors: [
              "To automatically rewrite Go syntax.",
              "To replace the Go compiler.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "go-concurrency-basics",
    title: "Go concurrency: goroutines, channels, and pipelines",
    description:
      "Learn goroutines, channels, synchronization, pipelines, and how Go schedules concurrent work.",
    topics: [
      {
        slug: "goroutines-and-synchronization",
        title: "Goroutines and synchronization",
        description:
          "Run functions concurrently and coordinate their completion.",
        lessons: [
          lesson({
            slug: "goroutines",
            title: "Goroutines",
            summary:
              "Start lightweight concurrent functions using the go keyword.",
            what:
              "A goroutine is a lightweight unit of concurrent execution managed by the Go runtime. A function call preceded by go starts in a new goroutine.",
            why:
              "Goroutines allow programs to perform multiple activities without manually managing operating-system threads.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\nfunc main() {\n    var wg sync.WaitGroup\n    wg.Add(1)\n\n    go func() {\n        defer wg.Done()\n        fmt.Println("Hello from a goroutine")\n    }()\n\n    wg.Wait()\n}',
            output: "Hello from a goroutine",
            mistake:
              'go fmt.Println("Hello")\n// The program may exit before the output appears.',
            correction:
              'var wg sync.WaitGroup\nwg.Add(1)\ngo func() {\n    defer wg.Done()\n    fmt.Println("Hello")\n}()\nwg.Wait()',
            mistakeExplanation:
              "Starting a goroutine does not make the main function wait for it to finish.",
            labPrompt:
              "Start three goroutines and use a WaitGroup to wait for all of them.",
            question:
              "Which keyword starts a function call in a new goroutine?",
            answer: "go",
            distractors: ["async", "thread"],
          }),
          lesson({
            slug: "waitgroups",
            title: "Waiting for goroutines",
            summary:
              "Coordinate goroutine completion with sync.WaitGroup.",
            what:
              "A WaitGroup tracks a number of tasks. Add increments the counter, Done decrements it, and Wait blocks until the counter reaches zero.",
            why:
              "Waiting for concurrent work helps prevent a program from finishing before its required tasks are complete.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\nfunc main() {\n    var wg sync.WaitGroup\n    for i := 1; i <= 3; i++ {\n        wg.Add(1)\n        go func(n int) {\n            defer wg.Done()\n            fmt.Println(n)\n        }(i)\n    }\n    wg.Wait()\n}',
            output:
              "Prints 1, 2, and 3, although their order may vary.",
            mistake:
              "Call wg.Add(1) only after starting the goroutine.",
            correction:
              "Increment the WaitGroup counter before starting the goroutine, then call Done when the task finishes.",
            mistakeExplanation:
              "Waiting before the counter is properly established can cause incorrect synchronization.",
            labPrompt:
              "Launch five goroutines and wait for all five to finish.",
            question: "What does WaitGroup.Wait do?",
            answer:
              "It blocks until the WaitGroup counter becomes zero.",
            distractors: [
              "It creates five goroutines automatically.",
              "It locks every variable in the program.",
            ],
          }),
        ],
      },
      {
        slug: "channels-and-pipelines",
        title: "Channels and pipelines",
        description:
          "Send values between goroutines and connect processing stages.",
        lessons: [
          lesson({
            slug: "channels",
            title: "Channels",
            summary:
              "Communicate values between goroutines through typed channels.",
            what:
              "A channel is a typed communication mechanism. Goroutines can send values to a channel and receive values from it.",
            why:
              "Channels provide a way to coordinate concurrent tasks and transfer data between them.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    messages := make(chan string)\n\n    go func() {\n        messages <- "Hello through a channel"\n    }()\n\n    fmt.Println(<-messages)\n}',
            output: "Hello through a channel",
            mistake:
              "Send to an unbuffered channel when no goroutine can receive the value.",
            correction:
              "Ensure a receiver is ready, or use a buffered channel when appropriate.",
            mistakeExplanation:
              "An unbuffered send blocks until another goroutine receives the value.",
            labPrompt:
              "Create a channel, send a number from one goroutine, and receive it in main.",
            question:
              "What operator sends a value to a channel?",
            answer: "<-",
            distractors: ["=>", "::"],
          }),
          lesson({
            slug: "pipelines",
            title: "Concurrency pipelines",
            summary:
              "Connect multiple processing stages using channels.",
            what:
              "A pipeline is a series of processing stages connected by channels. Each stage receives data, performs work, and sends results to the next stage.",
            why:
              "Pipelines divide a larger concurrent task into smaller components that can be developed and tested independently.",
            example:
              'package main\n\nimport "fmt"\n\nfunc generate(out chan<- int) {\n    for i := 1; i <= 3; i++ {\n        out <- i\n    }\n    close(out)\n}\n\nfunc double(in <-chan int, out chan<- int) {\n    for value := range in {\n        out <- value * 2\n    }\n    close(out)\n}\n\nfunc main() {\n    numbers := make(chan int)\n    results := make(chan int)\n    go generate(numbers)\n    go double(numbers, results)\n\n    for result := range results {\n        fmt.Println(result)\n    }\n}',
            output: "2\n4\n6",
            mistake:
              "Forget to close an output channel when no more values will be sent and the receiver ranges over it.",
            correction:
              "Close a channel when the sender has finished producing values and the receiver needs to detect completion.",
            mistakeExplanation:
              "A range over a channel continues until the channel is closed and all buffered values have been received.",
            labPrompt:
              "Create a two-stage pipeline that generates numbers and then squares them.",
            question:
              "What connects stages in a typical Go pipeline?",
            answer: "Channels.",
            distractors: ["Global variables only.", "HTML templates."],
          }),
        ],
      },
    ],
  },

  {
    slug: "go-advanced-concurrency",
    title: "Go concurrency: advanced topics",
    description:
      "Explore select, timeouts, buffered channels, mutexes, context cancellation, worker pools, and race conditions.",
    topics: [
      {
        slug: "select-and-channel-patterns",
        title: "Select and channel patterns",
        description:
          "Coordinate multiple channel operations and handle timeouts.",
        lessons: [
          lesson({
            slug: "select-statement",
            title: "The select statement",
            summary:
              "Wait for one of several channel operations to become ready.",
            what:
              "The select statement chooses among channel send and receive operations that can proceed. If multiple cases are ready, one is selected pseudo-randomly.",
            why:
              "Select is useful for coordinating concurrent work, handling results from several channels, and implementing timeouts.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    first := make(chan string, 1)\n    second := make(chan string, 1)\n    first <- "first"\n    second <- "second"\n\n    select {\n    case value := <-first:\n        fmt.Println(value)\n    case value := <-second:\n        fmt.Println(value)\n    }\n}',
            output: "first or second",
            mistake:
              "Assume select always chooses the first ready case.",
            correction:
              "Write each case so the program remains correct regardless of which ready case is selected.",
            mistakeExplanation:
              "When multiple communications can proceed, select does not guarantee source-order priority.",
            labPrompt:
              "Use select to receive from two channels and print the first selected result.",
            question:
              "What does select coordinate?",
            answer:
              "Multiple channel send and receive operations.",
            distractors: [
              "Only arithmetic expressions.",
              "Only file permissions.",
            ],
          }),
          lesson({
            slug: "channel-buffering-and-timeouts",
            title: "Buffered channels and timeouts",
            summary:
              "Use channel capacity and timers to control communication and waiting.",
            what:
              "A buffered channel can hold a limited number of values without an immediate receiver. The time package provides timers and timeout patterns using select.",
            why:
              "Buffering and timeouts help prevent indefinite waiting and allow concurrent systems to respond to delays.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc main() {\n    result := make(chan string, 1)\n    go func() {\n        time.Sleep(50 * time.Millisecond)\n        result <- "finished"\n    }()\n\n    select {\n    case value := <-result:\n        fmt.Println(value)\n    case <-time.After(time.Second):\n        fmt.Println("timed out")\n    }\n}',
            output: "finished",
            mistake:
              "Assume a buffered channel can store an unlimited number of values.",
            correction:
              "Choose an appropriate channel capacity and handle blocking when the buffer is full.",
            labPrompt:
              "Create a channel-based operation that reports a timeout if a result takes too long.",
            question:
              "What happens when a buffered channel is full and another value is sent?",
            answer:
              "The send blocks until space becomes available or the operation otherwise unblocks.",
            distractors: [
              "The channel grows without limit.",
              "The channel automatically discards the oldest value.",
            ],
          }),
        ],
      },
      {
        slug: "synchronization-and-context",
        title: "Synchronization and context",
        description:
          "Protect shared state, cancel operations, and distribute work across worker pools.",
        lessons: [
          lesson({
            slug: "mutexes-and-race-conditions",
            title: "Mutexes and race conditions",
            summary:
              "Protect shared mutable data with synchronization primitives.",
            what:
              "A mutex allows one goroutine at a time to enter a protected critical section. A race condition can occur when concurrent operations access shared data without suitable synchronization.",
            why:
              "Synchronization prevents conflicting access to shared state and helps maintain correct results in concurrent programs.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "sync"\n)\n\nfunc main() {\n    var mu sync.Mutex\n    counter := 0\n    var wg sync.WaitGroup\n\n    for i := 0; i < 100; i++ {\n        wg.Add(1)\n        go func() {\n            defer wg.Done()\n            mu.Lock()\n            counter++\n            mu.Unlock()\n        }()\n    }\n\n    wg.Wait()\n    fmt.Println(counter)\n}',
            output: "100",
            mistake:
              "Increment the same shared integer from many goroutines without synchronization.",
            correction:
              "Protect the increment with a mutex or use an appropriate atomic operation.",
            mistakeExplanation:
              "Concurrent unsynchronized reads and writes to shared data can cause a data race.",
            labPrompt:
              "Create a shared counter updated by multiple goroutines and protect it with a mutex.",
            question:
              "What is the main purpose of sync.Mutex?",
            answer:
              "To provide mutual exclusion around shared operations.",
            distractors: [
              "To make every channel buffered.",
              "To convert values into pointers.",
            ],
          }),
          lesson({
            slug: "context-and-worker-pools",
            title: "Context and worker pools",
            summary:
              "Propagate cancellation and distribute tasks among a controlled number of workers.",
            what:
              "The context package carries cancellation signals, deadlines, and request-scoped values. A worker pool uses a limited group of goroutines to process tasks.",
            why:
              "These patterns help manage concurrent workloads and stop unnecessary work when requests are canceled or deadlines expire.",
            example:
              'package main\n\nimport (\n    "context"\n    "fmt"\n)\n\nfunc work(ctx context.Context) {\n    select {\n    case <-ctx.Done():\n        fmt.Println("cancelled")\n    default:\n        fmt.Println("working")\n    }\n}\n\nfunc main() {\n    ctx, cancel := context.WithCancel(context.Background())\n    defer cancel()\n    work(ctx)\n}',
            output: "working",
            mistake:
              "Create a context with cancellation and never call its cancel function when the operation is finished.",
            correction:
              "Call the returned cancel function when the work is complete or no longer needed, commonly with defer.",
            mistakeExplanation:
              "Failing to cancel a context when appropriate can leave associated resources active longer than necessary.",
            labPrompt:
              "Create a context-aware worker that stops when its context is canceled.",
            question:
              "What does ctx.Done provide?",
            answer:
              "A channel that is closed when the context is canceled or its deadline expires.",
            distractors: [
              "A function that starts a new operating system.",
              "A slice of all running goroutines.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "go-testing-optimization-profiling",
    title: "Code testing, optimization, and profiling",
    description:
      "Test Go code, benchmark performance, profile applications, generate documentation, and cross-compile programs.",
    topics: [
      {
        slug: "testing-and-benchmarking",
        title: "Testing and benchmarking",
        description:
          "Write tests and benchmarks using Go's standard testing tools.",
        lessons: [
          lesson({
            slug: "unit-testing",
            title: "Unit testing",
            summary:
              "Test Go functions using the standard testing package.",
            what:
              "Go tests are commonly placed in files ending with _test.go. Test functions accept *testing.T and are executed by go test.",
            why:
              "Automated tests help verify behavior and catch regressions as code changes.",
            example:
              'package mathutil\n\nfunc Add(a, b int) int {\n    return a + b\n}',
            output:
              "The Add function returns the sum of its arguments. A test can verify Add(2, 3) equals 5.",
            mistake:
              "func TestAdd() {\n    // No testing parameter and no assertions\n}",
            correction:
              'func TestAdd(t *testing.T) {\n    if got := Add(2, 3); got != 5 {\n        t.Fatalf("Add(2, 3) = %d, want 5", got)\n    }\n}',
            mistakeExplanation:
              "A conventional Go test function accepts *testing.T and checks the expected behavior.",
            labPrompt:
              "Write a test for an Add function and run it using go test.",
            question:
              "What suffix should a Go test filename use?",
            answer: "_test.go",
            distractors: [".spec.go", ".testing"],
          }),
          lesson({
            slug: "benchmarking",
            title: "Benchmarking Go code",
            summary:
              "Measure the performance of functions using Go benchmarks.",
            what:
              "Benchmark functions conventionally begin with Benchmark and accept *testing.B. The go test -bench command runs benchmarks.",
            why:
              "Benchmarks help measure performance and compare implementations under controlled conditions.",
            example:
              'package mathutil\n\nimport "testing"\n\nfunc BenchmarkAdd(b *testing.B) {\n    for i := 0; i < b.N; i++ {\n        _ = Add(i, 1)\n    }\n}',
            output:
              "Running go test -bench=. reports benchmark timing and operation counts.",
            mistake:
              "Run a benchmark loop a fixed small number of times and assume the result is reliable.",
            correction:
              "Use b.N in a benchmark loop so the testing framework can adjust the number of iterations.",
            labPrompt:
              "Create a benchmark for a function that adds two integers and run it.",
            question:
              "Which field controls the benchmark iteration count?",
            answer: "b.N",
            distractors: ["b.Count", "b.Iterations"],
          }),
        ],
      },
      {
        slug: "profiling-and-build-tools",
        title: "Profiling and build tools",
        description:
          "Inspect performance, optimize carefully, document code, and build for different platforms.",
        lessons: [
          lesson({
            slug: "profiling-go-programs",
            title: "Profiling Go programs",
            summary:
              "Collect performance information to identify expensive parts of an application.",
            what:
              "Go provides profiling and tracing tools, including the runtime/pprof package, net/http/pprof, and go tool trace.",
            why:
              "Profiling helps locate CPU, memory, and scheduling bottlenecks before making targeted performance improvements.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "runtime"\n)\n\nfunc main() {\n    var stats runtime.MemStats\n    runtime.ReadMemStats(&stats)\n    fmt.Println("Allocated bytes:", stats.Alloc)\n}',
            output:
              "Prints the number of bytes currently allocated according to the runtime statistics.",
            mistake:
              "Optimize code based only on assumptions without measuring its performance.",
            correction:
              "Measure the application, identify a bottleneck, make a targeted change, and measure again.",
            labPrompt:
              "Inspect memory statistics in a Go program and explore how profiling can help locate bottlenecks.",
            question: "What is profiling used for?",
            answer:
              "To measure program behavior and identify performance bottlenecks.",
            distractors: [
              "To rename every variable automatically.",
              "To replace all tests.",
            ],
          }),
          lesson({
            slug: "documentation-and-cross-compilation",
            title: "Documentation and cross-compilation",
            summary:
              "Generate package documentation and build Go programs for different target platforms.",
            what:
              "Go documentation tools display package and identifier documentation. Go builds can target other operating systems and architectures using settings such as GOOS and GOARCH.",
            why:
              "Documentation makes APIs easier to understand, while cross-compilation helps distribute software to multiple platforms.",
            example:
              'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Portable Go program")\n}',
            output:
              "Portable Go program",
            mistake:
              "Assume a program built for one operating system will run unchanged on every operating system.",
            correction:
              "Build for the intended target and account for platform-specific APIs, dependencies, and runtime behavior.",
            labPrompt:
              "Build a simple Go program for your current platform and inspect its package documentation using go doc.",
            question:
              "Which environment variables commonly select the target OS and architecture?",
            answer: "GOOS and GOARCH.",
            distractors: ["GOPATH and GOROOT only.", "OSNAME and CPUARCH."],
          }),
        ],
      },
    ],
  },

  {
    slug: "go-network-programming-foundations",
    title: "The foundations of network programming in Go",
    description:
      "Learn HTTP requests and responses, TCP/IP, DNS lookups, web servers, web clients, and network timeouts.",
    topics: [
      {
        slug: "http-and-network-basics",
        title: "HTTP and network basics",
        description:
          "Understand network protocols and the main types used by Go's HTTP package.",
        lessons: [
          lesson({
            slug: "http-request-and-response",
            title: "HTTP requests and responses",
            summary:
              "Understand how HTTP clients and servers exchange requests and responses.",
            what:
              "Go's net/http package provides types and functions for HTTP requests, responses, transports, handlers, clients, and servers.",
            why:
              "HTTP is a foundation for web applications, APIs, and many services that communicate over a network.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "net/http"\n)\n\nfunc main() {\n    request, err := http.NewRequest(http.MethodGet, "https://example.com", nil)\n    if err != nil {\n        fmt.Println(err)\n        return\n    }\n    fmt.Println(request.Method, request.URL.Host)\n}',
            output: "GET example.com",
            mistake:
              "Assume creating an HTTP request automatically sends it to the server.",
            correction:
              "Use an HTTP client to send the request and handle the response and any returned error.",
            mistakeExplanation:
              "http.NewRequest constructs a request; it does not perform the network operation.",
            labPrompt:
              "Create an HTTP GET request and print its method and host.",
            question:
              "Which package provides Go's HTTP client and server APIs?",
            answer: "net/http",
            distractors: ["net/html", "http/clientonly"],
          }),
          lesson({
            slug: "dns-and-network-interfaces",
            title: "DNS and network interfaces",
            summary:
              "Resolve hostnames and inspect network interface information.",
            what:
              "Go's net package supports DNS lookups and network operations. The net package also provides facilities for inspecting network interfaces.",
            why:
              "DNS resolution and interface inspection are useful when diagnosing connectivity and developing network-aware applications.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "net"\n)\n\nfunc main() {\n    addresses, err := net.LookupHost("localhost")\n    if err != nil {\n        fmt.Println(err)\n        return\n    }\n    fmt.Println(addresses)\n}',
            output:
              "Prints the addresses resolved for localhost on the current system.",
            mistake:
              'addresses, _ := net.LookupHost("invalid host name")\nfmt.Println(addresses)',
            correction:
              'addresses, err := net.LookupHost("localhost")\nif err != nil {\n    fmt.Println(err)\n    return\n}\nfmt.Println(addresses)',
            mistakeExplanation:
              "DNS lookups can fail, so the returned error should be checked before using the result.",
            labPrompt:
              "Resolve a hostname using net.LookupHost and handle lookup errors.",
            question:
              "Which function can look up host addresses in Go?",
            answer: "net.LookupHost",
            distractors: ["http.FindHost", "os.LookupDNS"],
          }),
        ],
      },
      {
        slug: "web-servers-and-clients",
        title: "Web servers and clients",
        description:
          "Build simple HTTP servers and clients and handle request deadlines.",
        lessons: [
          lesson({
            slug: "creating-http-server",
            title: "Creating an HTTP server",
            summary:
              "Handle HTTP requests with a Go server.",
            what:
              "Go can create an HTTP server using handlers and functions such as http.HandleFunc and http.ListenAndServe.",
            why:
              "HTTP servers provide endpoints for websites, APIs, and applications that need to receive requests.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "net/http"\n)\n\nfunc handler(w http.ResponseWriter, r *http.Request) {\n    fmt.Fprintln(w, "Hello from Go")\n}\n\nfunc main() {\n    http.HandleFunc("/", handler)\n    http.ListenAndServe(":8080", nil)\n}',
            output:
              "A server listens on port 8080 and responds with Hello from Go when the root path is requested.",
            mistake:
              'http.HandleFunc("/", handler)\nhttp.ListenAndServe(":8080", nil)\n// Ignore the returned error',
            correction:
              'http.HandleFunc("/", handler)\nif err := http.ListenAndServe(":8080", nil); err != nil {\n    fmt.Println(err)\n}',
            mistakeExplanation:
              "ListenAndServe returns an error if the server cannot start or stops unexpectedly.",
            labPrompt:
              "Create a server with a root endpoint and a second endpoint that returns a greeting.",
            question:
              "Which type represents the response writer in an HTTP handler?",
            answer: "http.ResponseWriter",
            distractors: ["http.ResponsePrinter", "net.Writer"],
          }),
          lesson({
            slug: "http-client-and-timeouts",
            title: "HTTP clients and timeouts",
            summary:
              "Send HTTP requests and limit how long network operations can wait.",
            what:
              "The http.Client type sends HTTP requests. Client timeouts and request contexts can help limit waiting time for network operations.",
            why:
              "Timeouts make applications more resilient when remote services are slow or unreachable.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "net/http"\n    "time"\n)\n\nfunc main() {\n    client := &http.Client{Timeout: 3 * time.Second}\n    response, err := client.Get("https://example.com")\n    if err != nil {\n        fmt.Println(err)\n        return\n    }\n    defer response.Body.Close()\n    fmt.Println(response.Status)\n}',
            output:
              "Prints the HTTP status returned by the server if the request succeeds.",
            mistake:
              'response, err := http.Get("https://example.com")\nif err != nil {\n    return\n}\n// Never close response.Body',
            correction:
              'response, err := http.Get("https://example.com")\nif err != nil {\n    return\n}\ndefer response.Body.Close()',
            mistakeExplanation:
              "The response body should be closed when it is no longer needed to release associated resources.",
            labPrompt:
              "Create an HTTP client with a timeout and send a GET request to a test endpoint.",
            question:
              "Why configure an HTTP client timeout?",
            answer:
              "To limit how long a request can wait before timing out.",
            distractors: [
              "To guarantee the server always responds successfully.",
              "To disable all network errors.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "go-network-servers-and-clients",
    title: "Network programming: building servers and clients",
    description:
      "Create TCP and UDP clients and servers, concurrent servers, RPC services, and lower-level network tools.",
    topics: [
      {
        slug: "tcp-and-udp",
        title: "TCP and UDP networking",
        description:
          "Understand connection-based and datagram-based network communication.",
        lessons: [
          lesson({
            slug: "tcp-client-and-server",
            title: "TCP clients and servers",
            summary:
              "Create network connections and exchange data over TCP.",
            what:
              "TCP provides a reliable, ordered byte stream. Go's net package provides Dial and Listen functions for creating TCP clients and servers.",
            why:
              "TCP is useful for services that require a reliable connection and ordered delivery of data.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "net"\n)\n\nfunc main() {\n    listener, err := net.Listen("tcp", "127.0.0.1:0")\n    if err != nil {\n        fmt.Println(err)\n        return\n    }\n    defer listener.Close()\n    fmt.Println(listener.Addr())\n}',
            output:
              "Prints the local listening address with an available port.",
            mistake:
              'listener, _ := net.Listen("tcp", "127.0.0.1:8080")\n// Assume listener is always valid',
            correction:
              'listener, err := net.Listen("tcp", "127.0.0.1:8080")\nif err != nil {\n    fmt.Println(err)\n    return\n}\ndefer listener.Close()',
            mistakeExplanation:
              "Creating a listener can fail if the address is invalid or the port is unavailable.",
            labPrompt:
              "Create a TCP listener on localhost and close it cleanly when the program finishes.",
            question:
              "Which Go function creates a network listener?",
            answer: "net.Listen",
            distractors: ["net.ServeTCPOnly", "http.ListenFile"],
          }),
          lesson({
            slug: "udp-client-and-server",
            title: "UDP clients and servers",
            summary:
              "Exchange datagrams using the User Datagram Protocol.",
            what:
              "UDP sends discrete datagrams without establishing a TCP-style connection. Go's net package provides UDP connection and packet APIs.",
            why:
              "UDP is useful for applications that prefer datagram communication and can handle its delivery and ordering characteristics.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "net"\n)\n\nfunc main() {\n    address, err := net.ResolveUDPAddr("udp", "127.0.0.1:9000")\n    if err != nil {\n        fmt.Println(err)\n        return\n    }\n    fmt.Println(address.Network(), address.Port)\n}',
            output: "udp 9000",
            mistake:
              "Assume UDP guarantees that every datagram arrives in order.",
            correction:
              "Design the application to tolerate loss, duplication, or reordering when those outcomes are possible.",
            labPrompt:
              "Resolve a UDP address and build a local UDP client-server example.",
            question:
              "Does UDP provide TCP-style reliable, ordered delivery by itself?",
            answer: "No.",
            distractors: ["Yes, in every situation.", "Only for HTTP traffic."],
          }),
          lesson({
            slug: "concurrent-tcp-server",
            title: "Concurrent TCP servers",
            summary:
              "Handle multiple client connections with concurrent processing.",
            what:
              "A concurrent TCP server can accept incoming connections and process each connection in its own goroutine.",
            why:
              "Concurrent connection handling allows a server to serve multiple clients without processing every connection strictly one at a time.",
            example:
              'package main\n\nimport (\n    "io"\n    "net"\n)\n\nfunc handle(conn net.Conn) {\n    defer conn.Close()\n    io.Copy(conn, conn)\n}\n\nfunc main() {\n    listener, err := net.Listen("tcp", "127.0.0.1:9000")\n    if err != nil {\n        return\n    }\n    defer listener.Close()\n\n    for {\n        conn, err := listener.Accept()\n        if err != nil {\n            return\n        }\n        go handle(conn)\n    }\n}',
            output:
              "The server accepts connections and echoes received data back to each client.",
            mistake:
              "Process every accepted connection using a long-running handler directly in the accept loop.",
            correction:
              "Use a goroutine per connection when appropriate and manage connection cleanup and resource limits.",
            mistakeExplanation:
              "A blocking handler can prevent the server from accepting additional clients until that handler finishes.",
            labPrompt:
              "Build a local TCP echo server that handles multiple client connections concurrently.",
            question:
              "What allows the example server to handle clients concurrently?",
            answer:
              "Starting handle(conn) in a goroutine.",
            distractors: [
              "Using fmt.Println for every connection.",
              "Declaring the listener as a constant.",
            ],
          }),
        ],
      },
      {
        slug: "rpc-and-low-level-networking",
        title: "RPC and low-level networking",
        description:
          "Explore remote procedure calls and lower-level packet handling.",
        lessons: [
          lesson({
            slug: "remote-procedure-call",
            title: "Remote procedure calls",
            summary:
              "Understand how a client can request a function-like operation from a remote service.",
            what:
              "Remote procedure call systems allow a client to invoke an operation exposed by a server. Go has standard-library RPC facilities, with requirements for suitable exported methods and serializable arguments.",
            why:
              "RPC can simplify communication between programs by presenting remote operations through structured request and response data.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "net/rpc"\n)\n\ntype Args struct {\n    A, B int\n}\n\ntype Calculator int\n\nfunc (c *Calculator) Add(args Args, result *int) error {\n    *result = args.A + args.B\n    return nil\n}\n\nfunc main() {\n    fmt.Println("Define an RPC service and register it with an RPC server.")\n    _ = rpc.DefaultServer\n}',
            output:
              "Define and register the Calculator service before starting an RPC server and connecting a client.",
            mistake:
              "Assume that declaring an RPC method automatically makes it available over the network.",
            correction:
              "Register the service, configure a transport and server, then create a client that uses the matching RPC method.",
            labPrompt:
              "Create a local RPC calculator service with an Add method and call it from a client.",
            question: "What does RPC stand for?",
            answer: "Remote Procedure Call.",
            distractors: [
              "Runtime Package Compiler.",
              "Reliable Packet Channel.",
            ],
          }),
          lesson({
            slug: "low-level-network-programming",
            title: "Low-level network programming",
            summary:
              "Understand packet-level networking and specialized network inspection tools.",
            what:
              "Low-level network programming can involve raw sockets, ICMP messages, packet headers, and operating-system networking APIs. Permissions and support depend on the platform.",
            why:
              "Understanding lower-level protocols helps developers diagnose network behavior and build specialized diagnostic tools.",
            example:
              'package main\n\nimport (\n    "fmt"\n    "net"\n)\n\nfunc main() {\n    addresses, err := net.LookupHost("localhost")\n    if err != nil {\n        fmt.Println(err)\n        return\n    }\n    for _, address := range addresses {\n        fmt.Println(address)\n    }\n}',
            output:
              "Prints the resolved addresses for localhost.",
            mistake:
              "Assume raw packet operations are available to every program without special permissions.",
            correction:
              "Check operating-system support and permission requirements, and use higher-level networking APIs when they meet the need.",
            labPrompt:
              "Use Go's net package to inspect resolved host addresses and document the result.",
            question:
              "What is one purpose of packet inspection?",
            answer:
              "To examine network traffic and help diagnose protocol or connectivity behavior.",
            distractors: [
              "To automatically compile Go code.",
              "To manage garbage collection.",
            ],
          }),
        ],
      },
    ],
  },
];