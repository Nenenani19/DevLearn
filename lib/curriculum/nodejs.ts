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
      "The Next.js code is using the feature incorrectly or placing the configuration in the wrong part of the application.",
    hint:
      input.hint ??
      "Check the Next.js convention involved and compare the file, function, or configuration with the expected structure.",
    labCode: input.labCode ?? input.example,
    output: input.output ?? "Example output appears here.",
  };
}

export const nextjsModules: LocalModuleSeed[] = [
  {
    slug: "nextjs-introduction",
    title: "Introduction to Next.js",
    description:
      "Learn what Next.js is, how it differs from React, and how to create and configure a Next.js application.",
    topics: [
      {
        slug: "nextjs-foundations",
        title: "Next.js foundations",
        description:
          "Understand Next.js, its advantages, project structure, and the basic development workflow.",
        lessons: [
          lesson({
            slug: "what-is-nextjs",
            title: "What is Next.js?",
            summary:
              "Understand Next.js as a React framework for building modern web applications.",
            what:
              "Next.js is a React framework that provides features such as server-side rendering, static site generation, routing, image optimization, and other production-oriented capabilities.",
            why:
              "React provides the foundation for building interfaces, while Next.js adds conventions and features that help developers build complete applications for both client and server environments.",
            example:
              "npx create-next-app my-next-app\ncd my-next-app\nnpm run dev",
            output:
              "A Next.js development server starts and the application becomes available locally.",
            mistake:
              "npm create-next-app my-next-app",
            mistakeExplanation:
              "The command does not follow the create-next-app command structure used to initialize the project.",
            correction:
              "npx create-next-app my-next-app",
            labPrompt:
              "Create a new Next.js application called my-next-app and start its development server.",
            question:
              "What is the main difference between React and Next.js?",
            answer:
              "React is a JavaScript library for building user interfaces, while Next.js is a framework that adds features for building complete applications on the client and server.",
            distractors: [
              "Next.js is only a CSS framework.",
              "React can only be used for backend applications.",
            ],
          }),

          lesson({
            slug: "react-vs-nextjs",
            title: "React vs Next.js",
            summary:
              "Understand why a Next.js application can provide more built-in functionality than a basic React application.",
            what:
              "React focuses primarily on building user interfaces. Next.js provides a framework around React with features such as routing, rendering strategies, code splitting, and deployment support.",
            why:
              "Understanding the difference helps you decide when a project needs the conventions and features provided by a full framework.",
            example:
              "React → UI library\nNext.js → React framework\n\nNext.js can handle:\n- Routing\n- Server rendering\n- Static generation\n- Data fetching",
            output:
              "Next.js provides application-level features around React.",
            mistake:
              "React and Next.js are exactly the same thing.",
            correction:
              "React is a UI library, while Next.js is a framework built around React.",
            labPrompt:
              "List three features that Next.js provides beyond the basic React library.",
            question:
              "Why is Next.js considered a framework?",
            answer:
              "Because it provides application-level conventions and features around React, including routing, rendering, and deployment capabilities.",
            distractors: [
              "Because it replaces JavaScript.",
              "Because it is only used for databases.",
            ],
          }),

          lesson({
            slug: "create-next-app",
            title: "Creating a Next.js application",
            summary:
              "Create a Next.js project using the create-next-app command.",
            what:
              "create-next-app generates the initial files, dependencies, and configuration needed for a Next.js project.",
            why:
              "Starting from the official project generator gives you a working structure so you can begin building features without manually configuring every dependency.",
            example:
              "npx create-next-app my-first-next-app --use-npm",
            output:
              "A new my-first-next-app directory is created with the Next.js project structure.",
            mistake:
              "npx create-next-app",
            correction:
              "npx create-next-app my-first-next-app --use-npm",
            labPrompt:
              "Create a Next.js application named learning-next using npm.",
            question:
              "Which command creates a new Next.js application?",
            answer:
              "npx create-next-app <app-name>",
            distractors: [
              "npm install next-project",
              "node create-react-project",
            ],
          }),

          lesson({
            slug: "nextjs-project-structure",
            title: "Next.js project structure",
            summary:
              "Understand the important files and folders created in a Next.js project.",
            what:
              "A Next.js project contains application files, pages, public assets, styles, package configuration, and framework configuration files.",
            why:
              "Knowing where files belong makes it easier to build and maintain a Next.js application.",
            example:
              "my-next-app/\n├── pages/\n├── public/\n├── styles/\n├── package.json\n├── next.config.js\n└── README.md",
            output:
              "The project contains separate locations for pages, public assets, styles, and configuration.",
            mistake:
              "Place every component inside public/.",
            correction:
              "Keep public assets inside public/ and application components/pages in their appropriate application directories.",
            labPrompt:
              "Identify the purpose of pages/, public/, styles/, package.json, and next.config.js.",
            question:
              "What is the purpose of the public folder?",
            answer:
              "It contains public and static assets used by the website.",
            distractors: [
              "It stores the database.",
              "It contains only server-side JavaScript.",
            ],
          }),

          lesson({
            slug: "typescript-in-nextjs",
            title: "TypeScript integration",
            summary:
              "Use TypeScript as the development language for a Next.js application.",
            what:
              "Next.js supports TypeScript and can detect a TypeScript configuration and request the required dependencies.",
            why:
              "TypeScript provides static type checking and can make larger Next.js applications easier to maintain.",
            example:
              "npm install --save typescript @types/react\n\n// tsconfig.json\n{\n  \"compilerOptions\": {}\n}",
            output:
              "The Next.js project can use TypeScript files and TypeScript configuration.",
            mistake:
              "Delete tsconfig.json after enabling TypeScript.",
            correction:
              "Keep the TypeScript configuration file and install the required TypeScript dependencies.",
            labPrompt:
              "Configure an existing Next.js project so that it can use TypeScript.",
            question:
              "Which file contains the TypeScript configuration?",
            answer:
              "tsconfig.json",
            distractors: [
              "next-types.js",
              "typescript.config.js",
            ],
          }),
        ],
      },

      {
        slug: "nextjs-configuration",
        title: "Configuration",
        description:
          "Understand Babel and webpack customization in Next.js.",
        lessons: [
          lesson({
            slug: "babel-in-nextjs",
            title: "Babel in Next.js",
            summary:
              "Understand how Babel transforms modern JavaScript code.",
            what:
              "Babel is a JavaScript transpiler that can transform modern JavaScript syntax into code compatible with target environments.",
            why:
              "Transpilation allows developers to use modern language features while supporting environments that may not understand those features directly.",
            example:
              "// .babelrc\n{\n  \"presets\": [\"next/babel\"]\n}",
            output:
              "Next.js uses the configured Babel preset during development and builds.",
            mistake:
              "Create an empty .babelrc file without the Next.js preset.",
            correction:
              "{\n  \"presets\": [\"next/babel\"]\n}",
            labPrompt:
              "Create a Babel configuration using the Next.js Babel preset.",
            question:
              "What is Babel mainly used for?",
            answer:
              "Babel transforms modern JavaScript syntax into compatible JavaScript.",
            distractors: [
              "It stores application data.",
              "It creates SQL databases.",
            ],
          }),

          lesson({
            slug: "webpack-in-nextjs",
            title: "Webpack configuration",
            summary:
              "Understand how webpack bundles application assets and how Next.js can customize it.",
            what:
              "Webpack builds bundles from JavaScript and other web assets and can be customized through the Next.js configuration.",
            why:
              "Custom webpack configuration can be useful when a project requires special loaders or asset-processing behavior.",
            example:
              "module.exports = {\n  webpack: (config) => {\n    // customize config\n    return config;\n  },\n};",
            output:
              "The customized webpack configuration is merged into the Next.js build configuration.",
            mistake:
              "Forget to return the webpack configuration.",
            correction:
              "Return the modified config object from the webpack function.",
            labPrompt:
              "Create a next.config.js file containing a webpack configuration function.",
            question:
              "What does webpack primarily do?",
            answer:
              "It bundles and processes application assets for the application build.",
            distractors: [
              "It manages user passwords.",
              "It replaces React components.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "rendering-strategies",
    title: "Rendering strategies",
    description:
      "Learn how Next.js renders pages on the server, client, and at build time.",
    topics: [
      {
        slug: "rendering-fundamentals",
        title: "Rendering fundamentals",
        description:
          "Understand SSR, CSR, SSG, and incremental static regeneration.",
        lessons: [
          lesson({
            slug: "server-side-rendering",
            title: "Server-side rendering",
            summary:
              "Render a page dynamically on the server for each request.",
            what:
              "Server-side rendering generates the HTML for a page on the server and sends the rendered result to the browser.",
            why:
              "SSR can provide rendered HTML early and is useful for pages whose content needs to be generated dynamically for each request.",
            example:
              "export async function getServerSideProps() {\n  return {\n    props: {\n      message: \"Hello from the server\",\n    },\n  };\n}",
            output:
              "The page receives server-generated props for the current request.",
            mistake:
              "Use browser-only APIs directly inside server-rendered code.",
            correction:
              "Keep browser-specific APIs such as window and document inside client-side code.",
            labPrompt:
              "Create a page that receives a message through server-side props.",
            question:
              "When does SSR generate the page?",
            answer:
              "The server generates the page dynamically for a request.",
            distractors: [
              "Only when the browser is closed.",
              "Only once before the application is created.",
            ],
          }),

          lesson({
            slug: "client-side-rendering",
            title: "Client-side rendering",
            summary:
              "Render or update application content inside the browser.",
            what:
              "Client-side rendering allows the browser to execute JavaScript and create or update the interface on the client.",
            why:
              "CSR is useful for interactive interfaces where content depends heavily on browser state or client-side interactions.",
            example:
              "import { useEffect, useState } from \"react\";\n\nfunction Page() {\n  const [message, setMessage] = useState(\"\");\n\n  useEffect(() => {\n    setMessage(\"Loaded in the browser\");\n  }, []);\n\n  return <p>{message}</p>;\n}",
            output:
              "The message is updated after the component runs in the browser.",
            mistake:
              "Assume browser APIs are always available during server rendering.",
            correction:
              "Use client-side lifecycle logic for browser-only APIs.",
            labPrompt:
              "Create a component that updates its message after the browser loads it.",
            question:
              "Where does client-side rendering primarily happen?",
            answer:
              "In the user's browser.",
            distractors: [
              "Only inside the database.",
              "Only inside the CDN.",
            ],
          }),

          lesson({
            slug: "static-site-generation",
            title: "Static site generation",
            summary:
              "Generate pages ahead of time so they can be served as static content.",
            what:
              "Static site generation creates page output ahead of a request, allowing the generated content to be served without rendering the page dynamically for every request.",
            why:
              "Static pages can be efficiently served through CDNs and are useful when the content does not need to be generated for every request.",
            example:
              "export async function getStaticProps() {\n  return {\n    props: {\n      title: \"Static page\",\n    },\n  };\n}",
            output:
              "The page receives data generated during the static build process.",
            mistake:
              "Use SSG when every request must receive newly generated private data.",
            correction:
              "Choose a rendering strategy based on how frequently the data changes and whether it is request-specific.",
            labPrompt:
              "Create a page whose title is generated using static props.",
            question:
              "When is an SSG page generated?",
            answer:
              "It is generated ahead of requests, typically during the build process.",
            distractors: [
              "Only after every click.",
              "Only inside the user's browser.",
            ],
          }),

          lesson({
            slug: "incremental-static-regeneration",
            title: "Incremental static regeneration",
            summary:
              "Regenerate static content without rebuilding the entire application.",
            what:
              "Incremental static regeneration allows statically generated pages to be regenerated after deployment according to a revalidation strategy.",
            why:
              "It provides a way to keep static pages reasonably fresh while retaining many of the benefits of static generation.",
            example:
              "export async function getStaticProps() {\n  return {\n    props: {\n      title: \"Updated page\",\n    },\n    revalidate: 60,\n  };\n}",
            output:
              "The page can be regenerated after the configured revalidation period.",
            mistake:
              "Assume revalidate means the page is rebuilt exactly every second.",
            correction:
              "Treat revalidation as the interval after which a regeneration can occur when the page is requested.",
            labPrompt:
              "Create a static page with a 60-second revalidation period.",
            question:
              "What problem does ISR help solve?",
            answer:
              "It allows static content to be refreshed after deployment without rebuilding the whole site.",
            distractors: [
              "It replaces React state.",
              "It disables static generation.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "nextjs-basics",
    title: "Next.js basics and built-in components",
    description:
      "Learn routing, route variables, navigation, static assets, image optimization, metadata, and application-level pages.",
    topics: [
      {
        slug: "routing-and-navigation",
        title: "Routing and navigation",
        description:
          "Build pages and navigate between them using the Next.js routing system.",
        lessons: [
          lesson({
            slug: "file-based-routing",
            title: "File-based routing",
            summary:
              "Create routes by organizing files inside the pages directory.",
            what:
              "In the pages router, files inside pages/ become publicly accessible routes.",
            why:
              "File-based routing removes the need to manually configure every route and keeps the URL structure close to the project structure.",
            example:
              "pages/\n├── index.js\n├── about.js\n└── contact.js\n\n/about → pages/about.js\n/contact → pages/contact.js",
            output:
              "Each page file maps to a corresponding route.",
            mistake:
              "Create about.js outside the pages directory and expect /about automatically.",
            correction:
              "Place the page inside the pages directory when using the pages router.",
            labPrompt:
              "Create an about page that is available at /about.",
            question:
              "How does Next.js create routes in the pages router?",
            answer:
              "JavaScript or TypeScript files inside the pages directory map to routes.",
            distractors: [
              "Routes are created only from CSS files.",
              "Routes must always be stored in public/.",
            ],
          }),

          lesson({
            slug: "dynamic-route-variables",
            title: "Dynamic route variables",
            summary:
              "Use route parameters to create pages that respond to different URL values.",
            what:
              "Dynamic routes allow a single page to handle multiple URLs by reading a variable from the route.",
            why:
              "Applications often have pages such as product/1, product/2, or users with different identifiers. Dynamic routes avoid creating a separate file for every value.",
            example:
              "pages/posts/[id].js\n\nexport default function Post({ id }) {\n  return <h1>Post {id}</h1>;\n}",
            output:
              "A URL such as /posts/42 can provide 42 as the route value.",
            mistake:
              "Create a separate page file for every possible ID.",
            correction:
              "Use a dynamic route such as [id].js.",
            labPrompt:
              "Create a dynamic route for /products/[id].",
            question:
              "What does [id] represent in a Next.js route?",
            answer:
              "It represents a dynamic route parameter.",
            distractors: [
              "A CSS selector.",
              "A fixed database table name.",
            ],
          }),

          lesson({
            slug: "client-side-navigation",
            title: "Client-side navigation",
            summary:
              "Navigate between Next.js pages without performing a traditional full-page reload.",
            what:
              "Next.js provides client-side navigation through its routing components and prefetching behavior.",
            why:
              "Client-side navigation can make transitions between pages faster and provide a smoother application experience.",
            example:
              "import Link from \"next/link\";\n\n<Link href=\"/about\">\n  About\n</Link>",
            output:
              "Clicking the link navigates to /about using Next.js navigation.",
            mistake:
              "<a href=\"/about\">About</a>",
            correction:
              "<Link href=\"/about\">About</Link>",
            labPrompt:
              "Add a navigation link from the home page to /about.",
            question:
              "Which Next.js component is commonly used for client-side navigation?",
            answer:
              "The Link component from next/link.",
            distractors: [
              "The Image component.",
              "The Script component.",
            ],
          }),
        ],
      },

      {
        slug: "built-in-features",
        title: "Built-in features",
        description:
          "Work with static assets, optimized images, metadata, and application-level pages.",
        lessons: [
          lesson({
            slug: "static-assets",
            title: "Serving static assets",
            summary:
              "Store and serve publicly accessible assets from the public directory.",
            what:
              "The public directory is used for static assets such as images, fonts, and other files that need to be served directly.",
            why:
              "Keeping public assets in one predictable location makes them easy to reference from the application.",
            example:
              "public/logo.png\n\n<img src=\"/logo.png\" alt=\"Logo\" />",
            output:
              "The image is served from the public path /logo.png.",
            mistake:
              "<img src=\"public/logo.png\" alt=\"Logo\" />",
            correction:
              "<img src=\"/logo.png\" alt=\"Logo\" />",
            labPrompt:
              "Place an image inside public/ and display it on a Next.js page.",
            question:
              "What is the URL path for public/logo.png?",
            answer:
              "/logo.png",
            distractors: [
              "/public/logo.png",
              "/assets/public/logo.png",
            ],
          }),

          lesson({
            slug: "next-image",
            title: "Image optimization",
            summary:
              "Use Next.js image features to optimize images for web applications.",
            what:
              "Next.js provides image optimization capabilities that can automatically handle aspects such as image sizing and optimized delivery.",
            why:
              "Images can have a significant impact on loading performance, so optimizing them is important for modern websites.",
            example:
              "import Image from \"next/image\";\n\n<Image\n  src=\"/profile.png\"\n  width={400}\n  height={400}\n  alt=\"Profile\"\n/>",
            output:
              "Next.js renders the image using its image optimization system.",
            mistake:
              "<Image src=\"/profile.png\" />",
            correction:
              "<Image\n  src=\"/profile.png\"\n  width={400}\n  height={400}\n  alt=\"Profile\"\n/>",
            labPrompt:
              "Display a local image using the Next.js Image component.",
            question:
              "Why is image optimization useful?",
            answer:
              "It helps control image delivery and can improve page loading performance.",
            distractors: [
              "It converts images into database tables.",
              "It removes the need for HTML.",
            ],
          }),

          lesson({
            slug: "page-metadata",
            title: "Handling metadata",
            summary:
              "Add metadata such as page titles and descriptions to improve document information and SEO.",
            what:
              "Next.js pages can define metadata that is rendered into the HTML document.",
            why:
              "Search engines and browsers use metadata to understand and represent pages.",
            example:
              "export default function Page() {\n  return <h1>Products</h1>;\n}\n\n// Add page metadata using the appropriate Next.js document/head mechanism.",
            output:
              "The page can expose metadata such as its title and description.",
            mistake:
              "Give every page the same title and description.",
            correction:
              "Use metadata that accurately describes the content of each page.",
            labPrompt:
              "Add a meaningful title and description for a product page.",
            question:
              "Why is page metadata important?",
            answer:
              "It helps browsers and search engines understand the page.",
            distractors: [
              "It replaces the page's JavaScript.",
              "It stores user passwords.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "data-fetching",
    title: "Code organization and data fetching",
    description:
      "Organize a Next.js codebase and fetch data from server-side, client-side, REST, and GraphQL sources.",
    topics: [
      {
        slug: "project-organization",
        title: "Organizing the code base",
        description:
          "Structure components, utilities, assets, styles, and library code.",
        lessons: [
          lesson({
            slug: "organizing-components",
            title: "Organizing components",
            summary:
              "Keep reusable UI components in a predictable project structure.",
            what:
              "Components can be separated into their own directory so that reusable interface logic is easy to find and maintain.",
            why:
              "A clear component structure becomes increasingly important as an application grows.",
            example:
              "components/\n├── Header.js\n├── Footer.js\n└── ProductCard.js",
            output:
              "Reusable components are separated from page-level code.",
            mistake:
              "Place every reusable component directly inside one huge page file.",
            correction:
              "Extract reusable components into separate files and organize them consistently.",
            labPrompt:
              "Create a components directory containing Header and Footer components.",
            question:
              "Why separate reusable components into their own files?",
            answer:
              "It improves organization, reuse, and maintainability.",
            distractors: [
              "It makes JavaScript unnecessary.",
              "It automatically creates database tables.",
            ],
          }),

          lesson({
            slug: "organizing-utilities",
            title: "Organizing utilities and lib files",
            summary:
              "Keep reusable helper functions and application libraries separate from UI components.",
            what:
              "Utility and lib directories can contain reusable functions, API helpers, data-access logic, and other non-UI application code.",
            why:
              "Separating application logic from UI components keeps the project easier to understand and test.",
            example:
              "lib/\n└── api.js\n\nutils/\n└── formatPrice.js",
            output:
              "Reusable logic is kept separate from page and component code.",
            mistake:
              "Put every helper function inside every component that uses it.",
            correction:
              "Extract reusable logic into shared utility or library files.",
            labPrompt:
              "Create a utility function that formats a price.",
            question:
              "What is the benefit of utility files?",
            answer:
              "They provide reusable functions that can be shared across the application.",
            distractors: [
              "They automatically deploy the website.",
              "They replace all React components.",
            ],
          }),
        ],
      },

      {
        slug: "fetching-data",
        title: "Fetching data",
        description:
          "Fetch data on the server and client and consume REST and GraphQL APIs.",
        lessons: [
          lesson({
            slug: "server-side-data-fetching",
            title: "Fetching data on the server",
            summary:
              "Retrieve data on the server before rendering a Next.js page.",
            what:
              "Next.js can fetch data on the server and provide the resulting data to a page through server-side data-fetching methods.",
            why:
              "Server-side data fetching can keep private operations on the server and provide data to the page before it reaches the browser.",
            example:
              "export async function getServerSideProps() {\n  const response = await fetch(\"https://example.com/api/products\");\n  const products = await response.json();\n\n  return {\n    props: { products },\n  };\n}",
            output:
              "The page receives the fetched products as props.",
            mistake:
              "Expose private API credentials inside browser-side code.",
            correction:
              "Keep private credentials and server-only operations on the server.",
            labPrompt:
              "Fetch product data on the server and pass it to a page.",
            question:
              "Why can server-side fetching be useful?",
            answer:
              "It allows data and private operations to be handled on the server before rendering the page.",
            distractors: [
              "It prevents all data from ever changing.",
              "It disables HTML rendering.",
            ],
          }),

          lesson({
            slug: "client-side-data-fetching",
            title: "Fetching data on the client",
            summary:
              "Retrieve data in the browser after a page has loaded.",
            what:
              "Client-side data fetching uses browser-side JavaScript to request and update data after the component is rendered.",
            why:
              "Client-side fetching is useful for interactive data that changes based on user actions or browser state.",
            example:
              "useEffect(() => {\n  fetch(\"/api/products\")\n    .then((response) => response.json())\n    .then(setProducts);\n}, []);",
            output:
              "The browser requests the data and updates the component state.",
            mistake:
              "Forget the dependency array when the request should only run on mount.",
            correction:
              "Use the appropriate effect dependencies for the desired request lifecycle.",
            labPrompt:
              "Fetch a list of products after a component mounts.",
            question:
              "Where does client-side data fetching execute?",
            answer:
              "In the user's browser.",
            distractors: [
              "Only in the database.",
              "Only during deployment.",
            ],
          }),

          lesson({
            slug: "rest-api-fetching",
            title: "Consuming REST APIs",
            summary:
              "Connect a Next.js application to REST API endpoints.",
            what:
              "A Next.js application can request data from REST endpoints and use the returned JSON data in its pages or components.",
            why:
              "REST APIs are a common way for web applications to communicate with backend services.",
            example:
              "const response = await fetch(\"/api/users\");\nconst users = await response.json();",
            output:
              "The JSON response is converted into JavaScript data.",
            mistake:
              "Use response directly as if it were already the JSON object.",
            correction:
              "Call response.json() to parse a JSON response.",
            labPrompt:
              "Fetch users from /api/users and convert the response to JSON.",
            question:
              "What does response.json() do?",
            answer:
              "It parses the response body as JSON.",
            distractors: [
              "It sends a new HTTP request.",
              "It deletes the response.",
            ],
          }),

          lesson({
            slug: "graphql-data-fetching",
            title: "Consuming GraphQL APIs",
            summary:
              "Fetch structured data from GraphQL services.",
            what:
              "GraphQL allows clients to request the fields they need through queries against a GraphQL API.",
            why:
              "GraphQL can provide a flexible way to request related application data from a single API.",
            example:
              "const query = `\n  query Products {\n    products {\n      id\n      name\n      price\n    }\n  }\n`;",
            output:
              "The GraphQL query describes the exact product fields requested.",
            mistake:
              "Request fields that do not exist in the GraphQL schema.",
            correction:
              "Build queries using fields supported by the API schema.",
            labPrompt:
              "Write a GraphQL query that requests product id, name, and price.",
            question:
              "What is one major characteristic of GraphQL queries?",
            answer:
              "The client specifies the fields it wants to receive.",
            distractors: [
              "They can only return HTML.",
              "They never communicate with a server.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "state-management",
    title: "State management",
    description:
      "Manage local component state and application-wide state using React Context and Redux.",
    topics: [
      {
        slug: "local-and-global-state",
        title: "Local and global state",
        description:
          "Understand the difference between component-level and application-wide state.",
        lessons: [
          lesson({
            slug: "local-state",
            title: "Local state",
            summary:
              "Manage state that belongs to an individual component.",
            what:
              "Local state represents information that a component needs to remember and update during its lifecycle.",
            why:
              "Not every piece of data needs to be shared with the entire application. Local state keeps component-specific behavior close to the component.",
            example:
              "const [count, setCount] = useState(0);\n\n<button onClick={() => setCount(count + 1)}>\n  {count}\n</button>",
            output:
              "The displayed count increases when the button is clicked.",
            mistake:
              "Change the state variable directly.",
            correction:
              "Use the state setter function to update React state.",
            labPrompt:
              "Create a counter using local component state.",
            question:
              "What is local state?",
            answer:
              "State that is primarily used by a particular component.",
            distractors: [
              "Data stored only in CSS.",
              "A database shared by every application.",
            ],
          }),

          lesson({
            slug: "context-api",
            title: "React Context",
            summary:
              "Share state and values across components without passing props through every level.",
            what:
              "React Context provides a mechanism for making values available to components deeper in the component tree.",
            why:
              "Context can reduce repetitive prop passing when several components need access to the same application value.",
            example:
              "const ThemeContext = createContext(\"light\");\n\n<ThemeContext.Provider value=\"dark\">\n  <App />\n</ThemeContext.Provider>",
            output:
              "Components consuming the context can access the shared theme value.",
            mistake:
              "Use Context for every piece of state regardless of scope.",
            correction:
              "Use Context when sharing a value across multiple components is appropriate.",
            labPrompt:
              "Create a theme context with light and dark values.",
            question:
              "What problem can React Context help solve?",
            answer:
              "It can share values across components without passing props through every intermediate component.",
            distractors: [
              "It replaces JavaScript.",
              "It automatically creates API endpoints.",
            ],
          }),

          lesson({
            slug: "redux-state",
            title: "Redux state management",
            summary:
              "Understand Redux as an option for managing global application state.",
            what:
              "Redux provides a structured approach for storing and updating shared application state through a centralized store and actions.",
            why:
              "Large applications can benefit from predictable patterns for managing state shared across many parts of the application.",
            example:
              "const initialState = {\n  count: 0,\n};\n\nconst increment = {\n  type: \"increment\",\n};",
            output:
              "An action can describe a state change handled by Redux logic.",
            mistake:
              "Modify Redux state directly without following the store's update mechanism.",
            correction:
              "Use Redux's state-update patterns and dispatch actions to request changes.",
            labPrompt:
              "Design a Redux action representing an increment operation.",
            question:
              "What is Redux primarily used for?",
            answer:
              "Managing shared application state using a structured state-management pattern.",
            distractors: [
              "Styling HTML elements.",
              "Serving static images.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "nextjs-styling",
    title: "CSS and built-in styling methods",
    description:
      "Style Next.js applications using Styled JSX, CSS Modules, and SASS.",
    topics: [
      {
        slug: "styling-methods",
        title: "Styling methods",
        description:
          "Explore different ways to organize and apply styles in Next.js.",
        lessons: [
          lesson({
            slug: "styled-jsx",
            title: "Styled JSX",
            summary:
              "Write component-scoped CSS directly within a Next.js component.",
            what:
              "Styled JSX provides a CSS-in-JS approach where styles can be scoped to a component.",
            why:
              "Component-scoped styles can reduce accidental style conflicts between unrelated parts of an application.",
            example:
              "export default function Card() {\n  return (\n    <div className=\"card\">\n      <h2>Product</h2>\n      <style jsx>{`\n        .card {\n          padding: 20px;\n        }\n      `}</style>\n    </div>\n  );\n}",
            output:
              "The card receives the locally defined styles.",
            mistake:
              "Assume every CSS rule is automatically global.",
            correction:
              "Understand the scope of Styled JSX styles and use global styling intentionally.",
            labPrompt:
              "Create a component with a locally scoped card style.",
            question:
              "What is one benefit of Styled JSX?",
            answer:
              "It allows styles to be scoped to a component.",
            distractors: [
              "It stores CSS in a database.",
              "It replaces JavaScript.",
            ],
          }),

          lesson({
            slug: "css-modules",
            title: "CSS Modules",
            summary:
              "Use locally scoped CSS files with Next.js components.",
            what:
              "CSS Modules allow CSS class names to be locally scoped to the component that imports the module.",
            why:
              "Scoped class names help prevent naming conflicts in larger applications.",
            example:
              "import styles from \"./Card.module.css\";\n\nexport default function Card() {\n  return <div className={styles.card}>Product</div>;\n}",
            output:
              "The card class is locally scoped through the CSS module.",
            mistake:
              "<div className=\"card\">Product</div>",
            correction:
              "<div className={styles.card}>Product</div>",
            labPrompt:
              "Create Card.module.css and use it from a Card component.",
            question:
              "Why are CSS Modules useful?",
            answer:
              "They provide locally scoped CSS class names.",
            distractors: [
              "They remove all CSS from the project.",
              "They create API routes.",
            ],
          }),

          lesson({
            slug: "sass-nextjs",
            title: "SASS and SCSS",
            summary:
              "Use SASS or SCSS syntax in a Next.js application.",
            what:
              "Next.js supports SASS and SCSS stylesheets when the appropriate dependency is installed.",
            why:
              "SASS provides features that can make complex stylesheets easier to organize and author.",
            example:
              "$spacing: 20px;\n\n.card {\n  padding: $spacing;\n}",
            output:
              "The SASS source is compiled into CSS for the application.",
            mistake:
              "Write SCSS syntax without configuring the required SASS dependency.",
            correction:
              "Install and configure SASS before using .scss or .sass files.",
            labPrompt:
              "Create an SCSS file containing a reusable spacing variable.",
            question:
              "What happens to SASS/SCSS before the browser uses it?",
            answer:
              "It is compiled into CSS.",
            distractors: [
              "It is executed as JavaScript.",
              "It is stored directly as SQL.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "ui-frameworks",
    title: "UI frameworks",
    description:
      "Integrate reusable UI libraries and styling systems into Next.js applications.",
    topics: [
      {
        slug: "ui-libraries",
        title: "UI libraries and frameworks",
        description:
          "Understand why developers use reusable UI components and integrate popular UI solutions.",
        lessons: [
          lesson({
            slug: "ui-library-basics",
            title: "Introduction to UI libraries",
            summary:
              "Understand why UI libraries provide reusable components and design patterns.",
            what:
              "UI libraries provide reusable components, themes, accessibility patterns, and utilities that reduce the amount of interface code developers need to build from scratch.",
            why:
              "Reusable UI components can improve development speed and provide consistent patterns across an application.",
            example:
              "Button\nModal\nMenu\nInput\nCard\nTable",
            output:
              "Common interface patterns can be reused instead of implemented from scratch.",
            mistake:
              "Assume a UI library is required for every Next.js application.",
            correction:
              "UI libraries are optional and should be selected according to the application's requirements.",
            labPrompt:
              "List five UI components that could be reused across an application.",
            question:
              "Why do developers use UI libraries?",
            answer:
              "To reuse tested and consistent interface components and patterns.",
            distractors: [
              "To replace the database.",
              "To remove the need for HTML.",
            ],
          }),

          lesson({
            slug: "chakra-ui",
            title: "Chakra UI",
            summary:
              "Understand how Chakra UI can provide reusable styled components for Next.js.",
            what:
              "Chakra UI is a component library that provides reusable interface components and styling capabilities.",
            why:
              "It can reduce the amount of custom UI code needed when building an application.",
            example:
              "import { Button } from \"@chakra-ui/react\";\n\n<Button colorScheme=\"blue\">\n  Save\n</Button>",
            output:
              "A reusable Chakra UI button is rendered.",
            mistake:
              "Use Chakra components without installing and configuring the required package.",
            correction:
              "Install and configure Chakra UI according to the project setup.",
            labPrompt:
              "Create a simple button using Chakra UI.",
            question:
              "What does Chakra UI provide?",
            answer:
              "Reusable UI components and styling utilities.",
            distractors: [
              "A SQL database.",
              "A Node.js runtime replacement.",
            ],
          }),

          lesson({
            slug: "tailwindcss",
            title: "Tailwind CSS",
            summary:
              "Use utility classes to style Next.js interfaces.",
            what:
              "Tailwind CSS provides utility classes that can be composed directly in markup to create interfaces.",
            why:
              "Utility-first styling can make it quick to build and adjust interfaces without creating a separate class for every visual rule.",
            example:
              "<button className=\"px-4 py-2 rounded\">\n  Save\n</button>",
            output:
              "The button receives the styles represented by the utility classes.",
            mistake:
              "<button className=\"button-primary\">Save</button>",
            correction:
              "<button className=\"px-4 py-2 rounded\">Save</button>",
            labPrompt:
              "Create a button using Tailwind utility classes.",
            question:
              "What is the main idea behind Tailwind CSS?",
            answer:
              "It provides small utility classes that can be composed to style elements.",
            distractors: [
              "It is a database system.",
              "It is a testing framework only.",
            ],
          }),

          lesson({
            slug: "headless-ui",
            title: "Headless UI",
            summary:
              "Use accessible unstyled components as building blocks for custom interfaces.",
            what:
              "Headless UI provides behavior and accessibility for components while leaving much of the visual styling to the application.",
            why:
              "This approach gives developers control over the visual design while reusing interaction patterns.",
            example:
              "<Menu>\n  <Menu.Button>Options</Menu.Button>\n  <Menu.Items>\n    <Menu.Item>Profile</Menu.Item>\n  </Menu.Items>\n</Menu>",
            output:
              "A menu interaction can be built while allowing the application to control its visual styling.",
            mistake:
              "Expect Headless UI to automatically provide a complete visual design.",
            correction:
              "Add your own styling around the provided component behavior.",
            labPrompt:
              "Design a simple menu using a headless component approach.",
            question:
              "Why is Headless UI called headless?",
            answer:
              "It provides component behavior without forcing a specific visual design.",
            distractors: [
              "It cannot be used with React.",
              "It only works on servers.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "custom-server",
    title: "Custom servers",
    description:
      "Understand when and how to run Next.js with custom Express.js or Fastify servers.",
    topics: [
      {
        slug: "server-integration",
        title: "Custom server integration",
        description:
          "Explore custom server use cases and integrations.",
        lessons: [
          lesson({
            slug: "custom-server-basics",
            title: "Using a custom server",
            summary:
              "Understand why a Next.js project might use a custom server.",
            what:
              "A custom server allows an application to control server behavior beyond the standard Next.js server setup.",
            why:
              "Some applications may require specialized server behavior or integration with an existing backend architecture.",
            example:
              "const next = require(\"next\");\nconst http = require(\"http\");\n\nconst app = next({ dev: true });\nconst handle = app.getRequestHandler();",
            output:
              "The application can use a custom HTTP server around Next.js.",
            mistake:
              "Add a custom server when the standard Next.js server already satisfies the application requirements.",
            correction:
              "Use a custom server only when the project genuinely needs custom server behavior.",
            labPrompt:
              "Explain one reason a Next.js project might require a custom server.",
            question:
              "Why might an application use a custom server?",
            answer:
              "To implement server behavior or integrations not provided by the standard Next.js server setup.",
            distractors: [
              "To make React unnecessary.",
              "To replace CSS.",
            ],
          }),

          lesson({
            slug: "express-custom-server",
            title: "Express.js with Next.js",
            summary:
              "Integrate Next.js into an Express.js server.",
            what:
              "Express.js can act as the custom server while Next.js handles rendering and application requests.",
            why:
              "This can help projects that already use Express-specific middleware or server behavior.",
            example:
              "const express = require(\"express\");\nconst next = require(\"next\");\n\nconst app = next({ dev: true });\nconst handle = app.getRequestHandler();\nconst server = express();",
            output:
              "Express is used as the surrounding custom server.",
            mistake:
              "Assume Express is required for every Next.js application.",
            correction:
              "Use Express only when the project's server requirements justify it.",
            labPrompt:
              "Sketch the basic architecture of Express wrapping a Next.js application.",
            question:
              "What does Express provide in this setup?",
            answer:
              "It provides the custom server layer around the Next.js application.",
            distractors: [
              "It replaces the React rendering system.",
              "It acts as a CSS preprocessor.",
            ],
          }),

          lesson({
            slug: "fastify-custom-server",
            title: "Fastify with Next.js",
            summary:
              "Understand how Fastify can be used as a custom server for Next.js.",
            what:
              "Fastify can provide a custom Node.js server layer while Next.js handles its application rendering.",
            why:
              "Projects with Fastify-based backend infrastructure may integrate Next.js into that environment.",
            example:
              "const Fastify = require(\"fastify\");\nconst next = require(\"next\");\n\nconst server = Fastify();\nconst app = next({ dev: true });",
            output:
              "Fastify provides the custom server environment.",
            mistake:
              "Choose a custom server without identifying a real project requirement.",
            correction:
              "Evaluate whether the default Next.js server is sufficient before introducing custom infrastructure.",
            labPrompt:
              "Describe how Fastify and Next.js can coexist in one application.",
            question:
              "What is Fastify doing in a custom Next.js setup?",
            answer:
              "It acts as the custom server layer.",
            distractors: [
              "It is the browser.",
              "It is a database ORM.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "nextjs-testing",
    title: "Testing Next.js",
    description:
      "Learn the purpose of unit, integration, and end-to-end testing in Next.js applications.",
    topics: [
      {
        slug: "testing-fundamentals",
        title: "Testing fundamentals",
        description:
          "Understand different levels of application testing.",
        lessons: [
          lesson({
            slug: "testing-basics",
            title: "Introduction to testing",
            summary:
              "Understand why automated tests are important in web applications.",
            what:
              "Automated tests check whether application behavior matches expected behavior.",
            why:
              "Tests help catch regressions and make changes to a codebase safer.",
            example:
              "function add(a, b) {\n  return a + b;\n}\n\nexpect(add(2, 3)).toBe(5);",
            output:
              "The test passes when add(2, 3) returns 5.",
            mistake:
              "Write a test that checks an unrelated behavior.",
            correction:
              "Make each test verify a clear expected behavior.",
            labPrompt:
              "Write a test case for a function that adds two numbers.",
            question:
              "What is the purpose of an automated test?",
            answer:
              "To verify that code behaves as expected and detect regressions.",
            distractors: [
              "To replace all application code.",
              "To deploy the application automatically.",
            ],
          }),

          lesson({
            slug: "unit-and-integration-tests",
            title: "Unit and integration tests",
            summary:
              "Distinguish between testing an individual unit and testing multiple parts together.",
            what:
              "Unit tests focus on small isolated pieces of code, while integration tests verify that multiple parts work together.",
            why:
              "Using different testing levels helps identify problems at different layers of an application.",
            example:
              "Unit test:\nformatPrice(100)\n\nIntegration test:\nPage → API → data → rendered result",
            output:
              "Different tests verify different levels of application behavior.",
            mistake:
              "Treat every test as an end-to-end browser test.",
            correction:
              "Choose the testing level based on the behavior you need to verify.",
            labPrompt:
              "Give one example of a unit test and one example of an integration test.",
            question:
              "What is the difference between unit and integration testing?",
            answer:
              "Unit testing checks an isolated unit, while integration testing checks multiple parts working together.",
            distractors: [
              "They are exactly the same.",
              "Integration testing only checks CSS.",
            ],
          }),

          lesson({
            slug: "cypress-e2e",
            title: "End-to-end testing with Cypress",
            summary:
              "Test application behavior from the perspective of a user interacting with the browser.",
            what:
              "End-to-end testing checks complete user flows through the application.",
            why:
              "It can verify that multiple frontend and backend pieces work together in realistic scenarios.",
            example:
              "cy.visit(\"http://localhost:3000\");\ncy.contains(\"Login\").click();",
            output:
              "Cypress opens the application and performs the specified browser interaction.",
            mistake:
              "Test only an isolated utility function with an end-to-end browser test.",
            correction:
              "Use E2E tests for complete user-facing workflows.",
            labPrompt:
              "Design an end-to-end test for a user visiting a login page.",
            question:
              "What does an end-to-end test verify?",
            answer:
              "It verifies a complete application flow from the user's perspective.",
            distractors: [
              "Only one variable assignment.",
              "Only the database schema.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "seo-performance",
    title: "SEO and performance",
    description:
      "Choose rendering strategies and optimize Next.js applications for search engines and performance.",
    topics: [
      {
        slug: "seo-and-performance",
        title: "SEO and performance fundamentals",
        description:
          "Understand how rendering choices, metadata, and frontend performance affect a website.",
        lessons: [
          lesson({
            slug: "rendering-for-seo",
            title: "Rendering strategies and SEO",
            summary:
              "Understand how rendering decisions can affect search engine visibility.",
            what:
              "Server-rendered and statically generated pages can provide HTML content to search engines without requiring the entire page to be rendered in the browser first.",
            why:
              "The way content reaches search engine crawlers can influence how efficiently pages are discovered and understood.",
            example:
              "Static page → pre-rendered HTML\nSSR page → HTML generated on request\nCSR page → browser builds much of the interface",
            output:
              "Different rendering strategies provide different ways of delivering page content.",
            mistake:
              "Assume one rendering strategy is automatically correct for every page.",
            correction:
              "Choose the rendering method according to the page's data, SEO, security, and performance requirements.",
            labPrompt:
              "Choose a rendering strategy for a public blog article and explain why.",
            question:
              "Why can server-side or static rendering help SEO?",
            answer:
              "Search engines can receive meaningful HTML content without waiting for all client-side rendering to occur.",
            distractors: [
              "Because SEO only works with JavaScript disabled.",
              "Because static pages cannot contain HTML.",
            ],
          }),

          lesson({
            slug: "private-routes",
            title: "Private routes",
            summary:
              "Protect application pages that should only be available to authorized users.",
            what:
              "Private routes require authentication or authorization checks before allowing access to protected content.",
            why:
              "Applications often contain user-specific pages that should not be publicly accessible.",
            example:
              "if (!user) {\n  return redirectToLogin();\n}\n\nreturn <Dashboard />;",
            output:
              "Unauthenticated users are redirected instead of receiving the protected page.",
            mistake:
              "Only hide the navigation link while leaving the protected data publicly accessible.",
            correction:
              "Perform authorization checks before serving protected content or data.",
            labPrompt:
              "Design a protection rule for a /dashboard page.",
            question:
              "What is the purpose of a private route?",
            answer:
              "To restrict access to protected application content.",
            distractors: [
              "To improve CSS animations.",
              "To make a page public.",
            ],
          }),

          lesson({
            slug: "web-vitals",
            title: "Web performance metrics",
            summary:
              "Understand important frontend performance measurements.",
            what:
              "Performance metrics can measure loading speed, interactivity, and visual stability.",
            why:
              "Poor frontend performance can create a worse user experience and can also affect SEO-related outcomes.",
            example:
              "LCP → loading performance\nFID → interaction responsiveness\nCLS → visual stability",
            output:
              "The metrics describe different aspects of frontend performance.",
            mistake:
              "Measure performance using only server response time.",
            correction:
              "Consider both server-side and frontend performance.",
            labPrompt:
              "Explain what LCP, FID, and CLS measure.",
            question:
              "What does CLS measure?",
            answer:
              "Cumulative layout shift measures visual stability.",
            distractors: [
              "Database size.",
              "Number of API routes.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "deployment",
    title: "Deployment platforms",
    description:
      "Deploy Next.js applications to Vercel, CDNs, servers, and Docker environments.",
    topics: [
      {
        slug: "deployment-options",
        title: "Deployment options",
        description:
          "Understand different ways to host and deploy Next.js applications.",
        lessons: [
          lesson({
            slug: "vercel-deployment",
            title: "Deploying to Vercel",
            summary:
              "Understand deployment of a Next.js application to Vercel.",
            what:
              "Vercel provides hosting infrastructure designed to work closely with Next.js applications.",
            why:
              "A managed deployment platform can simplify building, hosting, and scaling a Next.js application.",
            example:
              "git add .\ngit commit -m \"Deploy Next.js app\"\ngit push",
            output:
              "A connected deployment platform can build and deploy the application from the repository.",
            mistake:
              "Assume deployment only means copying source files to a server.",
            correction:
              "A deployment process may include building the application, configuring environment variables, and serving the generated application.",
            labPrompt:
              "Describe the basic steps required to deploy a Next.js application through a managed platform.",
            question:
              "What is Vercel commonly used for with Next.js?",
            answer:
              "Hosting and deploying Next.js applications.",
            distractors: [
              "Replacing JavaScript.",
              "Creating relational database tables.",
            ],
          }),

          lesson({
            slug: "cdn-deployment",
            title: "Deploying static sites to a CDN",
            summary:
              "Understand how statically generated content can be distributed through a CDN.",
            what:
              "A CDN distributes static assets and pages across locations so users can retrieve content from infrastructure closer to them.",
            why:
              "CDNs can reduce latency and efficiently serve static content to users in different locations.",
            example:
              "Build → static HTML/CSS/JS/assets → CDN → user",
            output:
              "Static content is served through distributed infrastructure.",
            mistake:
              "Expect a CDN alone to execute arbitrary server-side application logic.",
            correction:
              "Use an appropriate server or serverless environment when runtime server-side processing is required.",
            labPrompt:
              "Draw the flow of a statically generated Next.js site served through a CDN.",
            question:
              "What is a CDN useful for?",
            answer:
              "Distributing content so it can be served efficiently from locations closer to users.",
            distractors: [
              "Writing React components.",
              "Replacing the database schema.",
            ],
          }),

          lesson({
            slug: "nextjs-on-server",
            title: "Deploying Next.js on a server",
            summary:
              "Understand hosting a Next.js application on your own server infrastructure.",
            what:
              "Next.js applications can be deployed to a server environment capable of running the application.",
            why:
              "Self-managed servers can provide control over infrastructure and deployment configuration.",
            example:
              "npm install\nnpm run build\nnpm start",
            output:
              "The production Next.js application is built and started on the server.",
            mistake:
              "Run the development server as the production deployment strategy.",
            correction:
              "Build the application and run the production server command for deployment.",
            labPrompt:
              "Write the basic commands used to prepare and start a production Next.js application.",
            question:
              "What is the purpose of npm run build?",
            answer:
              "It creates the production build of the application.",
            distractors: [
              "It deletes node_modules.",
              "It creates a Git repository.",
            ],
          }),

          lesson({
            slug: "docker-nextjs",
            title: "Running Next.js in Docker",
            summary:
              "Package a Next.js application inside a Docker container.",
            what:
              "Docker can package an application and its runtime environment into a container image.",
            why:
              "Containerization can make application environments more consistent across development and deployment infrastructure.",
            example:
              "FROM node:18\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nRUN npm run build\nCMD [\"npm\", \"start\"]",
            output:
              "The Docker image contains the dependencies and production build needed to run the application.",
            mistake:
              "Copy application files without installing dependencies or building when the deployment requires a production build.",
            correction:
              "Follow a Docker build process that installs dependencies and creates the required production output.",
            labPrompt:
              "Create a basic Dockerfile for a production Next.js application.",
            question:
              "What does Docker provide in this deployment approach?",
            answer:
              "A containerized environment for packaging and running the application.",
            distractors: [
              "A replacement for React.",
              "A database query language.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "authentication-and-sessions",
    title: "Authentication and user sessions",
    description:
      "Understand authentication strategies, sessions, JSON Web Tokens, custom authentication, and Auth0.",
    topics: [
      {
        slug: "authentication-basics",
        title: "Authentication fundamentals",
        description:
          "Understand how applications identify users and maintain authenticated sessions.",
        lessons: [
          lesson({
            slug: "authentication-basics",
            title: "Authentication basics",
            summary:
              "Understand how applications identify users and protect resources.",
            what:
              "Authentication identifies a user, while authorization determines what that authenticated user is allowed to access.",
            why:
              "Applications often need to protect private content and provide different permissions to different users.",
            example:
              "User → Login credentials → Authentication → Session → Protected page",
            output:
              "A successful login establishes an authenticated user context.",
            mistake:
              "Treat authentication and authorization as exactly the same concept.",
            correction:
              "Authentication identifies the user; authorization determines what the user can access.",
            labPrompt:
              "Explain the difference between authentication and authorization.",
            question:
              "What does authentication do?",
            answer:
              "It identifies a user.",
            distractors: [
              "It styles a page.",
              "It creates a database index.",
            ],
          }),

          lesson({
            slug: "jwt",
            title: "JSON Web Tokens",
            summary:
              "Understand the role of JWTs in stateless authentication.",
            what:
              "A JSON Web Token can carry claims that identify information about an authenticated user and can be transmitted with requests.",
            why:
              "Stateless authentication can be useful in distributed or serverless environments where keeping server-side session state can be difficult.",
            example:
              "const token = \"header.payload.signature\";\n\n// Client sends token with a protected request.",
            output:
              "The server can validate the token and read its claims.",
            mistake:
              "Treat the token payload as trusted without validating the token.",
            correction:
              "Verify the token's authenticity and validity before trusting its claims.",
            labPrompt:
              "Describe the basic flow of a JWT-based login.",
            question:
              "What does JWT stand for?",
            answer:
              "JSON Web Token.",
            distractors: [
              "Java Web Transfer.",
              "JavaScript Web Table.",
            ],
          }),

          lesson({
            slug: "custom-authentication",
            title: "Custom authentication",
            summary:
              "Understand the tradeoffs and security responsibilities of building authentication yourself.",
            what:
              "Custom authentication requires implementing login, session handling, validation, protection, and security controls yourself.",
            why:
              "Building authentication can teach important security concepts, but production applications must handle authentication carefully.",
            example:
              "Login request\n→ validate credentials\n→ create authenticated session/token\n→ protect private resources",
            output:
              "The application controls the complete authentication flow.",
            mistake:
              "Store sensitive credentials or authentication secrets insecurely.",
            correction:
              "Use established security practices and carefully protect authentication data and secrets.",
            labPrompt:
              "List the major stages in a custom authentication flow.",
            question:
              "Why is custom authentication security-sensitive?",
            answer:
              "Because mistakes can expose protected accounts or private data.",
            distractors: [
              "Because authentication only affects CSS.",
              "Because it cannot use a database.",
            ],
          }),

          lesson({
            slug: "auth0",
            title: "Authentication with Auth0",
            summary:
              "Understand how an external authentication provider can handle identity management.",
            what:
              "Auth0 provides authentication and identity-management services that can be integrated into applications.",
            why:
              "Using an established authentication provider can reduce the amount of authentication infrastructure an application must implement itself.",
            example:
              "Next.js app\n→ Auth0 login\n→ Auth0 authenticates user\n→ application receives authenticated identity",
            output:
              "The application delegates authentication to the external identity provider.",
            mistake:
              "Assume an external authentication provider removes the need to protect application resources.",
            correction:
              "Continue enforcing authorization and validating authenticated requests in the application.",
            labPrompt:
              "Describe the flow between a Next.js application and an external authentication provider.",
            question:
              "What is the role of Auth0?",
            answer:
              "It provides authentication and identity-management services.",
            distractors: [
              "It is a CSS framework.",
              "It is a database query language.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "nextjs-ecommerce",
    title: "E-commerce with Next.js",
    description:
      "Build an e-commerce architecture using Next.js, GraphCMS, and Stripe.",
    topics: [
      {
        slug: "ecommerce-foundations",
        title: "E-commerce foundations",
        description:
          "Understand the major pieces of a modern Next.js e-commerce application.",
        lessons: [
          lesson({
            slug: "ecommerce-architecture",
            title: "E-commerce architecture",
            summary:
              "Understand the main parts of a modern e-commerce application.",
            what:
              "An e-commerce application typically combines product data, storefront pages, product details, cart behavior, checkout, payments, and deployment infrastructure.",
            why:
              "Breaking an e-commerce system into these responsibilities makes a complex application easier to design and maintain.",
            example:
              "Product CMS\n→ Next.js storefront\n→ Cart\n→ Checkout\n→ Payment provider",
            output:
              "Different services work together to provide the shopping experience.",
            mistake:
              "Put product data, payment processing, and UI logic into one large component.",
            correction:
              "Separate the responsibilities between the frontend, content/data layer, and payment system.",
            labPrompt:
              "Draw the architecture of a basic Next.js e-commerce application.",
            question:
              "What are some major parts of an e-commerce application?",
            answer:
              "Product data, storefront pages, cart, checkout, and payment processing.",
            distractors: [
              "Only CSS and HTML.",
              "Only a single React component.",
            ],
          }),

          lesson({
            slug: "graphcms",
            title: "GraphCMS integration",
            summary:
              "Understand the role of a headless CMS in a Next.js storefront.",
            what:
              "A headless CMS provides content and product data through APIs while the Next.js application controls the frontend experience.",
            why:
              "Separating content management from presentation allows the frontend to be customized independently.",
            example:
              "GraphCMS\n→ GraphQL API\n→ Next.js\n→ Product page",
            output:
              "The Next.js application consumes product information from the CMS.",
            mistake:
              "Hard-code every product directly into page components.",
            correction:
              "Use a data source such as a CMS when product information needs to be managed dynamically.",
            labPrompt:
              "Describe how a headless CMS can supply product information to Next.js.",
            question:
              "What does a headless CMS provide to the frontend?",
            answer:
              "Content and data through APIs without controlling the frontend presentation.",
            distractors: [
              "Only CSS files.",
              "A browser runtime.",
            ],
          }),

          lesson({
            slug: "storefront-cart-product-pages",
            title: "Storefront, cart, and product pages",
            summary:
              "Structure the main user-facing pages of an e-commerce application.",
            what:
              "A storefront displays products, product detail pages provide individual product information, and the cart tracks products selected for purchase.",
            why:
              "These pages represent the core shopping flow users need before reaching checkout.",
            example:
              "/products\n/products/[id]\n/cart\n/checkout",
            output:
              "The application has separate routes for browsing, product details, cart, and checkout.",
            mistake:
              "Keep every product page as a separate hard-coded route.",
            correction:
              "Use dynamic product routes so one page can represent many products.",
            labPrompt:
              "Design routes for a storefront, product detail page, cart, and checkout.",
            question:
              "Why use a dynamic product route?",
            answer:
              "It allows one page structure to display many different products based on an identifier.",
            distractors: [
              "It removes the need for product data.",
              "It makes every product identical.",
            ],
          }),

          lesson({
            slug: "stripe-payments",
            title: "Stripe payments",
            summary:
              "Understand how a payment provider can be integrated into an e-commerce flow.",
            what:
              "Stripe provides payment-processing services that can be integrated into applications to handle checkout and payments.",
            why:
              "Using a payment provider avoids having to implement payment processing infrastructure from scratch.",
            example:
              "Cart\n→ Checkout\n→ Stripe\n→ Payment result",
            output:
              "The payment provider processes the payment flow and returns a result to the application.",
            mistake:
              "Treat payment success as valid based only on a browser-side value.",
            correction:
              "Validate payment results using trusted server-side mechanisms provided by the payment system.",
            labPrompt:
              "Draw the basic flow from a shopping cart to Stripe payment processing.",
            question:
              "What role does Stripe play in the e-commerce example?",
            answer:
              "It provides payment-processing functionality.",
            distractors: [
              "It stores CSS styles.",
              "It replaces Next.js routing.",
            ],
          }),
        ],
      },
    ],
  },

  {
    slug: "nextjs-projects",
    title: "Projects and next steps",
    description:
      "Use Next.js concepts to plan real-world applications and continue learning.",
    topics: [
      {
        slug: "real-world-projects",
        title: "Real-world Next.js projects",
        description:
          "Explore practical applications for strengthening Next.js skills.",
        lessons: [
          lesson({
            slug: "streaming-website",
            title: "Streaming website",
            summary:
              "Plan a streaming-style application using Next.js concepts.",
            what:
              "A streaming website can combine content pages, dynamic data, media delivery, authentication, and performance considerations.",
            why:
              "A streaming project brings together many real-world web development concepts in one application.",
            example:
              "Home\n→ Browse content\n→ Content detail\n→ Player\n→ User account",
            output:
              "A streaming application can be divided into several connected user flows.",
            mistake:
              "Build every feature simultaneously without separating the application into smaller responsibilities.",
            correction:
              "Start with the core user flow and progressively add features.",
            labPrompt:
              "Design the main routes for a streaming website.",
            question:
              "Why is a streaming website a useful Next.js practice project?",
            answer:
              "It combines routing, data fetching, authentication, performance, and user-facing application flows.",
            distractors: [
              "Because it only requires CSS.",
              "Because it does not need data.",
            ],
          }),

          lesson({
            slug: "blogging-platform",
            title: "Blogging platform",
            summary:
              "Plan a blogging platform using Next.js routing and data-fetching concepts.",
            what:
              "A blogging platform can contain a list of articles, individual article pages, metadata, content data, and author information.",
            why:
              "Blogs provide a practical way to practice dynamic routes, rendering, SEO, and content management.",
            example:
              "/blog\n/blog/[slug]\n\nBlog list → Article detail",
            output:
              "A dynamic article route can display different posts from the same page structure.",
            mistake:
              "Create a new page file for every blog article.",
            correction:
              "Use dynamic routing with article identifiers or slugs.",
            labPrompt:
              "Design the route structure for a Next.js blogging platform.",
            question:
              "Which Next.js concept is especially useful for individual blog pages?",
            answer:
              "Dynamic routing.",
            distractors: [
              "Only CSS Modules.",
              "Only Docker.",
            ],
          }),

          lesson({
            slug: "realtime-chat",
            title: "Real-time chat website",
            summary:
              "Plan a real-time chat application and identify the major pieces it needs.",
            what:
              "A real-time chat application needs user identity, message data, communication between clients and a backend service, and an interface that updates as messages arrive.",
            why:
              "Chat applications are useful practice for state management, authentication, data synchronization, and real-time communication.",
            example:
              "User login\n→ Conversation\n→ Send message\n→ Server\n→ Other connected users",
            output:
              "Messages can move between connected users through the application's communication layer.",
            mistake:
              "Treat a real-time application as if data only changes after a full page reload.",
            correction:
              "Use an appropriate real-time communication or data synchronization mechanism.",
            labPrompt:
              "Sketch the architecture of a real-time chat application.",
            question:
              "What makes a chat application different from a basic static website?",
            answer:
              "Its data needs to update as users communicate rather than only when pages are loaded.",
            distractors: [
              "It cannot use React.",
              "It does not need any data.",
            ],
          }),

          lesson({
            slug: "nextjs-learning-path",
            title: "Next steps with Next.js",
            summary:
              "Turn Next.js concepts into progressively more complete applications.",
            what:
              "After learning the framework fundamentals, continued practice can focus on building real applications and exploring more advanced integrations.",
            why:
              "Practical projects help connect individual framework features into complete application architectures.",
            example:
              "Fundamentals\n→ Data fetching\n→ Authentication\n→ Testing\n→ Performance\n→ Deployment\n→ Real-world projects",
            output:
              "A progressive learning path connects individual concepts into production-oriented skills.",
            mistake:
              "Learn framework APIs without building complete applications.",
            correction:
              "Combine concepts through progressively larger projects.",
            labPrompt:
              "Create a personal Next.js learning roadmap from fundamentals to a complete project.",
            question:
              "Why are real-world projects useful after learning the basics?",
            answer:
              "They require multiple concepts to work together in a complete application.",
            distractors: [
              "They eliminate the need to understand the framework.",
              "They only teach CSS.",
            ],
          }),
        ],
      },
    ],
  },
];