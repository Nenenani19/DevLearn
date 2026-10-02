// Content shapes for each lesson "stage" (see supabase/schema_phase2.sql's
// section_type enum). Stored as jsonb in lesson_sections.content — Postgres
// doesn't enforce this shape, so LessonSectionRenderer validates minimally
// at render time rather than trusting it blindly (admin-authored content
// could still be malformed; a degraded message beats a crashed page).

export type SectionType =
  | "what_is_it"
  | "why_it_exists"
  | "anatomy"
  | "minimal_example"
  | "live_result"
  | "animation"
  | "real_world_analogy"
  | "practical_example"
  | "hidden_details"
  | "common_mistakes"
  | "fix_the_mistake"
  | "interactive_example"
  | "knowledge_check"
  | "mini_challenge"
  | "related_concepts";

export type TextContent = { text: string };

export type AnatomyPart = { token: string; label: string; description: string };
export type AnatomyContent = { code: string; parts: AnatomyPart[] };

export type MinimalExampleContent = { code: string; language: string };

export type CommonMistakesContent = { wrongCode: string; explanation: string };

export type FixTheMistakeContent = { wrongCode: string; correctCode: string; hint: string };

export type InteractiveExampleContent = {
  starterCode: string;
  instructions: string;
  language?: string;
  expectedOutput?: string;
};

export type RelatedConceptItem = {
  title: string;
  description: string;
  lessonSlug?: string;
  languageSlug?: string;
};
export type RelatedConceptsContent = { items: RelatedConceptItem[] };

export type MiniChallengeContent = {
  prompt: string;
  starterCode?: string;
  language?: string;
  expectedOutput?: string;
};

export function isMiniChallengeContent(v: unknown): v is MiniChallengeContent {
  return (
    isRecord(v) &&
    typeof v.prompt === "string" &&
    (v.starterCode === undefined || typeof v.starterCode === "string") &&
    (v.language === undefined || typeof v.language === "string") &&
    (v.expectedOutput === undefined || typeof v.expectedOutput === "string")
  );
}

/**
 * Maps each SectionType to its expected content shape. Used by
 * LessonSectionRenderer's switch to pick the right sub-renderer.
 * Stages not yet used by seed data (live_result, animation,
 * knowledge_check) still get a shape here so Phase 3 content can
 * use them without a type-layer change.
 */
export type SectionContentMap = {
  what_is_it: TextContent;
  why_it_exists: TextContent;
  anatomy: AnatomyContent;
  minimal_example: MinimalExampleContent;
  live_result: TextContent;
  animation: { steps: { label: string; description: string }[] };
  real_world_analogy: TextContent;
  practical_example: MinimalExampleContent;
  hidden_details: TextContent;
  common_mistakes: CommonMistakesContent;
  fix_the_mistake: FixTheMistakeContent;
  interactive_example: InteractiveExampleContent;
  knowledge_check: { note?: string };
  mini_challenge: MiniChallengeContent;
  related_concepts: RelatedConceptsContent;
};

// ------------------------------------------------------------
// Runtime guards. jsonb has no compile-time shape guarantee, and
// this content is admin-authored (via the SQL editor, for now) —
// a typo in a seed file should degrade to "content unavailable"
// in LessonSectionRenderer, not crash the page.
// ------------------------------------------------------------
function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function isTextContent(v: unknown): v is TextContent {
  return isRecord(v) && typeof v.text === "string";
}

export function isAnatomyContent(v: unknown): v is AnatomyContent {
  return (
    isRecord(v) &&
    typeof v.code === "string" &&
    Array.isArray(v.parts) &&
    v.parts.every(
      (p) => isRecord(p) && typeof p.token === "string" && typeof p.label === "string" && typeof p.description === "string"
    )
  );
}

export function isMinimalExampleContent(v: unknown): v is MinimalExampleContent {
  return isRecord(v) && typeof v.code === "string" && typeof v.language === "string";
}

export function isCommonMistakesContent(v: unknown): v is CommonMistakesContent {
  return isRecord(v) && typeof v.wrongCode === "string" && typeof v.explanation === "string";
}

export function isFixTheMistakeContent(v: unknown): v is FixTheMistakeContent {
  return isRecord(v) && typeof v.wrongCode === "string" && typeof v.correctCode === "string" && typeof v.hint === "string";
}

export function isInteractiveExampleContent(v: unknown): v is InteractiveExampleContent {
  return (
    isRecord(v) &&
    typeof v.starterCode === "string" &&
    typeof v.instructions === "string" &&
    (v.language === undefined || typeof v.language === "string") &&
    (v.expectedOutput === undefined || typeof v.expectedOutput === "string")
  );
}

export function isRelatedConceptsContent(v: unknown): v is RelatedConceptsContent {
  return (
    isRecord(v) &&
    Array.isArray(v.items) &&
    v.items.every((item) => isRecord(item) && typeof item.title === "string" && typeof item.description === "string")
  );
}
