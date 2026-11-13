export interface StackTemplate {
  name: string;
  description: string;
  content: string;
}

export const TEMPLATES: Record<string, StackTemplate> = {
  typescript: {
    name: 'TypeScript & Modern Web',
    description: 'Strict typing, Web Vitals performance, and secure async patterns.',
    content: `# AI Agent Guidance: TypeScript & Modern Web

## Core Principles
- Always enable \`strict: true\` in TypeScript configurations. Avoid \`any\`; use \`unknown\` with type guards.
- Prefer native Web APIs (\`fetch\`, \`URL\`, \`crypto.randomUUID\`) over third-party polyfills.
- Keep bundle sizes minimal; avoid importing entire utility libraries for single functions.

## Performance & Accessibility
- Ensure all interactive elements are keyboard-accessible and include semantic ARIA attributes.
- Optimize Core Web Vitals: lazy-load offscreen assets and avoid layout shifts (CLS).
- Never block the main thread with heavy synchronous loops.

## Security
- Sanitize all user-supplied HTML or URL parameters to prevent XSS.
- Never hardcode API keys, tokens, or secrets in client-side source files.
`
  },
  swift: {
    name: 'Swift & Apple Platforms',
    description: 'Modern Swift concurrency, SwiftUI architecture, and Apple Silicon efficiency.',
    content: `# AI Agent Guidance: Swift & Apple Platforms

## Concurrency & Memory
- Use Swift Concurrency (\`async/await\`, \`Actor\`, \`@MainActor\`) instead of legacy GCD dispatch queues for new code.
- Prevent retain cycles in closures by explicitly capturing \`[weak self]\` where appropriate.
- Prefer value types (\`struct\`, \`enum\`) over reference types (\`class\`) unless shared mutable state is required.

## SwiftUI & UI
- Keep Views lightweight and declarative; extract business logic into \`@Observable\` models.
- Respect system accessibility settings (Dynamic Type, VoiceOver labels, and Reduce Motion).
- Support both Light and Dark appearances using semantic system colors.

## Security & Storage
- Store sensitive credentials and tokens exclusively in the Keychain, never in \`UserDefaults\`.
`
  },
  rust: {
    name: 'Rust Systems & CLI',
    description: 'Idiomatic error handling, zero-cost abstractions, and safe memory patterns.',
    content: `# AI Agent Guidance: Rust Systems & CLI

## Error Handling & Safety
- Never use \`.unwrap()\` or \`.expect()\` in production library code; propagate errors cleanly using \`Result<T, E>\` and the \`?\` operator.
- Avoid \`unsafe\` blocks unless strictly necessary and document invariants clearly.
- Prefer borrowing (\`&T\`, \`&str\`, \`&[T]\`) over cloning data unnecessarily.

## Code Quality
- Follow standard \`cargo clippy\` and \`cargo fmt\` conventions.
- Write unit tests inside \`#[cfg(test)]\` modules for all core parsing and logic functions.
`
  },
  python: {
    name: 'Python & AI Tooling',
    description: 'Type-annotated Python 3.11+, clean packaging, and async I/O.',
    content: `# AI Agent Guidance: Python & AI Tooling

## Standards & Typing
- Use Python 3.11+ type annotations (\`list[str]\`, \`dict[str, Any]\`, \`T | None\`) on all function signatures.
- Use \`pathlib.Path\` instead of \`os.path\` for cross-platform filesystem operations.
- Manage environments and dependencies cleanly with \`pyproject.toml\`.

## Security & Reliability
- Never use \`eval()\`, \`exec()\`, or \`pickle.loads()\` on untrusted input.
- Load secrets from environment variables; never commit \`.env\` files.
`
  }
};

export const TARGET_FILES: Record<string, string> = {
  cursor: '.cursorrules',
  claude: 'CLAUDE.md',
  copilot: '.github/copilot-instructions.md',
  agents: 'AGENTS.md'
};
