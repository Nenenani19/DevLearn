"use client";

import { useEffect, useState } from "react";
import { inferLiteralOutput } from "@/lib/lab-output";

/**
 * A real live preview: the iframe's srcDoc is literally the code the
 * user typed, rendered by the actual browser engine. This is not a
 * simulation of what HTML would do — it IS the browser doing it,
 * sandboxed so it can't navigate the parent page or run top-level scripts.
 */
export function InteractiveCodeBlock({
  starterCode,
  instructions,
  language,
  expectedOutput,
}: {
  starterCode: string;
  instructions: string;
  language?: string;
  expectedOutput?: string;
}) {
  const [code, setCode] = useState(starterCode);
  const [debouncedCode, setDebouncedCode] = useState(starterCode);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedCode(code), 250);
    return () => clearTimeout(id);
  }, [code]);

  const isJavaScript = language === "javascript";
  const isGit = language === "git";
  const isMarkup = language === "html" || language === "css";
  const inferredOutput = language ? inferLiteralOutput(debouncedCode, language) : undefined;
  const sampleOutput = code === starterCode ? inferredOutput ?? expectedOutput : inferredOutput;
  const preview = isJavaScript
    ? buildJavaScriptPreview(debouncedCode)
    : isGit
      ? buildGitPreview(debouncedCode)
      : isMarkup
        ? language === "css"
          ? buildCssPreview(debouncedCode)
          : debouncedCode
        : buildOutputPreview(sampleOutput);

  return (
    <div className="min-w-0 max-w-full overflow-hidden rounded-xl border border-ink-light/15 dark:border-ink-dark/15">
      <div className="min-w-0 break-words border-b border-ink-light/10 px-4 py-2 text-xs text-ink-light/60 dark:border-ink-dark/10 dark:text-ink-dark/60">
        {instructions}
      </div>
      <div className="grid min-w-0 gap-px bg-ink-light/10 sm:grid-cols-2 dark:bg-ink-dark/10">
        <div className="min-w-0 bg-canvas-light dark:bg-canvas-dark">
          <p className="px-3 pt-2 font-mono text-[10px] uppercase tracking-wide text-ink-light/40 dark:text-ink-dark/40">
            Edit
          </p>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            rows={6}
            aria-label="Editable code"
            className="block w-full min-w-0 max-w-full resize-none whitespace-pre-wrap break-words bg-transparent p-3 font-mono text-sm outline-none"
          />
        </div>
        <div className="min-w-0 bg-canvas-light dark:bg-canvas-dark">
          <p className="break-words px-3 pt-2 font-mono text-[10px] uppercase tracking-wide text-ink-light/40 dark:text-ink-dark/40">
            {isGit
              ? "Simulated terminal output — commands are not run"
              : isMarkup
                ? "Rendered result"
                : isJavaScript
                  ? "JavaScript output"
                  : "Expected output — sample, not executed in the browser"}
          </p>
          <iframe
            title={
              isJavaScript
                ? "JavaScript preview and console output"
                : isGit
                  ? "Simulated Git terminal output"
                  : isMarkup
                      ? `${language} rendered preview`
                  : isJavaScript
                    ? "JavaScript output"
                    : "Expected output sample"
            }
            srcDoc={preview}
            sandbox={isJavaScript ? "allow-scripts" : ""}
              className="block h-72 w-full min-w-0 max-w-full border-0 bg-white"
          />
        </div>
      </div>
    </div>
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildOutputPreview(output?: string): string {
  const text = output ?? "No sample output is available for this exercise.";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; base-uri 'none"><style>body{margin:0;padding:1rem;background:#fff;color:#222;font:13px/1.6 ui-monospace,Consolas,monospace}pre{margin:0;white-space:pre-wrap;overflow-wrap:anywhere}</style></head><body><pre>${escapeHtml(text)}</pre></body></html>`;
}

function buildCssPreview(code: string): string {
  if (/<(?:!doctype|html|style)\b/i.test(code)) return code;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; base-uri 'none"><style>${code}</style></head><body><h1>Sample heading</h1><p>Sample paragraph text</p><button type="button">Sample button</button><div class="card">Sample content</div></body></html>`;
}

function buildGitPreview(source: string): string {
  const commands = source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("git "));

  const output = commands.length
    ? commands.map((command) => `$ ${command}\n${simulateGitCommand(command)}`).join("\n\n")
    : "Enter a git command from the lesson to see sample output.";

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'">
<style>body{margin:0;padding:1rem;background:#171a1b;color:#e7ece9;font:13px/1.6 ui-monospace,Consolas,monospace}strong{display:block;margin-bottom:.75rem;color:#a6d8bd;font:600 11px/1.4 system-ui,sans-serif;text-transform:uppercase}pre{margin:0;white-space:pre-wrap;overflow-wrap:anywhere}</style>
</head><body><strong>Illustrative output only - no Git command was executed</strong><pre>${escapeHtml(output)}</pre></body></html>`;
}

function simulateGitCommand(command: string): string {
  if (/^git\s+reset\s+--hard\b/.test(command)) {
    return "Safety notice: --hard can discard local work. This simulator did not execute the command.";
  }
  if (/^git\s+status\b/.test(command)) {
    return "On branch feature/example\nChanges not staged for commit:\n  modified: index.html\nUntracked files:\n  styles.css";
  }
  if (/^git\s+add\b/.test(command)) return "Sample: selected path added to the staging area.";
  if (/^git\s+diff\s+--staged\b/.test(command)) return "Sample: staged changes are ready for review before commit.";
  if (/^git\s+diff\b/.test(command)) return "Sample: unstaged line changes in the working directory.";
  if (/^git\s+commit\b/.test(command)) return "[feature/example a1b2c3d] Sample commit\n 1 file changed, 1 insertion(+), 1 deletion(-)";
  if (/^git\s+branch\s*$/.test(command)) return "  main\n* feature/example";
  if (/^git\s+branch\b/.test(command)) return "Sample: branch created at the current commit; you are still on the original branch.";
  if (/^git\s+(switch|checkout)\b/.test(command)) return "Switched to branch 'feature/example' (sample output).";
  if (/^git\s+merge\b/.test(command)) return "Sample: merge completed. Review the resulting status and history.";
  if (/^git\s+log\b/.test(command)) return "a1b2c3d (HEAD -> feature/example) Add sample search\n9e8d7c6 (main) Add page structure";
  if (/^git\s+show\b/.test(command)) return "commit a1b2c3d\nAuthor: Example User\n\n    Add sample search\n\n    +const query = '';";
  if (/^git\s+remote\s+add\b/.test(command)) return "Sample: remote alias recorded locally. No network request was made.";
  if (/^git\s+remote\b/.test(command)) return "origin  https://github.com/example/project.git (fetch)\norigin  https://github.com/example/project.git (push)";
  if (/^git\s+fetch\b/.test(command)) return "Sample: remote-tracking references updated. The current branch was not merged.";
  if (/^git\s+push\b/.test(command)) return "Sample: local branch would be shared with the named remote. No network request was made.";
  if (/^git\s+pull\b/.test(command)) return "Sample: fetch and integrate upstream changes. No network request was made.";
  if (/^git\s+clone\b/.test(command)) return "Sample: repository files and history would be copied locally. No network request was made.";
  if (/^git\s+init\b/.test(command)) return "Sample: a new local repository would be initialized in the current directory.";
  if (/^git\s+stash\s+list\b/.test(command)) return "stash@{0}: On feature/example: WIP sample changes";
  if (/^git\s+stash\s+drop\b/.test(command)) return "Sample: selected stash would be discarded. This simulator made no changes.";
  if (/^git\s+stash\s+(pop|apply)\b/.test(command)) return "Sample: saved changes would be restored to the working directory.";
  if (/^git\s+stash\b/.test(command)) return "Sample: tracked changes would be saved in a temporary stash.";
  if (/^git\s+(rm|mv)\b/.test(command)) return "Sample: the path change would be staged for a future commit.";
  if (/^git\s+config\b/.test(command)) return "Sample: Git configuration would be read or updated according to its options.";
  if (/^git\s+rebase\b/.test(command)) return "Sample: commits would be replayed on the selected base. Shared history can be rewritten; coordinate first.";
  if (/^git\s+restore\b/.test(command)) return "Safety notice: restore can replace file contents. Review the path and options before using it in a real repository.";
  return "Illustrative output only. This lesson preview does not run shell commands, access files, or contact a remote.";
}

function buildJavaScriptPreview(code: string): string {
  const safeCode = JSON.stringify(code).replace(/</g, "\\u003c");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; style-src 'unsafe-inline'; connect-src 'none'; form-action 'none'; base-uri 'none'">
  <style>
    body { margin: 0; padding: 1rem; color: #222; font: 14px/1.5 system-ui, sans-serif; }
    #app { display: grid; gap: .75rem; padding-bottom: 1rem; }
    #console { border-top: 1px solid #d5d5d5; padding-top: .75rem; }
    #output { min-height: 2rem; margin: .5rem 0 0; white-space: pre-wrap; overflow-wrap: anywhere; font: 13px/1.5 ui-monospace, monospace; }
    button, input { font: inherit; }
  </style>
</head>
<body>
  <main id="app">
    <p id="message">Edit the code to update this preview.</p>
    <button id="demo-button" type="button">Preview button</button>
    <form id="demo-form">
      <label for="demo-input">Preview input</label>
      <input id="demo-input" value="Sample text">
      <button type="submit">Preview submit</button>
    </form>
  </main>
  <section id="console" aria-label="JavaScript console output">
    <strong>Console output</strong>
    <pre id="output">Running JavaScript…</pre>
  </section>
  <script>
    (() => {
      const source = ${safeCode};
      const output = document.querySelector('#output');
      const format = (value) => {
        if (typeof value === 'string') return value;
        try { return JSON.stringify(value, null, 2) ?? String(value); }
        catch { return String(value); }
      };
      const write = (...values) => {
        const line = values.map(format).join(' ');
        output.textContent += (output.textContent ? '\\n' : '') + line;
      };
      const safeConsole = { log: write, info: write, warn: write, error: write };
      output.textContent = '';
      try {
        const run = new Function('console', 'return (async function () {\\n' + source + '\\n})();');
        Promise.resolve(run(safeConsole)).then((value) => {
          if (value !== undefined) write(value);
        }).catch((error) => write('Error:', error && error.message ? error.message : error));
      } catch (error) {
        write('Error:', error && error.message ? error.message : error);
      }
    })();
  </script>
</body>
</html>`;
}
