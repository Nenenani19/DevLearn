const OUTPUT_PATTERNS: Record<string, RegExp> = {
  python: /^\s*print\(\s*(["'])(.*?)\1\s*\)\s*;?\s*(?:#.*)?$/,
  nodejs: /^\s*console\.log\(\s*(["'])(.*?)\1\s*\)\s*;?\s*$/,
  typescript: /^\s*console\.log\(\s*(["'])(.*?)\1\s*\)\s*;?\s*$/,
  react: /^\s*console\.log\(\s*(["'])(.*?)\1\s*\)\s*;?\s*$/,
  vue: /^\s*console\.log\(\s*(["'])(.*?)\1\s*\)\s*;?\s*$/,
  angular: /^\s*console\.log\(\s*(["'])(.*?)\1\s*\)\s*;?\s*$/,
  java: /^\s*System\.out\.print(?:ln)?\(\s*(["'])(.*?)\1\s*\);?\s*$/,
  csharp: /^\s*Console\.Write(?:Line)?\(\s*(["'])(.*?)\1\s*\);?\s*$/,
  go: /^\s*fmt\.Print(?:ln)?\(\s*(["'])(.*?)\1\s*\)\s*$/,
  php: /^\s*(?:echo|print)\s*\(?\s*(["'])(.*?)\1\s*\)?;?\s*$/,
  ruby: /^\s*puts?\s*\(?\s*(["'])(.*?)\1\s*\)?\s*$/,
  rust: /^\s*println!\(\s*(["'])(.*?)\1\s*\);?\s*$/,
};

export function inferLiteralOutput(code: string, language: string): string | undefined {
  const pattern = OUTPUT_PATTERNS[language];
  if (!pattern) return undefined;

  const lines = code.split(/\r?\n/).flatMap((line) => {
    const match = line.match(pattern);
    return match ? [match[2].replace(/\\n/g, "\n").replace(/\\(["'\\])/g, "$1")] : [];
  });

  return lines.length ? lines.join("\n") : undefined;
}