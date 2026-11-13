# dev-guidance

**Keep your AI coding agents aligned with modern engineering, security, and performance best practices.**

`dev-guidance` is a lightweight, zero-dependency CLI tool that scaffolds concise, high-signal instruction files (`AGENTS.md`, `CLAUDE.md`, `.cursorrules`, and `.github/copilot-instructions.md`) tailored to your technology stack, and audits existing rule files for context-window efficiency.

---

## Features

- **Curated Stack Templates:** Opinionated, up-to-date architectural and security rules for **TypeScript**, **Swift**, **Rust**, and **Python**.
- **Multi-Agent Support:** Outputs directly to standard formats used by Claude Code, Cursor, GitHub Copilot, and universal `AGENTS.md` workflows.
- **Context Budget Linter:** Audits instruction files to ensure they stay concise and avoid diluting LLM attention with bloated prompts.
- **Zero Runtime Dependencies:** Built exclusively with native Node.js APIs for instant execution.

---

## Quick Start

### Installation

Clone the repository and build the CLI locally:

```bash
git clone https://github.com
cd dev-guidance
npm install
npm run build
npm link
```

### Usage

#### 1. Initialize guidance for your project

Generate an `AGENTS.md` file for a Swift project:

```bash
dev-guidance init swift
```

Target a specific AI assistant format (`claude`, `cursor`, `copilot`, or `agents`):

```bash
dev-guidance init typescript --target cursor
dev-guidance init rust --target claude
dev-guidance init python --target copilot
```

#### 2. Audit existing instruction files

Check line count and estimated token footprint of all AI rule files in your repository:

```bash
dev-guidance lint
```

Example output:

```text
[PASS] CLAUDE.md: 24 lines (~210 tokens) - Optimal size for context window efficiency.
```

#### 3. View all available stacks and targets

```bash
dev-guidance list
```

---

## Why Concise Guidance Matters

Overloading AI coding agents with massive instruction files increases latency, consumes context tokens, and degrades rule adherence. `dev-guidance` focuses on high-impact guardrails—such as strict typing, modern concurrency, memory safety, and secret protection—without unnecessary verbosity.

---

## Contributing

Contributions are welcome! To add a new language template or linter rule:

1. Fork the repository.
2. Add your template definition in `src/templates.ts`.
3. Run `npm run build` and test with `dev-guidance list`.
4. Open a Pull Request.

---

## License

Apache License 2.0 — see [LICENSE](LICENSE) for details.
