import type { Json } from "./json";
import type { SectionType } from "./content";

export type AccountType = "student" | "employed" | "unemployed" | "other";
export type Theme = "light" | "dark" | "system";
export type LanguageStatus = "available" | "coming_soon";

// NOTE: these must be `type` aliases, not `interface` declarations.
// @supabase/postgrest-js's generic inference for .select()/.update()
// resolves a Row/Update declared via `interface` to `never` in this
// TS version — a known quirk with how interfaces vs. object-literal
// types satisfy its internal Record<string, unknown> constraint.
// Confirmed by isolated repro; verified working as `type` below.
export type Profile = {
  id: string;
  full_name: string;
  nickname: string | null;
  account_type: AccountType;
  institution: string | null;
  description: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type UserPreferences = {
  user_id: string;
  theme: Theme;
  reduced_motion: boolean;
  updated_at: string;
};

export type Language = {
  id: string;
  slug: string;
  name: string;
  description: string;
  status: LanguageStatus;
  depends_on: string[];
  sort_order: number;
  created_at: string;
};

export type Course = {
  id: string;
  language_id: string;
  slug: string;
  title: string;
  description: string;
  sort_order: number;
  created_at: string;
};

export type Module = {
  id: string;
  course_id: string;
  slug: string;
  title: string;
  description: string | null;
  sort_order: number;
  created_at: string;
};

export type Topic = {
  id: string;
  module_id: string;
  slug: string;
  title: string;
  description: string | null;
  sort_order: number;
  created_at: string;
};

export type Lesson = {
  id: string;
  topic_id: string;
  slug: string;
  title: string;
  summary: string | null;
  sort_order: number;
  requires_interaction: boolean;
  created_at: string;
};

// content is stored as jsonb and its shape depends on section_type
// (see types/content.ts's SectionContentMap) — Postgrest has no way
// to express that dependency, so it's typed as Json here and narrowed
// at render time in LessonSectionRenderer.
export type LessonSection = {
  id: string;
  lesson_id: string;
  section_type: SectionType;
  sort_order: number;
  content: Json;
  created_at: string;
};

export type Quiz = {
  id: string;
  lesson_id: string;
  title: string;
  passing_score: number;
  created_at: string;
};

export type QuizQuestion = {
  id: string;
  quiz_id: string;
  prompt: string;
  explanation: string;
  sort_order: number;
};

// is_correct deliberately excluded from the app-facing type used
// while a quiz is being taken — see lib/quiz.ts, which selects only
// id/question_id/label/sort_order so the answer key never reaches
// the browser. Grading happens server-side via grade_quiz_attempt().
export type QuizOptionPublic = {
  id: string;
  question_id: string;
  label: string;
  sort_order: number;
};

export type UserLessonProgress = {
  user_id: string;
  lesson_id: string;
  completed: boolean;
  interacted: boolean;
  last_visited_at: string;
  completed_at: string | null;
};

export type QuizAttempt = {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  passed: boolean;
  answers: Record<string, string>;
  created_at: string;
};

export type Bookmark = {
  user_id: string;
  lesson_id: string;
  created_at: string;
};

export type GradeQuizAttemptResult = {
  score: number;
  passed: boolean;
  attempt_id: string;
};

/**
 * Database type for @supabase/ssr's generic client. Hand-written
 * (not CLI-generated) — regenerate with `supabase gen types
 * typescript` once the schema stabilizes, keeping the `type` (not
 * `interface`) convention noted above.
 */
export interface Database {
  // Required by current @supabase/supabase-js versions to identify
  // which PostgREST wire format this schema was generated against.
  __InternalSupabase: {
    PostgrestVersion: "13";
  };
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string; full_name: string };
        Update: Partial<Profile>;
        Relationships: [];
      };
      user_preferences: {
        Row: UserPreferences;
        Insert: Partial<UserPreferences> & { user_id: string };
        Update: Partial<UserPreferences>;
        Relationships: [];
      };
      languages: {
        Row: Language;
        Insert: Partial<Language> & { slug: string; name: string; description: string };
        Update: Partial<Language>;
        Relationships: [];
      };
      courses: {
        Row: Course;
        Insert: Partial<Course> & { language_id: string; slug: string; title: string; description: string };
        Update: Partial<Course>;
        Relationships: [];
      };
      modules: {
        Row: Module;
        Insert: Partial<Module> & { course_id: string; slug: string; title: string };
        Update: Partial<Module>;
        Relationships: [];
      };
      topics: {
        Row: Topic;
        Insert: Partial<Topic> & { module_id: string; slug: string; title: string };
        Update: Partial<Topic>;
        Relationships: [];
      };
      lessons: {
        Row: Lesson;
        Insert: Partial<Lesson> & { topic_id: string; slug: string; title: string };
        Update: Partial<Lesson>;
        Relationships: [];
      };
      lesson_sections: {
        Row: LessonSection;
        Insert: Partial<LessonSection> & { lesson_id: string; section_type: SectionType };
        Update: Partial<LessonSection>;
        Relationships: [];
      };
      quizzes: {
        Row: Quiz;
        Insert: Partial<Quiz> & { lesson_id: string };
        Update: Partial<Quiz>;
        Relationships: [];
      };
      quiz_questions: {
        Row: QuizQuestion;
        Insert: Partial<QuizQuestion> & { quiz_id: string; prompt: string; explanation: string };
        Update: Partial<QuizQuestion>;
        Relationships: [];
      };
      // Row is intentionally the public (no is_correct) shape — see
      // lib/quiz.ts. Insert/Update still allow is_correct since those
      // only apply to admin/service-role writes, never the browser.
      quiz_options: {
        Row: QuizOptionPublic;
        Insert: Partial<QuizOptionPublic> & { question_id: string; label: string; is_correct?: boolean };
        Update: Partial<QuizOptionPublic> & { is_correct?: boolean };
        Relationships: [];
      };
      user_lesson_progress: {
        Row: UserLessonProgress;
        Insert: Partial<UserLessonProgress> & { user_id: string; lesson_id: string };
        Update: Partial<UserLessonProgress>;
        Relationships: [];
      };
      quiz_attempts: {
        Row: QuizAttempt;
        Insert: Partial<QuizAttempt> & { user_id: string; quiz_id: string; score: number; passed: boolean };
        Update: Partial<QuizAttempt>;
        Relationships: [];
      };
      bookmarks: {
        Row: Bookmark;
        Insert: Partial<Bookmark> & { user_id: string; lesson_id: string };
        Update: Partial<Bookmark>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      grade_quiz_attempt: {
        Args: { p_quiz_id: string; p_answers: Json };
        Returns: GradeQuizAttemptResult[];
      };
    };
    Enums: {
      account_type: AccountType;
      language_status: LanguageStatus;
      section_type: SectionType;
    };
    CompositeTypes: Record<string, never>;
  };
}
