---
name: openhands
description: Delegate a self-contained coding task to the self-hosted OpenHands agent (open-source CLI, headless) and review its result. Use when the user asks to "use OpenHands", "have OpenHands do X", or wants a second agent to work a task in parallel.
---

# OpenHands

Runs the open-source [OpenHands](https://docs.openhands.dev) CLI in headless mode in the
current directory. It edits files directly and auto-approves its own actions, so treat it
like a contractor: give it a scoped task, then review its diff.

## Run

```bash
bash .claude/skills/openhands/run.sh "Add input validation to calculator.html weight field. Do not commit."
bash .claude/skills/openhands/run.sh -f task.md
```

- Installs the CLI on first use (`uv tool install openhands --python 3.12`).
- Needs `LLM_API_KEY` in the environment. If it is missing, stop and tell the user to add it
  (cloud sessions: environment secrets; local: shell profile). Never ask for the key in chat.
- `LLM_MODEL` defaults to `anthropic/claude-sonnet-5-5`; any LiteLLM model id works.
- Prints the last few JSON events and the full log path; exits non-zero on LLM/agent errors.

## Workflow

1. Write a precise task: files in scope, acceptance criteria, "do not commit or push".
2. Run it (long tasks: `run_in_background`).
3. Review with `git diff`; run the project's checks; keep, fix, or revert. You own the result.

## Other modes

- Local web GUI: `bash .claude/skills/openhands/run.sh serve` → http://localhost:3000 (Docker).
- PR review in GitHub: see `.github/workflows/openhands-pr-review.yml` (label a PR `review-this`).
