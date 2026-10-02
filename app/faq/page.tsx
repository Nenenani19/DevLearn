export const metadata = { title: "FAQ" };

const FAQS: { question: string; answer: string }[] = [
  {
    question: "What is DevLearn?",
    answer:
      "A platform for learning programming and web development one element at a time — seeing exactly what a piece of code does before moving to the next concept, rather than reading a whole reference page at once.",
  },
  {
    question: "Who is it for?",
    answer:
      "Anyone learning to code who wants to understand why something works, not just copy a working snippet — from complete beginners through people filling gaps in self-taught knowledge.",
  },
  {
    question: "Why one concept at a time?",
    answer:
      "Dumping an entire topic on a learner at once (all six heading levels, every array method, every input type) makes it easy to skim past the details that actually matter. Breaking it into single, complete lessons means each one can go deep without becoming overwhelming.",
  },
  {
    question: "Which languages are supported right now?",
    answer:
      "HTML is live, with a real (if still growing) set of lessons. Every other language on the roadmap is marked \"coming soon\" — the platform's architecture supports adding them, but the curriculum for each still needs to be built.",
  },
  {
    question: "Is my code actually executed anywhere?",
    answer:
      "Interactive HTML examples render in a real sandboxed iframe in your own browser — that's the actual browser engine doing the rendering, not a simulation. There is no server-side arbitrary code execution anywhere on the platform.",
  },
  {
    question: "How is my progress saved?",
    answer:
      "A lesson is marked complete only when its interactive step has been used and its quiz has been passed — never just from opening the page. Progress, bookmarks, and quiz results are stored per account and only ever visible to you.",
  },
  {
    question: "Are quizzes graded honestly?",
    answer:
      "Yes — grading happens on the server. Your browser never computes its own score or sees which option is marked correct until after you submit.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <p className="eyebrow">Frequently asked</p>
      <h1 className="mt-3 font-serif text-4xl">FAQ</h1>

      <div className="mt-10 divide-y divide-ink-light/10 dark:divide-ink-dark/10">
        {FAQS.map((item) => (
          <details key={item.question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
              {item.question}
              <span aria-hidden="true" className="text-accent transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink-light/75 dark:text-ink-dark/75">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
