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
      "The web application code is using the wrong layer, configuration, or data-handling pattern.",
    hint:
      input.hint ??
      "Check which part of the application is responsible for serving content, processing data, or handling user interaction.",
    labCode: input.labCode ?? input.example,
    output: input.output ?? "Example output appears here.",
  };
}

export const pythonWebDevelopmentModules: LocalModuleSeed[] = [
  {
    slug: "python-web-foundations",
    title: "Python web foundations",
    description:
      "Understand the main parts of a web application and how the client, server, database, and browser work together.",
    topics: [
      {
        slug: "web-application-architecture",
        title: "Web application architecture",
        description:
          "Learn the major components and layers that make up a web application.",
        lessons: [
          lesson({
            slug: "web-application-components",
            title: "Web application components",
            summary:
              "Understand how a web application is divided into client-side and server-side parts.",
            what:
              "A web application consists of multiple cooperating parts. The browser handles the client side, while the server handles application logic, data, and responses.",
            why:
              "Breaking an application into clear components makes it easier to understand, maintain, test, and change.",
            example:
              "Browser -> Web Server -> Python Application -> Database",
            output:
              "A request travels from the browser to the server-side application and may access stored data before returning a response.",
            mistake:
              "Treating the entire web application as one large piece of code.",
            mistakeExplanation:
              "A web application normally contains separate responsibilities such as presentation, application logic, delivery, and data storage.",
            correction:
              "Separate the browser interface, web server, Python application, and data store into logical layers.",
            labPrompt:
              "Draw the flow of a request from a browser to a Python application and then to a database.",
            question:
              "Why is it useful to divide a web application into components?",
            answer:
              "It separates responsibilities and makes the application easier to maintain and modify.",
            distractors: [
              "It makes every application run without a server.",
              "It removes the need for a database.",
            ],
          }),
          lesson({
            slug: "client-and-server",
            title: "Client and server",
            summary:
              "Understand the different responsibilities of the browser and server.",
            what:
              "The client runs in the user's browser and presents the interface. The server receives requests, processes application logic, accesses data, and sends responses.",
            why:
              "Knowing which work belongs on the client or server helps you design applications with clear responsibilities.",
            example:
              "Client: HTML + CSS + JavaScript\nServer: Python application + database",
            output:
              "The browser displays the interface while the server processes requests and manages application data.",
            mistake:
              "Putting all application logic into browser JavaScript.",
            mistakeExplanation:
              "Sensitive data and server-side business logic should not depend entirely on code running in the user's browser.",
            correction:
              "Keep server-side processing and persistent data on the server while using client-side code for browser interaction.",
            labPrompt:
              "List three tasks that belong on the client and three tasks that belong on the server.",
            question:
              "What is the main responsibility of the server?",
            answer:
              "To process requests, run application logic, access data, and return responses.",
            distractors: [
              "Only display HTML.",
              "Only handle mouse clicks.",
            ],
          }),
        ],
      },
      {
        slug: "layers-and-tools",
        title: "Layers and tools",
        description:
          "Understand application layers and choose tools for development and deployment.",
        lessons: [
          lesson({
            slug: "application-layers",
            title: "Application layers",
            summary:
              "Learn how different layers communicate through defined interfaces.",
            what:
              "A web application can be divided into layers such as data storage, server-side application logic, web delivery, and browser presentation.",
            why:
              "Layering prevents unrelated responsibilities from becoming tightly mixed together.",
            example:
              "Browser -> Delivery -> Application Logic -> Data Store",
            output:
              "Each layer performs a specific responsibility and communicates with neighboring layers.",
            mistake:
              "Making the user interface directly responsible for database operations.",
            correction:
              "Let the appropriate server-side layer handle data access.",
            labPrompt:
              "Create a four-layer diagram for a simple task application.",
            question:
              "What is the benefit of using application layers?",
            answer:
              "Each layer can focus on a specific responsibility.",
            distractors: [
              "All code must be placed in one file.",
              "Layers remove the need for testing.",
            ],
          }),
          lesson({
            slug: "choosing-web-tools",
            title: "Choosing web development tools",
            summary:
              "Understand how requirements influence the choice of development tools.",
            what:
              "Tool selection includes editors, version management, testing tools, web servers, programming languages, databases, and presentation libraries.",
            why:
              "Different projects have different requirements for performance, development speed, maintainability, usability, and deployment.",
            example:
              "Python + CherryPy + SQLite + jQuery UI",
            output:
              "A toolchain combines multiple technologies to deliver the complete web application.",
            mistake:
              "Choosing tools only because they are popular.",
            correction:
              "Choose tools according to the requirements and constraints of the project.",
            labPrompt:
              "Choose a server, language, database, and client-side library for a small web application.",
            question:
              "What should guide your choice of web development tools?",
            answer:
              "The requirements and constraints of the application.",
            distractors: [
              "Only the newest technology.",
              "Only the programming language name.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "cherrypy-and-dynamic-content",
    title: "CherryPy and dynamic content",
    description:
      "Build simple Python web applications using CherryPy and dynamically generated content.",
    topics: [
      {
        slug: "cherrypy-basics",
        title: "CherryPy basics",
        description:
          "Learn how a lightweight Python web server can expose application methods as web pages.",
        lessons: [
          lesson({
            slug: "first-cherrypy-application",
            title: "First CherryPy application",
            summary:
              "Create a basic Python application that responds to a browser request.",
            what:
              "CherryPy can expose Python object methods as web-accessible endpoints.",
            why:
              "A simple server framework makes it possible to connect Python application logic with HTTP requests.",
            example:
              "import cherrypy\n\nclass Hello:\n    @cherrypy.expose\n    def index(self):\n        return \"Hello, web!\"\n\ncherrypy.quickstart(Hello())",
            output:
              "Opening the application in a browser displays: Hello, web!",
            mistake:
              "Forgetting the @cherrypy.expose decorator.",
            correction:
              "Use @cherrypy.expose on methods that should be accessible through CherryPy.",
            labPrompt:
              "Create a CherryPy application that returns a welcome message.",
            question:
              "What does @cherrypy.expose do?",
            answer:
              "It makes the method accessible as a CherryPy web endpoint.",
            distractors: [
              "It creates a database table.",
              "It styles the HTML page.",
            ],
          }),
          lesson({
            slug: "serving-dynamic-html",
            title: "Serving dynamic HTML",
            summary:
              "Generate HTML from Python code and return it to the browser.",
            what:
              "A Python web application can construct HTML content dynamically and return it as the response to a browser request.",
            why:
              "Dynamic content allows the page to depend on application data instead of being a fixed HTML file.",
            example:
              "class App:\n    @cherrypy.expose\n    def index(self):\n        name = \"Maya\"\n        return \"<h1>Hello \" + name + \"</h1>\"",
            output:
              "<h1>Hello Maya</h1>",
            mistake:
              "Returning Python objects directly when the browser expects a web response.",
            correction:
              "Convert the required content into the response format expected by the browser.",
            labPrompt:
              "Create a page that dynamically displays a user's name.",
            question:
              "Why is dynamic content useful?",
            answer:
              "It allows the response to depend on application data or user input.",
            distractors: [
              "It prevents the browser from loading HTML.",
              "It removes the need for Python.",
            ],
          }),
        ],
      },
      {
        slug: "html-javascript-jquery",
        title: "HTML, JavaScript, and jQuery",
        description:
          "Connect Python-generated pages with browser-side HTML, JavaScript, and jQuery.",
        lessons: [
          lesson({
            slug: "separating-content-and-presentation",
            title: "Separating content and presentation",
            summary:
              "Keep application content separate from the way it is displayed.",
            what:
              "HTML provides document structure, CSS controls presentation, and JavaScript adds browser-side behavior.",
            why:
              "Separating these responsibilities makes pages easier to maintain and modify.",
            example:
              "<div id=\"message\">Hello</div>\n\n<script>\ndocument.getElementById(\"message\").textContent = \"Welcome\";\n</script>",
            output:
              "The page displays the updated Welcome message.",
            mistake:
              "Putting all structure, styling, and behavior into one block of code.",
            correction:
              "Use HTML for structure, CSS for appearance, and JavaScript for interaction.",
            labPrompt:
              "Create a page containing a message and change that message with JavaScript.",
            question:
              "What is HTML mainly responsible for?",
            answer:
              "The structure of the web page.",
            distractors: [
              "Database storage.",
              "Python server execution.",
            ],
          }),
          lesson({
            slug: "jquery-selectors",
            title: "jQuery selectors",
            summary:
              "Use selectors to locate elements that JavaScript needs to manipulate.",
            what:
              "jQuery selectors use CSS-like expressions to locate elements in the document.",
            why:
              "Selecting elements is a basic requirement for adding interaction to web pages.",
            example:
              "$(\"#message\").text(\"Hello from jQuery\");",
            output:
              "The element with id message displays the new text.",
            mistake:
              "$(\"message\").text(\"Hello\");",
            mistakeExplanation:
              "An ID selector requires the # prefix.",
            correction:
              "$(\"#message\").text(\"Hello\");",
            labPrompt:
              "Create a button that changes the text of an element with id message.",
            question:
              "What does #message select in jQuery?",
            answer:
              "The element whose id is message.",
            distractors: [
              "Every element named message.",
              "Every element with the message class.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "interactive-spreadsheet",
    title: "Interactive spreadsheet",
    description:
      "Build browser-side spreadsheet and unit-conversion functionality with JavaScript and jQuery UI.",
    topics: [
      {
        slug: "unit-conversion",
        title: "Unit conversion",
        description:
          "Build a reusable unit conversion interface.",
        lessons: [
          lesson({
            slug: "unit-converter",
            title: "Unit converter",
            summary:
              "Create a browser interface that converts values between units.",
            what:
              "A unit converter accepts a value, applies a conversion factor, and displays the converted result.",
            why:
              "This provides a practical example of combining HTML input, JavaScript calculations, and user interaction.",
            example:
              "function convert(value, factor) {\n    return value * factor;\n}\n\nconvert(10, 0.621371);",
            output:
              "6.21371",
            mistake:
              "Using the conversion factor in the wrong direction.",
            correction:
              "Check whether the selected conversion requires multiplication or division by the factor.",
            labPrompt:
              "Create a converter that changes kilometers into miles.",
            question:
              "What does a conversion factor represent?",
            answer:
              "It represents the numerical relationship between two units.",
            distractors: [
              "The HTML element ID.",
              "The database connection.",
            ],
          }),
          lesson({
            slug: "jquery-ui-plugin",
            title: "Creating a jQuery plugin",
            summary:
              "Understand how reusable browser functionality can be packaged as a plugin.",
            what:
              "A jQuery plugin adds reusable behavior that can be applied to selected elements.",
            why:
              "Reusable plugins prevent the same interface logic from being rewritten for every page.",
            example:
              "$.fn.highlightBox = function() {\n    return this.css(\"border\", \"2px solid black\");\n};\n\n$(\"#example\").highlightBox();",
            output:
              "The selected element receives the plugin behavior.",
            mistake:
              "Defining the plugin without attaching it to jQuery.",
            correction:
              "Add the plugin function through $.fn so it can be called on jQuery selections.",
            labPrompt:
              "Create a simple jQuery plugin that changes an element's appearance.",
            question:
              "Why create a jQuery plugin?",
            answer:
              "To package reusable behavior that can be applied to selected elements.",
            distractors: [
              "To create a Python class.",
              "To store data in SQLite.",
            ],
          }),
        ],
      },
      {
        slug: "spreadsheet-interface",
        title: "Spreadsheet interface",
        description:
          "Understand the structure and browser-side behavior of a simple spreadsheet.",
        lessons: [
          lesson({
            slug: "spreadsheet-grid",
            title: "Spreadsheet grid",
            summary:
              "Represent spreadsheet cells using HTML and JavaScript.",
            what:
              "A spreadsheet interface can be represented using rows, columns, and editable cells in the browser.",
            why:
              "It demonstrates how JavaScript can manage a complex interactive interface without requiring every action to reload the page.",
            example:
              "<table id=\"sheet\">\n  <tr><td>A1</td><td>B1</td></tr>\n  <tr><td>A2</td><td>B2</td></tr>\n</table>",
            output:
              "A simple two-column spreadsheet-like grid.",
            mistake:
              "Hard-coding every interaction without identifying the cell structure.",
            correction:
              "Represent the grid consistently so JavaScript can locate and update cells.",
            labPrompt:
              "Create a small 3x3 HTML spreadsheet grid.",
            question:
              "What does a spreadsheet grid consist of?",
            answer:
              "Rows and columns containing individual cells.",
            distractors: [
              "Only server-side Python functions.",
              "Only database tables.",
            ],
          }),
          lesson({
            slug: "spreadsheet-plugin",
            title: "Spreadsheet plugin behavior",
            summary:
              "Understand how reusable JavaScript behavior can power an interactive spreadsheet.",
            what:
              "A spreadsheet plugin can create the grid, handle cell interaction, and coordinate browser-side behavior.",
            why:
              "Encapsulating spreadsheet behavior keeps the page itself simple while the plugin manages interaction.",
            example:
              "$(\"#spreadsheet\").spreadsheet();",
            output:
              "The selected element is initialized as an interactive spreadsheet.",
            mistake:
              "Putting all spreadsheet logic directly into the HTML page.",
            correction:
              "Move reusable interaction logic into a JavaScript component or plugin.",
            labPrompt:
              "Design the API for a simple spreadsheet plugin.",
            question:
              "What is the advantage of encapsulating spreadsheet behavior?",
            answer:
              "The functionality becomes reusable and easier to maintain.",
            distractors: [
              "It removes JavaScript from the browser.",
              "It automatically creates a database.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "persistence-and-authentication",
    title: "Persistence and authentication",
    description:
      "Store application data and identify users with sessions and server-side persistence.",
    topics: [
      {
        slug: "tasklist-persistence",
        title: "Tasklist persistence",
        description:
          "Build a task application that keeps information between requests.",
        lessons: [
          lesson({
            slug: "persistent-task-data",
            title: "Persistent task data",
            summary:
              "Understand why web applications need persistent storage.",
            what:
              "Persistent storage keeps application information available after a request finishes or the server process changes.",
            why:
              "A tasklist would be useless if all tasks disappeared every time the page was refreshed.",
            example:
              "tasks = [\n    \"Study Python\",\n    \"Build web app\"\n]",
            output:
              "The application maintains a collection of task records.",
            mistake:
              "Keeping important application data only in temporary variables.",
            correction:
              "Store information in a persistent file or database when it must survive requests.",
            labPrompt:
              "Design a simple storage format for a tasklist.",
            question:
              "Why does a web application need persistent storage?",
            answer:
              "To preserve important data between requests and application runs.",
            distractors: [
              "To make HTML valid.",
              "To replace JavaScript.",
            ],
          }),
          lesson({
            slug: "task-module",
            title: "Task module",
            summary:
              "Separate task operations into reusable Python functions or classes.",
            what:
              "A task module can provide operations such as listing, adding, completing, and deleting tasks.",
            why:
              "Separating task operations keeps application code organized and reusable.",
            example:
              "def add_task(tasks, text):\n    tasks.append(text)\n\n\ndef delete_task(tasks, index):\n    del tasks[index]",
            output:
              "Tasks can be added and deleted through dedicated operations.",
            mistake:
              "Writing every task operation directly inside the web request handler.",
            correction:
              "Move domain-specific task operations into a separate module.",
            labPrompt:
              "Create Python functions for adding, listing, and deleting tasks.",
            question:
              "Why separate task operations from the web layer?",
            answer:
              "It keeps domain logic reusable and easier to maintain.",
            distractors: [
              "To prevent Python from running.",
              "To remove all persistence.",
            ],
          }),
        ],
      },
      {
        slug: "sessions-and-login",
        title: "Sessions and login",
        description:
          "Understand how a web application identifies users across requests.",
        lessons: [
          lesson({
            slug: "user-login",
            title: "User login",
            summary:
              "Understand the basic flow of authenticating a user.",
            what:
              "Authentication verifies that a user is allowed to access an application or protected resource.",
            why:
              "A multi-user tasklist must distinguish one user's tasks from another user's tasks.",
            example:
              "username = request_username\npassword = request_password\n\nif authenticate(username, password):\n    allow_access()",
            output:
              "A valid user is allowed to continue to the protected application.",
            mistake:
              "Granting access before verifying the user's credentials.",
            correction:
              "Authenticate the user before allowing access to protected resources.",
            labPrompt:
              "Design the steps required for a basic login flow.",
            question:
              "What is authentication?",
            answer:
              "The process of verifying a user's identity.",
            distractors: [
              "Sorting database rows.",
              "Changing CSS styles.",
            ],
          }),
          lesson({
            slug: "sessions",
            title: "Sessions",
            summary:
              "Keep track of a logged-in user across multiple HTTP requests.",
            what:
              "A session associates a series of requests with a user through session information maintained between requests.",
            why:
              "HTTP requests are independent, so applications need a way to remember that a user has already logged in.",
            example:
              "session[\"username\"] = \"maya\"\n\nusername = session.get(\"username\")",
            output:
              "The application can retrieve the username from the current session.",
            mistake:
              "Assuming the server automatically remembers every previous request.",
            correction:
              "Use session management to associate subsequent requests with the authenticated user.",
            labPrompt:
              "Create pseudocode showing login, session creation, and logout.",
            question:
              "Why are sessions useful?",
            answer:
              "They allow the application to remember information about a user between requests.",
            distractors: [
              "They replace HTML forms.",
              "They permanently store every database record.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "sqlite-and-ajax",
    title: "SQLite and AJAX",
    description:
      "Move task data into SQLite, test database code, and make interfaces more responsive with AJAX.",
    topics: [
      {
        slug: "sqlite-databases",
        title: "SQLite databases",
        description:
          "Use SQLite as persistent structured storage for Python web applications.",
        lessons: [
          lesson({
            slug: "sqlite-connection",
            title: "Connecting to SQLite",
            summary:
              "Open a SQLite database from Python.",
            what:
              "Python provides the sqlite3 module for working with SQLite databases.",
            why:
              "A database makes structured records, filtering, relationships, and updates easier to manage than separate files.",
            example:
              "import sqlite3\n\nconnection = sqlite3.connect(\"tasks.db\")\ncursor = connection.cursor()",
            output:
              "A connection and cursor are created for the SQLite database.",
            mistake:
              "Trying to execute SQL without creating a database connection.",
            correction:
              "Connect to the database and obtain a cursor before executing SQL.",
            labPrompt:
              "Create a Python program that connects to a SQLite database.",
            question:
              "Which Python module is used for SQLite?",
            answer:
              "sqlite3",
            distractors: [
              "sqlite",
              "database3",
            ],
          }),
          lesson({
            slug: "parameterized-sql",
            title: "Parameterized SQL",
            summary:
              "Pass values separately from SQL statements.",
            what:
              "Parameterized queries use placeholders for values instead of constructing SQL by directly concatenating user input.",
            why:
              "Separating SQL from incoming values helps avoid malformed queries and improves security.",
            example:
              "cursor.execute(\n    \"SELECT * FROM task WHERE user_id = ?\",\n    (username,)\n)",
            output:
              "The username is passed separately as a query parameter.",
            mistake:
              "Building SQL by concatenating raw user input.",
            correction:
              "Use parameter placeholders and pass values separately.",
            labPrompt:
              "Write a parameterized query that selects tasks belonging to one user.",
            question:
              "Why use parameterized SQL?",
            answer:
              "To safely pass values into SQL statements without directly concatenating them.",
            distractors: [
              "To make HTML render faster.",
              "To replace the database.",
            ],
          }),
        ],
      },
      {
        slug: "ajax-and-testing",
        title: "AJAX and testing",
        description:
          "Update web pages dynamically and verify Python application behavior with tests.",
        lessons: [
          lesson({
            slug: "ajax-requests",
            title: "AJAX requests",
            summary:
              "Send requests from the browser without reloading the entire page.",
            what:
              "AJAX allows JavaScript to request data or actions from the server and update part of the page.",
            why:
              "Dynamic updates make interactive applications feel more responsive.",
            example:
              "$.ajax({\n    url: \"/task/list\",\n    success: function(data) {\n        $(\"#items\").html(data);\n    }\n});",
            output:
              "The task list is updated after the AJAX request completes.",
            mistake:
              "Reloading the entire page for every small interaction.",
            correction:
              "Use an asynchronous request when only part of the page needs updating.",
            labPrompt:
              "Design an AJAX request that retrieves a task list.",
            question:
              "What is the main benefit of AJAX?",
            answer:
              "It can update part of a page without requiring a full page reload.",
            distractors: [
              "It replaces Python.",
              "It permanently stores data in the browser.",
            ],
          }),
          lesson({
            slug: "unit-testing",
            title: "Unit testing",
            summary:
              "Test individual pieces of Python application logic.",
            what:
              "Unit tests check whether small pieces of code produce expected results.",
            why:
              "Tests help detect incorrect behavior when application code is changed or refactored.",
            example:
              "import unittest\n\nclass TestMath(unittest.TestCase):\n    def test_number(self):\n        self.assertEqual(24, factorial(4))",
            output:
              "The test passes when factorial(4) returns 24.",
            mistake:
              "Testing only the final web page without testing important application logic.",
            correction:
              "Write focused tests for important functions and behaviors.",
            labPrompt:
              "Write a unit test for a Python function that adds two numbers.",
            question:
              "What does a unit test verify?",
            answer:
              "That a small unit of code behaves as expected.",
            distractors: [
              "Only the visual design.",
              "Only the database server.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "entities-and-relations",
    title: "Entities and relations",
    description:
      "Model real-world objects and relationships and use them to build reusable application frameworks.",
    topics: [
      {
        slug: "entity-modeling",
        title: "Entity modeling",
        description:
          "Represent application objects as entities with structured data.",
        lessons: [
          lesson({
            slug: "entity-class",
            title: "Entity classes",
            summary:
              "Represent database-backed objects using Python classes.",
            what:
              "An entity class represents a meaningful object in the application's domain, such as a book, user, or account.",
            why:
              "Classes provide a natural way to organize the data and behavior associated with domain objects.",
            example:
              "class Book:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author",
            output:
              "A Book object contains title and author information.",
            mistake:
              "Representing every domain object with unrelated variables.",
            correction:
              "Group related attributes into a meaningful class.",
            labPrompt:
              "Create an Author class with a name and email.",
            question:
              "What does an entity class represent?",
            answer:
              "A meaningful object or concept in the application's domain.",
            distractors: [
              "Only a CSS component.",
              "Only a database connection.",
            ],
          }),
          lesson({
            slug: "entity-instances",
            title: "Entity instances",
            summary:
              "Create individual objects from an entity class.",
            what:
              "An instance is a concrete object created from a class definition.",
            why:
              "Applications usually work with many individual records of the same type.",
            example:
              "book = Book(\"Python Web Development\", \"Michel\")",
            output:
              "book contains one Book instance.",
            mistake:
              "Trying to use the class itself as if it were a specific database record.",
            correction:
              "Create an instance when you need a specific entity.",
            labPrompt:
              "Create three Book instances with different titles.",
            question:
              "What is an instance?",
            answer:
              "A concrete object created from a class.",
            distractors: [
              "A database engine.",
              "A CSS selector.",
            ],
          }),
        ],
      },
      {
        slug: "relations-and-delivery",
        title: "Relations and delivery",
        description:
          "Connect entities and expose application operations through a delivery layer.",
        lessons: [
          lesson({
            slug: "entity-relations",
            title: "Relations between entities",
            summary:
              "Represent connections between different types of entities.",
            what:
              "A relation describes how one entity is connected to another, such as books belonging to authors or users owning tasks.",
            why:
              "Real applications rarely contain isolated entities.",
            example:
              "Author 1 ----< Book 1\nAuthor 1 ----< Book 2",
            output:
              "One author can be associated with multiple books.",
            mistake:
              "Duplicating complete entity data everywhere a relationship is needed.",
            correction:
              "Represent the relationship explicitly between entities.",
            labPrompt:
              "Model the relationship between students and courses.",
            question:
              "Why are relations important?",
            answer:
              "They represent connections between related entities.",
            distractors: [
              "They replace Python functions.",
              "They only control page colors.",
            ],
          }),
          lesson({
            slug: "delivery-layer",
            title: "Delivery layer",
            summary:
              "Understand the layer responsible for turning application operations into web responses.",
            what:
              "The delivery layer receives web requests, invokes application functionality, and constructs responses for the client.",
            why:
              "Keeping delivery separate from domain logic makes the application easier to organize.",
            example:
              "@cherrypy.expose\ndef books(self):\n    return render_books(Book.list())",
            output:
              "The browser receives a representation of the books.",
            mistake:
              "Putting all database and presentation logic inside every endpoint.",
            correction:
              "Use the delivery layer to coordinate requests while keeping domain and data logic separate.",
            labPrompt:
              "Design a delivery method that returns a list of books.",
            question:
              "What is the delivery layer responsible for?",
            answer:
              "Handling web requests and producing responses using application logic.",
            distractors: [
              "Only storing database files.",
              "Only compiling JavaScript.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "wiki-development",
    title: "Building a wiki",
    description:
      "Build a multi-entity wiki application with search, tags, validation, and rendered content.",
    topics: [
      {
        slug: "wiki-data-and-interface",
        title: "Wiki data and interface",
        description:
          "Design the wiki data model and structure its browser interface.",
        lessons: [
          lesson({
            slug: "wiki-data-model",
            title: "Wiki data model",
            summary:
              "Design the entities required to represent wiki topics and their information.",
            what:
              "A wiki needs a data model capable of storing topics and related information such as tags, content, and references.",
            why:
              "A clear data model makes searching, editing, displaying, and relating topics possible.",
            example:
              "class Topic:\n    title = \"\"\n    content = \"\"\n    tags = []",
            output:
              "A topic contains a title, content, and associated tags.",
            mistake:
              "Storing every wiki feature in one unstructured string.",
            correction:
              "Separate meaningful pieces of topic information into appropriate fields or entities.",
            labPrompt:
              "Design the fields required for a wiki Topic entity.",
            question:
              "Why is a data model important for a wiki?",
            answer:
              "It defines how topics and their related information are stored and connected.",
            distractors: [
              "It controls only the page colors.",
              "It replaces the browser.",
            ],
          }),
          lesson({
            slug: "wiki-search-interface",
            title: "Wiki search interface",
            summary:
              "Provide multiple ways for users to locate wiki topics.",
            what:
              "A wiki interface can provide searches based on topic words, titles, and tags.",
            why:
              "Search functionality becomes important when the number of topics grows.",
            example:
              "<input id=\"word-search\">\n<input id=\"title-search\">\n<input id=\"tag-search\">",
            output:
              "The interface provides separate search inputs.",
            mistake:
              "Providing only one search mechanism for every type of content.",
            correction:
              "Design search controls around the different ways users need to locate information.",
            labPrompt:
              "Design a wiki search panel with title and tag search.",
            question:
              "Why can a wiki need multiple search methods?",
            answer:
              "Users may want to find topics by different properties such as title, content, or tags.",
            distractors: [
              "Because HTML requires three search fields.",
              "Because databases cannot search text.",
            ],
          }),
        ],
      },
      {
        slug: "validation-and-rendering",
        title: "Validation and rendering",
        description:
          "Validate incoming content and convert wiki markup into safe HTML output.",
        lessons: [
          lesson({
            slug: "input-validation",
            title: "Input validation",
            summary:
              "Check data before allowing it into the application.",
            what:
              "Input validation verifies that incoming values meet the requirements expected by the application.",
            why:
              "Web applications accept input from users and must not blindly trust that input.",
            example:
              "if not title.strip():\n    raise ValueError(\"Title is required\")",
            output:
              "Invalid input is rejected instead of being stored.",
            mistake:
              "Assuming browser-side validation is enough.",
            correction:
              "Validate important input on the server as well.",
            labPrompt:
              "Write validation rules for a wiki topic title.",
            question:
              "Why is server-side validation important?",
            answer:
              "The server cannot assume that incoming client data is valid or trustworthy.",
            distractors: [
              "Because CSS cannot validate HTML.",
              "Because JavaScript is always disabled.",
            ],
          }),
          lesson({
            slug: "wiki-rendering",
            title: "Rendering wiki content",
            summary:
              "Transform wiki references into HTML that users can view.",
            what:
              "A renderer can identify special patterns in wiki content and transform them into HTML links or images.",
            why:
              "Rendering lets users write simple wiki syntax while the application produces a richer presentation.",
            example:
              "content = \"See {Python, Python topic}\"\n\n# Renderer transforms the reference into HTML",
            output:
              "The wiki reference becomes a clickable HTML link.",
            mistake:
              "Displaying raw markup without processing it.",
            correction:
              "Pass wiki content through the appropriate rendering process before displaying it.",
            labPrompt:
              "Design a simple renderer that converts a topic reference into an HTML link.",
            question:
              "What does a wiki renderer do?",
            answer:
              "It converts supported wiki markup into HTML output.",
            distractors: [
              "It creates the database connection.",
              "It authenticates users.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "refactoring-and-reuse",
    title: "Refactoring and reuse",
    description:
      "Improve the entity framework by extracting reusable abstractions and reducing duplicated code.",
    topics: [
      {
        slug: "refactoring-frameworks",
        title: "Refactoring frameworks",
        description:
          "Review existing code and identify opportunities for reusable abstractions.",
        lessons: [
          lesson({
            slug: "refactoring-code",
            title: "Refactoring code",
            summary:
              "Improve existing code without changing its intended behavior.",
            what:
              "Refactoring reorganizes existing code to improve structure, readability, reuse, or maintainability.",
            why:
              "Applications become harder to maintain when similar functionality is duplicated across many places.",
            example:
              "Before:\nget_book()\nget_author()\nget_user()\n\nAfter:\nget_entity(type, id)",
            output:
              "Common behavior is represented through a reusable abstraction.",
            mistake:
              "Changing application behavior while calling the change a refactor.",
            correction:
              "Keep the intended behavior while improving the internal structure.",
            labPrompt:
              "Identify duplicated logic in a simple Python application and propose a reusable function.",
            question:
              "What is the main goal of refactoring?",
            answer:
              "To improve internal code structure without changing intended behavior.",
            distractors: [
              "To add random features.",
              "To replace Python with JavaScript.",
            ],
          }),
          lesson({
            slug: "abstract-entities",
            title: "Abstract entity classes",
            summary:
              "Use shared abstractions for common entity behavior.",
            what:
              "An abstract entity layer can define behavior shared by multiple concrete entities.",
            why:
              "Common entity behavior should not have to be rewritten separately for every entity type.",
            example:
              "class AbstractEntity:\n    def save(self):\n        raise NotImplementedError",
            output:
              "Concrete entities can build upon shared entity behavior.",
            mistake:
              "Duplicating identical save, list, and delete logic in every entity class.",
            correction:
              "Move common behavior into a reusable base abstraction.",
            labPrompt:
              "Design a base entity with common save and delete operations.",
            question:
              "Why use an abstract entity?",
            answer:
              "To provide shared behavior for different concrete entities.",
            distractors: [
              "To create CSS styles.",
              "To replace database tables.",
            ],
          }),
        ],
      },
      {
        slug: "caching-and-browsing",
        title: "Caching and entity browsing",
        description:
          "Improve repeated data access and provide reusable entity browsing interfaces.",
        lessons: [
          lesson({
            slug: "caching",
            title: "Caching",
            summary:
              "Reuse previously obtained data when repeated computation or retrieval is unnecessary.",
            what:
              "Caching stores previously obtained information so it can be reused instead of repeatedly performing the same expensive operation.",
            why:
              "Repeated database or computation work can make an application slower than necessary.",
            example:
              "cache = {}\n\nif key in cache:\n    return cache[key]",
            output:
              "A previously stored value can be returned without repeating the operation.",
            mistake:
              "Performing the same expensive lookup every time.",
            correction:
              "Consider caching data that is safe and useful to reuse.",
            labPrompt:
              "Design a simple dictionary-based cache for a Python function.",
            question:
              "What is the purpose of caching?",
            answer:
              "To reuse previously obtained results and reduce repeated work.",
            distractors: [
              "To delete old data automatically.",
              "To validate HTML.",
            ],
          }),
          lesson({
            slug: "entity-browser",
            title: "Entity browser",
            summary:
              "Display collections of entities in a reusable table-based interface.",
            what:
              "An entity browser presents a collection of records and provides a consistent way to inspect them.",
            why:
              "Reusable browsing components reduce the amount of interface code needed for different entity types.",
            example:
              "for book in books:\n    print(book.title, book.author)",
            output:
              "Each book is displayed as part of the entity list.",
            mistake:
              "Creating a completely different browsing system for every entity.",
            correction:
              "Build a reusable browser that can work with different entity collections.",
            labPrompt:
              "Design a generic table that can display a list of entities.",
            question:
              "Why is a reusable entity browser useful?",
            answer:
              "The same browsing mechanism can support different entity types.",
            distractors: [
              "It prevents database access.",
              "It removes the need for entities.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "crm-development",
    title: "Customer relationship management",
    description:
      "Build a CRM application where users can browse, create, edit, and relate business entities.",
    topics: [
      {
        slug: "crm-foundations",
        title: "CRM foundations",
        description:
          "Understand the basic structure and purpose of a customer relationship application.",
        lessons: [
          lesson({
            slug: "crm-design",
            title: "CRM application design",
            summary:
              "Design an application for managing customer-related information.",
            what:
              "A CRM application manages entities such as customers, accounts, contacts, and relationships.",
            why:
              "Business applications need structured ways to store and manage information about customers and related objects.",
            example:
              "Customer -> Contact -> Account",
            output:
              "CRM entities are organized around customer-related information and relationships.",
            mistake:
              "Treating every CRM record as an unrelated piece of data.",
            correction:
              "Identify the entities and relationships required by the business domain.",
            labPrompt:
              "Design three entities for a simple CRM system.",
            question:
              "What is a CRM application designed to manage?",
            answer:
              "Customer-related information and relationships.",
            distractors: [
              "Only CSS styles.",
              "Only server configuration.",
            ],
          }),
          lesson({
            slug: "adding-editing-instances",
            title: "Adding and editing instances",
            summary:
              "Allow users to create and modify entity records.",
            what:
              "A CRM needs interfaces that allow users to add new entities and edit existing ones.",
            why:
              "A database-driven application is useful only when users can maintain its information.",
            example:
              "customer = {\n    \"name\": \"Maya\",\n    \"status\": \"active\"\n}",
            output:
              "A new customer record can be created or an existing record can be modified.",
            mistake:
              "Providing only a read-only list of records.",
            correction:
              "Provide controlled operations for creating and editing entities.",
            labPrompt:
              "Design an add-customer form and an edit-customer form.",
            question:
              "Why does a CRM need editing functionality?",
            answer:
              "Customer information changes and must be maintained over time.",
            distractors: [
              "Because HTML requires forms.",
              "To remove database relationships.",
            ],
          }),
        ],
      },
      {
        slug: "relations-and-picklists",
        title: "Relations and picklists",
        description:
          "Connect CRM entities and use controlled choices for related values.",
        lessons: [
          lesson({
            slug: "crm-relations",
            title: "CRM relations",
            summary:
              "Connect related CRM records.",
            what:
              "CRM entities can have relationships such as customers belonging to accounts or contacts belonging to customers.",
            why:
              "Relationships allow the application to represent the real structure of business data.",
            example:
              "Customer 42 -> Account 7",
            output:
              "The customer record is associated with account 7.",
            mistake:
              "Copying account information into every customer record.",
            correction:
              "Store the relationship between the entities instead.",
            labPrompt:
              "Model a customer-to-account relationship.",
            question:
              "What does a CRM relation represent?",
            answer:
              "A connection between related business entities.",
            distractors: [
              "A CSS class.",
              "A browser event.",
            ],
          }),
          lesson({
            slug: "picklists",
            title: "Picklists",
            summary:
              "Restrict a field to a controlled set of choices.",
            what:
              "A picklist presents users with predefined values instead of requiring arbitrary text input.",
            why:
              "Controlled choices improve consistency when users enter values such as status or category.",
            example:
              "<select name=\"status\">\n  <option>Active</option>\n  <option>Inactive</option>\n</select>",
            output:
              "The user chooses one of the available status values.",
            mistake:
              "Allowing users to type inconsistent versions of the same status.",
            correction:
              "Use a controlled selection when the allowed values are known.",
            labPrompt:
              "Create a status picklist containing Active, Inactive, and Pending.",
            question:
              "Why use a picklist?",
            answer:
              "To provide a controlled set of valid choices.",
            distractors: [
              "To execute Python code.",
              "To create database indexes.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "full-webapps-and-access-control",
    title: "Full web applications and access control",
    description:
      "Build reusable instance interfaces and control what different users are allowed to access.",
    topics: [
      {
        slug: "instance-management",
        title: "Instance management",
        description:
          "Handle related records and reusable display and browsing interfaces.",
        lessons: [
          lesson({
            slug: "one-to-many-relations",
            title: "One-to-many relationships",
            summary:
              "Represent relationships where one entity is connected to multiple entities.",
            what:
              "A one-to-many relationship occurs when one record can be associated with many records of another type.",
            why:
              "Many business relationships naturally follow this pattern, such as one customer having multiple orders.",
            example:
              "Customer 1 -> Order 1\nCustomer 1 -> Order 2\nCustomer 1 -> Order 3",
            output:
              "One customer is associated with multiple orders.",
            mistake:
              "Assuming every relationship is one-to-one.",
            correction:
              "Choose the relationship structure that matches the real data model.",
            labPrompt:
              "Create a one-to-many model between an author and books.",
            question:
              "What is a one-to-many relationship?",
            answer:
              "One entity is associated with multiple entities of another type.",
            distractors: [
              "Every entity has exactly one field.",
              "Two tables must always contain the same rows.",
            ],
          }),
          lesson({
            slug: "display-and-browse",
            title: "Display and browse interfaces",
            summary:
              "Create reusable interfaces for viewing individual records and collections.",
            what:
              "Display interfaces show an individual entity while browse interfaces show collections of entities.",
            why:
              "Applications commonly need both detailed views and list views.",
            example:
              "Browse -> customer list\nDisplay -> one customer record",
            output:
              "Users can move between collection and individual record views.",
            mistake:
              "Using the same interface for a complete list and a detailed record.",
            correction:
              "Provide interfaces suited to the amount and type of information being displayed.",
            labPrompt:
              "Design a customer list page and a customer detail page.",
            question:
              "What is the difference between browse and display?",
            answer:
              "Browse shows a collection while display focuses on an individual record.",
            distractors: [
              "Browse is only for CSS.",
              "Display only works with JavaScript.",
            ],
          }),
        ],
      },
      {
        slug: "access-control",
        title: "Access control",
        description:
          "Restrict application functionality according to authentication and user roles.",
        lessons: [
          lesson({
            slug: "access-control-basics",
            title: "Access control",
            summary:
              "Control which authenticated users can access protected functionality.",
            what:
              "Access control determines whether a user is allowed to perform an operation or access a resource.",
            why:
              "Not every user should have access to every part of a business application.",
            example:
              "if not user.is_authenticated:\n    deny_access()",
            output:
              "Unauthenticated users are denied access to the protected operation.",
            mistake:
              "Checking access only in the browser.",
            correction:
              "Enforce authorization on the server before performing protected operations.",
            labPrompt:
              "Design access rules for a customer management page.",
            question:
              "What does access control determine?",
            answer:
              "Whether a user is allowed to access a resource or perform an operation.",
            distractors: [
              "How a page is colored.",
              "How SQL sorts rows.",
            ],
          }),
          lesson({
            slug: "role-based-access-control",
            title: "Role-based access control",
            summary:
              "Use user roles to determine permissions.",
            what:
              "Role-based access control assigns permissions according to roles such as administrator, manager, or regular user.",
            why:
              "Roles provide a manageable way to apply different permissions to different groups of users.",
            example:
              "if user.role == \"admin\":\n    allow_delete()\nelse:\n    deny_access()",
            output:
              "Only users with the required role can perform the protected action.",
            mistake:
              "Giving every authenticated user the same permissions.",
            correction:
              "Check the user's role before allowing role-specific operations.",
            labPrompt:
              "Define permissions for admin, manager, and regular user roles.",
            question:
              "What is role-based access control?",
            answer:
              "A permission model where access is determined by a user's assigned role.",
            distractors: [
              "A database sorting algorithm.",
              "A JavaScript animation system.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "crm-customization",
    title: "CRM customization",
    description:
      "Improve browsing large collections and allow users to customize how CRM information is presented.",
    topics: [
      {
        slug: "sorting-and-filtering",
        title: "Sorting and filtering",
        description:
          "Make large entity collections easier to search and inspect.",
        lessons: [
          lesson({
            slug: "sorting-records",
            title: "Sorting records",
            summary:
              "Arrange entity records according to a selected field.",
            what:
              "Sorting changes the order in which records are presented according to a selected value.",
            why:
              "Users can understand large collections more easily when records can be ordered by useful fields.",
            example:
              "customers = sorted(customers, key=lambda customer: customer.name)",
            output:
              "Customers are displayed in name order.",
            mistake:
              "Sorting after the data has already been rendered without updating the displayed collection.",
            correction:
              "Sort the collection before generating the appropriate output.",
            labPrompt:
              "Sort a list of customer objects by name.",
            question:
              "What does sorting change?",
            answer:
              "The order in which records are presented.",
            distractors: [
              "The records themselves.",
              "The database schema.",
            ],
          }),
          lesson({
            slug: "filtering-records",
            title: "Filtering records",
            summary:
              "Show only records that match a condition.",
            what:
              "Filtering removes records from the displayed result when they do not satisfy a specified condition.",
            why:
              "Filtering helps users find relevant records in large collections.",
            example:
              "active = [\n    customer\n    for customer in customers\n    if customer.status == \"active\"\n]",
            output:
              "Only active customers remain in the result.",
            mistake:
              "Deleting records that do not match the filter.",
            correction:
              "Filter the displayed result without modifying the underlying data unless deletion is explicitly required.",
            labPrompt:
              "Filter a customer list to show only active customers.",
            question:
              "What does filtering do?",
            answer:
              "It limits the displayed records to those matching a condition.",
            distractors: [
              "It permanently deletes nonmatching records.",
              "It changes every record's value.",
            ],
          }),
        ],
      },
      {
        slug: "user-customization",
        title: "User customization",
        description:
          "Allow application users to customize displays and lists.",
        lessons: [
          lesson({
            slug: "custom-entity-display",
            title: "Custom entity displays",
            summary:
              "Allow users to control which entity information is displayed.",
            what:
              "A customizable entity display lets the application choose or configure which fields appear in a record view.",
            why:
              "Different users may need different information when working with the same entity.",
            example:
              "display_fields = [\"name\", \"status\", \"email\"]",
            output:
              "The interface displays the configured fields.",
            mistake:
              "Hard-coding every field into the display.",
            correction:
              "Represent display configuration separately so it can be changed without rewriting the entire interface.",
            labPrompt:
              "Create a configuration containing the fields shown on a customer detail page.",
            question:
              "Why make an entity display configurable?",
            answer:
              "Different users or contexts may need different fields.",
            distractors: [
              "To remove the database.",
              "To stop Python execution.",
            ],
          }),
          lesson({
            slug: "custom-entity-list",
            title: "Custom entity lists",
            summary:
              "Configure which fields appear in a collection view.",
            what:
              "A customizable list can control columns, ordering, filtering, or other presentation choices.",
            why:
              "Large entity collections become more useful when users can focus on the information they need.",
            example:
              "columns = [\"name\", \"status\", \"created_at\"]",
            output:
              "The list displays the configured columns.",
            mistake:
              "Using a fixed list of columns for every use case.",
            correction:
              "Allow the list configuration to determine which fields are displayed.",
            labPrompt:
              "Design a configurable customer list with selectable columns.",
            question:
              "What can a customizable entity list control?",
            answer:
              "Which fields and presentation choices are shown to the user.",
            distractors: [
              "The Python interpreter version.",
              "The physical database server.",
            ],
          }),
        ],
      },
    ],
  },
];