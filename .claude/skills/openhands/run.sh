#!/usr/bin/env bash
# Delegate a task to the self-hosted OpenHands agent (headless, in the current directory).
#   run.sh "task text"     task from text
#   run.sh -f task.md      task from a file
#   run.sh serve           launch the local web GUI at http://localhost:3000 (needs Docker)
# Env: LLM_API_KEY (required), LLM_MODEL (default anthropic/claude-sonnet-5-5), LLM_BASE_URL (optional)
set -euo pipefail

if ! command -v openhands >/dev/null; then
  export PATH="$HOME/.local/bin:$PATH"
  command -v uv >/dev/null || curl -LsSf https://astral.sh/uv/install.sh | sh
  command -v openhands >/dev/null || uv tool install openhands --python 3.12
fi

export OPENHANDS_SUPPRESS_BANNER=1
[ "${1:-}" = serve ] && exec openhands "$@"

: "${LLM_API_KEY:?Set LLM_API_KEY (e.g. an Anthropic API key)}"
export LLM_MODEL="${LLM_MODEL:-anthropic/claude-sonnet-5-5}"
[ $# -gt 0 ] || { echo "usage: $0 \"task\" | -f task.md | serve" >&2; exit 2; }
if [ "$1" = -f ]; then args=(-f "$2"); else args=(-t "$*"); fi

log="$(mktemp -t openhands.XXXXXX.log)"
openhands --headless --json --override-with-envs "${args[@]}" >"$log" 2>&1 || true
# Only JSON lines are events; the rest is UI chrome. Show the last few events.
grep '^{' "$log" | tail -n 5
echo "Full log: $log" >&2
# The CLI exits 0 even when the LLM call fails, so detect errors from the event stream.
! grep -q '"kind": "ConversationErrorEvent"' "$log"
