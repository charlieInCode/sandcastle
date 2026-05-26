---
"@ai-hero/sandcastle": patch
---

Raise the GitHub Issues backlog manager's list command to `--limit 100` so the parallel planner sees the full backlog instead of `gh`'s default 30, preventing foundation issues from being silently truncated out of the dependency graph.
