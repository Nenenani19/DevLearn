-- ============================================================
-- DevLearn Platform — seed data
-- Run AFTER schema.sql and schema_phase2.sql.
-- Fixed UUIDs so this file is idempotent (on conflict do nothing)
-- and so Phase 3 can extend the same rows by id.
--
-- This seeds the roadmap's full language list (mostly "coming_soon")
-- plus ONE real, complete-enough-to-prove-the-engine slice of HTML:
-- the <h1>, <h2> and <p> lessons under "Text structure → Headings".
-- This is deliberately NOT the full HTML curriculum — that's Phase 3.
-- ============================================================

-- ------------------------------------------------------------
-- Roadmap languages, in dependency order. depends_on is filled
-- in after all rows exist (see the update block below) since a
-- language can depend on one inserted after it alphabetically.
-- ------------------------------------------------------------
insert into public.languages (id, slug, name, description, status, sort_order) values
  ('10000000-0000-0000-0000-000000000001', 'html', 'HTML', 'The structure and semantics of every web page.', 'available', 10),
  ('10000000-0000-0000-0000-000000000002', 'css', 'CSS', 'How that structure is styled, laid out and made responsive.', 'coming_soon', 20),
  ('10000000-0000-0000-0000-000000000003', 'javascript', 'JavaScript', 'How pages become interactive and dynamic.', 'coming_soon', 30),
  ('10000000-0000-0000-0000-000000000004', 'git', 'Git & GitHub', 'Tracking changes and collaborating on code.', 'coming_soon', 40),
  ('10000000-0000-0000-0000-000000000005', 'typescript', 'TypeScript', 'JavaScript with a type system layered on top.', 'coming_soon', 50),
  ('10000000-0000-0000-0000-000000000006', 'react', 'React', 'A component-based frontend framework.', 'coming_soon', 60),
  ('10000000-0000-0000-0000-000000000007', 'vue', 'Vue.js', 'An alternative component-based frontend framework.', 'coming_soon', 61),
  ('10000000-0000-0000-0000-000000000008', 'angular', 'Angular', 'A full-featured frontend framework.', 'coming_soon', 62),
  ('10000000-0000-0000-0000-000000000009', 'nextjs', 'Next.js', 'A React framework for full-stack apps.', 'coming_soon', 70),
  ('10000000-0000-0000-0000-000000000010', 'nodejs', 'Node.js', 'Running JavaScript on the server.', 'coming_soon', 71),
  ('10000000-0000-0000-0000-000000000011', 'sql', 'SQL', 'Querying and modeling relational data.', 'coming_soon', 80),
  ('10000000-0000-0000-0000-000000000012', 'python', 'Python', 'A general-purpose language popular for backend and data work.', 'coming_soon', 90),
  ('10000000-0000-0000-0000-000000000013', 'php', 'PHP', 'A widely deployed server-side language for the web.', 'coming_soon', 91),
  ('10000000-0000-0000-0000-000000000014', 'java', 'Java', 'A statically typed, widely used enterprise language.', 'coming_soon', 92),
  ('10000000-0000-0000-0000-000000000015', 'csharp', 'C#', 'A statically typed language for the .NET ecosystem.', 'coming_soon', 93),
  ('10000000-0000-0000-0000-000000000016', 'go', 'Go', 'A compiled language built for simplicity and concurrency.', 'coming_soon', 94),
  ('10000000-0000-0000-0000-000000000017', 'rust', 'Rust', 'A compiled, memory-safe systems language.', 'coming_soon', 95),
  ('10000000-0000-0000-0000-000000000018', 'ruby', 'Ruby', 'A dynamic language known for developer ergonomics.', 'coming_soon', 96)
on conflict (id) do update set
  name = excluded.name, description = excluded.description,
  status = excluded.status, sort_order = excluded.sort_order;

-- Dependency edges (drawn as roadmap connector lines). Several
-- languages share a prerequisite to show branching paths rather
-- than one single forced route, per the "show alternative paths"
-- requirement.
update public.languages set depends_on = '{}' where slug = 'html';
update public.languages set depends_on = array['10000000-0000-0000-0000-000000000001']::uuid[] where slug = 'css';
update public.languages set depends_on = array['10000000-0000-0000-0000-000000000002']::uuid[] where slug = 'javascript';
update public.languages set depends_on = array['10000000-0000-0000-0000-000000000003']::uuid[] where slug = 'git';
update public.languages set depends_on = array['10000000-0000-0000-0000-000000000004']::uuid[] where slug = 'typescript';
update public.languages set depends_on = array['10000000-0000-0000-0000-000000000005']::uuid[] where slug in ('react', 'vue', 'angular', 'nodejs');
update public.languages set depends_on = array['10000000-0000-0000-0000-000000000006']::uuid[] where slug = 'nextjs';
update public.languages set depends_on = array['10000000-0000-0000-0000-000000000010']::uuid[] where slug = 'sql';
update public.languages set depends_on = array['10000000-0000-0000-0000-000000000004']::uuid[] where slug in ('python', 'php', 'java', 'csharp', 'go', 'rust', 'ruby');

-- ------------------------------------------------------------
-- HTML course → module → topic → lessons
-- ------------------------------------------------------------
insert into public.courses (id, language_id, slug, title, description, sort_order) values
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001',
   'fundamentals', 'HTML Fundamentals', 'Every element, one at a time — starting with document text structure.', 10)
on conflict (id) do nothing;

insert into public.modules (id, course_id, slug, title, description, sort_order) values
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001',
   'text-structure', 'Text structure', 'The elements that give a page its outline and paragraphs.', 10)
on conflict (id) do nothing;

insert into public.topics (id, module_id, slug, title, description, sort_order) values
  ('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001',
   'headings', 'Headings', 'h1 through h6, one at a time.', 10),
  ('40000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000001',
   'paragraphs', 'Paragraphs', 'The p element and basic text flow.', 20)
on conflict (id) do nothing;

insert into public.lessons (id, topic_id, slug, title, summary, sort_order) values
  ('50000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001',
   'h1', '<h1>', 'The single most important heading on a page.', 10),
  ('50000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000001',
   'h2', '<h2>', 'A second-level heading, nested under an h1.', 20),
  ('50000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000002',
   'p', '<p>', 'A paragraph of text — the workhorse of body content.', 10)
on conflict (id) do nothing;

-- ------------------------------------------------------------
-- <h1> lesson sections
-- ------------------------------------------------------------
insert into public.lesson_sections (lesson_id, section_type, sort_order, content) values
('50000000-0000-0000-0000-000000000001', 'what_is_it', 10, '{
  "text": "<h1> marks the single most important heading on a page — the top of the document''s outline. Browsers render it large and bold by default, but its real job has nothing to do with size."
}'),
('50000000-0000-0000-0000-000000000001', 'why_it_exists', 20, '{
  "text": "Before CSS existed, HTML needed some way to say ''this text is a heading, and this specific heading is the most important one on the page.'' <h1> is that signal. Screen readers announce it as a heading and let users jump straight to it; search engines use it to understand what the page is actually about. None of that works if you fake a heading by just making some text big and bold with CSS — a sighted user sees a heading, but a screen reader or search engine sees plain text."
}'),
('50000000-0000-0000-0000-000000000001', 'anatomy', 30, '{
  "code": "<h1>Page title</h1>",
  "parts": [
    { "token": "<h1>", "label": "Opening tag", "description": "Tells the browser everything until the matching </h1> is a level-1 heading." },
    { "token": "Page title", "label": "Content", "description": "The heading text itself — what gets read aloud, indexed, and shown in the outline." },
    { "token": "</h1>", "label": "Closing tag", "description": "Marks where the heading ends. h1 is not a void element — it always needs this." }
  ]
}'),
('50000000-0000-0000-0000-000000000001', 'minimal_example', 40, '{
  "code": "<h1>Loam House</h1>\n<p>88 residences in the Bayside neighbourhood.</p>",
  "language": "html"
}'),
('50000000-0000-0000-0000-000000000001', 'common_mistakes', 50, '{
  "wrongCode": "<div class=\"h1-style\">Loam House</div>",
  "explanation": "This LOOKS identical once CSS makes the div big and bold — but it carries none of the heading semantics. Screen readers skip right past it, and there is no outline entry for search engines or in-page navigation to use."
}'),
('50000000-0000-0000-0000-000000000001', 'fix_the_mistake', 60, '{
  "wrongCode": "<div class=\"h1-style\">Loam House</div>",
  "correctCode": "<h1>Loam House</h1>",
  "hint": "Swap the div for the heading element that actually matches what this text is — then move any visual styling to CSS on h1 itself, where it belongs."
}'),
('50000000-0000-0000-0000-000000000001', 'interactive_example', 70, '{
  "starterCode": "<h1>Change this heading</h1>",
  "instructions": "Edit the text between the tags. Notice the tag names themselves are what create the heading — the content between them can be anything."
}'),
('50000000-0000-0000-0000-000000000001', 'related_concepts', 80, '{
  "items": [
    { "title": "<h2>", "lessonSlug": "h2", "description": "The next heading level down, used for sections within the page." },
    { "title": "Document outline & accessibility", "description": "Why skipping heading levels (h1 straight to h3) breaks screen-reader navigation." }
  ]
}')
on conflict (lesson_id, section_type) do nothing;

insert into public.quizzes (id, lesson_id, title, passing_score) values
  ('60000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001', 'Check your understanding: <h1>', 70)
on conflict (id) do nothing;

insert into public.quiz_questions (id, quiz_id, prompt, explanation, sort_order) values
  ('61000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001',
   'How many <h1> elements should a typical page have?',
   'A page should generally have exactly one <h1> — it represents the single main topic of that page. Using multiple h1s (or none) confuses the document outline that screen readers and search engines rely on.',
   10),
  ('61000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000001',
   'What is the main problem with styling a <div> to look like a heading instead of using <h1>?',
   'A styled div carries no heading semantics — screen readers, browser outlines, and search engines all rely on the actual element, not how it looks.',
   20)
on conflict (id) do nothing;

insert into public.quiz_options (question_id, label, is_correct, sort_order) values
  ('61000000-0000-0000-0000-000000000001', 'Exactly one, in almost all cases', true, 10),
  ('61000000-0000-0000-0000-000000000001', 'As many as you have sections', false, 20),
  ('61000000-0000-0000-0000-000000000001', 'It doesn''t matter at all', false, 30),
  ('61000000-0000-0000-0000-000000000002', 'It only affects the font size', false, 10),
  ('61000000-0000-0000-0000-000000000002', 'It carries no heading semantics for screen readers or search engines', true, 20),
  ('61000000-0000-0000-0000-000000000002', 'Divs are slower for the browser to render', false, 30)
on conflict (question_id, label) do nothing;

-- ------------------------------------------------------------
-- <h2> lesson sections (deliberately shorter — shows the engine
-- handles a lesson with fewer stages than h1; not every lesson
-- needs all 15).
-- ------------------------------------------------------------
insert into public.lesson_sections (lesson_id, section_type, sort_order, content) values
('50000000-0000-0000-0000-000000000002', 'what_is_it', 10, '{
  "text": "<h2> is a second-level heading — it introduces a major section within the page, nested one level below the page''s single <h1>."
}'),
('50000000-0000-0000-0000-000000000002', 'anatomy', 20, '{
  "code": "<h2>Section title</h2>",
  "parts": [
    { "token": "<h2>", "label": "Opening tag", "description": "Level-2 heading — one step down from h1 in the outline." },
    { "token": "Section title", "label": "Content", "description": "The section''s heading text." },
    { "token": "</h2>", "label": "Closing tag", "description": "Closes the heading." }
  ]
}'),
('50000000-0000-0000-0000-000000000002', 'common_mistakes', 30, '{
  "wrongCode": "<h1>Loam House</h1>\n<h3>The Proposition</h3>",
  "explanation": "Jumping from h1 straight to h3 skips a level. Sighted users may not notice, but screen-reader users navigating by heading level lose the sense that h3 nests under something — the outline has a gap in it."
}'),
('50000000-0000-0000-0000-000000000002', 'fix_the_mistake', 40, '{
  "wrongCode": "<h1>Loam House</h1>\n<h3>The Proposition</h3>",
  "correctCode": "<h1>Loam House</h1>\n<h2>The Proposition</h2>",
  "hint": "Use the heading level that is exactly one step below the level above it — no skipping."
}'),
('50000000-0000-0000-0000-000000000002', 'related_concepts', 50, '{
  "items": [
    { "title": "<h1>", "lessonSlug": "h1", "description": "The page''s single top-level heading, which every h2 nests under." },
    { "title": "<p>", "lessonSlug": "p", "description": "The paragraph content that usually follows a heading." }
  ]
}')
on conflict (lesson_id, section_type) do nothing;

-- ------------------------------------------------------------
-- <p> lesson sections
-- ------------------------------------------------------------
insert into public.lesson_sections (lesson_id, section_type, sort_order, content) values
('50000000-0000-0000-0000-000000000003', 'what_is_it', 10, '{
  "text": "<p> wraps a single paragraph of text. It is the most common element in the body of any page — the actual sentences readers came for."
}'),
('50000000-0000-0000-0000-000000000003', 'why_it_exists', 20, '{
  "text": "Browsers need to know where one paragraph ends and the next begins to apply correct spacing and to let assistive technology announce paragraph boundaries. Without <p>, a block of text is just an undifferentiated wall of words to a screen reader."
}'),
('50000000-0000-0000-0000-000000000003', 'anatomy', 30, '{
  "code": "<p>Loam House is made for people who have outgrown the maintenance, not the space.</p>",
  "parts": [
    { "token": "<p>", "label": "Opening tag", "description": "Starts a new paragraph." },
    { "token": "Loam House is made for people…", "label": "Content", "description": "The sentence(s) that make up this paragraph." },
    { "token": "</p>", "label": "Closing tag", "description": "Ends the paragraph. Browsers will auto-close a missing </p> — but always write it explicitly; relying on browser auto-correction is exactly the kind of hidden behavior this course flags rather than teaches as normal." }
  ]
}'),
('50000000-0000-0000-0000-000000000003', 'hidden_details', 40, '{
  "text": "Whitespace and line breaks inside a <p> in your source code are collapsed to a single space when rendered — writing your HTML across multiple lines for readability does not create line breaks in the output. Use <br> (sparingly) for an actual forced line break within a paragraph."
}'),
('50000000-0000-0000-0000-000000000003', 'common_mistakes', 50, '{
  "wrongCode": "<p>First paragraph.\n<p>Second paragraph.",
  "explanation": "Both closing tags are missing. Browsers will silently auto-close the first <p> when they hit the second one — but you should never depend on that recovery behavior. It varies at the edges and makes the actual document structure harder to reason about."
}'),
('50000000-0000-0000-0000-000000000003', 'fix_the_mistake', 60, '{
  "wrongCode": "<p>First paragraph.\n<p>Second paragraph.",
  "correctCode": "<p>First paragraph.</p>\n<p>Second paragraph.</p>",
  "hint": "Every opening <p> needs its own matching </p> — do not rely on the browser to infer where one ends."
}'),
('50000000-0000-0000-0000-000000000003', 'interactive_example', 70, '{
  "starterCode": "<p>Edit this paragraph text.</p>",
  "instructions": "Try adding a second sentence, then try adding a <br> in the middle of it to see the difference between a new sentence and a forced line break."
}')
on conflict (lesson_id, section_type) do nothing;
