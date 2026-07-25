# AGENTS.md — Autocss-com/angular (project-specific ONLY)

**The canonical laws are NOT here.** They live in ONE file, once, for every project and
every AI vendor: **`Autocss-com/ai` → `AGENTS.md`** (Response Integrity Charter `C0`–`C8`
+ AutoCSS Architecture Part II `1`–`15`). Never copy or restate them here.

**How they reach you:** clone the ai repo once and import it from your user-level memory —
then every repo on the machine gets them automatically, no per-repo copy:

```bash
git clone https://github.com/Autocss-com/ai ~/.claude/ai
# ~/.claude/CLAUDE.md  ->  @~/.claude/ai/AGENTS.md
git -C ~/.claude/ai pull      # refresh the laws for ALL projects at once
```

**Conflict priority:** `Autocss-com/ai` AGENTS.md > this file > `.agents/SESSION-HANDOFF.md`.
On conflict, surface it to the user. **Never resolve silently.**

This file declares only what is TRUE OF THIS REPO and nothing else.

# Repo context — framework data-layer demo (Angular 20)

This repository is a **framework reference demo** for the AutoCSS remote-rendering
phase. Its role is the **data / business layer** — it fetches and prepares data for
the AutoCSS UI. It is **not** the zero-dependency presentation layer, so the
framework + npm/build tooling are the **sanctioned exception** here.

- **Canonical AutoCSS Architecture laws** (zero-dependency, CSS-replaces-JS, HTML+CSS
  presentation rules) live in **`Autocss-com/ai` → `AGENTS.md`** (Part II §1–15). The
  **`autocss-com/autocss`** repo is the canonical **reference implementation** (the
  example app) those laws describe.
- The canonical laws govern ALL work in this repo. Their **presentation-layer** rules
  (Least Power: HTML → CSS → no JS) refer to the **AutoCSS UI**, not to this
  framework layer.
- This repo brings data; **AutoCSS renders**. Keep the framework to data/business
  logic and let AutoCSS own the UI.
