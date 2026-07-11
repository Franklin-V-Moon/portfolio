# `.ai/context/`

Durable project knowledge that isn't obvious from reading the code — architecture decisions and the reasoning behind them, conventions, gotchas

Guidelines:

- Write knowledge here, not narration. A note like "why Notion is used only for guide bodies, not other content" is useful; a changelog of what was edited is not (that's what `git log` is for).
- One file per topic, short filenames (`notion-integration.md`, `deploy-pipeline.md`, etc.).
- Any assistant working on a nontrivial task in this repo should read the files here relevant to that task, and add a new one (or update an existing one) when it learns something a future session would otherwise have to rediscover.
- If something belongs in every session regardless of task, it probably belongs in `AGENTS.md` instead — this directory is for knowledge that's read on demand, not injected into every prompt.
