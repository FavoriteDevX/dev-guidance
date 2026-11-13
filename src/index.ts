import * as fs from 'fs';
import * as path from 'path';
import { TEMPLATES, TARGET_FILES } from './templates';

const args = process.argv.slice(2);
const command = args[0];

function printHelp(): void {
  console.log(`
dev-guidance v0.1.0
Keep AI coding agents aligned with modern engineering best practices.

Usage:
  dev-guidance init <stack> [--target <agent>]   Generate AI guidance rules
  dev-guidance lint [file]                       Audit rule file size & token efficiency
  dev-guidance list                              List available stacks and targets

Stacks:
  typescript, swift, rust, python

Targets (default: agents):
  agents   -> AGENTS.md
  cursor   -> .cursorrules
  claude   -> CLAUDE.md
  copilot  -> .github/copilot-instructions.md

Examples:
  dev-guidance init swift --target claude
  dev-guidance init typescript --target cursor
  dev-guidance lint AGENTS.md
`);
}

function handleList(): void {
  console.log('\nAvailable Stacks:');
  for (const [key, tpl] of Object.entries(TEMPLATES)) {
    console.log(`  - ${key.padEnd(12)} ${tpl.description}`);
  }
  console.log('\nSupported Agent Targets:');
  for (const [key, file] of Object.entries(TARGET_FILES)) {
    console.log(`  - ${key.padEnd(12)} -> ${file}`);
  }
  console.log('');
}

function handleInit(stackName?: string, targetFlagIndex?: number): void {
  if (!stackName || !TEMPLATES[stackName.toLowerCase()]) {
    console.error('Error: Please specify a valid stack (typescript, swift, rust, python).');
    console.log('Run "dev-guidance list" to see all available templates.');
    process.exit(1);
  }

  let targetKey = 'agents';
  if (targetFlagIndex !== undefined && targetFlagIndex !== -1 && args[targetFlagIndex + 1]) {
    targetKey = args[targetFlagIndex + 1].toLowerCase();
  }

  const outputPath = TARGET_FILES[targetKey];
  if (!outputPath) {
    console.error(`Error: Unknown target "${targetKey}". Valid targets: agents, cursor, claude, copilot.`);
    process.exit(1);
  }

  const fullPath = path.resolve(process.cwd(), outputPath);
  const dirName = path.dirname(fullPath);

  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }

  const template = TEMPLATES[stackName.toLowerCase()];
  fs.writeFileSync(fullPath, template.content, 'utf8');

  console.log(`✔ Created ${outputPath} with "${template.name}" guidance.`);
}

function handleLint(filePath?: string): void {
  const candidates = filePath
    ? [filePath]
    : Object.values(TARGET_FILES);

  const foundFiles = candidates.filter((f) => fs.existsSync(path.resolve(process.cwd(), f)));

  if (foundFiles.length === 0) {
    console.log('No AI guidance files found in the current directory.');
    return;
  }

  for (const file of foundFiles) {
    const content = fs.readFileSync(path.resolve(process.cwd(), file), 'utf8');
    const lines = content.split('\n').length;
    const approxTokens = Math.ceil(content.length / 4);

    let status = 'PASS';
    let note = 'Optimal size for context window efficiency.';

    if (approxTokens > 2500) {
      status = 'WARN';
      note = 'File exceeds 2,500 tokens. Large rule files dilute agent attention.';
    }

    console.log(`[${status}] ${file}: ${lines} lines (~${approxTokens} tokens) - ${note}`);
  }
}

switch (command) {
  case 'init': {
    const stack = args[1];
    const targetIdx = args.indexOf('--target');
    handleInit(stack, targetIdx);
    break;
  }
  case 'lint': {
    handleLint(args[1]);
    break;
  }
  case 'list': {
    handleList();
    break;
  }
  default:
    printHelp();
    break;
}
