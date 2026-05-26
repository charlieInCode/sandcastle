---
"@ai-hero/sandcastle": patch
---

Use the scoped package name (`@ai-hero/sandcastle`) in the quick-start docs so `npx` resolves this package rather than the unrelated unscoped `sandcastle` package on npm. Also refresh the docs site getting-started page, which referenced removed `sandcastle init`/`sandcastle run` commands.
