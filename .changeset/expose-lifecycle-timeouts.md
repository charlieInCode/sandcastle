---
"@ai-hero/sandcastle": patch
---

Expose more sandbox lifecycle timeouts via the `Timeouts` interface. In addition to `copyToWorktreeMs`, you can now override `gitSetupMs` (in-sandbox git setup commands, default 10 000 ms), `commitCollectionMs` (collecting the run's commits, default 30 000 ms), and `mergeToHostMs` (merging a temp branch back to the host branch, default 30 000 ms). These are accepted anywhere `timeouts` already is — `run()`, `createSandbox()`, `interactive()`, and `createWorktree()`. Unset keys keep their defaults.
