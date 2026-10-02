"use client";

import type { LessonSection } from "@/types/database";
import {
  isTextContent,
  isAnatomyContent,
  isMinimalExampleContent,
  isCommonMistakesContent,
  isFixTheMistakeContent,
  isInteractiveExampleContent,
  isRelatedConceptsContent,
  isMiniChallengeContent,
} from "@/types/content";
import { CodeBlock } from "./CodeBlock";
import { InteractiveCodeBlock } from "./InteractiveCodeBlock";
import { FixTheMistakeExercise } from "./FixTheMistakeExercise";

const STAGE_LABELS: Record<string, string> = {
  what_is_it: "What is it?",
  why_it_exists: "Why does it exist?",
  anatomy: "Anatomy",
  minimal_example: "Minimal example",
  live_result: "Example output",
  hidden_details: "Hidden details",
  common_mistakes: "Common mistake",
  fix_the_mistake: "Fix the mistake",
  interactive_example: "Try it yourself",
  mini_challenge: "Lab",
  related_concepts: "Related concepts",
};

function Stage({ type, children }: { type: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`stage-${type}`} className="min-w-0 max-w-full space-y-3">
      <h2 id={`stage-${type}`} className="font-mono text-xs uppercase tracking-widest text-accent">
        {STAGE_LABELS[type] ?? type}
      </h2>
      {children}
    </section>
  );
}

export function LessonSectionRenderer({
  section,
  onInteract,
}: {
  section: LessonSection;
  onInteract?: () => void;
}) {
  const { section_type, content } = section;

  switch (section_type) {
    case "what_is_it":
    case "why_it_exists":
    case "hidden_details":
      if (!isTextContent(content)) return null;
      return (
        <Stage type={section_type}>
          <p className="leading-relaxed text-ink-light/85 dark:text-ink-dark/85">{content.text}</p>
        </Stage>
      );

    case "anatomy":
      if (!isAnatomyContent(content)) return null;
      return (
        <Stage type={section_type}>
          <CodeBlock code={content.code} label="Anatomy" />
          <dl className="space-y-2">
            {content.parts.map((part) => (
              <div key={part.token} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                <dt className="shrink-0 font-mono text-sm text-accent sm:w-40">{part.token}</dt>
                <dd className="text-sm text-ink-light/80 dark:text-ink-dark/80">
                  <span className="font-medium">{part.label}.</span> {part.description}
                </dd>
              </div>
            ))}
          </dl>
        </Stage>
      );

    case "minimal_example":
      if (!isMinimalExampleContent(content)) return null;
      return (
        <Stage type={section_type}>
          <CodeBlock code={content.code} label={content.language} />
        </Stage>
      );

    case "live_result":
      if (!isTextContent(content)) return null;
      return (
        <Stage type={section_type}>
          <CodeBlock code={content.text} label="Expected output" />
        </Stage>
      );

    case "common_mistakes":
      if (!isCommonMistakesContent(content)) return null;
      return (
        <Stage type={section_type}>
          <CodeBlock code={content.wrongCode} label="Don't do this" />
          <p className="text-sm text-ink-light/80 dark:text-ink-dark/80">{content.explanation}</p>
        </Stage>
      );

    case "fix_the_mistake":
      if (!isFixTheMistakeContent(content)) return null;
      return (
        <Stage type={section_type}>
          <FixTheMistakeExercise
            wrongCode={content.wrongCode}
            correctCode={content.correctCode}
            hint={content.hint}
          />
        </Stage>
      );

    case "interactive_example":
      if (!isInteractiveExampleContent(content)) return null;
      return (
        <Stage type={section_type}>
          <InteractiveCodeBlockWithTracking
            starterCode={content.starterCode}
            instructions={content.instructions}
            language={content.language}
            expectedOutput={content.expectedOutput}
            onInteract={onInteract}
          />
        </Stage>
      );

    case "mini_challenge":
      if (!isMiniChallengeContent(content)) return null;
      return (
        <Stage type={section_type}>
          <p className="leading-relaxed text-ink-light/85 dark:text-ink-dark/85">{content.prompt}</p>
          {content.starterCode && (
            <InteractiveCodeBlockWithTracking
              starterCode={content.starterCode}
              instructions={
                content.language === "git"
                  ? "Enter Git commands to see illustrative output only; no commands are run."
                  : content.language === "javascript"
                    ? "Edit the JavaScript and inspect the isolated preview and console output."
                    : content.language === "html"
                      ? "Edit the markup and inspect the rendered page."
                      : content.language === "css"
                        ? "Edit the styles and inspect the rendered sample page."
                        : `Edit the ${content.language ?? "code"} and compare with the expected output. The code is not executed in this browser preview.`
              }
              language={content.language}
              expectedOutput={content.expectedOutput}
              onInteract={onInteract}
            />
          )}
        </Stage>
      );

    case "related_concepts":
      if (!isRelatedConceptsContent(content)) return null;
      return (
        <Stage type={section_type}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {content.items.map((item) => (
              <li key={item.title} className="rounded-lg border border-ink-light/15 p-3 dark:border-ink-dark/15">
                <p className="font-medium">{item.title}</p>
                <p className="mt-1 text-sm text-ink-light/70 dark:text-ink-dark/70">{item.description}</p>
              </li>
            ))}
          </ul>
        </Stage>
      );

    default:
      // Unimplemented/unused stage types (animation,
      // knowledge_check) render nothing yet rather
      // than a broken block — honest "not built" over a fake one.
      return null;
  }
}

function InteractiveCodeBlockWithTracking({
  starterCode,
  instructions,
  language,
  expectedOutput,
  onInteract,
}: {
  starterCode: string;
  instructions: string;
  language?: string;
  expectedOutput?: string;
  onInteract?: () => void;
}) {
  // Thin wrapper: fires onInteract the first time the user's code
  // differs from the starter, without changing InteractiveCodeBlock's
  // own self-contained editor/preview behavior.
  return (
    <div
      onInput={() => onInteract?.()}
      onChange={() => onInteract?.()}
    >
      <InteractiveCodeBlock
        starterCode={starterCode}
        instructions={instructions}
        language={language}
        expectedOutput={expectedOutput}
      />
    </div>
  );
}
