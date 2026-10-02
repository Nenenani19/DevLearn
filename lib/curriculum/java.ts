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
      "The Java web application code is using the wrong component, lifecycle, configuration, or request-handling pattern.",
    hint:
      input.hint ??
      "Check which Java web component is responsible for the request, response, business logic, or view rendering.",
    labCode: input.labCode ?? input.example,
    output: input.output ?? "Example output appears here.",
  };
}

export const javaWebDevelopmentModules: LocalModuleSeed[] = [
  {
    slug: "java-web-foundations",
    title: "Java web foundations",
    description:
      "Understand the JVM, Java EE, web application architecture, web frameworks, and the foundations of Java web development.",
    topics: [
      {
        slug: "jvm-and-java-ee",
        title: "JVM and Java EE",
        description:
          "Learn how JVM languages and Java EE fit into Java web development.",
        lessons: [
          lesson({
            slug: "jvm-languages",
            title: "JVM languages",
            summary:
              "Understand how multiple programming languages can run on the Java Virtual Machine.",
            what:
              "The JVM provides a runtime environment for Java and other languages such as Groovy and Scala. Languages can compile to JVM-compatible bytecode and use the same runtime platform.",
            why:
              "Understanding the JVM explains why Java web projects can combine Java with other JVM languages when different parts of an application benefit from different language features.",
            example:
              "Java source -> javac -> bytecode -> JVM\n\nGroovy source -> Groovy compiler -> bytecode -> JVM\n\nScala source -> Scala compiler -> bytecode -> JVM",
            mistake:
              "Assuming the JVM can execute only Java source code.",
            mistakeExplanation:
              "The JVM executes bytecode rather than directly requiring Java source code. Other languages can target the JVM as well.",
            correction:
              "Java, Groovy, and Scala can all produce code that runs on the JVM.",
            labPrompt:
              "Create a short note explaining the relationship between Java source code, bytecode, and the JVM.",
            question:
              "What does the JVM provide for JVM-based languages?",
            answer:
              "A runtime environment capable of executing JVM bytecode.",
            distractors: [
              "Only a Java text editor.",
              "Only a database server.",
            ],
          }),

          lesson({
            slug: "java-ee-platform",
            title: "Java EE platform",
            summary:
              "Understand Java EE as a collection of specifications and APIs for enterprise applications.",
            what:
              "Java EE provides standardized APIs and an application model for building enterprise applications. It separates responsibilities into areas such as web, business, and data access tiers.",
            why:
              "Large applications become easier to organize when common enterprise responsibilities have defined APIs and architectural boundaries.",
            example:
              "Client\n  -> Web Tier\n  -> Service Layer\n  -> Data Access Layer\n  -> Database",
            mistake:
              "Putting database logic directly inside the web layer.",
            mistakeExplanation:
              "Mixing responsibilities makes the application tightly coupled and harder to maintain.",
            correction:
              "Keep web handling, business logic, and data access in separate layers.",
            labPrompt:
              "Draw a three-layer architecture for a simple bookstore application.",
            question:
              "What is one major purpose of Java EE?",
            answer:
              "To provide standardized APIs and an application model for enterprise applications.",
            distractors: [
              "To replace the JVM.",
              "To act only as a text editor.",
            ],
          }),
        ],
      },

      {
        slug: "web-architecture",
        title: "Web application architecture",
        description:
          "Understand clients, web tiers, service layers, data access, and separation of concerns.",
        lessons: [
          lesson({
            slug: "multitier-architecture",
            title: "Multitier architecture",
            summary:
              "Separate a web application into functional tiers.",
            what:
              "A multitier application separates functionality into distinct areas. A typical Java enterprise application can contain client, web, service, and data access responsibilities.",
            why:
              "Separating responsibilities makes individual parts easier to change, test, and reuse.",
            example:
              "Browser\n  |\n  v\nWeb Layer\n  |\n  v\nService Layer\n  |\n  v\nData Access Layer",
            mistake:
              "Making every layer directly communicate with every other layer.",
            mistakeExplanation:
              "Uncontrolled dependencies create tight coupling and make changes harder to manage.",
            correction:
              "Keep the normal call flow from the higher layer toward the lower layer.",
            labPrompt:
              "Create a diagram showing the flow from a browser to a database.",
            question:
              "Why is a multitier architecture useful?",
            answer:
              "It separates different responsibilities into distinct functional areas.",
            distractors: [
              "It removes the need for a database.",
              "It forces every class into one file.",
            ],
          }),

          lesson({
            slug: "separation-of-concerns",
            title: "Separation of concerns",
            summary:
              "Keep different responsibilities from becoming mixed together.",
            what:
              "Separation of concerns means organizing software so each part focuses on a particular responsibility instead of mixing unrelated concerns together.",
            why:
              "A system with clear responsibilities is easier to understand, modify, reuse, and maintain.",
            example:
              "Web layer -> handles requests\nService layer -> handles business rules\nData layer -> handles persistence",
            mistake:
              "Making a BookService responsible for business logic, security, logging, and database access.",
            mistakeExplanation:
              "One component becomes responsible for too many concerns, producing tightly coupled and difficult-to-maintain code.",
            correction:
              "Move cross-cutting and persistence responsibilities into appropriate components or layers.",
            labPrompt:
              "Separate the responsibilities of a bookstore application into three layers.",
            question:
              "What does separation of concerns try to achieve?",
            answer:
              "It keeps different responsibilities organized into appropriate parts of the application.",
            distractors: [
              "It puts all logic into one class.",
              "It removes all application layers.",
            ],
          }),
        ],
      },

      {
        slug: "java-web-basics",
        title: "Java web basics",
        description:
          "Set up Java, compile applications, and understand the bookstore case study.",
        lessons: [
          lesson({
            slug: "jdk-jre-jvm",
            title: "JDK, JRE, and JVM",
            summary:
              "Understand the roles of the JDK, JRE, and JVM.",
            what:
              "The JVM runs bytecode. The JRE provides the JVM and core libraries needed to run Java programs. The JDK includes development tools such as the Java compiler.",
            why:
              "Knowing these components helps you understand what is required to develop versus simply run Java applications.",
            example:
              "Java source\n   |\n javac\n   |\nbytecode\n   |\n JVM\n   |\nprogram output",
            mistake:
              "Trying to compile Java source code with only a runtime environment.",
            mistakeExplanation:
              "Compilation requires development tools such as javac, which are provided by the JDK.",
            correction:
              "Use the JDK when you need to compile and develop Java applications.",
            labPrompt:
              "Check whether javac is available on your system and record its version.",
            question:
              "Which component provides the Java compiler?",
            answer: "The JDK.",
            distractors: ["The JVM alone.", "The JRE alone."],
          }),

          lesson({
            slug: "compile-and-run-java",
            title: "Compile and run a Java program",
            summary:
              "Compile a Java source file and run the resulting class.",
            what:
              "Java source files use the .java extension. The javac compiler converts them into bytecode in a .class file, which can then be executed by the JVM.",
            why:
              "This compilation process is the foundation for understanding how Java applications execute.",
            example:
              "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World\");\n    }\n}\n\nCompile:\njavac HelloWorld.java\n\nRun:\njava HelloWorld",
            output: "Hello World",
            mistake:
              "java HelloWorld.class",
            mistakeExplanation:
              "The java command expects the class name rather than the .class filename extension.",
            correction:
              "java HelloWorld",
            labPrompt:
              "Create HelloWorld.java, compile it, and run it from the terminal.",
            question:
              "Which command compiles HelloWorld.java?",
            answer: "javac HelloWorld.java",
            distractors: [
              "java HelloWorld.java",
              "compile HelloWorld.java",
            ],
          }),

          lesson({
            slug: "bookstore-data-model",
            title: "Bookstore data model",
            summary:
              "Understand the Category, Book, and Author relationships used throughout the web application.",
            what:
              "The bookstore example uses Category, Book, and Author data. A category can contain multiple books, and a book can have multiple authors in the simplified model.",
            why:
              "A consistent data model allows the same application to be rebuilt using different Java web technologies throughout the book.",
            example:
              "Category\n   |\n   | one-to-many\n   v\n Book\n   |\n   | one-to-many\n   v\n Author",
            mistake:
              "Treating Category, Book, and Author as unrelated data.",
            mistakeExplanation:
              "The application depends on relationships between these entities to represent bookstore information.",
            correction:
              "Model the relationships explicitly and use them when retrieving bookstore data.",
            labPrompt:
              "Draw an entity relationship diagram for Category, Book, and Author.",
            question:
              "Which entity stores book titles in the simplified model?",
            answer: "Book",
            distractors: ["Category", "Author"],
          }),
        ],
      },
    ],
  },

  {
    slug: "servlets-and-jsp",
    title: "Servlets and JSP",
    description:
      "Build Java web applications using servlets, JSP, sessions, requests, responses, and Model 2 architecture.",
    topics: [
      {
        slug: "servlet-foundations",
        title: "Servlet foundations",
        description:
          "Understand servlet requests, responses, lifecycle, and web containers.",
        lessons: [
          lesson({
            slug: "servlet-basics",
            title: "Servlet basics",
            summary:
              "Use a servlet to receive an HTTP request and produce a response.",
            what:
              "A servlet is a Java web component managed by a web container. It can receive client requests, process them, and create responses.",
            why:
              "Servlets provide the standard Java mechanism for handling web requests before higher-level frameworks are introduced.",
            example:
              "public class HelloServlet extends HttpServlet {\n    protected void doGet(\n        HttpServletRequest request,\n        HttpServletResponse response) {\n        // handle request\n    }\n}",
            mistake:
              "Creating a servlet as an ordinary standalone class without the servlet lifecycle.",
            mistakeExplanation:
              "Servlets are web components managed by a servlet container.",
            correction:
              "Extend the appropriate servlet class and allow the web container to manage the request lifecycle.",
            labPrompt:
              "Create a simple servlet that responds to a GET request.",
            question:
              "Who manages servlet components?",
            answer: "The web container.",
            distractors: [
              "The browser directly.",
              "The database server.",
            ],
          }),

          lesson({
            slug: "request-and-response",
            title: "Request and response",
            summary:
              "Understand how a servlet receives request information and sends a response.",
            what:
              "The request object provides information sent by the client, while the response object is used to construct the server's response.",
            why:
              "Most web applications need to read user input and return generated content.",
            example:
              "String name = request.getParameter(\"name\");\nresponse.getWriter().println(\"Hello \" + name);",
            output:
              "Hello Anu",
            mistake:
              "Reading a request parameter using the response object.",
            mistakeExplanation:
              "Request data belongs to HttpServletRequest, while output belongs to HttpServletResponse.",
            correction:
              "String name = request.getParameter(\"name\");",
            labPrompt:
              "Read a name parameter and print a greeting from a servlet.",
            question:
              "Which object provides request parameters?",
            answer: "HttpServletRequest",
            distractors: [
              "HttpServletResponse",
              "HttpServlet",
            ],
          }),
        ],
      },

      {
        slug: "jsp-and-model-2",
        title: "JSP and Model 2",
        description:
          "Separate request processing from presentation using JSP and MVC-style architecture.",
        lessons: [
          lesson({
            slug: "jsp-basics",
            title: "JavaServer Pages",
            summary:
              "Use JSP to generate dynamic web pages.",
            what:
              "JSP provides a page-oriented way to create dynamic web content. It can be used as the presentation part of a Java web application.",
            why:
              "Separating presentation from request-handling code makes web applications easier to organize.",
            example:
              "<html>\n<body>\n    <h1>Book List</h1>\n</body>\n</html>",
            mistake:
              "Putting all business logic directly into JSP pages.",
            mistakeExplanation:
              "JSP should primarily handle presentation rather than becoming the application's complete business layer.",
            correction:
              "Move business processing into Java components and use JSP for presentation.",
            labPrompt:
              "Create a JSP page that displays a bookstore heading and a book title.",
            question:
              "What is JSP mainly used for in a Java web application?",
            answer:
              "Generating the presentation or view of dynamic web content.",
            distractors: [
              "Replacing the database.",
              "Compiling the JVM.",
            ],
          }),

          lesson({
            slug: "model-2-architecture",
            title: "Model 2 architecture",
            summary:
              "Separate model, controller, and view responsibilities.",
            what:
              "Model 2 architecture applies MVC-style separation where the controller handles requests, the model represents application data or business operations, and the view renders the result.",
            why:
              "Separating these responsibilities prevents presentation code from becoming tightly coupled with business logic.",
            example:
              "Browser\n  |\n  v\nController\n  |\n  v\nModel / Service\n  |\n  v\nJSP View\n  |\n  v\nBrowser",
            mistake:
              "Making the JSP perform database operations and business processing.",
            mistakeExplanation:
              "That mixes view and business concerns.",
            correction:
              "Let the controller coordinate the request and use separate model/service components.",
            labPrompt:
              "Design a Model 2 flow for a bookstore search page.",
            question:
              "What is the main benefit of Model 2 architecture?",
            answer:
              "It separates request handling, application logic, and presentation.",
            distractors: [
              "It removes the need for controllers.",
              "It stores all data in JSP.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "java-ee-best-practices",
    title: "Java EE best practices",
    description:
      "Learn reusable Java EE web practices, EL, JSTL, web-tier patterns, and front-controller architecture.",
    topics: [
      {
        slug: "el-and-jstl",
        title: "Expression Language and JSTL",
        description:
          "Use Java EE view technologies to reduce presentation complexity.",
        lessons: [
          lesson({
            slug: "expression-language",
            title: "Expression Language",
            summary:
              "Access application data from a view using expression syntax.",
            what:
              "Expression Language provides a concise way for a view to access values exposed by the application.",
            why:
              "It reduces the amount of Java code needed inside presentation pages and supports separation between business logic and views.",
            example:
              "${book.title}\n${book.author}",
            mistake:
              "Putting complex business logic directly inside the page expression.",
            mistakeExplanation:
              "View expressions should primarily access and display prepared application data.",
            correction:
              "Prepare the required data in the application layer and use EL to display it.",
            labPrompt:
              "Create a JSP example that displays a book title using an EL expression.",
            question:
              "What is the main purpose of Expression Language?",
            answer:
              "To access application values from the view using concise expressions.",
            distractors: [
              "To compile Java bytecode.",
              "To create database tables.",
            ],
          }),

          lesson({
            slug: "jstl",
            title: "JSTL",
            summary:
              "Use standard JSP tag libraries for common presentation tasks.",
            what:
              "JSTL provides standard tags that can handle common view operations such as iteration and conditional rendering.",
            why:
              "Standard tags help keep JSP pages cleaner and reduce embedded Java code.",
            example:
              "<c:forEach var=\"book\" items=\"${books}\">\n    ${book.title}\n</c:forEach>",
            mistake:
              "Writing large blocks of Java code inside JSP pages for simple iteration.",
            mistakeExplanation:
              "JSTL exists to provide reusable tags for common presentation operations.",
            correction:
              "Use JSTL tags for standard iteration and conditional view logic.",
            labPrompt:
              "Create a JSP loop that displays three book titles.",
            question:
              "What does JSTL provide?",
            answer:
              "Standard tag libraries for common JSP presentation tasks.",
            distractors: [
              "A Java compiler.",
              "A database engine.",
            ],
          }),
        ],
      },

      {
        slug: "java-ee-web-patterns",
        title: "Java EE web patterns",
        description:
          "Understand recurring architectural patterns used by Java web applications.",
        lessons: [
          lesson({
            slug: "front-controller",
            title: "Front Controller pattern",
            summary:
              "Centralize request handling before dispatching to application controllers.",
            what:
              "The Front Controller pattern uses a central entry point to receive requests and determine which application component should handle each request.",
            why:
              "Centralizing common request processing can reduce duplicated logic and make authorization, dispatching, and other shared tasks easier to manage.",
            example:
              "HTTP Request\n    |\n    v\nFront Controller\n    |\n    +----> BookController\n    |\n    +----> AuthorController",
            mistake:
              "Making every page implement its own unrelated request-processing rules.",
            mistakeExplanation:
              "Common request concerns become duplicated across the application.",
            correction:
              "Centralize common request processing through a front controller.",
            labPrompt:
              "Draw a front-controller architecture for a bookstore application.",
            question:
              "What is the main purpose of a Front Controller?",
            answer:
              "To provide a central entry point for handling web requests.",
            distractors: [
              "To replace the database.",
              "To generate Java bytecode.",
            ],
          }),

          lesson({
            slug: "mvc-front-controller",
            title: "MVC with a Front Controller",
            summary:
              "Combine MVC with centralized request dispatching.",
            what:
              "A Front Controller can receive HTTP requests, use configuration metadata to identify an application controller, and then coordinate model and view processing.",
            why:
              "This structure is common in many web frameworks because it centralizes shared request behavior while preserving application-level MVC responsibilities.",
            example:
              "Request\n  -> Front Controller\n  -> Application Controller\n  -> Model\n  -> View\n  -> Response",
            mistake:
              "Having the front controller perform every business operation itself.",
            mistakeExplanation:
              "The front controller coordinates request processing; business logic should remain in appropriate application components.",
            correction:
              "Use the front controller for centralized request handling and delegate application work to controllers and services.",
            labPrompt:
              "Create a diagram showing MVC combined with a Front Controller.",
            question:
              "Why do frameworks commonly use a Front Controller?",
            answer:
              "It centralizes request handling and common web concerns.",
            distractors: [
              "It eliminates the model.",
              "It replaces Java with HTML.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "struts-2",
    title: "Struts 2",
    description:
      "Understand the Struts 2 architecture, actions, configuration, Maven integration, and Tiles.",
    topics: [
      {
        slug: "struts-foundations",
        title: "Struts 2 foundations",
        description:
          "Learn the main components and request flow of Struts 2.",
        lessons: [
          lesson({
            slug: "struts-architecture",
            title: "Struts 2 architecture",
            summary:
              "Understand how Struts 2 handles web requests using actions and framework components.",
            what:
              "Struts 2 is a request-based Java web framework that builds on MVC and uses framework components to route requests to application actions.",
            why:
              "Understanding its architecture is useful when working with existing or legacy Struts applications.",
            example:
              "Browser\n  |\n  v\nStruts Filter\n  |\n  v\nAction\n  |\n  v\nResult / View",
            mistake:
              "Treating a Struts action like a normal servlet that must manually handle every framework concern.",
            mistakeExplanation:
              "The framework manages much of the request and action processing.",
            correction:
              "Define actions and configuration according to the Struts architecture.",
            labPrompt:
              "Draw the basic request flow of a Struts 2 application.",
            question:
              "What type of framework is Struts 2?",
            answer:
              "A request-based Java web framework.",
            distractors: [
              "A database management system.",
              "A Java compiler.",
            ],
          }),

          lesson({
            slug: "struts-actions",
            title: "Struts actions",
            summary:
              "Use action classes to represent application operations.",
            what:
              "A Struts action represents an application operation that can be invoked as part of processing a web request.",
            why:
              "Actions provide a structured place for request-related application behavior.",
            example:
              "public class BookAction {\n    public String execute() {\n        return \"success\";\n    }\n}",
            mistake:
              "Returning an undefined result name from an action.",
            mistakeExplanation:
              "The result name must correspond to the framework configuration that determines what happens next.",
            correction:
              "Return a configured result such as \"success\".",
            labPrompt:
              "Create a simple action with an execute method returning success.",
            question:
              "What does an action commonly return?",
            answer:
              "A result name used by Struts to determine the next step.",
            distractors: [
              "A database connection.",
              "A Java package name.",
            ],
          }),
        ],
      },

      {
        slug: "struts-project",
        title: "Struts application development",
        description:
          "Build a Struts application and understand Maven and Tiles integration.",
        lessons: [
          lesson({
            slug: "struts-maven",
            title: "Struts with Maven",
            summary:
              "Use Maven to manage dependencies and build a Struts application.",
            what:
              "Maven can manage project dependencies and build configuration for a Struts web application.",
            why:
              "Dependency management becomes important as a web application grows and uses multiple libraries.",
            example:
              "<dependency>\n    <groupId>org.apache.struts</groupId>\n    <artifactId>struts2-core</artifactId>\n</dependency>",
            mistake:
              "Manually copying every dependency into the project without tracking versions.",
            mistakeExplanation:
              "Manual dependency management becomes difficult as projects grow.",
            correction:
              "Declare dependencies in the Maven project configuration.",
            labPrompt:
              "Create a Maven dependency entry for a Struts-based project.",
            question:
              "What problem does Maven help solve?",
            answer:
              "Project dependency and build management.",
            distractors: [
              "HTML rendering only.",
              "JVM memory management.",
            ],
          }),

          lesson({
            slug: "tiles-integration",
            title: "Tiles integration",
            summary:
              "Reuse page layouts with Tiles.",
            what:
              "Tiles provides a mechanism for defining reusable page layouts and composing views from common pieces.",
            why:
              "Shared layouts reduce repeated markup across pages in larger web applications.",
            example:
              "Base Layout\n  |\n  +-- Header\n  +-- Navigation\n  +-- Content\n  +-- Footer",
            mistake:
              "Copying the complete page layout into every JSP.",
            mistakeExplanation:
              "Repeated layouts increase duplication and make global design changes harder.",
            correction:
              "Define a reusable layout and provide page-specific content.",
            labPrompt:
              "Design a reusable bookstore page layout using header, navigation, content, and footer sections.",
            question:
              "Why is a reusable Tiles layout useful?",
            answer:
              "It reduces duplicated page-layout code.",
            distractors: [
              "It replaces the Java compiler.",
              "It stores database records.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "spring-web-mvc",
    title: "Spring Web MVC",
    description:
      "Learn dependency injection, AOP, Spring templates, DispatcherServlet, and Spring Web MVC.",
    topics: [
      {
        slug: "spring-core",
        title: "Spring fundamentals",
        description:
          "Understand loose coupling, dependency injection, and cross-cutting concerns.",
        lessons: [
          lesson({
            slug: "dependency-injection",
            title: "Dependency injection",
            summary:
              "Provide an object's dependencies instead of making the object create them itself.",
            what:
              "Dependency injection means an object's required collaborators are supplied to it rather than being constructed directly inside the object.",
            why:
              "Loose coupling makes components easier to replace, test, and maintain.",
            example:
              "public class BookService {\n    private BookRepository repository;\n\n    public BookService(BookRepository repository) {\n        this.repository = repository;\n    }\n}",
            mistake:
              "Creating the repository directly inside BookService.",
            mistakeExplanation:
              "Direct construction tightly couples the service to one implementation.",
            correction:
              "Pass the dependency into the service.",
            labPrompt:
              "Create a service class that receives a repository through its constructor.",
            question:
              "What does dependency injection promote?",
            answer:
              "Loose coupling between components.",
            distractors: [
              "Hard-coded dependencies.",
              "Duplicated database logic.",
            ],
          }),

          lesson({
            slug: "spring-aop",
            title: "Aspect-oriented programming",
            summary:
              "Separate cross-cutting concerns from core business logic.",
            what:
              "AOP provides a way to handle concerns that affect multiple parts of an application, such as logging or transactions.",
            why:
              "Keeping cross-cutting concerns separate prevents business components from becoming overloaded with unrelated responsibilities.",
            example:
              "BookService\n    |\n    +-- Business logic\n\nLogging / Transactions\n    |\n    +-- Cross-cutting concern",
            mistake:
              "Adding the same logging code manually to every business method.",
            mistakeExplanation:
              "Repeated cross-cutting code creates duplication.",
            correction:
              "Use an appropriate cross-cutting mechanism such as AOP.",
            labPrompt:
              "Identify three cross-cutting concerns in a bookstore application.",
            question:
              "What type of concern is logging?",
            answer:
              "A cross-cutting concern.",
            distractors: [
              "A database table.",
              "A JSP page.",
            ],
          }),
        ],
      },

      {
        slug: "spring-mvc-architecture",
        title: "Spring MVC architecture",
        description:
          "Understand DispatcherServlet, controllers, models, and views.",
        lessons: [
          lesson({
            slug: "dispatcher-servlet",
            title: "DispatcherServlet",
            summary:
              "Understand the central request dispatcher used by Spring Web MVC.",
            what:
              "DispatcherServlet acts as the front controller in Spring Web MVC and coordinates processing of incoming web requests.",
            why:
              "Centralized request handling lets Spring apply common web behavior before delegating to the appropriate controller.",
            example:
              "HTTP Request\n    |\n    v\nDispatcherServlet\n    |\n    v\nController\n    |\n    v\nView",
            mistake:
              "Assuming every controller must independently handle the complete web request lifecycle.",
            mistakeExplanation:
              "Spring MVC uses DispatcherServlet to coordinate request processing.",
            correction:
              "Let DispatcherServlet route requests to the appropriate controller.",
            labPrompt:
              "Draw the request flow through DispatcherServlet.",
            question:
              "What role does DispatcherServlet play?",
            answer:
              "It acts as the central front controller for Spring MVC requests.",
            distractors: [
              "It stores database records.",
              "It replaces the JVM.",
            ],
          }),

          lesson({
            slug: "spring-controller",
            title: "Spring MVC controllers",
            summary:
              "Use controllers to process requests and select views.",
            what:
              "A Spring MVC controller receives a web request, invokes application logic, and determines the response or view.",
            why:
              "Controllers provide a clean boundary between HTTP request handling and the rest of the application.",
            example:
              "@Controller\npublic class BookController {\n    @RequestMapping(\"/books\")\n    public String books() {\n        return \"books\";\n    }\n}",
            mistake:
              "Returning a view name that does not match the configured view.",
            mistakeExplanation:
              "The view resolver needs to map the returned name to an actual view.",
            correction:
              "Return a correctly configured view name.",
            labPrompt:
              "Create a controller method mapped to /books.",
            question:
              "What does a controller do in Spring MVC?",
            answer:
              "It handles requests and coordinates the response or view.",
            distractors: [
              "It compiles Java source code.",
              "It replaces the database.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "jsf-component-development",
    title: "JSF component-based development",
    description:
      "Understand JSF architecture, components, lifecycle phases, managed beans, and Spring integration.",
    topics: [
      {
        slug: "jsf-foundations",
        title: "JSF foundations",
        description:
          "Learn the component-based approach used by JavaServer Faces.",
        lessons: [
          lesson({
            slug: "jsf-components",
            title: "JSF components",
            summary:
              "Understand how JSF represents a web page as a component tree.",
            what:
              "JSF is a component-based Java web framework. Pages are represented using UI components that participate in request processing and rendering.",
            why:
              "Component-based development provides a structured model for building interactive web interfaces.",
            example:
              "<h:form>\n    <h:inputText value=\"#{book.title}\" />\n    <h:commandButton value=\"Save\" />\n</h:form>",
            mistake:
              "Treating JSF as simply a collection of independent HTML files.",
            mistakeExplanation:
              "JSF manages server-side UI components and their lifecycle.",
            correction:
              "Think of the page as a JSF component tree managed by the framework.",
            labPrompt:
              "Create a simple JSF form containing a text field and a button.",
            question:
              "What development model does JSF use?",
            answer:
              "A component-based web development model.",
            distractors: [
              "A database-only model.",
              "A command-line-only model.",
            ],
          }),

          lesson({
            slug: "faces-servlet",
            title: "FacesServlet",
            summary:
              "Understand the central servlet that manages JSF requests.",
            what:
              "FacesServlet is the central servlet through which JSF web requests are processed.",
            why:
              "It provides the framework entry point for the JSF request lifecycle.",
            example:
              "Browser Request\n      |\n      v\nFacesServlet\n      |\n      v\nJSF Lifecycle\n      |\n      v\nRendered View",
            mistake:
              "Bypassing FacesServlet when processing a JSF page.",
            mistakeExplanation:
              "JSF relies on FacesServlet to coordinate its lifecycle.",
            correction:
              "Configure and use FacesServlet as the JSF request entry point.",
            labPrompt:
              "Draw the JSF request flow through FacesServlet.",
            question:
              "What is FacesServlet?",
            answer:
              "The central servlet used to process JSF requests.",
            distractors: [
              "A database driver.",
              "A Maven plugin.",
            ],
          }),
        ],
      },

      {
        slug: "jsf-lifecycle",
        title: "JSF lifecycle",
        description:
          "Understand the major phases involved in processing a JSF request.",
        lessons: [
          lesson({
            slug: "jsf-lifecycle-phases",
            title: "JSF lifecycle phases",
            summary:
              "Understand how a JSF request moves through its lifecycle.",
            what:
              "A JSF request passes through defined lifecycle phases that process submitted values, validation, model updates, application actions, and rendering.",
            why:
              "Knowing the lifecycle helps explain when validation, conversion, model updates, and actions occur.",
            example:
              "Restore View\n   -> Apply Request Values\n   -> Process Validations\n   -> Update Model Values\n   -> Invoke Application\n   -> Render Response",
            mistake:
              "Assuming the model is updated before validation.",
            mistakeExplanation:
              "JSF validates submitted values before updating the model.",
            correction:
              "Remember that validation occurs before the model update phase.",
            labPrompt:
              "Write the major JSF lifecycle phases in their processing order.",
            question:
              "Which phase updates model values?",
            answer:
              "Update Model Values.",
            distractors: [
              "Restore View.",
              "Render Response.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "grails-web-development",
    title: "Grails web development",
    description:
      "Learn rapid web development with Groovy and Grails using scaffolding, controllers, views, testing, and H2.",
    topics: [
      {
        slug: "grails-foundations",
        title: "Grails foundations",
        description:
          "Understand Grails conventions and rapid application development.",
        lessons: [
          lesson({
            slug: "grails-overview",
            title: "Grails overview",
            summary:
              "Understand Grails as a rapid web development framework on the JVM.",
            what:
              "Grails is a rapid web development framework that combines Groovy, conventions, Java technologies, and framework features to reduce application development effort.",
            why:
              "Convention-based development can reduce repetitive configuration and help developers build working applications quickly.",
            example:
              "Grails Application\n  |\n  +-- Domain\n  +-- Controller\n  +-- Views\n  +-- Services",
            mistake:
              "Assuming Grails requires every configuration to be written manually.",
            mistakeExplanation:
              "Grails uses conventions and generated structures to reduce repetitive configuration.",
            correction:
              "Follow Grails conventions and use its generated application structure.",
            labPrompt:
              "Sketch the main parts of a Grails application.",
            question:
              "What is one major goal of Grails?",
            answer:
              "To support rapid web application development.",
            distractors: [
              "To replace the JVM.",
              "To act as a database server.",
            ],
          }),

          lesson({
            slug: "grails-scaffolding",
            title: "Grails scaffolding",
            summary:
              "Generate application interfaces and controllers from domain classes.",
            what:
              "Grails scaffolding can generate application components based on domain classes. Static scaffolding generates code that can be inspected and customized, while dynamic scaffolding relies more heavily on framework behavior.",
            why:
              "Scaffolding provides a fast way to create a working application and learn how the generated pieces fit together.",
            example:
              "class Book {\n    String title\n}\n\nScaffolding\n    |\n    +-- Controller\n    +-- Views\n    +-- CRUD operations",
            mistake:
              "Assuming generated scaffolding is automatically the final production design.",
            mistakeExplanation:
              "Scaffolding is useful for rapid development and learning, but generated code may need customization.",
            correction:
              "Inspect and adapt generated controllers and views to application requirements.",
            labPrompt:
              "Create a Book domain model and describe what scaffolding could generate.",
            question:
              "What does scaffolding help generate?",
            answer:
              "Application components such as controllers and views from domain information.",
            distractors: [
              "Only database hardware.",
              "Only Java bytecode.",
            ],
          }),
        ],
      },

      {
        slug: "grails-testing-and-data",
        title: "Grails testing and data",
        description:
          "Use unit testing and an in-memory database while developing Grails applications.",
        lessons: [
          lesson({
            slug: "grails-unit-testing",
            title: "Unit testing with JUnit",
            summary:
              "Test application behavior using automated unit tests.",
            what:
              "Unit tests verify small pieces of application behavior independently. The Grails material introduces JUnit for testing web application code.",
            why:
              "Automated tests help detect regressions when application code changes.",
            example:
              "@Test\npublic void shouldReturnBookTitle() {\n    assertEquals(\"Java Web\", book.getTitle());\n}",
            mistake:
              "Testing only by manually clicking through the entire application.",
            mistakeExplanation:
              "Manual testing is useful but does not provide repeatable automated verification.",
            correction:
              "Add focused unit tests for important application behavior.",
            labPrompt:
              "Write a simple unit test that checks a Book object's title.",
            question:
              "What is the purpose of a unit test?",
            answer:
              "To automatically verify a small piece of application behavior.",
            distractors: [
              "To compile the JVM.",
              "To replace the web server.",
            ],
          }),

          lesson({
            slug: "grails-h2-database",
            title: "H2 in-memory database",
            summary:
              "Understand the role of an in-memory database during development.",
            what:
              "H2 is an in-memory database that can be used during development and testing without requiring a separate persistent database setup.",
            why:
              "A lightweight database can make development and automated testing faster and easier to repeat.",
            example:
              "Application\n   |\n   v\nGrails Data Layer\n   |\n   v\nH2 Database",
            mistake:
              "Assuming an in-memory database always provides permanent production storage.",
            mistakeExplanation:
              "In-memory databases are commonly used for development and testing because their data can be temporary.",
            correction:
              "Use H2 according to the development or testing scenario and choose persistent storage when required.",
            labPrompt:
              "Explain one reason an in-memory database can be useful for testing.",
            question:
              "Why can H2 be useful during development?",
            answer:
              "It provides a lightweight database environment for development and testing.",
            distractors: [
              "It replaces Java.",
              "It is a browser.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "play-java-scala",
    title: "Play with Java and Scala",
    description:
      "Explore Play 2, MVC routing, Java and Scala applications, reactive web development, and database access.",
    topics: [
      {
        slug: "play-framework",
        title: "Play framework",
        description:
          "Understand the Play 2 approach to modern JVM web development.",
        lessons: [
          lesson({
            slug: "play-2-overview",
            title: "Play 2 overview",
            summary:
              "Understand Play 2 as a JVM web framework for Java and Scala.",
            what:
              "Play 2 is a web application framework written around Scala and Java support. It provides features aimed at modern web and mobile applications, including REST, JSON, and WebSocket support.",
            why:
              "Play provides an alternative approach to Java EE-oriented web development and emphasizes productivity and modern web features.",
            example:
              "Client\n  |\n  v\nPlay Router\n  |\n  v\nController\n  |\n  v\nModel\n  |\n  v\nView",
            mistake:
              "Assuming Play 2 is simply another Java EE server component.",
            mistakeExplanation:
              "Play follows its own framework architecture and is presented as an alternative stack to traditional Java EE development.",
            correction:
              "Learn Play using its own routing, controller, and MVC conventions.",
            labPrompt:
              "Draw the basic MVC flow of a Play 2 application.",
            question:
              "Which JVM languages are highlighted for Play 2 in the source?",
            answer:
              "Java and Scala.",
            distractors: [
              "Only Python.",
              "Only Ruby.",
            ],
          }),

          lesson({
            slug: "play-routing",
            title: "Play routes",
            summary:
              "Map HTTP requests to application controllers.",
            what:
              "Play uses a route file to map incoming HTTP requests to controller actions.",
            why:
              "Explicit routing makes the relationship between URLs, HTTP methods, and application handlers easy to see.",
            example:
              "GET     /books     controllers.BookController.list()\nGET     /books/:id  controllers.BookController.show(id)",
            mistake:
              "Creating a controller method without mapping the required route.",
            mistakeExplanation:
              "The framework needs a route definition that connects the incoming request to the controller action.",
            correction:
              "Define the appropriate HTTP method, path, and controller action in the routes configuration.",
            labPrompt:
              "Write two example routes for listing and displaying books.",
            question:
              "What connects an HTTP request to a controller in Play?",
            answer:
              "A route definition.",
            distractors: [
              "A database table.",
              "A Java package declaration.",
            ],
          }),
        ],
      },

      {
        slug: "play-java-scala-apps",
        title: "Java and Scala applications",
        description:
          "Build Play applications using Java and Scala and work with application models.",
        lessons: [
          lesson({
            slug: "play-java-application",
            title: "Java application in Play",
            summary:
              "Understand the basic structure of a Java-based Play application.",
            what:
              "Play supports Java applications using its MVC architecture, routes, controllers, and views.",
            why:
              "Java developers can use Play while still working within the JVM ecosystem.",
            example:
              "GET /books -> BookController.list()\n\npublic Result list() {\n    return ok(views.html.books.render());\n}",
            mistake:
              "Putting database access directly into route definitions.",
            mistakeExplanation:
              "Routes should map requests to application handlers rather than contain database logic.",
            correction:
              "Use routes for mapping and controllers/services for application behavior.",
            labPrompt:
              "Design a Play route and controller for a book list.",
            question:
              "What is the role of a Play controller?",
            answer:
              "It handles application logic for routed requests and produces a response.",
            distractors: [
              "It stores all database records.",
              "It compiles Scala.",
            ],
          }),

          lesson({
            slug: "play-scala-application",
            title: "Scala application in Play",
            summary:
              "Understand how Scala can be used to build Play web applications.",
            what:
              "Play provides native support for Scala and can use Scala models, controllers, and application code within its MVC architecture.",
            why:
              "Scala's functional features can be used together with Play's reactive web development approach.",
            example:
              "def index = Action {\n  Ok(\"Hello from Scala\")\n}",
            output:
              "Hello from Scala",
            mistake:
              "Treating Scala code exactly like Java syntax.",
            mistakeExplanation:
              "Scala has its own syntax and language features even though it targets the JVM.",
            correction:
              "Use Scala syntax while relying on the same JVM runtime platform.",
            labPrompt:
              "Write a simple Scala Play action that returns a text response.",
            question:
              "Where does Scala code run in a Play application?",
            answer:
              "On the JVM.",
            distractors: [
              "Only inside the browser.",
              "Only inside a database.",
            ],
          }),
        ],
      },

      {
        slug: "play-data-access",
        title: "Play models and database access",
        description:
          "Understand how a Play application can represent models and access stored data.",
        lessons: [
          lesson({
            slug: "play-model",
            title: "Models in Play",
            summary:
              "Represent application data using model classes.",
            what:
              "A Play application can use model classes to represent domain data such as books, authors, and categories.",
            why:
              "Models provide a structured representation of application data that controllers and views can use.",
            example:
              "public class Book {\n    private Long id;\n    private String title;\n\n    public String getTitle() {\n        return title;\n    }\n}",
            mistake:
              "Putting presentation markup inside the model class.",
            mistakeExplanation:
              "The model should represent application data and behavior rather than presentation.",
            correction:
              "Keep data representation separate from controller and view responsibilities.",
            labPrompt:
              "Create a simple Book model with an id and title.",
            question:
              "What does a model represent?",
            answer:
              "Application data and domain information.",
            distractors: [
              "Only HTML layout.",
              "Only HTTP headers.",
            ],
          }),

          lesson({
            slug: "play-database-access",
            title: "Database access",
            summary:
              "Understand the role of database access in a Play application.",
            what:
              "Play applications can connect their model or data-access code to a database so that application information can be stored and retrieved.",
            why:
              "Real web applications need persistent data such as books, users, orders, and other domain information.",
            example:
              "Controller\n    |\n    v\nModel / Data Access\n    |\n    v\nDatabase",
            mistake:
              "Treating the database as part of the view layer.",
            mistakeExplanation:
              "Database persistence belongs to the data side of the application rather than presentation.",
            correction:
              "Keep database access in the model or dedicated data-access layer.",
            labPrompt:
              "Draw the data flow from a Play controller to a database.",
            question:
              "Why does a web application need database access?",
            answer:
              "To store and retrieve persistent application data.",
            distractors: [
              "To render HTML only.",
              "To compile Java source code.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "java-appendix",
    title: "Java essentials",
    description:
      "Review the Java language fundamentals needed to follow Java web development.",
    topics: [
      {
        slug: "java-language-basics",
        title: "Java language basics",
        description:
          "Review classes, objects, variables, methods, and control flow.",
        lessons: [
          lesson({
            slug: "java-classes",
            title: "Java classes",
            summary:
              "Understand classes as the basic structure for Java objects and code.",
            what:
              "A Java class defines the structure and behavior of objects and can contain fields, constructors, and methods.",
            why:
              "Java web frameworks build on ordinary Java classes, so understanding classes is necessary before learning the frameworks.",
            example:
              "public class Book {\n    String title;\n\n    void showTitle() {\n        System.out.println(title);\n    }\n}",
            mistake:
              "Trying to access an instance field without an object when the field is not static.",
            mistakeExplanation:
              "Instance members belong to individual objects.",
            correction:
              "Create a Book object and access its instance members through that object.",
            labPrompt:
              "Create a Book class with a title field and a method that prints it.",
            question:
              "What does a Java class define?",
            answer:
              "The structure and behavior of objects.",
            distractors: [
              "Only database tables.",
              "Only HTML pages.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "groovy-appendix",
    title: "Groovy essentials",
    description:
      "Review Groovy concepts relevant to JVM and Grails web development.",
    topics: [
      {
        slug: "groovy-basics",
        title: "Groovy basics",
        description:
          "Understand Groovy as a JVM language used with Grails.",
        lessons: [
          lesson({
            slug: "groovy-overview",
            title: "Groovy overview",
            summary:
              "Understand Groovy as a dynamic JVM language closely associated with Grails.",
            what:
              "Groovy is a JVM language with syntax related to Java but with additional dynamic and concise language features.",
            why:
              "Grails uses Groovy as a major part of its rapid web development approach.",
            example:
              "def name = \"Java Web\"\nprintln name",
            output:
              "Java Web",
            mistake:
              "Assuming Groovy must use exactly the same syntax as Java in every situation.",
            mistakeExplanation:
              "Groovy interoperates with Java but provides its own language features and syntax.",
            correction:
              "Learn the Groovy syntax used by the Grails application.",
            labPrompt:
              "Write a Groovy variable and print it.",
            question:
              "Which framework in the source is strongly associated with Groovy?",
            answer:
              "Grails.",
            distractors: [
              "JSF.",
              "Servlet API.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "scala-appendix",
    title: "Scala essentials",
    description:
      "Review Scala concepts relevant to Play web development on the JVM.",
    topics: [
      {
        slug: "scala-basics",
        title: "Scala basics",
        description:
          "Understand Scala as a statically typed JVM language with functional features.",
        lessons: [
          lesson({
            slug: "scala-overview",
            title: "Scala overview",
            summary:
              "Understand Scala's position in the JVM ecosystem.",
            what:
              "Scala is a statically typed compiled language that runs on the JVM and supports functional programming features.",
            why:
              "Play supports Scala, so Scala fundamentals help developers understand Scala-based Play applications.",
            example:
              "val name = \"Java Web\"\nprintln(name)",
            output:
              "Java Web",
            mistake:
              "Assuming Scala is interpreted as JavaScript in the browser.",
            mistakeExplanation:
              "Scala code in this context targets the JVM rather than being ordinary browser JavaScript.",
            correction:
              "Remember that Scala is a JVM language and can be used to build server-side applications.",
            labPrompt:
              "Write a simple Scala value and print it.",
            question:
              "What runtime platform does Scala target in this book?",
            answer:
              "The Java Virtual Machine.",
            distractors: [
              "Only the browser DOM.",
              "Only a SQL database.",
            ],
          }),
        ],
      },
    ],
  },
];