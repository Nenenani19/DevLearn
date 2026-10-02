import type { SectionType } from "@/types/content";
import type {
  Course,
  Language,
  Lesson,
  LessonSection,
  Module,
  Quiz,
  QuizOptionPublic,
  QuizQuestion,
  Topic,
} from "@/types/database";
import type { Json } from "@/types/json";
import { inferLiteralOutput } from "@/lib/lab-output";
import { cssModules } from "@/lib/curriculum/css";
import { htmlModules } from "@/lib/curriculum/html";
import { javascriptModules } from "@/lib/curriculum/javascript";
import { gitModules } from "@/lib/curriculum/git";
import { typescriptModules } from "@/lib/curriculum/typescript";
import { sqlModules } from "@/lib/curriculum/sql";
import { pythonWebDevelopmentModules } from "@/lib/curriculum/python";
import { javaWebDevelopmentModules } from "@/lib/curriculum/java";
import { reactModules } from "@/lib/curriculum/react";
import { angularModules, vueModules } from "@/lib/curriculum/vue-angular";
import { rubyModules } from "@/lib/curriculum/ruby";
import { rustModules } from "@/lib/curriculum/rust";
import { nodejsModules } from "@/lib/curriculum/nodejs-course";
import { nextjsModules } from "@/lib/curriculum/nodejs";
import { phpModules } from "@/lib/curriculum/php";
import { csharpModules } from "@/lib/curriculum/c#";
import { goModules } from "@/lib/curriculum/go";


type Part = { token: string; label: string; description: string };

export type LocalLessonSeed = {
  slug: string;
  title: string;
  summary: string;
  what: string;
  why: string;
  example: string;
  output?: string;
  anatomy?: string;
  parts?: Part[];
  mistake: string;
  mistakeExplanation: string;
  correction: string;
  labPrompt: string;
  labCode?: string;
  question: string;
  answer: string;
  distractors: [string, string, ...string[]];
  hint?: string;
  related?: { title: string; slug?: string; description: string }[];
  hidden?: string;
};

export type LocalTopicSeed = {
  slug: string;
  title: string;
  description: string;
  lessons: LocalLessonSeed[];
};

export type LocalModuleSeed = {
  slug: string;
  title: string;
  description: string;
  topics: LocalTopicSeed[];
};

type LocalQuizQuestion = QuizQuestion & {
  correctOptionId: string;
  options: QuizOptionPublic[];
};

export type LocalQuiz = Quiz & { localMode: true; questions: LocalQuizQuestion[] };

export type LocalLessonDetail = {
  lesson: Lesson;
  sections: LessonSection[];
  quiz: LocalQuiz;
  localMode: true;
};

export type LocalLanguageTree = Language & {
  courses: (Course & {
    modules: (Module & {
      topics: (Topic & { lessons: Lesson[] })[];
    })[];
  })[];
};

const timestamp = "2026-01-01T00:00:00.000Z";
const localLessonDetails = new Map<string, LocalLessonDetail>();

function getLessonExpectedOutput(language: string, code: string, seed: LocalLessonSeed): string | undefined {
  const inferred = inferLiteralOutput(code, language);
  if (inferred) return inferred;
  const output = seed.output?.trim();
  if (output && !/^example output appears here\.?$/i.test(output)) return output;
  return undefined;
}

function getLabInstructions(language: string): string {
  if (language === "html") return "Edit the markup and inspect the rendered page.";
  if (language === "css") return "Edit the styles and inspect the rendered sample page.";
  if (language === "javascript") return "Edit the JavaScript and inspect the isolated preview and console output.";
  if (language === "git") return "Enter Git commands to see illustrative output only; no commands are run.";
  return `Edit the ${language} code and compare it with the expected output. The code is not executed in this browser preview.`;
}

function buildLesson(languageSlug: string, topicSlug: string, seed: LocalLessonSeed, order: number) {
  const lessonId = `local-${languageSlug}-${seed.slug}`;
  const section = (section_type: SectionType, sort_order: number, content: Json): LessonSection => ({
    id: `${lessonId}-${section_type}`,
    lesson_id: lessonId,
    section_type,
    sort_order,
    content,
    created_at: timestamp,
  });
  const lesson: Lesson = {
    id: lessonId,
    topic_id: `local-${languageSlug}-${topicSlug}`,
    slug: seed.slug,
    title: seed.title,
    summary: seed.summary,
    sort_order: order * 10,
    requires_interaction: true,
    created_at: timestamp,
  };
  const interactiveOutput = getLessonExpectedOutput(languageSlug, seed.example, seed);
  const challengeOutput = getLessonExpectedOutput(languageSlug, seed.labCode ?? seed.mistake, seed);
  const sections = [
    section("what_is_it", 10, { text: seed.what }),
    section("why_it_exists", 20, { text: seed.why }),
    section("anatomy", 30, {
      code: seed.anatomy ?? seed.example,
      parts: seed.parts ?? [{ token: seed.title, label: "Concept", description: seed.summary }],
    }),
    section("minimal_example", 40, { code: seed.example, language: languageSlug }),
    ...(seed.output ? [section("live_result", 45, { text: seed.output })] : []),
    ...(seed.hidden ? [section("hidden_details", 50, { text: seed.hidden })] : []),
    section("common_mistakes", 60, { wrongCode: seed.mistake, explanation: seed.mistakeExplanation }),
    section("fix_the_mistake", 70, {
      wrongCode: seed.mistake,
      correctCode: seed.correction,
      hint: seed.hint ?? "Compare the markup with the element's intended meaning and behavior.",
    }),
    section("interactive_example", 80, {
      starterCode: seed.example,
      instructions: getLabInstructions(languageSlug),
      language: languageSlug,
      ...(interactiveOutput ? { expectedOutput: interactiveOutput } : {}),
    }),
    section("mini_challenge", 90, {
      prompt: seed.labPrompt,
      starterCode: seed.labCode ?? seed.mistake,
      language: languageSlug,
      ...(challengeOutput ? { expectedOutput: challengeOutput } : {}),
    }),
    section("related_concepts", 100, { items: seed.related ?? [] }),
  ];

  const quizId = `${lessonId}-quiz`;
  const questionId = `${quizId}-q1`;
  const correctOptionId = `${questionId}-a`;
  const quiz: LocalQuiz = {
    id: quizId,
    lesson_id: lessonId,
    title: `Check your understanding: ${seed.title}`,
    passing_score: 70,
    created_at: timestamp,
    localMode: true,
    questions: [
      {
        id: questionId,
        quiz_id: quizId,
        prompt: seed.question,
        explanation: seed.answer,
        sort_order: 10,
        correctOptionId,
        options: [
          { id: correctOptionId, question_id: questionId, label: seed.answer, sort_order: 10 },
          ...seed.distractors.map((label, index) => ({
            id: `${questionId}-${String.fromCharCode(98 + index)}`,
            question_id: questionId,
            label,
            sort_order: (index + 2) * 10,
          })),
        ],
      },
    ],
  };

  return { lesson, sections, quiz };
}

export function buildLocalLanguage(
  slug: "html" | "css" | "javascript" | "git" | "typescript" | "sql" | "python" | "java" | "react" | "vue" | "angular" | "ruby" | "rust" | "nodejs" | "php" | "csharp" | "go" | "nextjs",
  name: string,
  description: string,
  courseTitle: string,
  courseDescription: string,
  moduleSeeds: LocalModuleSeed[]
): LocalLanguageTree {
  const languageId = `local-${slug}`;
  let lessonOrder = 0;
  const modules = moduleSeeds.map((moduleSeed, moduleIndex) => {
    const moduleId = `${languageId}-${moduleSeed.slug}`;
    return {
      id: moduleId,
      course_id: `${languageId}-fundamentals`,
      slug: moduleSeed.slug,
      title: moduleSeed.title,
      description: moduleSeed.description,
      sort_order: moduleIndex * 10 + 10,
      created_at: timestamp,
      topics: moduleSeed.topics.map((topicSeed, topicIndex) => {
        const topicId = `${languageId}-${topicSeed.slug}`;
        const lessons = topicSeed.lessons.map((seed) => {
          lessonOrder += 1;
          const built = buildLesson(slug, topicSeed.slug, seed, lessonOrder);
          localLessonDetails.set(`${slug}/${seed.slug}`, { ...built, localMode: true });
          return built.lesson;
        });
        return {
          id: topicId,
          module_id: moduleId,
          slug: topicSeed.slug,
          title: topicSeed.title,
          description: topicSeed.description,
          sort_order: topicIndex * 10 + 10,
          created_at: timestamp,
          lessons,
        };
      }),
    };
  });

  return {
    id: languageId,
    slug,
    name,
    description,
    status: "available",
    depends_on: [],
    sort_order: {
      html: 10,
      css: 20,
      javascript: 30,
      git: 40,
      typescript: 50,
      sql: 55,
      python: 60,
      java: 70,
      react: 80,
      vue: 90,
      angular: 100,
      ruby: 110,
      rust: 120,
      nodejs: 130,
      php: 140,
      csharp: 150,
      go: 160,
      nextjs: 170,
    }[slug],
    created_at: timestamp,
    courses: [
      {
        id: `${languageId}-fundamentals`,
        language_id: languageId,
        slug: "fundamentals",
        title: courseTitle,
        description: courseDescription,
        sort_order: 10,
        created_at: timestamp,
        modules,
      },
    ],
  };
}

export function getLocalLanguageTree(slug: string): LocalLanguageTree | null {
  return localLanguageTrees[slug] ?? null;
}

export function getLocalLessonDetail(languageSlug: string, lessonSlug: string): LocalLessonDetail | null {
  return localLessonDetails.get(`${languageSlug}/${lessonSlug}`) ?? null;
}

export function getLocalLanguages(): Language[] {
  return Object.values(localLanguageTrees);
}

export const localLanguageTrees: Record<string, LocalLanguageTree> = {
  html: buildLocalLanguage(
    "html",
    "HTML",
    "Structure web content with semantic elements, links, lists, media, tables, and forms.",
    "HTML Fundamentals",
    "A practical path from document structure to accessible, semantic page content.",
    htmlModules
  ),
  css: buildLocalLanguage(
    "css",
    "CSS",
    "Style and lay out web pages with selectors, typography, color, and responsive design.",
    "CSS Fundamentals",
    "A hands-on path from CSS rules to responsive page layouts.",
    cssModules
  ),
  javascript: buildLocalLanguage(
    "javascript",
    "JavaScript",
    "Write programs that respond to users, transform data, and bring web pages to life.",
    "JavaScript Fundamentals",
    "A practical, browser-first path from values and control flow to interactive applications.",
    javascriptModules
  ),
  git: buildLocalLanguage(
    "git",
    "Git & GitHub",
    "Track project history locally and collaborate through GitHub repositories and pull requests.",
    "Git and GitHub Fundamentals",
    "A safe, hands-on path from your first repository to branches, remotes, and team workflows.",
    gitModules
  ),
  typescript: buildLocalLanguage(
    "typescript",
    "TypeScript",
    "Add clear types to JavaScript and build safer applications with the TypeScript compiler.",
    "TypeScript Fundamentals",
    "A practical path from compiler setup and JavaScript behavior to types, modules, JSX, and tooling.",
    typescriptModules
  ),
  sql: buildLocalLanguage(
    "sql",
    "SQL",
    "Query and manage data with SQL using SELECT, filtering, joins, updates, and reporting patterns.",
    "SQL Fundamentals",
    "A practical path from basic queries to joins, grouping, and safe data writing.",
    sqlModules
  ),
  python: buildLocalLanguage(
    "python",
    "Python",
    "Write readable programs with variables, loops, functions, and data structures.",
    "Python Fundamentals",
    "A beginner-friendly path through Python syntax, logic, and real-world automation patterns.",
    pythonWebDevelopmentModules
  ),
  java: buildLocalLanguage(
    "java",
    "Java",
    "Build structured Java programs with classes, methods, control flow, and object-oriented patterns.",
    "Java Fundamentals",
    "A practical path from Java syntax and variables to loops, methods, and arrays.",
    javaWebDevelopmentModules
  ),
  react: buildLocalLanguage(
    "react",
    "React",
    "Build interactive interfaces from components, props, state, and browser events.",
    "React Fundamentals",
    "A modern path through JSX, components, Hooks, data, routing, and testing.",
    reactModules
  ),
  vue: buildLocalLanguage(
    "vue",
    "Vue.js",
    "Build reactive interfaces with Vue components, templates, and the Composition API.",
    "Vue Fundamentals",
    "A practical path through reactivity, components, forms, routing, and shared state.",
    vueModules
  ),
  angular: buildLocalLanguage(
    "angular",
    "Angular",
    "Build structured applications with standalone components, signals, services, and routing.",
    "Angular Fundamentals",
    "A beginner path through templates, signals, forms, dependency injection, and testing.",
    angularModules
  ),
  ruby: buildLocalLanguage(
"ruby",
"Ruby",
"Learn Ruby basics",
"Ruby Fundamentals",
"A practical path ...",
rubyModules
),
  rust: buildLocalLanguage(
    "rust",
    "Rust",
    "Learn Rust fundamentals",
    "Rust Fundamentals",
    "A practical path through ownership, types, and safe systems programming.",
    rustModules
  ),
  nodejs: buildLocalLanguage(
    "nodejs",
    "Node.js",
    "Run JavaScript on the server, build command-line tools, and create HTTP services.",
    "Node.js Fundamentals",
    "A practical course on the Node.js runtime, modules, asynchronous APIs, and HTTP services.",
    nodejsModules
  ),
  php: buildLocalLanguage(
    "php",
    "PHP",
    "Learn PHP fundamentals",
    "PHP Fundamentals",
    "A practical path through PHP syntax, functions, and web development.",
    phpModules
  ),
  go: buildLocalLanguage(
    "go",
    "Go",
    "Learn Go fundamentals",
    "Go Fundamentals",
    "A practical path through Go syntax, concurrency, and web development.",
    goModules
  ),
  csharp: buildLocalLanguage(
    "csharp",
    "C#",
    "Learn C# fundamentals",
    "C# Fundamentals",
    "A practical path through C# syntax, classes, and object-oriented programming.",
    csharpModules
  ),
  nextjs: buildLocalLanguage(
    "nextjs",
    "Next.js",
    "Learn Next.js fundamentals",
    "Next.js Fundamentals",
    "A practical path through Next.js pages, routing, and server-side rendering.",
    nextjsModules
  ),
};
