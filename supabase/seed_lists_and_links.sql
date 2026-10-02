-- ============================================================
-- DevLearn Platform — seed additions (curriculum growth)
-- Run AFTER seed.sql. Adds a "Lists" and "Links" topic to the
-- existing HTML Fundamentals course: <ul>, <li>, <a>.
-- Fixed UUIDs, idempotent via ON CONFLICT, same pattern as seed.sql.
-- ============================================================

insert into public.topics (id, module_id, slug, title, description, sort_order) values
  ('40000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000001',
   'lists', 'Lists', 'Grouping related items with ul, ol and li.', 30),
  ('40000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000001',
   'links', 'Links', 'The anchor element and hypertext navigation.', 40)
on conflict (id) do nothing;

insert into public.lessons (id, topic_id, slug, title, summary, sort_order) values
  ('50000000-0000-0000-0000-000000000004', '40000000-0000-0000-0000-000000000003',
   'ul', '<ul>', 'An unordered list — items with no meaningful sequence.', 10),
  ('50000000-0000-0000-0000-000000000005', '40000000-0000-0000-0000-000000000003',
   'li', '<li>', 'A single item inside a list.', 20),
  ('50000000-0000-0000-0000-000000000006', '40000000-0000-0000-0000-000000000004',
    'a', '<a>', 'Semantic hyperlinks, their destinations, and accessible link text.', 10)
  on conflict (id) do update set
    title = excluded.title,
    summary = excluded.summary,
    sort_order = excluded.sort_order;

-- ------------------------------------------------------------
-- <ul>
-- ------------------------------------------------------------
insert into public.lesson_sections (lesson_id, section_type, sort_order, content) values
('50000000-0000-0000-0000-000000000004', 'what_is_it', 10, '{
  "text": "<ul> groups a set of items together where the order between them does not matter — an unordered list. Browsers render each item with a bullet point by default."
}'),
('50000000-0000-0000-0000-000000000004', 'why_it_exists', 20, '{
  "text": "Without <ul>, a set of related items is just a run of text with no structure a browser, screen reader, or search engine can recognize as a group. <ul> tells assistive technology ''here are N items in a list'' — a screen reader announces the list and how many items it contains, and lets a user jump between items."
}'),
('50000000-0000-0000-0000-000000000004', 'anatomy', 30, '{
  "code": "<ul>\n  <li>Kitchen</li>\n  <li>Living room</li>\n</ul>",
  "parts": [
    { "token": "<ul>", "label": "Opening tag", "description": "Starts an unordered list. On its own it can contain nothing except <li> elements (and a couple of rarely-used script/template elements)." },
    { "token": "<li>", "label": "List item", "description": "Each item in the list. A ul with no li children is empty and renders nothing." },
    { "token": "</ul>", "label": "Closing tag", "description": "Ends the list." }
  ]
}'),
('50000000-0000-0000-0000-000000000004', 'minimal_example', 40, '{
  "code": "<ul>\n  <li>Kitchen</li>\n  <li>Living room</li>\n  <li>Two bedrooms</li>\n</ul>",
  "language": "html"
}'),
('50000000-0000-0000-0000-000000000004', 'common_mistakes', 50, '{
  "wrongCode": "<ul>\n  Kitchen<br>\n  Living room<br>\n</ul>",
  "explanation": "Text placed directly inside a <ul> without wrapping it in <li> is invalid — the browser will still display something (browsers are very forgiving), but there is no list-item semantics at all. A screen reader has nothing to announce as a list item, and the bullet styling browsers normally apply won''t appear correctly either."
}'),
('50000000-0000-0000-0000-000000000004', 'fix_the_mistake', 60, '{
  "wrongCode": "<ul>\n  Kitchen<br>\n  Living room<br>\n</ul>",
  "correctCode": "<ul>\n  <li>Kitchen</li>\n  <li>Living room</li>\n</ul>",
  "hint": "Every piece of list content needs its own <li> wrapper — <br> is not a substitute for a list item."
}'),
('50000000-0000-0000-0000-000000000004', 'interactive_example', 70, '{
  "starterCode": "<ul>\n  <li>First item</li>\n  <li>Second item</li>\n</ul>",
  "instructions": "Add a third <li>, then try deleting the </ul> closing tag entirely and see how the browser still tries to recover — this is exactly the kind of silent auto-correction you should never rely on."
}'),
('50000000-0000-0000-0000-000000000004', 'related_concepts', 80, '{
  "items": [
    { "title": "<li>", "lessonSlug": "li", "description": "The individual item element that a ul can only contain." },
    { "title": "<ol>", "description": "The ordered-list counterpart, used when sequence matters (steps, rankings) — not yet a lesson here." }
  ]
}')
on conflict (lesson_id, section_type) do nothing;

insert into public.quizzes (id, lesson_id, title, passing_score) values
  ('60000000-0000-0000-0000-000000000002', '50000000-0000-0000-0000-000000000004', 'Check your understanding: <ul>', 70)
on conflict (id) do nothing;

insert into public.quiz_questions (id, quiz_id, prompt, explanation, sort_order) values
  ('61000000-0000-0000-0000-000000000003', '60000000-0000-0000-0000-000000000002',
   'What is the only kind of element a <ul> is allowed to contain directly?',
   '<ul> should only directly contain <li> elements (plus a couple of rarely-used exceptions like <template> and <script>) — any other direct child, including plain text, is invalid.',
   10)
on conflict (id) do nothing;

insert into public.quiz_options (question_id, label, is_correct, sort_order) values
  ('61000000-0000-0000-0000-000000000003', '<li>', true, 10),
  ('61000000-0000-0000-0000-000000000003', '<div>', false, 20),
  ('61000000-0000-0000-0000-000000000003', 'Plain text is fine on its own', false, 30)
on conflict (question_id, label) do nothing;

-- ------------------------------------------------------------
-- <li>
-- ------------------------------------------------------------
insert into public.lesson_sections (lesson_id, section_type, sort_order, content) values
('50000000-0000-0000-0000-000000000005', 'what_is_it', 10, '{
  "text": "<li> represents a single item inside a list — it only makes sense as a direct child of <ul>, <ol>, or <menu>."
}'),
('50000000-0000-0000-0000-000000000005', 'anatomy', 20, '{
  "code": "<li>Kitchen</li>",
  "parts": [
    { "token": "<li>", "label": "Opening tag", "description": "Starts one list item. Only valid as a direct child of ul, ol or menu." },
    { "token": "Kitchen", "label": "Content", "description": "Can be plain text, or a much richer mix of elements — a li can contain headings, paragraphs, images, even a nested list." },
    { "token": "</li>", "label": "Closing tag", "description": "Ends the item." }
  ]
}'),
('50000000-0000-0000-0000-000000000005', 'hidden_details', 30, '{
  "text": "An <li> is not limited to a single line of text — it is a full block-level container. Nesting an entire <ul> inside one <li> is exactly how sub-lists are built, and this is common in real navigation menus and outlines."
}'),
('50000000-0000-0000-0000-000000000005', 'fix_the_mistake', 40, '{
  "wrongCode": "<li>Kitchen\n<li>Living room</li>",
  "correctCode": "<li>Kitchen</li>\n<li>Living room</li>",
  "hint": "The first <li> here is missing its closing tag — every opening li needs its own matching close, just like p."
}'),
('50000000-0000-0000-0000-000000000005', 'related_concepts', 50, '{
  "items": [
    { "title": "<ul>", "lessonSlug": "ul", "description": "The unordered-list container that li items live inside." },
    { "title": "<a>", "lessonSlug": "a", "description": "Very often placed inside li to build a list of links — the basis of most navigation menus." }
  ]
}')
on conflict (lesson_id, section_type) do nothing;

-- ------------------------------------------------------------
-- <a>
-- ------------------------------------------------------------
insert into public.lesson_sections (lesson_id, section_type, sort_order, content) values
('50000000-0000-0000-0000-000000000006', 'what_is_it', 10, '{
  "text": "The <a> (anchor) element creates a hyperlink when it has an href attribute. Links connect a page to another page, a file, an email address, or a specific location within a document."
}'),
('50000000-0000-0000-0000-000000000006', 'why_it_exists', 20, '{
  "text": "The href attribute gives a link its destination and native behavior: users can follow it, open it in a new tab, copy its address, or reach it with a keyboard. An <a> without href is not a hyperlink; use a button for actions that change the current page or application state."
}'),
('50000000-0000-0000-0000-000000000006', 'anatomy', 30, '{
  "code": "<a href=\"/roadmap\">See the roadmap</a>",
  "parts": [
    { "token": "<a", "label": "Opening tag", "description": "Starts the link." },
    { "token": "href=\"/roadmap\"", "label": "href attribute", "description": "Where the link goes. This is what makes it a real, clickable, keyboard-focusable link — without it, the browser treats the element as plain non-interactive text." },
    { "token": "See the roadmap", "label": "Link text", "description": "What the user sees and clicks. Screen readers read this aloud, so it should describe the destination, not just say ''click here.''" },
    { "token": "</a>", "label": "Closing tag", "description": "Ends the link." }
  ]
}'),
('50000000-0000-0000-0000-000000000006', 'minimal_example', 40, '{
  "code": "<a href=\"https://example.com\">Visit example.com</a>",
  "language": "html"
}'),
('50000000-0000-0000-0000-000000000006', 'hidden_details', 50, '{
  "text": "For links opened in a new tab with target=\"_blank\", rel=\"noopener\" blocks access to window.opener. Modern browsers enable this protection by default, but writing rel=\"noopener\" explicitly makes the security intent clear. Use rel=\"noreferrer\" only when referrer data should also be withheld."
}'),
('50000000-0000-0000-0000-000000000006', 'common_mistakes', 60, '{
  "wrongCode": "<a onclick=\"location.href=''/roadmap''\">See the roadmap</a>",
  "explanation": "This anchor has no href, so it is not a hyperlink. It cannot be opened in a new tab, copied as a destination, or used reliably without JavaScript. Use an href for navigation; reserve buttons for actions."
}'),
('50000000-0000-0000-0000-000000000006', 'fix_the_mistake', 70, '{
  "wrongCode": "<a onclick=\"location.href=''/roadmap''\">See the roadmap</a>",
  "correctCode": "<a href=\"/roadmap\">See the roadmap</a>",
  "hint": "Give the anchor a destination with href. Use a button only when the control performs an action rather than navigating."
}'),
('50000000-0000-0000-0000-000000000006', 'interactive_example', 80, '{
  "starterCode": "<a href=\"https://example.com\">Change this link text</a>",
  "instructions": "Change the destination in href and the visible link text independently. The destination controls where the link goes; the text should describe that destination."
}'),
('50000000-0000-0000-0000-000000000006', 'mini_challenge', 90, '{
  "prompt": "Build a useful navigation link: point it to /learn/html and choose link text that makes sense when read on its own. Check the live result and make sure the destination and description match.",
  "starterCode": "<nav>\n  <a href='/roadmap'>Click here</a>\n</nav>"
}'),
('50000000-0000-0000-0000-000000000006', 'related_concepts', 100, '{
  "items": [
    { "title": "<li>", "lessonSlug": "li", "description": "Anchors are very often placed inside li elements to build navigation menus." },
    { "title": "Accessible link text", "description": "Why link text like \"click here\" fails screen-reader users who navigate by jumping between links out of context." }
  ]
}')
on conflict (lesson_id, section_type) do update set
  sort_order = excluded.sort_order,
  content = excluded.content;

insert into public.quizzes (id, lesson_id, title, passing_score) values
  ('60000000-0000-0000-0000-000000000003', '50000000-0000-0000-0000-000000000006', 'Check your understanding: <a>', 70)
on conflict (id) do update set
  title = excluded.title,
  passing_score = excluded.passing_score;

insert into public.quiz_questions (id, quiz_id, prompt, explanation, sort_order) values
  ('61000000-0000-0000-0000-000000000004', '60000000-0000-0000-0000-000000000003',
   'Which attribute gives an anchor its destination and native hyperlink behavior?',
   'The href attribute defines the resource or location the link points to. Without href, an anchor is not a hyperlink.', 10),
  ('61000000-0000-0000-0000-000000000005', '60000000-0000-0000-0000-000000000003',
   'Which link text is clearest when a screen-reader user views a list of links out of context?',
   'Descriptive link text communicates the destination on its own. Generic phrases such as click here do not.', 20),
  ('61000000-0000-0000-0000-000000000006', '60000000-0000-0000-0000-000000000003',
   'When a link opens a new tab, which rel value explicitly blocks access to the opener in older browsers?',
   'noopener prevents access through window.opener in older browsers; modern browsers apply this protection by default for target blank.', 30)
on conflict (id) do update set
  prompt = excluded.prompt,
  explanation = excluded.explanation,
  sort_order = excluded.sort_order;

insert into public.quiz_options (question_id, label, is_correct, sort_order) values
  ('61000000-0000-0000-0000-000000000004', 'href', true, 10),
  ('61000000-0000-0000-0000-000000000004', 'onclick', false, 20),
  ('61000000-0000-0000-0000-000000000004', 'target', false, 30),
  ('61000000-0000-0000-0000-000000000005', 'Read the HTML roadmap', true, 10),
  ('61000000-0000-0000-0000-000000000005', 'Click here', false, 20),
  ('61000000-0000-0000-0000-000000000005', 'More', false, 30),
  ('61000000-0000-0000-0000-000000000006', 'noopener', true, 10),
  ('61000000-0000-0000-0000-000000000006', 'aria-label', false, 20),
  ('61000000-0000-0000-0000-000000000006', 'tabindex', false, 30)
on conflict (question_id, label) do update set
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
