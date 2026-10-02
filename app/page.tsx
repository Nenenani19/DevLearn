"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createClient } from "@/lib/supabase/client";

gsap.registerPlugin(ScrollTrigger);

const featureCards = [
  {
    title: "Courses",
    text: "Structured paths that move from fundamentals into the concepts and patterns you actually use in real development.",
  },
  {
    title: "Labs",
    text: "Hands-on practice designed to help you apply each concept immediately instead of leaving it as theory.",
  },
  {
    title: "Quizzes",
    text: "Regular checks that reveal what you understand clearly and where you should revisit a concept.",
  },
];

const learningSteps = [
  "What is it?",
  "Why does it exist?",
  "How does it work?",
  "How is it used?",
  "What can go wrong?",
  "Can you use it yourself?",
];

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [supabase] = useState(() => createClient());
  const [authLoaded, setAuthLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsAuthenticated(Boolean(data.user));
      setAuthLoaded(true);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session?.user));
      setAuthLoaded(true);
    });

    return () => subscription.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".decoding-text",
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out" }
      );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 42, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_theme(colors.accent.soft)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_theme(colors.moss)_0%,_transparent_60%)] opacity-[0.15] dark:opacity-[0.12]"
      />
      <div className="grain-overlay" />

      <main className="relative mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <section data-reveal className="min-h-[78vh] py-8 sm:py-14">
          <div className="max-w-4xl">
            <p className="eyebrow">A learning platform</p>

            <div className="mt-6 flex items-center gap-4">
              <span className="decoding-number">01</span>
              <p className="eyebrow">The proposition</p>
            </div>

            <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-ink-light dark:text-ink-dark sm:text-6xl lg:text-7xl">
              <span className="decoding-text block">Understand the code.</span>
              <em className="mt-2 block italic text-accent">Not just the syntax.</em>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-light/75 dark:text-ink-dark/75">
              DevLearn is an interactive programming learning platform built to help you understand how code works instead of simply memorizing syntax.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              {authLoaded && !isAuthenticated && (
                <Link
                  href="/signup"
                  className="rounded-full bg-accent px-6 py-3 text-sm font-medium uppercase tracking-widest2 text-white transition hover:bg-accent/90"
                >
                  Create an account
                </Link>
              )}
              <Link
                href="/roadmap"
                className="rounded-full border border-ink-light/20 px-6 py-3 text-sm font-medium uppercase tracking-widest2 transition hover:border-accent dark:border-ink-dark/20"
              >
                Explore the roadmap
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {featureCards.map((card, index) => (
              <div
                key={card.title}
                data-reveal
                className="rounded-2xl border border-ink-light/10 bg-white/40 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.04)] backdrop-blur-sm dark:border-ink-dark/10 dark:bg-slate-900/30"
              >
                <p className="font-serif text-3xl text-accent">{index + 1}</p>
                <h2 className="mt-3 font-serif text-xl">{card.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-light/70 dark:text-ink-dark/70">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section data-reveal className="py-8 sm:py-12">
          <div className="mb-8 flex items-center gap-4">
            <span className="section-number">02</span>
            <h2 className="font-serif text-3xl sm:text-4xl">What is DevLearn?</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5 text-base leading-8 text-ink-light/80 dark:text-ink-dark/80">
              <p>
                DevLearn is a platform designed to help you understand how code works instead of simply memorizing syntax.
              </p>
              <p>
                Each lesson focuses on one concept, explains its purpose, shows how it works, and gives you opportunities to practice it. The platform combines structured courses, detailed explanations, Labs, quizzes, revision, and progress tracking into one cohesive learning experience.
              </p>
            </div>

            <div className="rounded-3xl border border-ink-light/10 bg-white/40 p-6 dark:border-ink-dark/10 dark:bg-slate-900/30">
              <p className="eyebrow">Inside the platform</p>
              <ul className="mt-5 space-y-3 text-sm text-ink-light/75 dark:text-ink-dark/75">
                <li>• Structured course paths</li>
                <li>• Step-by-step concept explanations</li>
                <li>• Guided Labs and tasks</li>
                <li>• Progress tracking and revision</li>
              </ul>
            </div>
          </div>
        </section>

        <section data-reveal className="py-8 sm:py-12">
          <div className="mb-8 flex items-center gap-4">
            <span className="section-number">03</span>
            <h2 className="font-serif text-3xl sm:text-4xl">Learn one concept at a time</h2>
          </div>

          <p className="max-w-3xl text-lg leading-relaxed text-ink-light/80 dark:text-ink-dark/80">
            Programming becomes difficult when too many concepts are introduced together. DevLearn takes a different approach by dividing every lesson into smaller learning stages so you can focus on one idea before moving to the next.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {learningSteps.map((step) => (
              <div
                key={step}
                data-reveal
                className="rounded-2xl border border-ink-light/10 bg-white/35 p-4 dark:border-ink-dark/10 dark:bg-slate-900/25"
              >
                <p className="font-serif text-accent">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section data-reveal className="py-8 sm:py-12">
          <div className="mb-8 flex items-center gap-4">
            <span className="section-number">04</span>
            <h2 className="font-serif text-3xl sm:text-4xl">A clearer way through every lesson</h2>
          </div>

          <p className="max-w-3xl text-lg leading-relaxed text-ink-light/80 dark:text-ink-dark/80">
            Good progress comes from knowing what to do next. Every lesson follows the same calm rhythm, so you can spend your energy on the idea instead of figuring out how to use the course.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-ink-light/10 bg-white/35 p-5 dark:border-ink-dark/10 dark:bg-slate-900/25">
              <p className="font-serif text-2xl text-accent">01</p>
              <h3 className="mt-3 font-serif text-xl">Understand</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-light/75 dark:text-ink-dark/75">
                Start with the problem a concept solves and see each piece of the syntax in context.
              </p>
            </div>

            <div className="rounded-2xl border border-ink-light/10 bg-white/35 p-5 dark:border-ink-dark/10 dark:bg-slate-900/25">
              <p className="font-serif text-2xl text-accent">02</p>
              <h3 className="mt-3 font-serif text-xl">Try</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-light/75 dark:text-ink-dark/75">
                Change a small example, make a prediction, and use a Lab to turn the explanation into practice.
              </p>
            </div>

            <div className="rounded-2xl border border-ink-light/10 bg-white/35 p-5 dark:border-ink-dark/10 dark:bg-slate-900/25">
              <p className="font-serif text-2xl text-accent">03</p>
              <h3 className="mt-3 font-serif text-xl">Remember</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-light/75 dark:text-ink-dark/75">
                Finish with a quick check and revisit the concepts that need another pass when you are ready.
              </p>
            </div>
          </div>
        </section>

        <section data-reveal className="py-8 sm:py-12">
          <div className="mb-8 flex items-center gap-4">
            <span className="section-number">05</span>
            <h2 className="font-serif text-3xl sm:text-4xl">Detailed explanations</h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-ink-light/80 dark:text-ink-dark/80">
            <p>
              Understanding programming is more than knowing what a piece of syntax is called. DevLearn explains the relationship between the code you write and what the computer actually does with it.
            </p>
            <p>
              Instead of giving you a large example and expecting you to understand everything at once, lessons can break the example into smaller parts. You can understand the purpose of individual elements, how they work together, and what changes when you modify them.
            </p>
            <blockquote className="rounded-2xl border-l-4 border-accent bg-accent/5 p-4 text-lg italic text-ink-light dark:text-ink-dark">
              Don’t just know the code. Understand the code.
            </blockquote>
          </div>
        </section>

        <section data-reveal className="py-8 sm:py-12">
          <div className="mb-8 flex items-center gap-4">
            <span className="section-number">06</span>
            <h2 className="font-serif text-3xl sm:text-4xl">Learn through Labs</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-4 text-base leading-8 text-ink-light/80 dark:text-ink-dark/80">
              <p>
                Reading an explanation is only one part of learning programming. Labs give you a place to apply the concepts you have studied.
              </p>
              <p>
                Depending on the lesson, a Lab can ask you to complete a small coding task, modify existing code, identify a bug, predict a result, create something using the concept, or experiment with different values.
              </p>
            </div>

            <ul className="space-y-3 rounded-3xl border border-ink-light/10 bg-white/35 p-6 text-sm leading-7 text-ink-light/75 dark:border-ink-dark/10 dark:bg-slate-900/25">
              <li>• Complete a small coding task</li>
              <li>• Modify existing code</li>
              <li>• Find and fix an error</li>
              <li>• Predict the result</li>
              <li>• Apply multiple concepts together</li>
            </ul>
          </div>
        </section>

        <section data-reveal className="py-8 sm:py-12">
          <div className="mb-8 flex items-center gap-4">
            <span className="section-number">07</span>
            <h2 className="font-serif text-3xl sm:text-4xl">Test your understanding</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4 text-base leading-8 text-ink-light/80 dark:text-ink-dark/80">
              <p>
                Every concept becomes easier to remember when you test yourself. DevLearn includes quizzes throughout the learning journey to check whether you understood what you studied.
              </p>
              <p>
                Questions cover concepts, syntax, code reading, expected output, common mistakes, and practical situations. A quiz helps identify what you understand and which concepts need another look.
              </p>
            </div>

            <div className="rounded-3xl border border-ink-light/10 bg-white/35 p-6 dark:border-ink-dark/10 dark:bg-slate-900/25">
              <p className="eyebrow">Quiz coverage</p>
              <ul className="mt-4 space-y-2 text-sm text-ink-light/75 dark:text-ink-dark/75">
                <li>• Concepts</li>
                <li>• Syntax</li>
                <li>• Code reading</li>
                <li>• Expected output</li>
                <li>• Common mistakes</li>
              </ul>
            </div>
          </div>
        </section>

        <section data-reveal className="py-8 sm:py-12">
          <div className="mb-8 flex items-center gap-4">
            <span className="section-number">08</span>
            <h2 className="font-serif text-3xl sm:text-4xl">Learn from mistakes</h2>
          </div>

          <div className="rounded-3xl border border-ink-light/10 bg-accent/5 p-6 sm:p-8 dark:border-ink-dark/10">
            <p className="eyebrow">Mistake Lab</p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-ink-light/80 dark:text-ink-dark/80">
              Making mistakes is part of learning to program. The Mistake Lab focuses specifically on common programming mistakes and confusing situations. You may be asked to identify what is wrong, understand why it happens, and determine how the problem can be corrected.
            </p>
            <p className="mt-4 text-lg font-medium text-accent">
              Reading code and finding problems is a critical development skill.
            </p>
          </div>
        </section>

        <section data-reveal className="py-8 sm:py-12">
          <div className="mb-8 flex items-center gap-4">
            <span className="section-number">09</span>
            <h2 className="font-serif text-3xl sm:text-4xl">Follow a structured roadmap</h2>
          </div>

          <p className="max-w-3xl text-base leading-8 text-ink-light/80 dark:text-ink-dark/80">
            The DevLearn roadmap organizes learning into a progression. You can see what to learn first, what comes next, which concepts depend on earlier knowledge, and how far you have progressed. The roadmap gives you a clear direction instead of leaving you to decide what to learn next.
          </p>
        </section>

        <section data-reveal className="py-8 sm:py-12">
          <div className="mb-8 flex items-center gap-4">
            <span className="section-number">10</span>
            <h2 className="font-serif text-3xl sm:text-4xl">Compare similar concepts</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              "let vs const",
              "== vs ===",
              "Flexbox vs Grid",
              "for vs while",
              "Class vs ID",
              "Array vs Object",
            ].map((item) => (
              <div key={item} data-reveal className="rounded-2xl border border-ink-light/10 bg-white/35 p-4 text-sm text-ink-light/75 dark:border-ink-dark/10 dark:bg-slate-900/25 dark:text-ink-dark/75">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section data-reveal className="py-8 sm:py-12">
          <div className="mb-8 flex items-center gap-4">
            <span className="section-number">11</span>
            <h2 className="font-serif text-3xl sm:text-4xl">Track your progress</h2>
          </div>

          <p className="max-w-3xl text-base leading-8 text-ink-light/80 dark:text-ink-dark/80">
            Your learning journey should not disappear after you close the browser. Your dashboard keeps track of course progress, quiz results, Labs, bookmarked concepts, and recommended next steps so you always know where to continue.
          </p>
        </section>

        <section data-reveal className="py-8 sm:py-12">
          <div className="mb-8 flex items-center gap-4">
            <span className="section-number">12</span>
            <h2 className="font-serif text-3xl sm:text-4xl">The idea behind DevLearn</h2>
          </div>

          <div className="rounded-3xl border border-ink-light/10 bg-white/35 p-6 dark:border-ink-dark/10 dark:bg-slate-900/25">
            <p className="text-base leading-8 text-ink-light/80 dark:text-ink-dark/80">
              There are plenty of places where you can find programming syntax. DevLearn focuses on the part that often comes before syntax: understanding. Why does this concept exist? What problem does it solve? How does it work? What mistakes should you watch for? Once those questions start making sense, the syntax becomes much easier to work with.
            </p>
          </div>
        </section>

        <section data-reveal className="py-8 sm:py-12">
          <div className="mb-8 flex items-center gap-4">
            <span className="section-number">13</span>
            <h2 className="font-serif text-3xl sm:text-4xl">Start with one concept</h2>
          </div>

          <p className="max-w-3xl text-xl leading-relaxed text-ink-light/80 dark:text-ink-dark/80">
            Start with one concept. Understand it. Practice it. Test yourself. Then move to the next.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium uppercase tracking-widest2 text-white transition hover:bg-accent/90"
            >
              Create an account
            </Link>
            <Link
              href="/roadmap"
              className="rounded-full border border-ink-light/20 px-6 py-3 text-sm font-medium uppercase tracking-widest2 transition hover:border-accent dark:border-ink-dark/20"
            >
              Explore the roadmap
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
